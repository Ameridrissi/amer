import { QuickStats } from "../quick-stats";

export default function QuickStatsExample() {
  return (
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
  );
}
