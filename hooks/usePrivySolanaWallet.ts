import { useState, useCallback, useEffect } from 'react';
import { Alert } from 'react-native';
import { usePrivy, useEmbeddedSolanaWallet } from '@privy-io/expo';
import { Connection, PublicKey } from '@solana/web3.js';
import { useExternalWallet } from './useExternalWallet';
import type { SolanaWallet } from '@/types/wallet';

export function usePrivySolanaWallet() {
  const { user, logout } = usePrivy();
  const { wallets: embeddedWallets, create: createWallet } = useEmbeddedSolanaWallet();
  const externalWalletHook = useExternalWallet();
  const [isConnecting, setIsConnecting] = useState(false);
  const [connection, setConnection] = useState<Connection | null>(null);
  const [selectedWalletType, setSelectedWalletType] = useState<'embedded' | 'external'>('embedded');

  // Get the active wallet (embedded or external)
  const embeddedWallet = embeddedWallets?.[0];
  const externalWallet = externalWalletHook.wallet;
  const activeWallet = selectedWalletType === 'embedded' ? embeddedWallet : externalWallet;
  const walletAddress = selectedWalletType === 'embedded' 
    ? embeddedWallet?.address 
    : externalWallet?.publicKey?.toString();

  useEffect(() => {
    // Initialize Solana connection (using mainnet-beta for real functionality)
    const conn = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');
    setConnection(conn);
  }, []);

  const authenticated = !!user;
  
  const createEmbeddedWallet = useCallback(async () => {
    if (!authenticated || embeddedWallet || !createWallet) return;
    
    setIsConnecting(true);
    try {
      await createWallet();
      setSelectedWalletType('embedded');
      Alert.alert('Success', 'Embedded Solana wallet created!');
    } catch (error) {
      console.error('Error creating wallet:', error);
      Alert.alert('Error', 'Failed to create wallet. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  }, [authenticated, embeddedWallet, createWallet]);

  const connectExternalSolanaWallet = useCallback(async () => {
    if (!authenticated) return;
    
    setIsConnecting(true);
    try {
      await externalWalletHook.connectPhantom();
      if (externalWalletHook.isConnected) {
        setSelectedWalletType('external');
      }
    } catch (error) {
      console.error('Error connecting external wallet:', error);
      Alert.alert('Error', 'Failed to connect external wallet. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  }, [authenticated, externalWalletHook]);

  const signMessage = useCallback(async (message: string): Promise<string | null> => {
    if (!activeWallet) {
      Alert.alert('Error', 'No wallet available');
      return null;
    }

    try {
      if (selectedWalletType === 'external') {
        return await externalWalletHook.signMessage(message);
      } else {
        // Embedded wallet signing - check if it has signMessage method
        if ('signMessage' in activeWallet && typeof activeWallet.signMessage === 'function') {
          const messageBytes = new TextEncoder().encode(message);
          const result = await activeWallet.signMessage(messageBytes);
          return Buffer.from(result).toString('base64');
        } else {
          throw new Error('Wallet does not support message signing');
        }
      }
    } catch (error) {
      console.error('Error signing message:', error);
      Alert.alert('Error', 'Failed to sign message');
      return null;
    }
  }, [activeWallet, selectedWalletType, externalWalletHook]);

  const signAndSendTransaction = useCallback(async (transaction: any): Promise<string | null> => {
    if (!activeWallet || !connection) {
      Alert.alert('Error', 'No wallet or connection available');
      return null;
    }

    try {
      if (selectedWalletType === 'external') {
        return await externalWalletHook.signAndSendTransaction(transaction);
      } else {
        // Embedded wallet transaction - check if it has signTransaction method
        if ('signTransaction' in activeWallet && typeof activeWallet.signTransaction === 'function') {
          const signedTransaction = await activeWallet.signTransaction(transaction);
          const signature = await connection.sendRawTransaction(signedTransaction.serialize());
          return signature;
        } else {
          throw new Error('Wallet does not support transaction signing');
        }
      }
    } catch (error) {
      console.error('Error sending transaction:', error);
      Alert.alert('Error', 'Failed to send transaction');
      return null;
    }
  }, [activeWallet, connection, selectedWalletType, externalWalletHook]);

  const getBalance = useCallback(async (): Promise<number> => {
    if (selectedWalletType === 'external') {
      return await externalWalletHook.getBalance();
    } else if (connection && walletAddress) {
      try {
        const publicKey = new PublicKey(walletAddress);
        const balance = await connection.getBalance(publicKey);
        return balance / 1e9; // Convert lamports to SOL
      } catch (error) {
        console.error('Error getting balance:', error);
        return 0;
      }
    }
    return 0;
  }, [connection, walletAddress, selectedWalletType, externalWalletHook]);

  const getTransactionHistory = useCallback(async (limit: number = 10): Promise<any[]> => {
    if (selectedWalletType === 'external') {
      return await externalWalletHook.getTransactionHistory(limit);
    } else if (connection && walletAddress) {
      try {
        const publicKey = new PublicKey(walletAddress);
        const signatures = await connection.getSignaturesForAddress(publicKey, { limit });
        
        const transactions = await Promise.all(
          signatures.map(async (sig) => {
            try {
              const tx = await connection.getTransaction(sig.signature, {
                maxSupportedTransactionVersion: 0
              });
              return {
                signature: sig.signature,
                blockTime: sig.blockTime,
                slot: sig.slot,
                confirmationStatus: sig.confirmationStatus,
                transaction: tx,
                err: sig.err,
              };
            } catch (error) {
              console.error('Error fetching transaction:', error);
              return {
                signature: sig.signature,
                blockTime: sig.blockTime,
                slot: sig.slot,
                confirmationStatus: sig.confirmationStatus,
                err: sig.err,
              };
            }
          })
        );
        
        return transactions;
      } catch (error) {
        console.error('Error getting transaction history:', error);
        return [];
      }
    }
    return [];
  }, [connection, walletAddress, selectedWalletType, externalWalletHook]);

  const disconnectWallet = useCallback(async () => {
    try {
      await logout();
      Alert.alert('Success', 'Wallet disconnected');
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
      Alert.alert('Error', 'Failed to disconnect wallet');
    }
  }, [logout]);

  return {
    // Wallet state
    wallet: activeWallet,
    walletAddress: walletAddress || null,
    isConnected: (!!activeWallet && authenticated) || externalWalletHook.isConnected,
    isConnecting: isConnecting || externalWalletHook.isConnecting,
    authenticated: authenticated || false,
    user,
    connection,
    selectedWalletType,
    embeddedWallet,
    externalWallet,
    
    // External wallet specific
    isPhantomAvailable: externalWalletHook.isPhantomAvailable,
    
    // Wallet actions
    createEmbeddedWallet,
    connectExternalSolanaWallet,
    signMessage,
    signAndSendTransaction,
    getBalance,
    getTransactionHistory,
    disconnect: disconnectWallet,
    disconnectExternalWallet: externalWalletHook.disconnect,
    setSelectedWalletType,
    
    // Legacy compatibility
    connect: createEmbeddedWallet,
    connectWallet: async () => {}, // Legacy compatibility
    disconnectWallet,
    availableWallets: ['Embedded Wallet', 'Phantom Wallet'],
    showWalletModal: false,
    setShowWalletModal: () => {},
  };
}