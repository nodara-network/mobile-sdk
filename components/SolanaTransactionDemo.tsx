import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useWallet } from '@/contexts/WalletContext';
import { PublicKey, SystemProgram, Transaction } from '@solana/web3.js';

export default function SolanaTransactionDemo() {
  const {
    wallet,
    walletAddress,
    authenticated,
    connection,
    signMessage,
    signAndSendTransaction,
  } = useWallet();

  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('Hello from Privy + Solana!');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSignMessage = async () => {
    if (!message.trim()) {
      Alert.alert('Error', 'Please enter a message to sign');
      return;
    }

    setIsProcessing(true);
    try {
      const signature = signMessage ? await signMessage(message) : null;
      if (signature) {
        Alert.alert(
          'Message Signed!',
          `Signature: ${signature.slice(0, 20)}...`,
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Sign message error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSendTransaction = async () => {
    if (!recipient.trim() || !amount.trim()) {
      Alert.alert('Error', 'Please enter recipient address and amount');
      return;
    }

    if (!connection || !walletAddress) {
      Alert.alert('Error', 'Wallet not connected');
      return;
    }

    setIsProcessing(true);
    try {
      // Validate recipient address
      let recipientPubkey;
      try {
        recipientPubkey = new PublicKey(recipient);
      } catch {
        Alert.alert('Error', 'Invalid recipient address');
        return;
      }

      // Convert SOL to lamports
      const lamports = Math.floor(parseFloat(amount) * 1e9);
      if (lamports <= 0) {
        Alert.alert('Error', 'Invalid amount');
        return;
      }

      // Create transaction
      const senderPubkey = new PublicKey(walletAddress);
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: senderPubkey,
          toPubkey: recipientPubkey,
          lamports,
        })
      );

      // Get recent blockhash
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = senderPubkey;

      // Sign and send transaction
      const signature = signAndSendTransaction ? await signAndSendTransaction(transaction) : null;
      if (signature) {
        Alert.alert(
          'Transaction Sent!',
          `Signature: ${signature.slice(0, 20)}...\n\nView on Solana Explorer?`,
          [
            { text: 'Cancel' },
            { 
              text: 'View', 
              onPress: () => {
                // In a real app, you would open the browser to the explorer
                console.log(`https://explorer.solana.com/tx/${signature}?cluster=devnet`);
              }
            }
          ]
        );
        setRecipient('');
        setAmount('');
      }
    } catch (error) {
      console.error('Transaction error:', error);
      Alert.alert('Error', 'Failed to send transaction');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!authenticated || !wallet) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Solana Transactions</Text>
        <Text style={styles.subtitle}>
          Please sign in and create a wallet to use this feature
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Solana Transactions</Text>
      <Text style={styles.subtitle}>Test signing messages and sending transactions</Text>

      {/* Message Signing Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sign Message</Text>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Enter message to sign"
          placeholderTextColor="#9ca3af"
          multiline
        />
        <TouchableOpacity
          style={[styles.button, isProcessing && styles.buttonDisabled]}
          onPress={handleSignMessage}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <ActivityIndicator size="small" color="#0f172a" />
          ) : (
            <>
              <Ionicons name="create-outline" size={20} color="#0f172a" />
              <Text style={styles.buttonText}>Sign Message</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* Transaction Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Send Transaction</Text>
        <TextInput
          style={styles.input}
          value={recipient}
          onChangeText={setRecipient}
          placeholder="Recipient address"
          placeholderTextColor="#9ca3af"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          placeholder="Amount (SOL)"
          placeholderTextColor="#9ca3af"
          keyboardType="decimal-pad"
        />
        <TouchableOpacity
          style={[styles.button, styles.sendButton, isProcessing && styles.buttonDisabled]}
          onPress={handleSendTransaction}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <>
              <Ionicons name="send-outline" size={20} color="#fff" />
              <Text style={[styles.buttonText, styles.sendButtonText]}>Send Transaction</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      <Text style={styles.note}>
        💡 Note: This demo uses Solana Devnet. Test tokens have no real value.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#9ca3af',
    marginBottom: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#22d3ee',
    marginBottom: 16,
  },
  input: {
    backgroundColor: 'rgba(17, 24, 39, 0.6)',
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#fff',
    fontSize: 16,
    marginBottom: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#22d3ee',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 8,
  },
  sendButton: {
    backgroundColor: '#10b981',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '600',
  },
  sendButtonText: {
    color: '#fff',
  },
  note: {
    fontSize: 14,
    color: '#6b7280',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 20,
  },
});