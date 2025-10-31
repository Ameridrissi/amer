import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownLeft, Plus, Copy, Check } from "lucide-react";
import { useState } from "react";

interface BalanceCardProps {
  balance: string;
  usdValue: string;
  walletAddress: string;
  onSend?: () => void;
  onReceive?: () => void;
  onBuy?: () => void;
}

export function BalanceCard({
  balance,
  usdValue,
  walletAddress,
  onSend,
  onReceive,
  onBuy,
}: BalanceCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              Total Balance
            </p>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 text-xs font-mono text-muted-foreground hover-elevate active-elevate-2 px-2 py-1 rounded-md"
              data-testid="button-copy-address"
            >
              {truncateAddress(walletAddress)}
              {copied ? (
                <Check className="h-3 w-3 text-primary" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </button>
          </div>
          <div className="space-y-1">
            <h1 className="text-5xl font-bold tracking-tight" data-testid="text-balance">
              {balance} <span className="text-3xl text-muted-foreground">USDC</span>
            </h1>
            <p className="text-lg text-muted-foreground" data-testid="text-usd-value">
              ≈ ${usdValue} USD
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            onClick={onSend}
            className="flex-1"
            size="lg"
            data-testid="button-send"
          >
            <ArrowUpRight className="h-5 w-5 mr-2" />
            Send
          </Button>
          <Button
            onClick={onReceive}
            variant="secondary"
            className="flex-1"
            size="lg"
            data-testid="button-receive"
          >
            <ArrowDownLeft className="h-5 w-5 mr-2" />
            Receive
          </Button>
          <Button
            onClick={onBuy}
            variant="outline"
            className="flex-1"
            size="lg"
            data-testid="button-buy"
          >
            <Plus className="h-5 w-5 mr-2" />
            Buy
          </Button>
        </div>
      </div>
    </Card>
  );
}
