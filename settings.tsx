import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your wallet preferences and security settings.
        </p>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Wallet Information</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="wallet-name">Wallet Name</Label>
            <Input
              id="wallet-name"
              defaultValue="My Main Wallet"
              data-testid="input-wallet-name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="wallet-address">Wallet Address</Label>
            <Input
              id="wallet-address"
              value="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
              readOnly
              className="font-mono"
              data-testid="input-wallet-address"
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Notifications</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Transaction Alerts</p>
              <p className="text-sm text-muted-foreground">
                Get notified for every transaction
              </p>
            </div>
            <Switch defaultChecked data-testid="switch-transaction-alerts" />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">AI Recommendations</p>
              <p className="text-sm text-muted-foreground">
                Receive spending insights and budget tips
              </p>
            </div>
            <Switch defaultChecked data-testid="switch-ai-recommendations" />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Automation Updates</p>
              <p className="text-sm text-muted-foreground">
                Alerts when automated payments are processed
              </p>
            </div>
            <Switch defaultChecked data-testid="switch-automation-updates" />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Security</h2>
        <div className="space-y-4">
          <Button variant="outline" className="w-full" data-testid="button-change-password">
            Change Password
          </Button>
          <Button variant="outline" className="w-full" data-testid="button-export-keys">
            Export Private Keys
          </Button>
          <Button variant="destructive" className="w-full" data-testid="button-disconnect-wallet">
            Disconnect Wallet
          </Button>
        </div>
      </Card>
    </div>
  );
}
