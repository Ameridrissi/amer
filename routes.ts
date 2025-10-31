import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { circleService } from "./services/circle";
import { aimlService } from "./services/aiml";
import { seedData } from "./seed";
import {
  insertWalletSchema,
  insertTransactionSchema,
  insertAutomationSchema,
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  // Seed data endpoint (for development)
  app.post("/api/seed", async (_req, res) => {
    try {
      const walletId = await seedData();
      res.json({ success: true, walletId });
    } catch (error) {
      console.error("Seed error:", error);
      res.status(500).json({ error: "Failed to seed data" });
    }
  });

  // Wallet routes
  app.post("/api/wallets", async (req, res) => {
    try {
      const { userId, name } = req.body;

      if (!userId || !name) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Create wallet with Circle
      const circleWallet = await circleService.createWallet(userId);

      // Store in our database
      const wallet = await storage.createWallet({
        userId,
        name,
        address: circleWallet.address,
        balance: "0",
      });

      res.json(wallet);
    } catch (error) {
      console.error("Wallet creation error:", error);
      res.status(500).json({ error: "Failed to create wallet" });
    }
  });

  app.get("/api/wallets/:id", async (req, res) => {
    try {
      const wallet = await storage.getWallet(req.params.id);
      if (!wallet) {
        return res.status(404).json({ error: "Wallet not found" });
      }

      // Fetch latest balance from Circle
      try {
        const balance = await circleService.getWalletBalance(wallet.id);
        await storage.updateWalletBalance(wallet.id, balance.amount);
        wallet.balance = balance.amount;
      } catch (error) {
        console.error("Balance fetch error:", error);
      }

      res.json(wallet);
    } catch (error) {
      console.error("Wallet fetch error:", error);
      res.status(500).json({ error: "Failed to fetch wallet" });
    }
  });

  app.get("/api/wallets/user/:userId", async (req, res) => {
    try {
      const wallets = await storage.getWalletsByUserId(req.params.userId);
      res.json(wallets);
    } catch (error) {
      console.error("Wallets fetch error:", error);
      res.status(500).json({ error: "Failed to fetch wallets" });
    }
  });

  // Transaction routes
  app.get("/api/transactions/wallet/:walletId", async (req, res) => {
    try {
      const transactions = await storage.getTransactionsByWalletId(
        req.params.walletId,
      );
      res.json(transactions);
    } catch (error) {
      console.error("Transactions fetch error:", error);
      res.status(500).json({ error: "Failed to fetch transactions" });
    }
  });

  app.post("/api/transactions", async (req, res) => {
    try {
      const validatedData = insertTransactionSchema.parse(req.body);

      // Create transaction record
      const transaction = await storage.createTransaction(validatedData);

      // If it's a send transaction, initiate Circle transfer
      if (validatedData.type === "send" && validatedData.counterparty) {
        try {
          const txId = await circleService.transferUSDC(
            validatedData.walletId,
            validatedData.counterparty,
            validatedData.amount,
          );
          console.log("Circle transaction initiated:", txId);
        } catch (error) {
          console.error("Circle transfer failed:", error);
          // Update transaction status to failed
          transaction.status = "failed";
        }
      }

      res.json(transaction);
    } catch (error) {
      console.error("Transaction creation error:", error);
      res.status(500).json({ error: "Failed to create transaction" });
    }
  });

  // AI Insights routes
  app.get("/api/insights/wallet/:walletId", async (req, res) => {
    try {
      const transactions = await storage.getTransactionsByWalletId(
        req.params.walletId,
      );

      // Filter to last 30 days
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const recentTransactions = transactions.filter(
        (tx) => tx.timestamp >= thirtyDaysAgo,
      );

      // Map transactions to the format expected by AI service
      const mappedTransactions = recentTransactions.map(tx => ({
        amount: tx.amount,
        category: tx.category || undefined,
        type: tx.type,
        timestamp: tx.timestamp,
      }));

      const analysis = await aimlService.analyzeSpending(mappedTransactions);

      res.json(analysis);
    } catch (error) {
      console.error("Insights generation error:", error);
      res.status(500).json({ error: "Failed to generate insights" });
    }
  });

  // Automation routes
  app.get("/api/automations/wallet/:walletId", async (req, res) => {
    try {
      const automations = await storage.getAutomationsByWalletId(
        req.params.walletId,
      );
      res.json(automations);
    } catch (error) {
      console.error("Automations fetch error:", error);
      res.status(500).json({ error: "Failed to fetch automations" });
    }
  });

  app.post("/api/automations", async (req, res) => {
    try {
      const validatedData = insertAutomationSchema.parse(req.body);
      const automation = await storage.createAutomation(validatedData);
      res.json(automation);
    } catch (error) {
      console.error("Automation creation error:", error);
      res.status(500).json({ error: "Failed to create automation" });
    }
  });

  app.patch("/api/automations/:id", async (req, res) => {
    try {
      const automation = await storage.updateAutomation(
        req.params.id,
        req.body,
      );
      if (!automation) {
        return res.status(404).json({ error: "Automation not found" });
      }
      res.json(automation);
    } catch (error) {
      console.error("Automation update error:", error);
      res.status(500).json({ error: "Failed to update automation" });
    }
  });

  app.delete("/api/automations/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteAutomation(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Automation not found" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Automation deletion error:", error);
      res.status(500).json({ error: "Failed to delete automation" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
