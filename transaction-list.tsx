import { TransactionList } from "../transaction-list";

export default function TransactionListExample() {
  const mockTransactions = [
    {
      id: "1",
      type: "send" as const,
      amount: "50.00",
      counterparty: "0x1234...5678",
      timestamp: "2 hours ago",
      status: "completed" as const,
      category: "Payment",
    },
    {
      id: "2",
      type: "receive" as const,
      amount: "125.50",
      counterparty: "0xabcd...efgh",
      timestamp: "5 hours ago",
      status: "completed" as const,
      category: "Transfer",
    },
    {
      id: "3",
      type: "send" as const,
      amount: "30.25",
      counterparty: "0x9876...4321",
      timestamp: "1 day ago",
      status: "pending" as const,
      category: "Shopping",
    },
    {
      id: "4",
      type: "receive" as const,
      amount: "200.00",
      counterparty: "0xfedc...ba98",
      timestamp: "2 days ago",
      status: "completed" as const,
    },
    {
      id: "5",
      type: "send" as const,
      amount: "15.75",
      counterparty: "0x5555...6666",
      timestamp: "3 days ago",
      status: "failed" as const,
      category: "Utilities",
    },
  ];

  return (
    <TransactionList
      transactions={mockTransactions}
      onTransactionClick={(id) => console.log("Transaction clicked:", id)}
    />
  );
}
