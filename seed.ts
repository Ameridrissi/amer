import { storage } from "./storage";

export async function seedData() {
  try {
    // Create a demo wallet
    const demoWallet = await storage.createWallet({
      userId: "demo-user",
      name: "My Main Wallet",
      address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
      balance: "1245.50",
    });

    console.log("Created demo wallet:", demoWallet.id);

    // Create sample transactions
    const sampleTransactions = [
      {
        walletId: demoWallet.id,
        type: "send",
        amount: "50.00",
        counterparty: "0x1234567890abcdef",
        description: "Coffee Shop",
        category: "Food",
        status: "completed",
      },
      {
        walletId: demoWallet.id,
        type: "receive",
        amount: "125.50",
        counterparty: "0xabcdef1234567890",
        description: "Freelance Client Payment",
        category: "Income",
        status: "completed",
      },
      {
        walletId: demoWallet.id,
        type: "send",
        amount: "30.25",
        counterparty: "0x9876543210fedcba",
        description: "Uber Ride",
        category: "Transportation",
        status: "pending",
      },
      {
        walletId: demoWallet.id,
        type: "receive",
        amount: "200.00",
        counterparty: "0xfedcba0987654321",
        description: "Salary Payment",
        category: "Income",
        status: "completed",
      },
      {
        walletId: demoWallet.id,
        type: "send",
        amount: "15.75",
        counterparty: "0x5555666677778888",
        description: "Grocery Store",
        category: "Shopping",
        status: "completed",
      },
      {
        walletId: demoWallet.id,
        type: "send",
        amount: "85.00",
        counterparty: "0x8888777766665555",
        description: "Electric Company",
        category: "Utilities",
        status: "completed",
      },
    ];

    for (const tx of sampleTransactions) {
      await storage.createTransaction(tx);
    }

    console.log("Created sample transactions");

    // Create sample automations
    const sampleAutomations = [
      {
        walletId: demoWallet.id,
        type: "recurring",
        name: "Monthly Rent Payment",
        amount: "800.00",
        recipient: "0x1234567890abcdef",
        schedule: "1st of every month",
        enabled: true,
      },
      {
        walletId: demoWallet.id,
        type: "split",
        name: "Grocery Bill Split",
        amount: "50.00",
        recipient: "3 friends",
        schedule: null,
        enabled: true,
      },
      {
        walletId: demoWallet.id,
        type: "save",
        name: "Weekly Savings",
        amount: "25.00",
        recipient: null,
        schedule: "Every Monday",
        enabled: false,
      },
    ];

    for (const auto of sampleAutomations) {
      await storage.createAutomation(auto);
    }

    console.log("Created sample automations");
    console.log("✅ Seed data created successfully");
    
    return demoWallet.id;
  } catch (error) {
    console.error("Error seeding data:", error);
    throw error;
  }
}
