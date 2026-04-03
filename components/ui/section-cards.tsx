"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useStocks } from "@/hooks/use-stocks";
import { TrendingUpIcon, TrendingDownIcon } from "lucide-react";

export function SectionCards() {
  const { getPortfolio } = useStocks();

  const { data: portfolioData, isLoading: portfolioLoading } = getPortfolio;

  const summary = portfolioData?.data?.summary;
  const totalInvested = summary?.total_invested || 0;
  const totalValue = summary?.total_value || 0;
  const totalProfit = summary?.total_profit || 0;
  const totalProfitPercent = summary?.total_profit_percent || 0;

  const activeStocks = portfolioData?.data?.stocks?.length || 0;

  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {/* Total Invested */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Invested</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums">
            ${totalInvested.toLocaleString()}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {totalProfit >= 0 ? <TrendingUpIcon /> : <TrendingDownIcon />}
              {totalProfitPercent.toFixed(2)}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {totalProfit >= 0 ? "Profit increase" : "Loss"}{" "}
            {totalProfit >= 0 ? (
              <TrendingUpIcon className="size-4" />
            ) : (
              <TrendingDownIcon className="size-4" />
            )}
          </div>
          <div className="text-muted-foreground">Portfolio overview</div>
        </CardFooter>
      </Card>

      {/* Total Current Value */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Current Value</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums">
            ${totalValue.toLocaleString()}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {totalProfit >= 0 ? <TrendingUpIcon /> : <TrendingDownIcon />}
              {totalProfit >= 0 ? "+" : ""}
              {totalProfitPercent.toFixed(2)}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {totalProfit >= 0 ? "Profit" : "Loss"}{" "}
            {totalProfit >= 0 ? (
              <TrendingUpIcon className="size-4" />
            ) : (
              <TrendingDownIcon className="size-4" />
            )}
          </div>
          <div className="text-muted-foreground">
            Compared to total invested
          </div>
        </CardFooter>
      </Card>

      {/* Active Stocks */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Active Stocks</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums">
            {activeStocks}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUpIcon />
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Number of stocks in portfolio
          </div>
        </CardFooter>
      </Card>

      {/* Example Growth / Profit Card */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Portfolio Growth</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums">
            {totalProfitPercent.toFixed(2)}%
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {totalProfit >= 0 ? <TrendingUpIcon /> : <TrendingDownIcon />}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {totalProfit >= 0 ? "Positive growth" : "Negative growth"}
          </div>
          <div className="text-muted-foreground">Portfolio performance</div>
        </CardFooter>
      </Card>
    </div>
  );
}
