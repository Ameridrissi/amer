import OpenAI from "openai";

const aimlClient = new OpenAI({
  baseURL: "https://api.aimlapi.com/v1",
  apiKey: process.env.AIML_API_KEY!,
});

export interface SpendingCategory {
  name: string;
  amount: string;
  percentage: number;
}

export interface AIRecommendation {
  title: string;
  description: string;
  action?: string;
}

export interface SpendingAnalysis {
  categories: SpendingCategory[];
  recommendations: AIRecommendation[];
  totalSpent: string;
  period: string;
}

export class AIMLService {
  /**
   * Analyze spending patterns and generate insights
   */
  async analyzeSpending(
    transactions: Array<{
      amount: string;
      category?: string;
      type: string;
      timestamp: Date;
    }>,
  ): Promise<SpendingAnalysis> {
    try {
      // Calculate totals by category
      const categoryTotals = new Map<string, number>();
      let totalSpent = 0;

      transactions.forEach((tx) => {
        if (tx.type === "send") {
          const amount = parseFloat(tx.amount);
          totalSpent += amount;
          const category = tx.category || "Other";
          categoryTotals.set(category, (categoryTotals.get(category) || 0) + amount);
        }
      });

      // Convert to categories array
      const categories: SpendingCategory[] = Array.from(
        categoryTotals.entries(),
      ).map(([name, amount]) => ({
        name,
        amount: amount.toFixed(2),
        percentage: Math.round((amount / totalSpent) * 100),
      }));

      // Generate AI recommendations
      const prompt = `You are a financial advisor. Analyze this spending data and provide 2-3 actionable recommendations to help save money or improve financial health.

Spending by category:
${categories.map((c) => `- ${c.name}: $${c.amount} (${c.percentage}%)`).join("\n")}

Total spent: $${totalSpent.toFixed(2)}

Provide recommendations in JSON format:
[
  {
    "title": "Short recommendation title",
    "description": "Brief explanation (max 100 chars)",
    "action": "Action button text (optional)"
  }
]

Return ONLY valid JSON, no markdown or explanation.`;

      const completion = await aimlClient.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a helpful financial advisor. Respond only with valid JSON.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      });

      const content = completion.choices[0]?.message?.content || "[]";
      let recommendations: AIRecommendation[] = [];

      try {
        recommendations = JSON.parse(content);
      } catch {
        // Fallback recommendations if AI fails
        recommendations = [
          {
            title: "Track Your Spending",
            description: "Set up category budgets to better manage your expenses.",
            action: "Set Budget",
          },
        ];
      }

      return {
        categories: categories.sort((a, b) => b.percentage - a.percentage),
        recommendations,
        totalSpent: totalSpent.toFixed(2),
        period: "Last 30 days",
      };
    } catch (error) {
      console.error("AI/ML API error:", error);
      // Return basic analysis on error
      return {
        categories: [],
        recommendations: [
          {
            title: "Unable to Generate Insights",
            description: "AI analysis temporarily unavailable. Please try again later.",
          },
        ],
        totalSpent: "0",
        period: "Last 30 days",
      };
    }
  }

  /**
   * Generate personalized budget advice
   */
  async generateBudgetAdvice(monthlyIncome: number, monthlySpending: number): Promise<string> {
    try {
      const completion = await aimlClient.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a financial advisor providing brief, actionable budget advice.",
          },
          {
            role: "user",
            content: `Monthly income: $${monthlyIncome}, Monthly spending: $${monthlySpending}. Provide one brief tip (max 100 chars).`,
          },
        ],
        temperature: 0.7,
        max_tokens: 100,
      });

      return completion.choices[0]?.message?.content || "Keep tracking your expenses!";
    } catch (error) {
      console.error("AI/ML API error:", error);
      return "Keep tracking your expenses to maintain financial health!";
    }
  }
}

export const aimlService = new AIMLService();
