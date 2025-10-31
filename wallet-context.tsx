import { createContext, useContext, ReactNode } from "react";

interface WalletContextType {
  walletId: string;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  // For demo, we use a hardcoded wallet ID
  // In production, this would come from authentication
  const walletId = "demo-wallet-id";

  return (
    <WalletContext.Provider value={{ walletId }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within WalletProvider");
  }
  return context;
}
