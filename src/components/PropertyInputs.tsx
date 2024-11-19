import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface Property {
  id: number;
  address: string;
  currentValue: number;
  loanAmount: number;
  monthlyRent: number;
  monthlyExpenses: number;
  appreciationRate: number;
}

interface PropertyInputsProps {
  property: Property;
  onChange: (id: number, field: keyof Property, value: string | number) => void;
  onDelete: (id: number) => void;
}
const PropertyInputs = ({
  property,
  onChange,
  onDelete,
}: PropertyInputsProps) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 border rounded-lg relative">
    <div className="col-span-full">
      <Label htmlFor={`address-${property.id}`}>Property Address</Label>
      <Input
        id={`address-${property.id}`}
        type="text"
        value={property.address}
        onChange={(e) => onChange(property.id, "address", e.target.value)}
        placeholder="Enter property address"
      />
    </div>

    <div>
      <Label htmlFor={`value-${property.id}`}>Total Property Value ($)</Label>
      <Input
        id={`value-${property.id}`}
        type="number"
        value={property.currentValue}
        onChange={(e) =>
          onChange(property.id, "currentValue", Number(e.target.value))
        }
        placeholder="Current market value"
      />
    </div>

    <div>
      <Label htmlFor={`loan-${property.id}`}>Remaining Loan Amount ($)</Label>
      <Input
        id={`loan-${property.id}`}
        type="number"
        value={property.loanAmount}
        onChange={(e) =>
          onChange(property.id, "loanAmount", Number(e.target.value))
        }
        placeholder="Outstanding mortgage"
      />
    </div>

    <div>
      <Label htmlFor={`equity-${property.id}`}>Current Equity</Label>
      <Input
        id={`equity-${property.id}`}
        type="text"
        value={`$${(
          property.currentValue - property.loanAmount
        ).toLocaleString()}`}
        disabled
        className="bg-gray-50"
      />
    </div>

    <div>
      <Label htmlFor={`rent-${property.id}`}>Monthly Rental Income ($)</Label>
      <Input
        id={`rent-${property.id}`}
        type="number"
        value={property.monthlyRent}
        onChange={(e) =>
          onChange(property.id, "monthlyRent", Number(e.target.value))
        }
        placeholder="If rental property"
      />
    </div>

    <div>
      <Label htmlFor={`expenses-${property.id}`}>Monthly Expenses ($)</Label>
      <Input
        id={`expenses-${property.id}`}
        type="number"
        value={property.monthlyExpenses}
        onChange={(e) =>
          onChange(property.id, "monthlyExpenses", Number(e.target.value))
        }
        placeholder="Maintenance, taxes, etc."
      />
    </div>

    <Button
      variant="destructive"
      size="icon"
      className="absolute top-0 right-0"
      onClick={() => onDelete(property.id)}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  </div>
);

export default PropertyInputs;
