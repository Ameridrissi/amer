import { useQuery } from "@tanstack/react-query";
import { BalanceCard } from "@/components/balance-card";
import { QuickStats } from "@/components/quick-stats";
import { TransactionList } from "@/components/transaction-list";
import { SpendingInsights } from "@/components/spending-insights";
import { ShoppingBag, Utensils, Car, Zap, Coffee } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Transaction {
  id: string;
  type: "send" | "receive";
  amount: string;
  counterparty: string | null;
  description: string | null;
  category: string | null;
  status: "completed" | "pending" | "failed";
  timestamp: string;
}

interface Wallet {
  id: string;
  address: string;
  balance: string;
  name: string;
}

interface SpendingAnalysis {
  categories: Array<{
    name: string;
    amount: string;
    percentage: number;
  }>;
  recommendations: Array<{
    title: string;
    description: string;
    action?: string;
  }>;
  totalSpent: string;
}

// Get first wallet for the demo user
async function getWallet(): Promise<Wallet> {
  const response = await fetch("/api/wallets/user/demo-user");
  if (!response.ok) throw new Error("Failed to fetch wallet");
  const wallets = await response.json();
  return wallets[0];
}

async function getTransactions(walletId: string): Promise<Transaction[]> {
  const response = await fetch(`/api/transactions/wallet/${walletId}`);
  if (!response.ok) throw new Error("Failed to fetch transactions");
  return response.json();
}

async function getInsights(walletId: string): Promise<SpendingAnalysis> {
  const response = await fetch(`/api/insights/wallet/${walletId}`);
  if (!response.ok) throw new Error("Failed to fetch insights");
  return response.json();
}

export default function DashboardConnected() {
  const { data: wallet, isLoading: walletLoading } = useQuery({
    queryKey: ["/api/wallets/user/demo-user"],
    queryFn: getWallet,
  });

  const { data: transactions = [], isLoading: transactionsLoading } = useQuery({
    queryKey: ["/api/transactions", wallet?.id],
    queryFn: () => getTransactions(wallet!.id),
    enabled: !!wallet?.id,
  });

  const { data: insights } = useQuery({
    queryKey: ["/api/insights", wallet?.id],
    queryFn: () => getInsights(wallet!.id),
    enabled: !!wallet?.id,
  });

  if (walletLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading wallet...</div>
      </div>
    );
  }

  if (!wallet) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">No wallet found</div>
      </div>
    );
  }

  // Format transactions for display
  const formattedTransactions = transactions.slice(0, 5).map((tx) => ({
    id: tx.id,
    type: tx.type,
    amount: tx.amount,
    counterparty: tx.description || tx.counterparty || "Unknown",
    timestamp: formatDistanceToNow(new Date(tx.timestamp), { addSuffix: true }),
    status: tx.status,
    category: tx.category || undefined,
  }));

  // Calculate stats
  const totalSpent = transactions
    .filter((tx) => tx.type === "send")
    .reduce((sum, tx) => sum + parseFloat(tx.amount), 0);

  const totalReceived = transactions
    .filter((tx) => tx.type === "receive")
    .reduce((sum, tx) => sum + parseFloat(tx.amount), 0);

  const mockCategories = insights?.categories.map((cat) => ({
    ...cat,
    icon: getCategoryIcon(cat.name),
  })) || [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
        <p className="text-muted-foreground">
          Here's what's happening with your wallet today.
        </p>
      </div>

      <BalanceCard
        balance={parseFloat(wallet.balance).toLocaleString()}
        usdValue={parseFloat(wallet.balance).toLocaleString()}
        walletAddress={wallet.address}
        onSend={() => console.log("Send clicked")}
        onReceive={() => console.log("Receive clicked")}
        onBuy={() => console.log("Buy clicked")}
      />

      <QuickStats
        stats={{
          monthlySpent: `$${totalSpent.toFixed(2)}`,
          monthlyChange: "+12%",
          monthlyChangeType: "positive",
          transactionCount: transactions.length.toString(),
          transactionChange: `+${transactions.filter(tx => tx.type === "receive").length}`,
          transactionChangeType: "positive",
          avgTransaction: `$${(totalSpent / Math.max(1, transactions.filter(tx => tx.type === "send").length)).toFixed(2)}`,
          savingsRate: "18%",
        }}
      />

      <div className="grid lg:grid-cols-2 gap-6">
        <TransactionList
          transactions={formattedTransactions}
          onTransactionClick={(id) => console.log("Transaction clicked:", id)}
        />
        <SpendingInsights
          categories={mockCategories}
          recommendations={(insights?.recommendations || []).map((rec, i) => ({
            id: `rec-${i}`,
            ...rec,
          }))}
          onDismissRecommendation={(id) => console.log("Dismissed:", id)}
        />
      </div>
    </div>
  );
}

function getCategoryIcon(category: string) {
  switch (category.toLowerCase()) {
    case "shopping":
      return <ShoppingBag className="h-4 w-4" />;
    case "food":
    case "food & dining":
      return <Utensils className="h-4 w-4" />;
    case "transportation":
      return <Car className="h-4 w-4" />;
    case "utilities":
      return <Zap className="h-4 w-4" />;
    case "entertainment":
      return <Coffee className="h-4 w-4" />;
    default:
      return <ShoppingBag className="h-4 w-4" />;
  }
}
