import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useWallet } from '@/contexts/WalletContext';
import type { WalletProvider } from '@/types/wallet';

const { width, height } = Dimensions.get('window');

export default function WalletModal() {
  const {
    showWalletModal,
    setShowWalletModal,
    availableWallets,
    connectWallet,
    isConnecting,
  } = useWallet();

  const handleWalletSelect = async (walletName: WalletProvider) => {
    try {
      await connectWallet(walletName);
    } catch (error) {
      console.error('Wallet connection failed:', error);
    }
  };

  const walletInfo = {
    Phantom: {
      name: 'Phantom',
      icon: 'wallet-outline',
      description: 'Connect using Phantom wallet',
      color: '#6f42c1',
    },
    Solflare: {
      name: 'Solflare',
      icon: 'flame-outline',
      description: 'Connect using Solflare wallet',
      color: '#ff6b35',
    },
    Backpack: {
      name: 'Backpack',
      icon: 'bag-outline',
      description: 'Connect using Backpack wallet',
      color: '#22d3ee',
    },
  };

  return (
    <Modal
      visible={showWalletModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowWalletModal(false)}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Connect Wallet</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowWalletModal(false)}
            >
              <Ionicons name="close-outline" size={24} color="#64748b" />
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle}>
            Choose a wallet to connect to the Nodara Network
          </Text>

          <View style={styles.walletList}>
            {availableWallets.map((walletName) => {
              const wallet = walletInfo[walletName];
              return (
                <TouchableOpacity
                  key={walletName}
                  style={styles.walletOption}
                  onPress={() => handleWalletSelect(walletName)}
                  disabled={isConnecting}
                >
                  <View style={[styles.walletIcon, { backgroundColor: `${wallet.color}20` }]}>
                    <Ionicons
                      name={wallet.icon as keyof typeof Ionicons.glyphMap}
                      size={24}
                      color={wallet.color}
                    />
                  </View>
                  <View style={styles.walletInfo}>
                    <Text style={styles.walletName}>{wallet.name}</Text>
                    <Text style={styles.walletDescription}>{wallet.description}</Text>
                  </View>
                  {isConnecting ? (
                    <ActivityIndicator size="small" color="#22d3ee" />
                  ) : (
                    <Ionicons name="chevron-forward-outline" size={20} color="#64748b" />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              By connecting a wallet, you agree to the Nodara Network Terms of Service and Privacy Policy.
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#1e293b',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 24,
    paddingBottom: 40,
    paddingHorizontal: 24,
    maxHeight: height * 0.8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  closeButton: {
    padding: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 32,
    lineHeight: 24,
  },
  walletList: {
    gap: 16,
    marginBottom: 32,
  },
  walletOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
  },
  walletIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  walletInfo: {
    flex: 1,
  },
  walletName: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  walletDescription: {
    fontSize: 14,
    color: '#64748b',
  },
  footer: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  footerText: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 18,
  },
});