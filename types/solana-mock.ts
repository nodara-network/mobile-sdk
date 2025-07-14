// Mock Solana web3.js types for React Native development
// In production, you would install @solana/web3.js or use appropriate mobile SDKs

export interface PublicKey {
  toString(): string;
  toBase58(): string;
}

export interface Transaction {
  // Mock transaction interface
  signatures: string[];
  message: any;
}

// Mock classes for development
export class MockPublicKey implements PublicKey {
  constructor(private key: string) {}
  
  toString(): string {
    return this.key;
  }
  
  toBase58(): string {
    return this.key;
  }
}

export class MockTransaction implements Transaction {
  signatures: string[] = [];
  message: any = {};
}