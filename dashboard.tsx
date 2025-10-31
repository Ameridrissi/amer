import { BalanceCard } from "@/components/balance-card";
import { QuickStats } from "@/components/quick-stats";
import { TransactionList } from "@/components/transaction-list";
import { SpendingInsights } from "@/components/spending-insights";
import { ShoppingBag, Utensils, Car, Zap, Coffee } from "lucide-react";

export default function Dashboard() {
  // Mock data - will be replaced with real data later
  const mockTransactions = [
    {
      id: "1",
      type: "send" as const,
      amount: "50.00",
      counterparty: "Coffee Shop",
      timestamp: "2 hours ago",
      status: "completed" as const,
      category: "Food",
    },
    {
      id: "2",
      type: "receive" as const,
      amount: "125.50",
      counterparty: "Freelance Client",
      timestamp: "5 hours ago",
      status: "completed" as const,
      category: "Income",
    },
    {
      id: "3",
      type: "send" as const,
      amount: "30.25",
      counterparty: "Uber Ride",
      timestamp: "1 day ago",
      status: "pending" as const,
      category: "Transport",
    },
    {
      id: "4",
      type: "receive" as const,
      amount: "200.00",
      counterparty: "Salary Payment",
      timestamp: "2 days ago",
      status: "completed" as const,
    },
  ];

  const mockCategories = [
    {
      name: "Shopping",
      amount: "245.00",
      percentage: 35,
      icon: <ShoppingBag className="h-4 w-4" />,
    },
    {
      name: "Food & Dining",
      amount: "180.50",
      percentage: 25,
      icon: <Utensils className="h-4 w-4" />,
    },
    {
      name: "Transportation",
      amount: "120.00",
      percentage: 17,
      icon: <Car className="h-4 w-4" />,
    },
  ];

  const mockRecommendations = [
    {
      id: "1",
      title: "Save 15% on Shopping",
      description:
        "You've spent 35% more on shopping this month. Consider setting a budget limit.",
      action: "Set Budget",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
        <p className="text-muted-foreground">
          Here's what's happening with your wallet today.
        </p>
      </div>

      <BalanceCard
        balance="1,245.50"
        usdValue="1,245.50"
        walletAddress="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
        onSend={() => console.log("Send clicked")}
        onReceive={() => console.log("Receive clicked")}
        onBuy={() => console.log("Buy clicked")}
      />

      <QuickStats
        stats={{
          monthlySpent: "$842.50",
          monthlyChange: "+12%",
          monthlyChangeType: "positive",
          transactionCount: "24",
          transactionChange: "+8",
          transactionChangeType: "positive",
          avgTransaction: "$35.10",
          savingsRate: "18%",
        }}
      />

      <div className="grid lg:grid-cols-2 gap-6">
        <TransactionList
          transactions={mockTransactions}
          onTransactionClick={(id) => console.log("Transaction clicked:", id)}
        />
        <SpendingInsights
          categories={mockCategories}
          recommendations={mockRecommendations}
          onDismissRecommendation={(id) => console.log("Dismissed:", id)}
        />
      </div>
    </div>
  );
}
