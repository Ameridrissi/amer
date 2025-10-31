import { SpendingInsights } from "@/components/spending-insights";
import { Card } from "@/components/ui/card";
import { ShoppingBag, Utensils, Car, Zap, Coffee } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Insights() {
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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">AI-Powered Insights</h1>
        <p className="text-muted-foreground">
          Get personalized recommendations and spending analysis.
        </p>
      </div>

      <Tabs defaultValue="30days" className="w-full">
        <TabsList>
          <TabsTrigger value="7days" data-testid="tab-7days">Last 7 Days</TabsTrigger>
          <TabsTrigger value="30days" data-testid="tab-30days">Last 30 Days</TabsTrigger>
          <TabsTrigger value="90days" data-testid="tab-90days">Last 90 Days</TabsTrigger>
        </TabsList>
        <TabsContent value="7days" className="mt-6">
          <SpendingInsights
            categories={mockCategories}
            recommendations={mockRecommendations}
            onDismissRecommendation={(id) => console.log("Dismissed:", id)}
          />
        </TabsContent>
        <TabsContent value="30days" className="mt-6">
          <SpendingInsights
            categories={mockCategories}
            recommendations={mockRecommendations}
            onDismissRecommendation={(id) => console.log("Dismissed:", id)}
          />
        </TabsContent>
        <TabsContent value="90days" className="mt-6">
          <SpendingInsights
            categories={mockCategories}
            recommendations={mockRecommendations}
            onDismissRecommendation={(id) => console.log("Dismissed:", id)}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
