import { BalanceCard } from "../balance-card";

export default function BalanceCardExample() {
  return (
    <BalanceCard
      balance="1,245.50"
      usdValue="1,245.50"
      walletAddress="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
      onSend={() => console.log("Send clicked")}
      onReceive={() => console.log("Receive clicked")}
      onBuy={() => console.log("Buy clicked")}
    />
  );
}
