import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useWallet } from '@/contexts/WalletContext';

interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'swap';
  amount: number;
  token: string;
  timestamp: Date;
  status: 'pending' | 'confirmed' | 'failed';
  hash?: string;
  recipient?: string;
}

interface Balance {
  SOL: number;
  [key: string]: number;
}

export default function WalletConnect() {
  const { 
    isConnected, 
    walletAddress, 
    isConnecting, 
    connect, 
    disconnect 
  } = useWallet();
  
  const [balance, setBalance] = useState<Balance>({ SOL: 0 });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);
  const [showTransactionHistory, setShowTransactionHistory] = useState(false);

  // Mock balance fetching - replace with actual API calls
  const fetchBalance = useCallback(async () => {
    if (!isConnected) return;
    
    setIsLoadingBalance(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setBalance({ SOL: 2.45, USDC: 150.75 });
    } catch (error) {
      console.error('Error fetching balance:', error);
    } finally {
      setIsLoadingBalance(false);
    }
  }, [isConnected]);

  // Mock transaction history - replace with actual API calls
  const fetchTransactions = useCallback(async () => {
    if (!isConnected) return;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      const mockTransactions: Transaction[] = [
        {
          id: '1',
          type: 'receive',
          amount: 0.5,
          token: 'SOL',
          timestamp: new Date(Date.now() - 3600000),
          status: 'confirmed',
          hash: '0x123...abc'
        },
        {
          id: '2',
          type: 'send',
          amount: 0.1,
          token: 'SOL',
          timestamp: new Date(Date.now() - 7200000),
          status: 'confirmed',
          hash: '0x456...def',
          recipient: '0x789...ghi'
        },
        {
          id: '3',
          type: 'swap',
          amount: 50,
          token: 'USDC',
          timestamp: new Date(Date.now() - 10800000),
          status: 'pending'
        }
      ];
      setTransactions(mockTransactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  }, [isConnected]);

  useEffect(() => {
    if (isConnected) {
      fetchBalance();
      fetchTransactions();
    }
  }, [isConnected, fetchBalance, fetchTransactions]);

  const handleQuickAction = useCallback((action: 'send' | 'receive' | 'swap') => {
    Alert.alert('Quick Action', `${action} functionality coming soon!`);
  }, []);

  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'confirmed':
        return <Ionicons name="checkmark-circle" size={16} color="#10b981" />;
      case 'pending':
        return <Ionicons name="time" size={16} color="#f59e0b" />;
      case 'failed':
        return <Ionicons name="close-circle" size={16} color="#ef4444" />;
      default:
        return <Ionicons name="alert-circle" size={16} color="#6b7280" />;
    }
  };

  const getTypeIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'send':
        return <Ionicons name="arrow-up" size={16} color="#ef4444" />;
      case 'receive':
        return <Ionicons name="arrow-down" size={16} color="#10b981" />;
      case 'swap':
        return <Ionicons name="swap-horizontal" size={16} color="#3b82f6" />;
      default:
        return <Ionicons name="help-circle" size={16} color="#6b7280" />;
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  if (!isConnected) {
    return (
      <View style={styles.connectContainer}>
        <View style={styles.connectCard}>
          <Ionicons name="wallet-outline" size={48} color="#9ca3af" style={styles.walletIcon} />
          <Text style={styles.connectTitle}>Connect Your Wallet</Text>
          <Text style={styles.connectSubtitle}>
            Connect your Solana wallet to view your balance and transaction history
          </Text>
          <TouchableOpacity
            onPress={connect}
            disabled={isConnecting}
            style={[styles.connectButton, isConnecting && styles.connectButtonDisabled]}
          >
            {isConnecting ? (
              <ActivityIndicator size="small" color="#111827" />
            ) : (
              <Text style={styles.connectButtonText}>Connect Wallet</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Balance Display */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Wallet Balance</Text>
          <View style={styles.addressContainer}>
            <View style={styles.statusDot} />
            <Text style={styles.addressText}>{formatAddress(walletAddress!)}</Text>
          </View>
        </View>

        <View style={styles.balanceList}>
          {Object.entries(balance).map(([token, amount]) => (
            <View key={token} style={styles.balanceItem}>
              <View style={styles.balanceLeft}>
                <View style={styles.tokenIcon}>
                  <Text style={styles.tokenIconText}>{token}</Text>
                </View>
                <View>
                  <Text style={styles.tokenName}>{token}</Text>
                  <Text style={styles.tokenAmount}>
                    {isLoadingBalance ? 'Loading...' : `${amount.toFixed(4)}`}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={fetchBalance}
                disabled={isLoadingBalance}
                style={[styles.refreshButton, isLoadingBalance && styles.refreshButtonDisabled]}
              >
                <Text style={styles.refreshButtonText}>Refresh</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity
            onPress={() => handleQuickAction('send')}
            style={[styles.actionButton, styles.sendButton]}
          >
            <Ionicons name="arrow-up" size={24} color="#dc2626" />
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => handleQuickAction('receive')}
            style={[styles.actionButton, styles.receiveButton]}
          >
            <Ionicons name="arrow-down" size={24} color="#059669" />
            <Text style={styles.receiveButtonText}>Receive</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => handleQuickAction('swap')}
            style={[styles.actionButton, styles.swapButton]}
          >
            <Ionicons name="swap-horizontal" size={24} color="#2563eb" />
            <Text style={styles.swapButtonText}>Swap</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Transaction History */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Recent Transactions</Text>
          <TouchableOpacity
            onPress={() => setShowTransactionHistory(!showTransactionHistory)}
          >
            <Text style={styles.viewAllText}>
              {showTransactionHistory ? 'Hide' : 'View All'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.transactionsList}>
          {transactions.slice(0, showTransactionHistory ? undefined : 3).map((tx) => (
            <View key={tx.id} style={styles.transactionItem}>
              <View style={styles.transactionLeft}>
                <View style={styles.transactionIcons}>
                  {getTypeIcon(tx.type)}
                  {getStatusIcon(tx.status)}
                </View>
                <View>
                  <Text style={styles.transactionType}>{tx.type}</Text>
                  <Text style={styles.transactionTime}>
                    {tx.timestamp.toLocaleDateString()} {tx.timestamp.toLocaleTimeString()}
                  </Text>
                </View>
              </View>
              <View style={styles.transactionRight}>
                <Text style={[
                  styles.transactionAmount,
                  tx.type === 'receive' ? styles.receiveAmount : 
                  tx.type === 'send' ? styles.sendAmount : 
                  styles.swapAmount
                ]}>
                  {tx.type === 'send' ? '-' : '+'}{tx.amount} {tx.token}
                </Text>
                <Text style={styles.transactionStatus}>{tx.status}</Text>
              </View>
            </View>
          ))}
        </View>

        {transactions.length === 0 && (
          <View style={styles.emptyTransactions}>
            <Ionicons name="time" size={48} color="#9ca3af" />
            <Text style={styles.emptyTransactionsText}>No transactions yet</Text>
          </View>
        )}
      </View>

      {/* Disconnect Button */}
      <View style={styles.disconnectContainer}>
        <TouchableOpacity onPress={disconnect}>
          <Text style={styles.disconnectText}>Disconnect Wallet</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  connectContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  connectCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
  },
  walletIcon: {
    marginBottom: 16,
  },
  connectTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 8,
  },
  connectSubtitle: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
    marginBottom: 24,
  },
  connectButton: {
    backgroundColor: '#22d3ee',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  connectButtonDisabled: {
    backgroundColor: '#164e63',
  },
  connectButtonText: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '600',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    backgroundColor: '#10b981',
    borderRadius: 4,
  },
  addressText: {
    fontSize: 12,
    color: '#9ca3af',
  },
  balanceList: {
    gap: 12,
  },
  balanceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
  },
  balanceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  tokenIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#22d3ee',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tokenIconText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  tokenName: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  tokenAmount: {
    fontSize: 12,
    color: '#9ca3af',
  },
  refreshButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  refreshButtonDisabled: {
    opacity: 0.5,
  },
  refreshButtonText: {
    color: '#22d3ee',
    fontSize: 12,
    fontWeight: '500',
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
  },
  sendButton: {
    backgroundColor: 'rgba(220, 38, 38, 0.1)',
  },
  receiveButton: {
    backgroundColor: 'rgba(5, 150, 105, 0.1)',
  },
  swapButton: {
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
  },
  sendButtonText: {
    color: '#dc2626',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
  },
  receiveButtonText: {
    color: '#059669',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
  },
  swapButtonText: {
    color: '#2563eb',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
  },
  viewAllText: {
    color: '#22d3ee',
    fontSize: 12,
    fontWeight: '500',
  },
  transactionsList: {
    gap: 12,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  transactionIcons: {
    flexDirection: 'row',
    gap: 4,
  },
  transactionType: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    textTransform: 'capitalize',
  },
  transactionTime: {
    fontSize: 12,
    color: '#9ca3af',
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: '600',
  },
  receiveAmount: {
    color: '#10b981',
  },
  sendAmount: {
    color: '#dc2626',
  },
  swapAmount: {
    color: '#2563eb',
  },
  transactionStatus: {
    fontSize: 10,
    color: '#9ca3af',
    textTransform: 'capitalize',
  },
  emptyTransactions: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyTransactionsText: {
    color: '#9ca3af',
    marginTop: 16,
  },
  disconnectContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  disconnectText: {
    color: '#dc2626',
    fontSize: 14,
    fontWeight: '500',
  },
});