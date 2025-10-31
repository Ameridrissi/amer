import { AutomationCard } from "../automation-card";

export default function AutomationCardExample() {
  return (
    <div className="space-y-4 max-w-md">
      <AutomationCard
        id="1"
        name="Monthly Rent Payment"
        type="recurring"
        amount="800.00"
        schedule="1st of every month"
        recipient="0x1234...5678"
        enabled={true}
        onToggle={(id, enabled) => console.log(`Toggled ${id}:`, enabled)}
        onEdit={(id) => console.log("Edit:", id)}
      />
      <AutomationCard
        id="2"
        name="Grocery Bill Split"
        type="split"
        amount="50.00"
        recipient="3 friends"
        enabled={true}
        onToggle={(id, enabled) => console.log(`Toggled ${id}:`, enabled)}
        onEdit={(id) => console.log("Edit:", id)}
      />
    </div>
  );
}
