import { AutomationCard } from "@/components/automation-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function Automate() {
  const [automations, setAutomations] = useState([
    {
      id: "1",
      name: "Monthly Rent Payment",
      type: "recurring" as const,
      amount: "800.00",
      schedule: "1st of every month",
      recipient: "0x1234...5678",
      enabled: true,
    },
    {
      id: "2",
      name: "Grocery Bill Split",
      type: "split" as const,
      amount: "50.00",
      recipient: "3 friends",
      enabled: true,
    },
    {
      id: "3",
      name: "Weekly Savings",
      type: "save" as const,
      amount: "25.00",
      schedule: "Every Monday",
      enabled: false,
    },
  ]);

  const handleToggle = (id: string, enabled: boolean) => {
    setAutomations((prev) =>
      prev.map((auto) =>
        auto.id === id ? { ...auto, enabled } : auto
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Smart Automation</h1>
          <p className="text-muted-foreground">
            Set up recurring payments, bill splits, and auto-save rules.
          </p>
        </div>
        <Button data-testid="button-create-automation">
          <Plus className="h-4 w-4 mr-2" />
          New Automation
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {automations.map((automation) => (
          <AutomationCard
            key={automation.id}
            {...automation}
            onToggle={handleToggle}
            onEdit={(id) => console.log("Edit automation:", id)}
          />
        ))}
      </div>
    </div>
  );
}
