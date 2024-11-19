import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ProjectionSummary = ({
  results,
  monthlyIncome,
  currentAge,
  retirementAge,
}: {
  results: any;
  monthlyIncome: number;
  currentAge: number;
  retirementAge: number;
}) => (
  <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
    <div className="max-w-6xl mx-auto">
      <Card className="rounded-none border-0 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <TooltipProvider>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <Tooltip>
                  <TooltipTrigger className="w-full">
                    <div className="text-sm font-medium text-gray-500">
                      Total Needed
                    </div>
                    <div className="text-xl font-bold text-blue-600">
                      $
                      {Math.round(
                        results.totalRetirementNeeds
                      ).toLocaleString()}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs p-4">
                    <p className="font-semibold mb-2">
                      How this is calculated:
                    </p>
                    <ul className="list-disc pl-4 text-sm">
                      <li>Monthly Need: ${monthlyIncome.toLocaleString()}</li>
                      <li>
                        Adjusted for {retirementAge - currentAge} years of
                        inflation at 3%
                      </li>
                      <li>
                        Multiplied by years in retirement ({90 - retirementAge})
                      </li>
                      <li>
                        Considers all income sources including rental income
                      </li>
                    </ul>
                  </TooltipContent>
                </Tooltip>
              </div>

              <div className="bg-white rounded-lg p-3 shadow-sm">
                <Tooltip>
                  <TooltipTrigger className="w-full">
                    <div className="text-sm font-medium text-gray-500">
                      Projected Total Assets
                    </div>
                    <div className="text-xl font-bold text-green-600">
                      $
                      {Math.round(
                        results.projectedRetirementAccounts
                      ).toLocaleString()}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs p-4">
                    <p className="font-semibold mb-2">
                      Total of all assets at retirement:
                    </p>
                    <ul className="list-disc pl-4 text-sm">
                      <li>401(k) and IRA balances</li>
                      <li>Property equity (appreciated value)</li>
                      <li>Manual savings (taxable & tax-advantaged)</li>
                      <li>Growth based on selected investment mix</li>
                      <li>Includes all contributions and employer matches</li>
                    </ul>
                  </TooltipContent>
                </Tooltip>
              </div>

              <div className="bg-white rounded-lg p-3 shadow-sm">
                <Tooltip>
                  <TooltipTrigger className="w-full">
                    <div className="text-sm font-medium text-gray-500">
                      Additional Savings Needed
                    </div>
                    <div className="text-xl font-bold text-purple-600">
                      $
                      {Math.round(
                        results.additionalSavingsNeeded
                      ).toLocaleString()}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs p-4">
                    <p className="font-semibold mb-2">Shortfall calculation:</p>
                    <ul className="list-disc pl-4 text-sm">
                      <li>Total needed minus projected assets</li>
                      <li>Considers all income sources</li>
                      <li>Accounts for rental income</li>
                      <li>Based on 4% safe withdrawal rate</li>
                    </ul>
                  </TooltipContent>
                </Tooltip>
              </div>

              <div className="bg-white rounded-lg p-3 shadow-sm">
                <Tooltip>
                  <TooltipTrigger className="w-full">
                    <div className="text-sm font-medium text-gray-500">
                      Monthly Investment Needed
                    </div>
                    <div className="text-xl font-bold text-orange-600">
                      $
                      {Number(results.monthlyInvestmentNeeded).toLocaleString()}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs p-4">
                    <p className="font-semibold mb-2">
                      Additional monthly savings required:
                    </p>
                    <ul className="list-disc pl-4 text-sm">
                      <li>
                        Additional savings needed divided by months until
                        retirement
                      </li>
                      <li>Beyond current contributions</li>
                      <li>Assumes selected investment returns</li>
                      <li>Consider increasing current contributions first</li>
                    </ul>
                  </TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default ProjectionSummary;
