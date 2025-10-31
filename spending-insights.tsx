import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, ShoppingBag, Coffee, Home, Car, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface CategoryData {
  name: string;
  amount: string;
  percentage: number;
  icon: React.ReactNode;
}

interface AIRecommendation {
  id: string;
  title: string;
  description: string;
  action?: string;
}

interface SpendingInsightsProps {
  categories: CategoryData[];
  recommendations: AIRecommendation[];
  onDismissRecommendation?: (id: string) => void;
}

export function SpendingInsights({
  categories,
  recommendations,
  onDismissRecommendation,
}: SpendingInsightsProps) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">AI-Powered Insights</h2>
          </div>
          <Badge variant="secondary" className="text-xs">
            Last 30 days
          </Badge>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            Spending by Category
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      {category.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{category.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {category.percentage}% of total
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold">{category.amount} USDC</p>
                  </div>
                  <Progress value={category.percentage} className="h-2" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Card>

      {recommendations.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium">AI Recommendations</h3>
          {recommendations.map((rec) => (
            <Card
              key={rec.id}
              className="p-4 border-primary/30 bg-primary/5"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-primary/10 text-primary">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm mb-1">{rec.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {rec.description}
                  </p>
                  {rec.action && (
                    <Button size="sm" data-testid={`button-${rec.action.toLowerCase().replace(/\s/g, '-')}`}>
                      {rec.action}
                    </Button>
                  )}
                </div>
                <button
                  onClick={() => onDismissRecommendation?.(rec.id)}
                  className="text-muted-foreground hover-elevate active-elevate-2 p-1 rounded-md"
                  data-testid="button-dismiss-recommendation"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
