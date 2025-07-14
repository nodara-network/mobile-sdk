import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useWallet } from '@/contexts/WalletContext';

export default function WalletButton() {
  const {
    wallet,
    walletAddress,
    isConnecting,
    setShowWalletModal,
    disconnectWallet,
  } = useWallet();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  if (wallet && walletAddress) {
    return (
      <TouchableOpacity style={styles.connectedButton} onPress={disconnectWallet}>
        <View style={styles.connectedContent}>
          <View style={styles.connectedIndicator} />
          <Text style={styles.connectedText}>{formatAddress(walletAddress)}</Text>
        </View>
        <Ionicons name="chevron-down-outline" size={16} color="#22d3ee" />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={styles.connectButton}
      onPress={() => setShowWalletModal(true)}
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
});