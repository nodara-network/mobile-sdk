import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useWallet } from '@/contexts/WalletContext';

interface Transaction {
  signature: string;
  blockTime: number | null;
  slot: number;
  confirmationStatus: string;
  err: any;
  transaction?: any;
}

export default function TransactionHistory() {
  const { walletAddress, getTransactionHistory, authenticated } = useWallet();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadTransactions = async (isRefresh = false) => {
    if (!walletAddress || !getTransactionHistory) return;

    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const txs = await getTransactionHistory(20);
      setTransactions(txs);
    } catch (error) {
      console.error('Error loading transactions:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (walletAddress) {
      loadTransactions();
    }
  }, [walletAddress]);

  const formatDate = (timestamp: number | null) => {
    if (!timestamp) return 'Unknown';
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatSignature = (signature: string) => {
    return `${signature.slice(0, 8)}...${signature.slice(-8)}`;
  };

  const getTransactionType = (tx: Transaction) => {
    if (tx.err) return 'Failed';
    return 'Success';
  };

  const getTransactionIcon = (tx: Transaction) => {
    if (tx.err) return 'close-circle';
    return 'checkmark-circle';
  };

  const getTransactionColor = (tx: Transaction) => {
    if (tx.err) return '#ef4444';
    return '#10b981';
  };

  if (!authenticated || !walletAddress) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Transaction History</Text>
        <Text style={styles.subtitle}>Connect your wallet to view transactions</Text>
      </View>
    );
  }

  if (loading && transactions.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Transaction History</Text>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#22d3ee" />
          <Text style={styles.loadingText}>Loading transactions...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Transaction History</Text>
        <TouchableOpacity onPress={() => loadTransactions()} disabled={loading}>
          <Ionicons 
            name="refresh-outline" 
            size={24} 
            color={loading ? "#6b7280" : "#22d3ee"} 
          />
        </TouchableOpacity>
      </View>

      {transactions.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="receipt-outline" size={48} color="#6b7280" />
          <Text style={styles.emptyText}>No transactions found</Text>
          <Text style={styles.emptySubtext}>
            Your transaction history will appear here
          </Text>
        </View>
      ) : (
        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => loadTransactions(true)}
              tintColor="#22d3ee"
            />
          }
          showsVerticalScrollIndicator={false}
        >
          {transactions.map((tx, index) => (
            <TouchableOpacity
              key={tx.signature}
              style={styles.transactionItem}
              onPress={() => {
                // In a real app, you could open Solana Explorer
                console.log(`https://explorer.solana.com/tx/${tx.signature}`);
              }}
            >
              <View style={styles.transactionIcon}>
                <Ionicons
                  name={getTransactionIcon(tx)}
                  size={20}
                  color={getTransactionColor(tx)}
                />
              </View>
              
              <View style={styles.transactionContent}>
                <View style={styles.transactionHeader}>
                  <Text style={styles.transactionType}>
                    {getTransactionType(tx)}
                  </Text>
                  <Text style={styles.transactionDate}>
                    {formatDate(tx.blockTime)}
                  </Text>
                </View>
                
                <Text style={styles.transactionSignature}>
                  {formatSignature(tx.signature)}
                </Text>
                
                <View style={styles.transactionFooter}>
                  <Text style={styles.slotText}>Slot: {tx.slot}</Text>
                  <Text style={[
                    styles.statusText,
                    { color: getTransactionColor(tx) }
                  ]}>
                    {tx.confirmationStatus}
                  </Text>
                </View>
              </View>
              
              <Ionicons name="chevron-forward" size={16} color="#6b7280" />
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#9ca3af',
    textAlign: 'center',
    marginTop: 20,
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  loadingText: {
    color: '#9ca3af',
    marginTop: 16,
    fontSize: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 8,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(17, 24, 39, 0.6)',
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(34, 211, 238, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  transactionContent: {
    flex: 1,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  transactionType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  transactionDate: {
    fontSize: 12,
    color: '#9ca3af',
  },
  transactionSignature: {
    fontSize: 14,
    color: '#22d3ee',
    fontFamily: 'monospace',
    marginBottom: 8,
  },
  transactionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  slotText: {
    fontSize: 12,
    color: '#6b7280',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
});