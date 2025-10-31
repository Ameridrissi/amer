import { SpendingInsights } from "../spending-insights";
import { ShoppingBag, Coffee, Home, Car, Utensils, Zap } from "lucide-react";

export default function SpendingInsightsExample() {
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
    {
      name: "Utilities",
      amount: "95.00",
      percentage: 13,
      icon: <Zap className="h-4 w-4" />,
    },
    {
      name: "Entertainment",
      amount: "75.00",
      percentage: 10,
      icon: <Coffee className="h-4 w-4" />,
    },
  ];

  const mockRecommendations = [
    {
      id: "1",
      title: "Save 15% on Shopping",
      description:
        "You've spent 35% more on shopping this month. Consider setting a budget limit to save up to $85 monthly.",
      action: "Set Budget",
    },
    {
      id: "2",
      title: "Automate Utility Payments",
      description:
        "Set up recurring payments for utilities to never miss a due date and avoid late fees.",
      action: "Setup Automation",
    },
  ];

  return (
    <SpendingInsights
      categories={mockCategories}
      recommendations={mockRecommendations}
      onDismissRecommendation={(id) => console.log("Dismissed:", id)}
    />
  );
}
