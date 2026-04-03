"use client";

import { useState, useEffect } from "react";
import { useStocks } from "@/hooks/use-stocks";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  History,
  Loader2,
  Sparkle,
  TrendingUpDownIcon,
} from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CompanyCards() {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(
    "RELIANCE.NS",
  );
  const [selectedCompany2, setSelectedCompany2] = useState<string | null>(null);
  const [selectedCompany3, setSelectedCompany3] = useState<string | null>(null);

  const { getCompany, getSummary, getPrediction } = useStocks(
    selectedCompany || undefined,
  );

  const { data: companyData, isLoading: companyLoading } = getCompany;
  const { data: summaryData, isLoading: summaryLoading } = getSummary;
  const { data: predictionData, isLoading: predictionLoading } = getPrediction;

  const { getCompare } = useStocks(
    undefined,
    selectedCompany2 || undefined,
    selectedCompany3 || undefined,
  );

  const { data: compareData, isLoading: compareLoading } = getCompare;

  const summary = summaryData?.data;
  const prediction = predictionData?.data;
  const companies = companyData?.data || [];

  useEffect(() => {
    if (companies.length >= 2) {
      if (!selectedCompany2) setSelectedCompany2(companies[0].symbol);
      if (!selectedCompany3) setSelectedCompany3(companies[1].symbol);
    }
  }, [companies]);

  if (companyLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin w-10 h-10 text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 px-4 lg:px-8 w-full">
      <div className="md:w-96 w-full">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Companies</h2>
          <p className="text-sm text-muted-foreground">
            Browse and manage companies you follow
          </p>
        </div>

        <ul className="border rounded-md overflow-hidden">
          {companies.map((company: any) => (
            <li
              key={company.symbol}
              className={`flex justify-between items-center py-3 px-4 cursor-pointer hover:bg-primary border-b ${
                selectedCompany === company.symbol ? "bg-primary/20" : ""
              }`}
              onClick={() => setSelectedCompany(company.symbol)}
            >
              <div className="font-medium">{company.name}</div>
              <Badge variant="outline">{company.sector || "N/A"}</Badge>
            </li>
          ))}
        </ul>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex-1 space-y-6 mt-14">
        {selectedCompany && (
          <div className="flex flex-col md:flex-row gap-6">
            {/* Summary */}
            <Card className="flex-1 p-6">
              <h3 className="font-semibold text-xl mb-4 flex gap-2">
                <History /> Summary
              </h3>

              {summaryLoading ? (
                <Loader2 className="animate-spin mx-auto" />
              ) : summary ? (
                <div className="space-y-3">
                  <p className="flex justify-between">
                    <span>Average Close</span>
                    <span>{summary.average_close?.toLocaleString()}</span>
                  </p>

                  <p className="flex justify-between">
                    <span>52W High</span>
                    <span className="text-green-600">
                      {summary.week_52_high?.toLocaleString()}
                    </span>
                  </p>

                  <p className="flex justify-between">
                    <span>52W Low</span>
                    <span className="text-red-600">
                      {summary.week_52_low?.toLocaleString()}
                    </span>
                  </p>

                  <Badge>{summary.symbol}</Badge>
                </div>
              ) : (
                <p>No data</p>
              )}
            </Card>

            {/* Prediction */}
            <Card className="flex-1 p-6">
              <h3 className="font-semibold text-xl mb-4 flex gap-3">
                <Brain /> Prediction
              </h3>

              {predictionLoading ? (
                <Loader2 className="animate-spin mx-auto" />
              ) : prediction ? (
                <div className="space-y-3">
                  <p className="flex justify-between">
                    <span>Current</span>
                    <span>{prediction.current_price}</span>
                  </p>

                  <p className="flex justify-between">
                    <span>Predicted</span>
                    <span className="text-blue-600">
                      {prediction.predicted_price}
                    </span>
                  </p>

                  <p className="flex items-center gap-2">
                    Trend:
                    {prediction.trend === "up" ? (
                      <TrendingUp className="text-green-600" />
                    ) : (
                      <TrendingDown className="text-red-600" />
                    )}
                  </p>
                </div>
              ) : (
                <p>No prediction</p>
              )}
            </Card>
          </div>
        )}

        {/* SELECTS */}
        <Card className="p-4">
          <div className="flex gap-4">
            <Select
              value={selectedCompany2 || ""}
              onValueChange={setSelectedCompany2}
            >
              <SelectTrigger>
                <SelectValue placeholder="Company 1" />
              </SelectTrigger>
              <SelectContent>
                {companies.map((c: any) => (
                  <SelectItem
                    key={c.symbol}
                    value={c.symbol}
                    disabled={c.symbol === selectedCompany3}
                  >
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedCompany3 || ""}
              onValueChange={setSelectedCompany3}
            >
              <SelectTrigger>
                <SelectValue placeholder="Company 2" />
              </SelectTrigger>
              <SelectContent>
                {companies.map((c: any) => (
                  <SelectItem
                    key={c.symbol}
                    value={c.symbol}
                    disabled={c.symbol === selectedCompany2}
                  >
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* COMPARISON */}
        {selectedCompany2 && selectedCompany3 && (
          <Card className="p-6 space-y-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <TrendingUpDownIcon /> Comparison
            </h3>

            {compareLoading ? (
              <Loader2 className="animate-spin mx-auto" />
            ) : compareData?.data ? (
              <>
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Stock 1 */}
                  <div className="border p-4 rounded-lg">
                    <h4>{compareData.data.symbol1}</h4>
                    <p>
                      Return:{" "}
                      <span
                        className={
                          compareData.data.performance_1?.return_pct > 0
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {compareData.data.performance_1?.return_pct?.toFixed(2)}
                        %
                      </span>
                    </p>
                  </div>

                  {/* Stock 2 */}
                  <div className="border p-4 rounded-lg">
                    <h4>{compareData.data.symbol2}</h4>
                    <p>
                      Return:{" "}
                      <span
                        className={
                          compareData.data.performance_2?.return_pct > 0
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {compareData.data.performance_2?.return_pct?.toFixed(2)}
                        %
                      </span>
                    </p>
                  </div>
                </div>

                {/* Insights */}
                <div className="border p-4 rounded-lg bg-muted/30">
                  <p>
                    Better Performer:{" "}
                    <Badge className="bg-green-600 text-white">
                      {compareData.data.better_performer}
                    </Badge>
                  </p>

                  <p>
                    Difference: {compareData.data.return_difference?.toFixed(2)}
                    %
                  </p>

                  <p className="text-sm text-muted-foreground mt-2">
                    {compareData.data.insight?.summary}
                  </p>

                  <p className="font-medium">
                    Recommendation:{" "}
                    <span className="text-primary">
                      {compareData.data.insight?.recommendation}
                    </span>
                  </p>
                </div>
              </>
            ) : (
              <p>No comparison data</p>
            )}
          </Card>
        )}
      </div>
    </div>
  );
}
