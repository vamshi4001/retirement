'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
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
  DollarSign
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const RetirementCalculator = () => {
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
    }
  });

  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [monthlyIncome, setMonthlyIncome] = useState(5000);
  const [salary, setSalary] = useState(100000);
  const [currentSavings, setCurrentSavings] = useState(50000);

  const [enabledInvestments, setEnabledInvestments] = useState({
    highYieldSavings: true,
    sp500: true,
    realEstate: true,
    bonds: true,
    commodities: false,
    crypto: false
  });

  // Constants
  const MAX_401K_CONTRIBUTION = 22500;
  const MAX_ROTH_CONTRIBUTION = 6500;
  const CATCH_UP_AGE = 50;
  const CATCH_UP_401K = 7500;
  const CATCH_UP_ROTH = 1000;

  const investments = {
    retirementAccounts: [
      {
        id: 'traditional401k',
        name: '401(k)',
        returnRate: 0.07,
        icon: PiggyBank,
        description: 'Tax-deferred retirement account'
      },
      {
        id: 'rothIRA',
        name: 'Roth IRA',
        returnRate: 0.07,
        icon: DollarSign,
        description: 'Tax-free growth retirement account'
      }
    ],
    lowRisk: [
      {
        id: 'highYieldSavings',
        name: 'High-Yield Savings',
        returnRate: 0.045,
        icon: Wallet,
        description: '4.5% annual return, FDIC insured'
      },
      {
        id: 'bonds',
        name: 'Government Bonds',
        returnRate: 0.035,
        icon: Shield,
        description: '3.5% annual return, very stable'
      }
    ],
    mediumRisk: [
      {
        id: 'sp500',
        name: 'S&P 500 ETFs',
        returnRate: 0.10,
        icon: TrendingUp,
        description: '10% average annual return'
      },
      {
        id: 'realEstate',
        name: 'Rental Properties',
        returnRate: 0.08,
        icon: Building2,
        description: '8% annual return + property appreciation'
      }
    ],
    highRisk: [
      {
        id: 'commodities',
        name: 'Commodities',
        returnRate: 0.12,
        icon: Gem,
        description: '12% potential return, high volatility'
      },
      {
        id: 'crypto',
        name: 'Cryptocurrency',
        returnRate: 0.20,
        icon: Bitcoin,
        description: '20% potential return, extreme volatility'
      }
    ]
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
      const max401kContrib = currentYear >= CATCH_UP_AGE ? 
        MAX_401K_CONTRIBUTION + CATCH_UP_401K : 
        MAX_401K_CONTRIBUTION;
      
      const maxRothContrib = currentYear >= CATCH_UP_AGE ? 
        MAX_ROTH_CONTRIBUTION + CATCH_UP_ROTH : 
        MAX_ROTH_CONTRIBUTION;

      if (retirementAccounts.traditional401k.enabled) {
        const contribution = Math.min(retirementAccounts.traditional401k.contribution, max401kContrib);
        retirement401k += contribution;
        
        const matchContribution = Math.min(
          salary * retirementAccounts.traditional401k.employerMatch,
          salary * retirementAccounts.traditional401k.matchLimit
        );
        retirement401k += matchContribution;
        retirement401k *= (1 + investments.retirementAccounts[0].returnRate);
      }

      if (retirementAccounts.rothIRA.enabled) {
        const rothContribution = Math.min(retirementAccounts.rothIRA.contribution, maxRothContrib);
        rothIRA += rothContribution;
        rothIRA *= (1 + investments.retirementAccounts[1].returnRate);
      }

      let weightedReturn = 0;
      let enabledCount = 0;
      
      Object.entries(enabledInvestments).forEach(([id, enabled]) => {
        if (enabled) {
          const investment = [...investments.lowRisk, ...investments.mediumRisk, ...investments.highRisk]
            .find(inv => inv.id === id);
          if (investment) {
            weightedReturn += investment.returnRate;
            enabledCount++;
          }
        }
      });
      
      weightedReturn = enabledCount > 0 ? weightedReturn / enabledCount : 0;
      taxableInvestments *= (1 + weightedReturn);

      projectionData.push({
        age: currentYear,
        total401k: Math.round(retirement401k),
        rothIRA: Math.round(rothIRA),
        taxableInvestments: Math.round(taxableInvestments),
        total: Math.round(retirement401k + rothIRA + taxableInvestments)
      });
    }

    const totalRetirementNeeds = annualIncome * yearsInRetirement;
    const projectedRetirementAccounts = retirement401k + rothIRA;
    const additionalSavingsNeeded = Math.max(0, totalRetirementNeeds - projectedRetirementAccounts);
    
    return {
      projectionData,
      totalRetirementNeeds,
      projectedRetirementAccounts,
      additionalSavingsNeeded,
      monthlyInvestmentNeeded: (additionalSavingsNeeded / (yearsUntilRetirement * 12)).toFixed(2)
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
              <Label>Current Age</Label>
              <Input
                type="number"
                value={currentAge}
                onChange={(e) => setCurrentAge(Number(e.target.value))}
              />
            </div>
            <div>
              <Label>Retirement Age</Label>
              <Input
                type="number"
                value={retirementAge}
                onChange={(e) => setRetirementAge(Number(e.target.value))}
              />
            </div>
            <div>
              <Label>Annual Salary ($)</Label>
              <Input
                type="number"
                value={salary}
                onChange={(e) => setSalary(Number(e.target.value))}
              />
            </div>
            <div>
              <Label>Monthly Income Need ($)</Label>
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
                    </div>
                    <Switch
                      checked={retirementAccounts.traditional401k.enabled}
                      onCheckedChange={(checked) =>
                        setRetirementAccounts(prev => ({
                          ...prev,
                          traditional401k: { ...prev.traditional401k, enabled: checked }
                        }))
                      }
                    />
                  </div>
                  <Label className="text-sm text-gray-500">Annual Contribution ($)</Label>
                  <Slider
                    value={[retirementAccounts.traditional401k.contribution]}
                    min={0}
                    max={currentAge >= CATCH_UP_AGE ? MAX_401K_CONTRIBUTION + CATCH_UP_401K : MAX_401K_CONTRIBUTION}
                    step={500}
                    onValueChange={(value) =>
                      setRetirementAccounts(prev => ({
                        ...prev,
                        traditional401k: { ...prev.traditional401k, contribution: value[0] }
                      }))
                    }
                    className="mt-2"
                  />
                  <div className="text-sm text-right mt-1">
                    ${retirementAccounts.traditional401k.contribution.toLocaleString()}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      <Label>Roth IRA</Label>
                    </div>
                    <Switch
                      checked={retirementAccounts.rothIRA.enabled}
                      onCheckedChange={(checked) =>
                        setRetirementAccounts(prev => ({
                          ...prev,
                          rothIRA: { ...prev.rothIRA, enabled: checked }
                        }))
                      }
                    />
                  </div>
                  <Label className="text-sm text-gray-500">Annual Contribution ($)</Label>
                  <Slider
                    value={[retirementAccounts.rothIRA.contribution]}
                    min={0}
                    max={currentAge >= CATCH_UP_AGE ? MAX_ROTH_CONTRIBUTION + CATCH_UP_ROTH : MAX_ROTH_CONTRIBUTION}
                    step={500}
                    onValueChange={(value) =>
                      setRetirementAccounts(prev => ({
                        ...prev,
                        rothIRA: { ...prev.rothIRA, contribution: value[0] }
                      }))
                    }
                    className="mt-2"
                  />
                  <div className="text-sm text-right mt-1">
                    ${retirementAccounts.rothIRA.contribution.toLocaleString()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {Object.entries(investments).map(([category, invs]) => (
              category !== 'retirementAccounts' && (
                <Card key={category} className="p-4">
                  <CardTitle className="mb-4 flex items-center gap-2">
                    {category === 'lowRisk' && <Shield className="w-4 h-4" />}
                    {category === 'mediumRisk' && <TrendingUp className="w-4 h-4" />}
                    {category === 'highRisk' && <AlertTriangle className="w-4 h-4" />}
                    {category.replace(/([A-Z])/g, ' $1').split('_').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                    ).join(' ')}
                  </CardTitle>
                  {invs.map((investment) => (
                    <div key={investment.id} className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <investment.icon className="w-4 h-4" />
                        <div>
                          <div className="font-medium">{investment.name}</div>
                          <div className="text-sm text-gray-500">{investment.description}</div>
                        </div>
                      </div>
                      <Switch
                        checked={enabledInvestments[investment.id]}
                        onCheckedChange={(checked) => 
                          setEnabledInvestments(prev => ({...prev, [investment.id]: checked}))
                        }
                      />
                    </div>
                  ))}
                </Card>
              )
            ))}
          </div>

          <div className="h-64 w-full mb-6">
            <ResponsiveContainer>
              <LineChart data={results.projectionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="age" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Legend />
                <Line type="monotone" dataKey="total401k" name="401(k)" stroke="#8884d8" />
                <Line type="monotone" dataKey="rothIRA" name="Roth IRA" stroke="#82ca9d" />
                <Line type="monotone" dataKey="taxableInvestments" name="Taxable Investments" stroke="#ffc658" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <Card className="bg-blue-50">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-lg font-semibold">Total Needed</div>
                  <div className="text-2xl font-bold">${Math.round(results.totalRetirementNeeds).toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-lg font-semibold">Projected from Retirement Accounts</div>
                  <div className="text-2xl font-bold">${Math.round(results.projectedRetirementAccounts).toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-lg font-semibold">Additional Savings Needed</div>
                  <div className="text-2xl font-bold">${Math.round(results.additionalSavingsNeeded).toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-lg font-semibold">Monthly Investment Needed</div>
                  <div className="text-2xl font-bold">${Number(results.monthlyInvestmentNeeded).toLocaleString()}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default RetirementCalculator;