import { createContext, useContext, ReactNode } from 'react';
import { usePrivySolanaWallet } from '@/hooks/usePrivySolanaWallet';
import type { WalletContextType } from '@/types/wallet';

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const walletState = usePrivySolanaWallet();

  return (
    <WalletContext.Provider value={walletState}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
} 