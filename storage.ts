import {
  type User,
  type InsertUser,
  type Wallet,
  type InsertWallet,
  type Transaction,
  type InsertTransaction,
  type Automation,
  type InsertAutomation,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Wallet methods
  getWallet(id: string): Promise<Wallet | undefined>;
  getWalletByAddress(address: string): Promise<Wallet | undefined>;
  getWalletsByUserId(userId: string): Promise<Wallet[]>;
  createWallet(wallet: InsertWallet): Promise<Wallet>;
  updateWalletBalance(id: string, balance: string): Promise<Wallet | undefined>;

  // Transaction methods
  getTransaction(id: string): Promise<Transaction | undefined>;
  getTransactionsByWalletId(walletId: string): Promise<Transaction[]>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;

  // Automation methods
  getAutomation(id: string): Promise<Automation | undefined>;
  getAutomationsByWalletId(walletId: string): Promise<Automation[]>;
  createAutomation(automation: InsertAutomation): Promise<Automation>;
  updateAutomation(id: string, updates: Partial<Automation>): Promise<Automation | undefined>;
  deleteAutomation(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private wallets: Map<string, Wallet>;
  private transactions: Map<string, Transaction>;
  private automations: Map<string, Automation>;

  constructor() {
    this.users = new Map();
    this.wallets = new Map();
    this.transactions = new Map();
    this.automations = new Map();
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Wallet methods
  async getWallet(id: string): Promise<Wallet | undefined> {
    return this.wallets.get(id);
  }

  async getWalletByAddress(address: string): Promise<Wallet | undefined> {
    return Array.from(this.wallets.values()).find(
      (wallet) => wallet.address === address,
    );
  }

  async getWalletsByUserId(userId: string): Promise<Wallet[]> {
    return Array.from(this.wallets.values()).filter(
      (wallet) => wallet.userId === userId,
    );
  }

  async createWallet(insertWallet: InsertWallet): Promise<Wallet> {
    const id = randomUUID();
    const wallet: Wallet = {
      id,
      userId: insertWallet.userId,
      name: insertWallet.name,
      address: insertWallet.address,
      balance: insertWallet.balance || "0",
      createdAt: new Date(),
    };
    this.wallets.set(id, wallet);
    return wallet;
  }

  async updateWalletBalance(id: string, balance: string): Promise<Wallet | undefined> {
    const wallet = this.wallets.get(id);
    if (!wallet) return undefined;
    
    const updated: Wallet = { ...wallet, balance };
    this.wallets.set(id, updated);
    return updated;
  }

  // Transaction methods
  async getTransaction(id: string): Promise<Transaction | undefined> {
    return this.transactions.get(id);
  }

  async getTransactionsByWalletId(walletId: string): Promise<Transaction[]> {
    return Array.from(this.transactions.values())
      .filter((tx) => tx.walletId === walletId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    const id = randomUUID();
    const transaction: Transaction = {
      id,
      walletId: insertTransaction.walletId,
      type: insertTransaction.type,
      amount: insertTransaction.amount,
      counterparty: insertTransaction.counterparty || null,
      description: insertTransaction.description || null,
      category: insertTransaction.category || null,
      status: insertTransaction.status || "completed",
      timestamp: new Date(),
    };
    this.transactions.set(id, transaction);
    return transaction;
  }

  // Automation methods
  async getAutomation(id: string): Promise<Automation | undefined> {
    return this.automations.get(id);
  }

  async getAutomationsByWalletId(walletId: string): Promise<Automation[]> {
    return Array.from(this.automations.values())
      .filter((auto) => auto.walletId === walletId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createAutomation(insertAutomation: InsertAutomation): Promise<Automation> {
    const id = randomUUID();
    const automation: Automation = {
      id,
      walletId: insertAutomation.walletId,
      type: insertAutomation.type,
      name: insertAutomation.name,
      amount: insertAutomation.amount,
      recipient: insertAutomation.recipient || null,
      schedule: insertAutomation.schedule || null,
      enabled: insertAutomation.enabled !== undefined ? insertAutomation.enabled : true,
      createdAt: new Date(),
    };
    this.automations.set(id, automation);
    return automation;
  }

  async updateAutomation(id: string, updates: Partial<Automation>): Promise<Automation | undefined> {
    const automation = this.automations.get(id);
    if (!automation) return undefined;
    
    const updated: Automation = { ...automation, ...updates };
    this.automations.set(id, updated);
    return updated;
  }

  async deleteAutomation(id: string): Promise<boolean> {
    return this.automations.delete(id);
  }
}

export const storage = new MemStorage();
