import { useState, useCallback, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { SolanaWallet, WalletProvider } from '@/types/wallet';

export function useWalletConnection() {
  const [wallet, setWallet] = useState<SolanaWallet | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [availableWallets, setAvailableWallets] = useState<WalletProvider[]>(['Phantom', 'Solflare', 'Backpack']);
  const [showWalletModal, setShowWalletModal] = useState(false);

  useEffect(() => {
    // For React Native, we'll simulate available wallets
    // In a real implementation, you'd integrate with React Native wallet libraries
    setAvailableWallets(['Phantom', 'Solflare', 'Backpack']);
  }, []);

  const connectWallet = useCallback(async (walletName: WalletProvider) => {
    if (isConnecting) return;
    
    setIsConnecting(true);
    setShowWalletModal(false);
    
    try {
      // For React Native demo, simulate wallet connection
      // In a real implementation, you'd use:
      // - @solana/mobile-wallet-adapter-protocol
      // - @solana/wallet-adapter-mobile
      // - or specific wallet SDKs
      
      // Simulate connection delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate a mock public key for demo purposes
      const mockPublicKey = 'BvZkVxTJQ7q4Zm4F8H6K7F5M2N8P9R1S3T4U6V7W8X9Y1Z2A3B4C5D6E7F8G9H1J2';
      
      // Create a mock wallet object
      const mockWallet: SolanaWallet = {
        publicKey: {
          toString: () => mockPublicKey,
          toBase58: () => mockPublicKey,
        } as any,
        connect: async () => {},
        disconnect: async () => {},
        isConnected: true,
      };
      
      setWallet(mockWallet);
      setWalletAddress(mockPublicKey);
      
      // Store wallet preference
      await AsyncStorage.setItem('selectedWallet', walletName);
      await AsyncStorage.setItem('walletAddress', mockPublicKey);
      
      Alert.alert('Success', `Connected to ${walletName} wallet!`);
      
    } catch (error) {
      console.error('Wallet connection error:', error);
      Alert.alert('Error', `Failed to connect to ${walletName}. Please try again.`);
    } finally {
      setIsConnecting(false);
    }
  }, [isConnecting]);

  const disconnectWallet = useCallback(async () => {
    if (!wallet) return;
    
    try {
      setWallet(null);
      setWalletAddress(null);
      
      // Clear stored wallet data
      await AsyncStorage.removeItem('selectedWallet');
      await AsyncStorage.removeItem('walletAddress');
      
      Alert.alert('Success', 'Wallet disconnected');
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
      Alert.alert('Error', 'Failed to disconnect wallet');
    }
  }, [wallet]);

  useEffect(() => {
    const autoReconnect = async () => {
      try {
        const savedWalletName = await AsyncStorage.getItem('selectedWallet');
        const savedWalletAddress = await AsyncStorage.getItem('walletAddress');
        
        if (savedWalletName && savedWalletAddress) {
          // Create a mock wallet object for auto-reconnection
          const mockWallet: SolanaWallet = {
            publicKey: {
              toString: () => savedWalletAddress,
              toBase58: () => savedWalletAddress,
            } as any,
            connect: async () => {},
            disconnect: async () => {},
            isConnected: true,
          };
          
          setWallet(mockWallet);
          setWalletAddress(savedWalletAddress);
        }
      } catch (error) {
        console.error('Auto-reconnect error:', error);
      }
    };

    autoReconnect();
  }, []);

  return {
    wallet,
    walletAddress,
    isConnecting,
    isConnected: !!wallet,
    availableWallets,
    connectWallet,
    connect: () => setShowWalletModal(true),
    disconnect: disconnectWallet,
    disconnectWallet,
    showWalletModal,
    setShowWalletModal,
  };
} 