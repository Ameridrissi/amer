import { TransactionList } from "@/components/transaction-list";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";

export default function Transactions() {
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
    {
      id: "5",
      type: "send" as const,
      amount: "15.75",
      counterparty: "Grocery Store",
      timestamp: "3 days ago",
      status: "completed" as const,
      category: "Shopping",
    },
    {
      id: "6",
      type: "send" as const,
      amount: "85.00",
      counterparty: "Electric Company",
      timestamp: "5 days ago",
      status: "completed" as const,
      category: "Utilities",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Transactions</h1>
        <p className="text-muted-foreground">
          View and manage all your transaction history.
        </p>
      </div>

      <Card className="p-4">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              className="pl-10"
              data-testid="input-search-transactions"
            />
          </div>
          <Button variant="outline" data-testid="button-filter">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </Card>

      <TransactionList
        transactions={mockTransactions}
        onTransactionClick={(id) => console.log("Transaction clicked:", id)}
      />
    </div>
  );
}
