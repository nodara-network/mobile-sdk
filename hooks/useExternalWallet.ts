import { useState, useCallback, useEffect } from 'react';
import { Alert, Linking } from 'react-native';
import { Connection, PublicKey, Transaction } from '@solana/web3.js';

// External wallet interface
interface ExternalWallet {
  name: string;
  publicKey: PublicKey | null;
  connected: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  signMessage: (message: Uint8Array) => Promise<Uint8Array>;
}

// Phantom wallet interface
interface PhantomWallet {
  isPhantom: boolean;
  publicKey: PublicKey | null;
  isConnected: boolean;
  connect: (params?: { onlyIfTrusted?: boolean }) => Promise<{ publicKey: PublicKey }>;
  disconnect: () => Promise<void>;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>;
  signMessage: (message: Uint8Array, display?: string) => Promise<{ signature: Uint8Array; publicKey: PublicKey }>;
}

// Declare global phantom object
declare global {
  interface Window {
    phantom?: {
      solana?: PhantomWallet;
    };
    solana?: PhantomWallet;
  }
  
  var phantom: {
    solana?: PhantomWallet;
  } | undefined;
  
  var solana: PhantomWallet | undefined;
}

export function useExternalWallet() {
  const [wallet, setWallet] = useState<ExternalWallet | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [connection] = useState(() => new Connection('https://api.mainnet-beta.solana.com', 'confirmed'));

  // Check if Phantom is available
  const checkPhantomAvailability = useCallback(() => {
    try {
      if (typeof window !== 'undefined') {
        return !!(window.phantom?.solana || window.solana?.isPhantom);
      } else if (typeof global !== 'undefined') {
        return !!(global.phantom?.solana || global.solana?.isPhantom);
      }
    } catch (error) {
      console.log('Phantom availability check failed:', error);
    }
    return false;
  }, []);

  // Get Phantom wallet instance
  const getPhantomWallet = useCallback((): PhantomWallet | null => {
    try {
      if (typeof window !== 'undefined') {
        return window.phantom?.solana || (window.solana?.isPhantom ? window.solana : null);
      } else if (typeof global !== 'undefined') {
        return global.phantom?.solana || (global.solana?.isPhantom ? global.solana : null);
      }
    } catch (error) {
      console.log('Get Phantom wallet failed:', error);
    }
    return null;
  }, []);

  // Connect to Phantom wallet
  const connectPhantom = useCallback(async () => {
    if (connecting) return;

    setConnecting(true);
    try {
      const phantom = getPhantomWallet();
      
      if (!phantom) {
        // Phantom not installed, redirect to install
        Alert.alert(
          'Phantom Wallet Required',
          'Phantom wallet is not installed. Would you like to install it?',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Install',
              onPress: () => {
                Linking.openURL('https://phantom.app/download');
              },
            },
          ]
        );
        return;
      }

      const response = await phantom.connect();
      
      if (response.publicKey) {
        const externalWallet: ExternalWallet = {
          name: 'Phantom',
          publicKey: response.publicKey,
          connected: true,
          connect: async () => {
            await phantom.connect();
          },
          disconnect: async () => {
            await phantom.disconnect();
            setWallet(null);
          },
          signTransaction: async (transaction: Transaction) => {
            return await phantom.signTransaction(transaction);
          },
          signMessage: async (message: Uint8Array) => {
            const result = await phantom.signMessage(message);
            return result.signature;
          },
        };

        setWallet(externalWallet);
        Alert.alert('Success', 'Phantom wallet connected successfully!');
      }
    } catch (error) {
      console.error('Failed to connect to Phantom:', error);
      Alert.alert('Connection Failed', 'Failed to connect to Phantom wallet. Please try again.');
    } finally {
      setConnecting(false);
    }
  }, [connecting, getPhantomWallet]);

  // Disconnect wallet
  const disconnect = useCallback(async () => {
    if (wallet) {
      try {
        await wallet.disconnect();
        setWallet(null);
        Alert.alert('Disconnected', 'Wallet disconnected successfully');
      } catch (error) {
        console.error('Failed to disconnect wallet:', error);
        Alert.alert('Error', 'Failed to disconnect wallet');
      }
    }
  }, [wallet]);

  // Get wallet balance
  const getBalance = useCallback(async (): Promise<number> => {
    if (!wallet?.publicKey || !connection) return 0;

    try {
      const balance = await connection.getBalance(wallet.publicKey);
      return balance / 1e9; // Convert lamports to SOL
    } catch (error) {
      console.error('Error getting balance:', error);
      return 0;
    }
  }, [wallet, connection]);

  // Get transaction history
  const getTransactionHistory = useCallback(async (limit: number = 10) => {
    if (!wallet?.publicKey || !connection) return [];

    try {
      const signatures = await connection.getSignaturesForAddress(wallet.publicKey, { limit });
      
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
  }, [wallet, connection]);

  // Sign message
  const signMessage = useCallback(async (message: string): Promise<string | null> => {
    if (!wallet) {
      Alert.alert('Error', 'No wallet connected');
      return null;
    }

    try {
      const encodedMessage = new TextEncoder().encode(message);
      const signature = await wallet.signMessage(encodedMessage);
      return Buffer.from(signature).toString('hex');
    } catch (error) {
      console.error('Error signing message:', error);
      Alert.alert('Error', 'Failed to sign message');
      return null;
    }
  }, [wallet]);

  // Sign and send transaction
  const signAndSendTransaction = useCallback(async (transaction: Transaction): Promise<string | null> => {
    if (!wallet || !connection) {
      Alert.alert('Error', 'No wallet or connection available');
      return null;
    }

    try {
      const signedTransaction = await wallet.signTransaction(transaction);
      const signature = await connection.sendRawTransaction(signedTransaction.serialize());
      
      // Wait for confirmation
      await connection.confirmTransaction(signature);
      
      return signature;
    } catch (error) {
      console.error('Error sending transaction:', error);
      Alert.alert('Error', 'Failed to send transaction');
      return null;
    }
  }, [wallet, connection]);

  // Auto-connect on app start if previously connected
  useEffect(() => {
    const autoConnect = async () => {
      if (checkPhantomAvailability()) {
        const phantom = getPhantomWallet();
        if (phantom?.isConnected) {
          try {
            await connectPhantom();
          } catch (error) {
            console.error('Auto-connect failed:', error);
          }
        }
      }
    };

    autoConnect();
  }, [checkPhantomAvailability, getPhantomWallet, connectPhantom]);

  return {
    // Wallet state
    wallet,
    walletAddress: wallet?.publicKey?.toString() || null,
    isConnected: !!wallet?.connected,
    isConnecting: connecting,
    connection,
    
    // Wallet availability
    isPhantomAvailable: checkPhantomAvailability(),
    
    // Actions
    connectPhantom,
    disconnect,
    getBalance,
    getTransactionHistory,
    signMessage,
    signAndSendTransaction,
  };
}