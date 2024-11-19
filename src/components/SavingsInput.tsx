import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface SavingsAccount {
  id: number;
  name: string;
  balance: number;
  expectedReturn: number;
}

interface SavingsInputProps {
  account: SavingsAccount;
  onChange: (
    id: number,
    field: keyof SavingsAccount,
    value: string | number
  ) => void;
  type: "taxable" | "tax-advantaged";
}

interface ManualSavings {
  taxableAccounts: SavingsAccount[];
  taxAdvantaged: SavingsAccount[];
}

const SavingsInput = ({ account, onChange, type }: SavingsInputProps) => (
  <div className="flex gap-4 mb-4">
    <div className="flex-1">
      <Label htmlFor={`account-${account.id}`}>Account Name</Label>
      <Input
        id={`account-${account.id}`}
        value={account.name}
        onChange={(e) => onChange(account.id, "name", e.target.value)}
        placeholder={`Enter ${type} account name`}
      />
    </div>
    <div className="flex-1">
      <Label htmlFor={`balance-${account.id}`}>Current Balance ($)</Label>
      <Input
        id={`balance-${account.id}`}
        type="number"
        value={account.balance}
        onChange={(e) =>
          onChange(account.id, "balance", Number(e.target.value))
        }
        placeholder="Enter current balance"
      />
    </div>
  </div>
);

export default SavingsInput;
