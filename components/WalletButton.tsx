import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useWallet } from '@/contexts/WalletContext';

export default function WalletButton() {
  const {
    wallet,
    walletAddress,
    isConnecting,
    authenticated,
    createEmbeddedWallet,
    connectExternalSolanaWallet,
    disconnect,
    disconnectExternalWallet,
    getBalance,
    selectedWalletType,
    embeddedWallet,
    externalWallet,
    isPhantomAvailable,
    setSelectedWalletType,
  } = useWallet();
  
  const [balance, setBalance] = useState<number>(0);
  const [loadingBalance, setLoadingBalance] = useState(false);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const loadBalance = async () => {
    if (walletAddress && getBalance) {
      setLoadingBalance(true);
      try {
        const bal = await getBalance();
        setBalance(bal);
      } catch (error) {
        console.error('Error loading balance:', error);
      } finally {
        setLoadingBalance(false);
      }
    }
  };

  useEffect(() => {
    if (walletAddress) {
      loadBalance();
    }
  }, [walletAddress]);

  const showWalletOptions = () => {
    if (!authenticated) return;

    const options = [];
    
    if (!embeddedWallet) {
      options.push({
        text: '🔐 Create Embedded Wallet',
        onPress: createEmbeddedWallet,
      });
    }
    
    if (!externalWallet && isPhantomAvailable) {
      options.push({
        text: '👻 Connect Phantom Wallet',
        onPress: connectExternalSolanaWallet,
      });
    } else if (!externalWallet && !isPhantomAvailable) {
      options.push({
        text: '👻 Install Phantom Wallet',
        onPress: connectExternalSolanaWallet, // This will show install prompt
      });
    }
    
    options.push({ text: 'Cancel', style: 'cancel' as const });

    Alert.alert('Choose Wallet Type', 'Select how you want to connect your wallet', options);
  };

  // If user is authenticated but no wallet exists, show wallet selection
  if (authenticated && !wallet) {
    return (
      <TouchableOpacity
        style={styles.createWalletButton}
        onPress={showWalletOptions}
        disabled={isConnecting}
      >
        {isConnecting ? (
          <ActivityIndicator size="small" color="#0f172a" />
        ) : (
          <>
            <Ionicons name="wallet-outline" size={20} color="#0f172a" />
            <Text style={styles.connectText}>Connect Wallet</Text>
          </>
        )}
      </TouchableOpacity>
    );
  }

  // If wallet exists and connected, show wallet info
  if (wallet && walletAddress) {
    const walletTypeText = selectedWalletType === 'embedded' ? '🔐 Embedded' : '👻 Phantom';
    
    return (
      <TouchableOpacity style={styles.connectedButton} onPress={() => {
        const switchWalletOptions: Array<{text: string, onPress: () => void}> = [];
        
        // Add switching options
        if (embeddedWallet && selectedWalletType !== 'embedded') {
          switchWalletOptions.push({
            text: '🔐 Switch to Embedded Wallet',
            onPress: () => setSelectedWalletType && setSelectedWalletType('embedded')
          });
        }
        
        if (externalWallet && selectedWalletType !== 'external') {
          switchWalletOptions.push({
            text: '👻 Switch to Phantom Wallet',
            onPress: () => setSelectedWalletType && setSelectedWalletType('external')
          });
        }

        // Add disconnect option for external wallet
        const disconnectOptions = [];
        if (selectedWalletType === 'external') {
          disconnectOptions.push({
            text: 'Disconnect Phantom',
            onPress: disconnectExternalWallet,
            style: 'destructive' as const
          });
        }

        Alert.alert(
          `${walletTypeText} Wallet`,
          `Address: ${walletAddress}\nBalance: ${balance.toFixed(4)} SOL`,
          [
            { text: 'Refresh Balance', onPress: loadBalance },
            ...switchWalletOptions,
            ...disconnectOptions,
            { text: 'Sign Out', onPress: disconnect, style: 'destructive' as const },
            { text: 'Cancel', style: 'cancel' as const }
          ]
        );
      }}>
        <View style={styles.connectedContent}>
          <View style={styles.connectedIndicator} />
          <View>
            <Text style={styles.connectedText}>{formatAddress(walletAddress)}</Text>
            <View style={styles.walletInfo}>
              {loadingBalance ? (
                <ActivityIndicator size="small" color="#22d3ee" />
              ) : (
                <Text style={styles.balanceText}>{balance.toFixed(4)} SOL</Text>
              )}
              <Text style={styles.walletTypeText}>{walletTypeText}</Text>
            </View>
          </View>
        </View>
        <Ionicons name="chevron-down-outline" size={16} color="#22d3ee" />
      </TouchableOpacity>
    );
  }

  // If not authenticated, show sign in message
  return (
    <View style={styles.signInPrompt}>
      <Text style={styles.signInText}>Sign in to access your wallet</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  connectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#22d3ee',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 8,
  },
  createWalletButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#22d3ee',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 8,
  },
  connectText: {
    color: '#0f172a',
    fontSize: 14,
    fontWeight: '600',
  },
  connectedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(34, 211, 238, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(34, 211, 238, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  connectedContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  connectedIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10b981',
  },
  connectedText: {
    color: '#22d3ee',
    fontSize: 14,
    fontWeight: '500',
  },
  walletInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  balanceText: {
    color: '#9ca3af',
    fontSize: 12,
    fontWeight: '400',
  },
  walletTypeText: {
    color: '#6b7280',
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'uppercase',
    backgroundColor: 'rgba(107, 114, 128, 0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  signInPrompt: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  signInText: {
    color: '#9ca3af',
    fontSize: 14,
    fontStyle: 'italic',
  },
});