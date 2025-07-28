import type { PublicKey, Transaction } from './solana-mock';

export interface SolanaWallet {
  publicKey: PublicKey | null;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  signTransaction?: (transaction: Transaction) => Promise<Transaction>;
  signAllTransactions?: (transactions: Transaction[]) => Promise<Transaction[]>;
  isPhantom?: boolean;
  isConnected?: boolean;
}

export type WalletProvider = 'Phantom' | 'Solflare' | 'Backpack';

export interface WalletContextType {
  // Basic wallet state
  wallet: any;
  walletAddress: string | null;
  isConnecting: boolean;
  isConnected: boolean;
  availableWallets: string[];
  
  // Authentication state
  authenticated: boolean;
  user: any;
  connection: any;
  
  // Wallet management
  selectedWalletType?: 'embedded' | 'external';
  embeddedWallet?: any;
  externalWallet?: any;
  
  // External wallet specific
  isPhantomAvailable?: boolean;
  
  // Actions
  connect: () => void;
  disconnect: () => Promise<void>;
  disconnectExternalWallet?: () => Promise<void>;
  createEmbeddedWallet?: () => Promise<void>;
  connectExternalSolanaWallet?: () => Promise<void>;
  connectWallet: (walletName: WalletProvider) => Promise<void>;
  disconnectWallet: () => Promise<void>;
  setSelectedWalletType?: (type: 'embedded' | 'external') => void;
  
  // Blockchain operations
  getBalance?: () => Promise<number>;
  getTransactionHistory?: (limit?: number) => Promise<any[]>;
  signMessage?: (message: string) => Promise<string | null>;
  signAndSendTransaction?: (transaction: any) => Promise<string | null>;
  
  // UI state
  showWalletModal: boolean;
  setShowWalletModal: (show: boolean) => void;
}

// Wallet Service Types
export interface WalletBalance {
  SOL: number;
  USDC?: number;
  [key: string]: number | undefined;
}

export interface WalletTransaction {
  id: string;
  type: 'send' | 'receive' | 'swap' | 'payment' | 'refund';
  amount: number;
  token: string;
  timestamp: Date;
  status: 'pending' | 'confirmed' | 'failed';
  hash?: string;
  recipient?: string;
  sender?: string;
  fee?: number;
  description?: string;
}

export interface PaymentRequest {
  amount: number;
  token: string;
  recipient: string;
  description?: string;
  serviceId?: string;
}

export interface SwapRequest {
  fromToken: string;
  toToken: string;
  amount: number;
  slippage?: number;
}

export interface WalletStats {
  totalTransactions: number;
  totalVolume: number;
  averageTransactionValue: number;
  mostUsedToken: string;
  lastActivity: Date;
}

export interface SupportedToken {
  symbol: string;
  name: string;
  decimals: number;
  address: string;
}

export interface TokenPrice {
  price: number;
  change24h: number;
  marketCap: number;
}

export interface FeeEstimate {
  fee: number;
  estimatedTime: number;
}

export interface AddressValidation {
  isValid: boolean;
  type?: 'mainnet' | 'devnet';
}

export interface WalletActivity {
  date: string;
  transactions: number;
  volume: number;
}

export interface WalletContact {
  address: string;
  name?: string;
  lastUsed: Date;
}

export interface WalletPreferences {
  defaultToken: string;
  autoConfirm: boolean;
  notifications: boolean;
  theme: 'light' | 'dark' | 'auto';
}

export interface TransactionReceipt {
  transaction: WalletTransaction;
  receipt: {
    blockNumber: number;
    gasUsed: number;
    effectiveGasPrice: number;
    status: boolean;
  };
}

export interface ExportData {
  downloadUrl: string;
  expiresAt: Date;
}

export interface TransactionHistory {
  transactions: WalletTransaction[];
  total: number;
}

export interface TransactionResponse {
  transactionId: string;
  hash: string;
}

export interface SwapResponse extends TransactionResponse {
  expectedOutput: number;
}

// Type aliases
export type TransactionType = 'send' | 'receive' | 'swap' | 'payment' | 'refund';
export type TransactionStatus = 'pending' | 'confirmed' | 'failed';
export type TransactionAction = 'send' | 'swap';
export type ExportFormat = 'csv' | 'json' | 'pdf';
export type ThemePreference = 'light' | 'dark' | 'auto';
export type NetworkType = 'mainnet' | 'devnet';

// Note: Global window interface declarations are handled in useExternalWallet.ts
// to avoid conflicts with other type declarations 