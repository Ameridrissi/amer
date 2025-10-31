import { Card } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, TrendingUp, Activity } from "lucide-react";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative";
}

function StatCard({ icon, label, value, change, changeType }: StatCardProps) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-semibold" data-testid={`text-${label.toLowerCase().replace(/\s/g, '-')}`}>
            {value}
          </p>
          {change && (
            <div className={`flex items-center gap-1 text-xs ${
              changeType === "positive" ? "text-green-600" : "text-red-600"
            }`}>
              {changeType === "positive" ? (
                <ArrowUpRight className="h-3 w-3" />
              ) : (
                <ArrowDownRight className="h-3 w-3" />
              )}
              <span>{change}</span>
            </div>
          )}
        </div>
        <div className="text-muted-foreground">{icon}</div>
      </div>
    </Card>
  );
}

interface QuickStatsProps {
  stats: {
    monthlySpent: string;
    monthlyChange: string;
    monthlyChangeType: "positive" | "negative";
    transactionCount: string;
    transactionChange: string;
    transactionChangeType: "positive" | "negative";
    avgTransaction: string;
    savingsRate: string;
  };
}

export function QuickStats({ stats }: QuickStatsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        icon={<TrendingUp className="h-5 w-5" />}
        label="Monthly Spent"
        value={stats.monthlySpent}
        change={stats.monthlyChange}
        changeType={stats.monthlyChangeType}
      />
      <StatCard
        icon={<Activity className="h-5 w-5" />}
        label="Transactions"
        value={stats.transactionCount}
        change={stats.transactionChange}
        changeType={stats.transactionChangeType}
      />
      <StatCard
        icon={<TrendingUp className="h-5 w-5" />}
        label="Avg Transaction"
        value={stats.avgTransaction}
      />
      <StatCard
        icon={<Activity className="h-5 w-5" />}
        label="Savings Rate"
        value={stats.savingsRate}
      />
    </div>
  );
}
