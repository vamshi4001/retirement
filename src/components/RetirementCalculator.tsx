"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import {
  Calculator,
  Wallet,
  Building2,
  TrendingUp,
  Shield,
  AlertTriangle,
  Gem,
  Bitcoin,
  PiggyBank,
  DollarSign,
  Home,
  Plus,
  Trash2,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const RetirementCalculator = () => {
  interface Investment {
    id: keyof InvestmentStates;
    name: string;
    returnRate: number;
    icon: React.ElementType;
    description: string;
  }

  interface InvestmentStates {
    // Retirement accounts
    traditional401k: boolean;
    rothIRA: boolean;
    // Other investments
    highYieldSavings: boolean;
    sp500: boolean;
    realEstate: boolean;
    bonds: boolean;
    commodities: boolean;
    crypto: boolean;
  }

  interface InvestmentCategories {
    retirementAccounts: Investment[];
    lowRisk: Investment[];
    mediumRisk: Investment[];
    highRisk: Investment[];
  }
  // Initialize state variables at the top
  const [retirementAccounts, setRetirementAccounts] = useState({
    traditional401k: {
      enabled: true,
      contribution: 19500,
      employerMatch: 0.05,
      matchLimit: 0.05,
    },
    rothIRA: {
      enabled: true,
      contribution: 6000,
    },
  });

  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [monthlyIncome, setMonthlyIncome] = useState(10000);
  const [salary, setSalary] = useState(100000);
  const [currentSavings, setCurrentSavings] = useState(50000);

  const [enabledInvestments, setEnabledInvestments] =
    useState<InvestmentStates>({
      // Retirement accounts
      traditional401k: true,
      rothIRA: true,
      // Other investments
      highYieldSavings: true,
      sp500: true,
      realEstate: true,
      bonds: true,
      commodities: false,
      crypto: false,
    });

  const [properties, setProperties] = useState([
    {
      id: 1,
      address: "",
      currentValue: 0,
      monthlyRent: 0,
      mortgage: 0,
      appreciationRate: 0.03,
    },
  ]);

  const [manualSavings, setManualSavings] = useState({
    taxableAccounts: [
      { id: 1, name: "Brokerage", balance: 0, expectedReturn: 0.07 },
    ],
    taxAdvantaged: [
      { id: 1, name: "HSA", balance: 0, expectedReturn: 0.07 },
      { id: 2, name: "529", balance: 0, expectedReturn: 0.07 },
    ],
  });

  const tooltips = {
    currentAge:
      "Your current age. This is used as the starting point for all calculations.",
    retirementAge:
      "The age at which you plan to retire. This determines your investment horizon and affects how much you need to save.",
    salary:
      "Your current annual salary before taxes. Used to calculate 401(k) contribution limits and employer matching.",
    monthlyIncome:
      "How much monthly income you want to have during retirement, in today's dollars. This will be adjusted for inflation.",
    currentSavings:
      "The total amount you currently have saved across all retirement accounts.",
    traditional401k: {
      main: "Traditional 401(k) is a tax-deferred retirement account. Contributions reduce your taxable income now, but withdrawals are taxed in retirement.",
      contribution:
        "Annual contribution to your 401(k). The 2024 limit is $22,500, or $30,000 if you're 50 or older (catch-up contribution).",
      match:
        "Many employers match a percentage of your 401(k) contributions. This is essentially free money for your retirement.",
    },
    rothIRA: {
      main: "Roth IRA contributions are made with after-tax dollars. Qualified withdrawals in retirement are tax-free, including earnings.",
      contribution:
        "Annual contribution to your Roth IRA. The 2024 limit is $6,500, or $7,500 if you're 50 or older (catch-up contribution).",
    },
    investments: {
      highYieldSavings:
        "FDIC-insured savings accounts offering higher interest rates than traditional savings accounts. Very low risk but also lower returns.",
      bonds:
        "Government and corporate bonds provide steady income through interest payments. Generally lower risk than stocks.",
      sp500:
        "S&P 500 index funds track the 500 largest U.S. companies. Historically returns about 10% annually over long periods.",
      realEstate:
        "Real estate investments can provide both rental income and property appreciation. Can include REITs or direct property ownership.",
      commodities:
        "Raw materials like gold, silver, oil. Can help hedge against inflation but can be volatile.",
      crypto:
        "Cryptocurrency investments. Highest potential returns but also highest risk and volatility.",
    },
  };

  // Constants
  const MAX_401K_CONTRIBUTION = 22500;
  const MAX_ROTH_CONTRIBUTION = 6500;
  const CATCH_UP_AGE = 50;
  const CATCH_UP_401K = 7500;
  const CATCH_UP_ROTH = 1000;

  const investments: InvestmentCategories = {
    retirementAccounts: [
      {
        id: "traditional401k",
        name: "401(k)",
        returnRate: 0.07,
        icon: PiggyBank,
        description: "Tax-deferred retirement account",
      },
      {
        id: "rothIRA",
        name: "Roth IRA",
        returnRate: 0.07,
        icon: DollarSign,
        description: "Tax-free growth retirement account",
      },
    ],
    lowRisk: [
      {
        id: "highYieldSavings",
        name: "High-Yield Savings",
        returnRate: 0.045,
        icon: Wallet,
        description: "4.5% annual return, FDIC insured",
      },
      {
        id: "bonds",
        name: "Government Bonds",
        returnRate: 0.035,
        icon: Shield,
        description: "3.5% annual return, very stable",
      },
    ],
    mediumRisk: [
      {
        id: "sp500",
        name: "S&P 500 ETFs",
        returnRate: 0.1,
        icon: TrendingUp,
        description: "10% average annual return",
      },
      {
        id: "realEstate",
        name: "Rental Properties",
        returnRate: 0.08,
        icon: Building2,
        description: "8% annual return + property appreciation",
      },
    ],
    highRisk: [
      {
        id: "commodities",
        name: "Commodities",
        returnRate: 0.12,
        icon: Gem,
        description: "12% potential return, high volatility",
      },
      {
        id: "crypto",
        name: "Cryptocurrency",
        returnRate: 0.2,
        icon: Bitcoin,
        description: "20% potential return, extreme volatility",
      },
    ],
  };

  const calculateWithdrawalStrategy = (assets) => {
    // Implement tax-efficient withdrawal strategy
    // Consider RMDs, tax brackets, and capital gains
    return {
      optimalWithdrawal: {},
      taxImpact: {},
      yearlyBreakdown: [],
    };
  };

  const calculateProjections = () => {
    const yearsUntilRetirement = retirementAge - currentAge;
    const annualIncome = monthlyIncome * 12;
    const assumedLifespan = 90;
    const yearsInRetirement = assumedLifespan - retirementAge;

    let retirement401k = currentSavings;
    let rothIRA = 0;
    let taxableInvestments = 0;

    const projectionData = [];

    for (let year = 0; year <= yearsUntilRetirement; year++) {
      const currentYear = currentAge + year;
      const max401kContrib =
        currentYear >= CATCH_UP_AGE
          ? MAX_401K_CONTRIBUTION + CATCH_UP_401K
          : MAX_401K_CONTRIBUTION;

      const maxRothContrib =
        currentYear >= CATCH_UP_AGE
          ? MAX_ROTH_CONTRIBUTION + CATCH_UP_ROTH
          : MAX_ROTH_CONTRIBUTION;

      if (retirementAccounts.traditional401k.enabled) {
        const contribution = Math.min(
          retirementAccounts.traditional401k.contribution,
          max401kContrib
        );
        retirement401k += contribution;

        const matchContribution = Math.min(
          salary * retirementAccounts.traditional401k.employerMatch,
          salary * retirementAccounts.traditional401k.matchLimit
        );
        retirement401k += matchContribution;
        retirement401k *= 1 + investments.retirementAccounts[0].returnRate;
      }

      if (retirementAccounts.rothIRA.enabled) {
        const rothContribution = Math.min(
          retirementAccounts.rothIRA.contribution,
          maxRothContrib
        );
        rothIRA += rothContribution;
        rothIRA *= 1 + investments.retirementAccounts[1].returnRate;
      }

      let weightedReturn = 0;
      let enabledCount = 0;

      Object.entries(enabledInvestments).forEach(([id, enabled]) => {
        if (enabled) {
          const investment = [
            ...investments.lowRisk,
            ...investments.mediumRisk,
            ...investments.highRisk,
          ].find((inv) => inv.id === id);
          if (investment) {
            weightedReturn += investment.returnRate;
            enabledCount++;
          }
        }
      });

      weightedReturn = enabledCount > 0 ? weightedReturn / enabledCount : 0;
      taxableInvestments *= 1 + weightedReturn;

      projectionData.push({
        age: currentYear,
        total401k: Math.round(retirement401k),
        rothIRA: Math.round(rothIRA),
        taxableInvestments: Math.round(taxableInvestments),
        total: Math.round(retirement401k + rothIRA + taxableInvestments),
      });
    }

    const totalRetirementNeeds = annualIncome * yearsInRetirement;
    const projectedRetirementAccounts = retirement401k + rothIRA;
    const additionalSavingsNeeded = Math.max(
      0,
      totalRetirementNeeds - projectedRetirementAccounts
    );

    return {
      projectionData,
      totalRetirementNeeds,
      projectedRetirementAccounts,
      additionalSavingsNeeded,
      monthlyInvestmentNeeded: (
        additionalSavingsNeeded /
        (yearsUntilRetirement * 12)
      ).toFixed(2),
    };
  };

  const results = calculateProjections();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-6 h-6" />
            Retirement Calculator with Tax-Advantaged Accounts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Label>Current Age</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-gray-500 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>{tooltips.currentAge}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                type="number"
                value={currentAge}
                onChange={(e) => setCurrentAge(Number(e.target.value))}
              />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Label>Retirement Age</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-gray-500 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>{tooltips.retirementAge}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                type="number"
                value={retirementAge}
                onChange={(e) => setRetirementAge(Number(e.target.value))}
              />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Label>Annual Salary ($)</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-gray-500 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>{tooltips.salary}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                type="number"
                value={salary}
                onChange={(e) => setSalary(Number(e.target.value))}
              />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Label>Monthly Income Need ($)</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-gray-500 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>{tooltips.monthlyIncome}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                type="number"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(Number(e.target.value))}
              />
            </div>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Retirement Accounts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <PiggyBank className="w-4 h-4" />
                      <Label>401(k)</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-gray-500 cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>{tooltips.traditional401k.main}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Switch
                      checked={retirementAccounts.traditional401k.enabled}
                      onCheckedChange={(checked) =>
                        setRetirementAccounts((prev) => ({
                          ...prev,
                          traditional401k: {
                            ...prev.traditional401k,
                            enabled: checked,
                          },
                        }))
                      }
                    />
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center gap-2">
                      <Label className="text-sm text-gray-500">
                        Annual Contribution ($)
                      </Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-gray-500 cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>{tooltips.traditional401k.contribution}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Slider
                      value={[retirementAccounts.traditional401k.contribution]}
                      min={0}
                      max={
                        currentAge >= CATCH_UP_AGE
                          ? MAX_401K_CONTRIBUTION + CATCH_UP_401K
                          : MAX_401K_CONTRIBUTION
                      }
                      step={500}
                      onValueChange={(value) =>
                        setRetirementAccounts((prev) => ({
                          ...prev,
                          traditional401k: {
                            ...prev.traditional401k,
                            contribution: value[0],
                          },
                        }))
                      }
                      className="mt-2"
                    />
                    <div className="text-sm text-right mt-1">
                      $
                      {retirementAccounts.traditional401k.contribution.toLocaleString()}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 w-4" />
                        <Label>Roth IRA</Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 text-gray-500 cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                              <p>{tooltips.rothIRA.main}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <Switch
                        checked={retirementAccounts.rothIRA.enabled}
                        onCheckedChange={(checked) =>
                          setRetirementAccounts((prev) => ({
                            ...prev,
                            rothIRA: { ...prev.rothIRA, enabled: checked },
                          }))
                        }
                      />
                    </div>
                    <Label className="text-sm text-gray-500">
                      Annual Contribution ($)
                    </Label>
                    <Slider
                      value={[retirementAccounts.rothIRA.contribution]}
                      min={0}
                      max={
                        currentAge >= CATCH_UP_AGE
                          ? MAX_ROTH_CONTRIBUTION + CATCH_UP_ROTH
                          : MAX_ROTH_CONTRIBUTION
                      }
                      step={500}
                      onValueChange={(value) =>
                        setRetirementAccounts((prev) => ({
                          ...prev,
                          rothIRA: { ...prev.rothIRA, contribution: value[0] },
                        }))
                      }
                      className="mt-2"
                    />
                    <div className="text-sm text-right mt-1">
                      $
                      {retirementAccounts.rothIRA.contribution.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="w-6 h-6" />
                Real Estate Portfolio
              </CardTitle>
            </CardHeader>
            <CardContent>
              {properties.map((property, index) => (
                <div
                  key={property.id}
                  className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4"
                >
                  <Input
                    type="text"
                    placeholder="Property Address"
                    className="col-span-2"
                    value={property.address}
                    onChange={(e) => {
                      const newProperties = [...properties];
                      newProperties[index].address = e.target.value;
                      setProperties(newProperties);
                    }}
                  />
                  <Input
                    type="number"
                    placeholder="Current Value"
                    value={property.currentValue}
                    onChange={(e) => {
                      const newProperties = [...properties];
                      newProperties[index].currentValue = Number(
                        e.target.value
                      );
                      setProperties(newProperties);
                    }}
                  />
                  <Input
                    type="number"
                    placeholder="Monthly Rent"
                    value={property.monthlyRent}
                    onChange={(e) => {
                      const newProperties = [...properties];
                      newProperties[index].monthlyRent = Number(e.target.value);
                      setProperties(newProperties);
                    }}
                  />
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() =>
                  setProperties([
                    ...properties,
                    {
                      id: properties.length + 1,
                      address: "",
                      currentValue: 0,
                      monthlyRent: 0,
                      mortgage: 0,
                      appreciationRate: 0.03,
                    },
                  ])
                }
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Property
              </Button>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Manual Savings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-4">Taxable Accounts</h3>
                  {manualSavings.taxableAccounts.map((account, index) => (
                    <div key={account.id} className="flex gap-4 mb-4">
                      <Input
                        placeholder="Account Name"
                        value={account.name}
                        onChange={(e) => {
                          const newAccounts = [
                            ...manualSavings.taxableAccounts,
                          ];
                          newAccounts[index].name = e.target.value;
                          setManualSavings({
                            ...manualSavings,
                            taxableAccounts: newAccounts,
                          });
                        }}
                      />
                      <Input
                        type="number"
                        placeholder="Balance"
                        value={account.balance}
                        onChange={(e) => {
                          const newAccounts = [
                            ...manualSavings.taxableAccounts,
                          ];
                          newAccounts[index].balance = Number(e.target.value);
                          setManualSavings({
                            ...manualSavings,
                            taxableAccounts: newAccounts,
                          });
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <h3 className="font-semibold mb-4">
                    Tax-Advantaged Accounts
                  </h3>
                  {manualSavings.taxAdvantaged.map((account, index) => (
                    <div key={account.id} className="flex gap-4 mb-4">
                      <Input
                        placeholder="Account Name"
                        value={account.name}
                        onChange={(e) => {
                          const newAccounts = [...manualSavings.taxAdvantaged];
                          newAccounts[index].name = e.target.value;
                          setManualSavings({
                            ...manualSavings,
                            taxAdvantaged: newAccounts,
                          });
                        }}
                      />
                      <Input
                        type="number"
                        placeholder="Balance"
                        value={account.balance}
                        onChange={(e) => {
                          const newAccounts = [...manualSavings.taxAdvantaged];
                          newAccounts[index].balance = Number(e.target.value);
                          setManualSavings({
                            ...manualSavings,
                            taxAdvantaged: newAccounts,
                          });
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(investments).map(
              ([category, invs]) =>
                category !== "retirementAccounts" && (
                  <Card key={category} className="p-4">
                    <CardTitle className="mb-4 flex items-center gap-2">
                      {category === "lowRisk" && <Shield className="w-4 h-4" />}
                      {category === "mediumRisk" && (
                        <TrendingUp className="w-4 h-4" />
                      )}
                      {category === "highRisk" && (
                        <AlertTriangle className="w-4 h-4" />
                      )}
                      {category
                        .replace(/([A-Z])/g, " $1")
                        .split("_")
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() +
                            word.slice(1).toLowerCase()
                        )
                        .join(" ")}
                    </CardTitle>
                    {invs.map((investment: Investment) => (
                      <div
                        key={investment.id}
                        className="flex items-center justify-between mb-4"
                      >
                        <div className="flex items-center gap-2">
                          <investment.icon className="w-4 h-4" />
                          <div>
                            <div className="flex items-center gap-2">
                              <div className="font-medium">
                                {investment.name}
                              </div>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="h-4 w-4 text-gray-500 cursor-help" />
                                  </TooltipTrigger>
                                  <TooltipContent className="max-w-xs">
                                    <p>
                                      {
                                        tooltips.investments[
                                          investment.id as keyof typeof tooltips.investments
                                        ]
                                      }
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                            <div className="text-sm text-gray-500">
                              {investment.description}
                            </div>
                          </div>
                        </div>
                        <Switch
                          checked={enabledInvestments[investment.id]}
                          onCheckedChange={(checked) =>
                            setEnabledInvestments((prev) => ({
                              ...prev,
                              [investment.id]: checked,
                            }))
                          }
                        />
                      </div>
                    ))}
                  </Card>
                )
            )}
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">
              Projected Retirement Assets Growth
            </h2>
            <div className="h-64 w-full">
              <ResponsiveContainer>
                <LineChart data={results.projectionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="age" />
                  <YAxis />
                  <RechartsTooltip
                    formatter={(value) => `$${value.toLocaleString()}`}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="total401k"
                    name="401(k)"
                    stroke="#8884d8"
                  />
                  <Line
                    type="monotone"
                    dataKey="rothIRA"
                    name="Roth IRA"
                    stroke="#82ca9d"
                  />
                  <Line
                    type="monotone"
                    dataKey="propertyValue"
                    name="Real Estate"
                    stroke="#ffa726"
                  />
                  <Line
                    type="monotone"
                    dataKey="taxableInvestments"
                    name="Other Investments"
                    stroke="#ef5350"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
            <div className="max-w-6xl mx-auto">
              <Card className="rounded-none border-0 bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <div className="text-sm font-medium text-gray-500">
                        Total Needed
                      </div>
                      <div className="text-xl font-bold text-blue-600">
                        $
                        {Math.round(
                          results.totalRetirementNeeds
                        ).toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <div className="text-sm font-medium text-gray-500">
                        From Retirement Accounts
                      </div>
                      <div className="text-xl font-bold text-green-600">
                        $
                        {Math.round(
                          results.projectedRetirementAccounts
                        ).toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <div className="text-sm font-medium text-gray-500">
                        Additional Savings Needed
                      </div>
                      <div className="text-xl font-bold text-purple-600">
                        $
                        {Math.round(
                          results.additionalSavingsNeeded
                        ).toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <div className="text-sm font-medium text-gray-500">
                        Monthly Investment
                      </div>
                      <div className="text-xl font-bold text-orange-600">
                        $
                        {Number(
                          results.monthlyInvestmentNeeded
                        ).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
      <Alert className="mb-6 bg-gray-50">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          This calculator is for informational purposes only and should not be
          considered financial advice. The projections shown are based on
          historical data and assumptions that may not reflect future
          performance. Please consult with a qualified financial advisor before
          making investment decisions. Past performance does not guarantee
          future results.
        </AlertDescription>
      </Alert>
      <div className="h-32 md:h-24" />
    </div>
  );
};

export default RetirementCalculator;
