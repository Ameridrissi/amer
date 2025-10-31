import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownLeft, Clock, CheckCircle2, XCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Transaction {
  id: string;
  type: "send" | "receive";
  amount: string;
  counterparty: string;
  timestamp: string;
  status: "completed" | "pending" | "failed";
  category?: string;
}

interface TransactionListProps {
  transactions: Transaction[];
  onTransactionClick?: (id: string) => void;
}

export function TransactionList({ transactions, onTransactionClick }: TransactionListProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "";
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Recent Transactions</h2>
        <button className="text-sm text-primary hover-elevate active-elevate-2 px-3 py-1 rounded-md" data-testid="button-view-all">
          View All
        </button>
      </div>

      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-1">
          {transactions.map((tx, index) => (
            <div
              key={tx.id}
              onClick={() => onTransactionClick?.(tx.id)}
              className="flex items-center justify-between p-3 rounded-lg hover-elevate active-elevate-2 cursor-pointer border-b last:border-b-0"
              data-testid={`transaction-${index}`}
            >
              <div className="flex items-center gap-3 flex-1">
                <div className={`p-2 rounded-full ${
                  tx.type === "send" ? "bg-red-100 dark:bg-red-900/30" : "bg-green-100 dark:bg-green-900/30"
                }`}>
                  {tx.type === "send" ? (
                    <ArrowUpRight className="h-4 w-4 text-red-600 dark:text-red-400" />
                  ) : (
                    <ArrowDownLeft className="h-4 w-4 text-green-600 dark:text-green-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{tx.counterparty}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-muted-foreground">{tx.timestamp}</p>
                    {tx.category && (
                      <Badge variant="secondary" className="text-xs">
                        {tx.category}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className={`font-mono font-semibold text-sm ${
                    tx.type === "send" ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"
                  }`}>
                    {tx.type === "send" ? "-" : "+"}{tx.amount} USDC
                  </p>
                  <div className="flex items-center gap-1 justify-end">
                    {getStatusIcon(tx.status)}
                    <span className={`text-xs capitalize ${getStatusColor(tx.status)}`}>
                      {tx.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}
