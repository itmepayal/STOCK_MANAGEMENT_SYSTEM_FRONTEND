"use client";

import * as React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { Loader2, TrendingUp, TrendingDown } from "lucide-react";
import { useStocks } from "@/hooks/use-stocks";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function StockCard() {
  const [selectedStock, setSelectedStock] = React.useState("RELIANCE.NS");
  const { getTopMovers, getStockRisk, getCompany, getStockPerformance } =
    useStocks(selectedStock);

  const movers = getTopMovers.data?.data || {};
  const risk = getStockRisk.data?.data;
  const companies = getCompany.data?.data || [];
  const performance = getStockPerformance.data?.data || {};

  const gainers = movers.top_gainers || [];
  const losers = movers.top_losers || [];

  const barData = [...gainers, ...losers].map((item: any) => ({
    symbol: item.symbol.replace(".NS", ""),
    value: Number((item.daily_return * 100).toFixed(2)),
    isPositive: item.daily_return > 0,
  }));

  const riskValue = risk ? Math.round(risk.risk_score * 100) : 0;
  const riskData = [{ name: "Risk", value: riskValue }];

  const trendColor =
    performance.trend === "up"
      ? "text-green-500"
      : performance.trend === "down"
        ? "text-red-500"
        : "text-gray-500";

  return (
    <div className="p-6 space-y-6">
      <div className="grid gap-6 md:grid-cols-3 sm:grid-cols-1">
        {/* ================= TOP MOVERS ================= */}
        <Card className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="absolute inset-0 bg-linear-to-r from-primary/10 to-transparent opacity-20 pointer-events-none" />
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Top Movers</CardTitle>
            <CardDescription>
              Market gainers & losers (real-time)
            </CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            {getTopMovers.isLoading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="animate-spin text-primary" />
              </div>
            ) : (
              <>
                <ResponsiveContainer width="100%" height="80%">
                  <BarChart data={barData}>
                    <defs>
                      <linearGradient id="gain" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-chart-2)" />
                        <stop offset="100%" stopColor="transparent" />
                      </linearGradient>
                      <linearGradient id="loss" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="0%"
                          stopColor="var(--color-destructive)"
                        />
                        <stop offset="100%" stopColor="transparent" />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis
                      dataKey="symbol"
                      tick={{ fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tickFormatter={(v) => `${v}%`}
                      tick={{ fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      cursor={{ fill: "rgba(255,255,255,0.05)" }}
                      contentStyle={{
                        background: "var(--color-card)",
                        borderRadius: "12px",
                        border: "1px solid var(--color-border)",
                      }}
                    />
                    <Bar
                      dataKey="value"
                      radius={[10, 10, 0, 0]}
                      animationDuration={1000}
                    >
                      {barData.map((entry, index) => (
                        <Cell
                          key={index}
                          fill={entry.isPositive ? "url(#gain)" : "url(#loss)"}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap justify-center mt-4 gap-2">
                  {barData.map((item) => (
                    <span
                      key={item.symbol}
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        item.isPositive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.symbol}: {item.value}%
                    </span>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* ================= RISK ================= */}
        <Card className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="absolute inset-0 bg-linear-to-r from-primary/10 to-transparent opacity-20 pointer-events-none" />
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              Risk Analysis
            </CardTitle>
            <CardDescription>AI-based stock risk overview</CardDescription>
          </CardHeader>
          <CardContent className="h-72 flex flex-col items-center justify-center gap-4">
            {getStockRisk.isLoading ? (
              <Loader2 className="animate-spin text-primary" />
            ) : (
              <>
                <div className="relative w-60 h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart
                      data={riskData}
                      innerRadius="70%"
                      outerRadius="100%"
                      startAngle={180}
                      endAngle={0}
                    >
                      <RadialBar
                        dataKey="value"
                        fill="rgba(255,255,255,0.08)"
                        cornerRadius={30}
                      />
                      <RadialBar
                        dataKey="value"
                        cornerRadius={30}
                        fill={
                          riskValue > 70
                            ? "#ef4444"
                            : riskValue > 40
                              ? "#f59e0b"
                              : "#22c55e"
                        }
                      />
                      <PolarAngleAxis
                        type="number"
                        domain={[0, 100]}
                        tick={false}
                      />
                    </RadialBarChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-5xl font-bold tracking-tight">
                      {riskValue}%
                    </div>
                    <div
                      className={`mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                        risk?.risk_level === "HIGH"
                          ? "bg-red-500/30 text-red-600 shadow-lg"
                          : risk?.risk_level === "MEDIUM"
                            ? "bg-yellow-500/30 text-yellow-600 shadow-md"
                            : "bg-green-500/30 text-green-600 shadow-md"
                      }`}
                    >
                      {risk?.risk_level}
                    </div>
                  </div>
                </div>
                <div className="text-center text-sm text-muted-foreground bg-primary/10 px-5 py-2 rounded-2xl">
                  {riskValue > 70
                    ? "High volatility detected. Trade cautiously"
                    : riskValue > 40
                      ? "Moderate risk. Watch trends closely"
                      : "Low risk. Stable movement expected"}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* ================= STOCK PERFORMANCE ================= */}
        <Card className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="absolute inset-0 bg-linear-to-r from-primary/10 to-transparent opacity-20 pointer-events-none" />
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Stock Performance
            </CardTitle>
            <CardDescription>Full performance overview</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {/* Stock selector */}
            {getCompany.isLoading ? (
              <Loader2 className="animate-spin text-primary" />
            ) : (
              <Select onValueChange={(value) => setSelectedStock(value)}>
                <SelectTrigger className="border border-border rounded-lg">
                  <SelectValue placeholder="Select a stock" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {companies.map((comp: any) => (
                      <SelectItem key={comp.symbol} value={comp.symbol}>
                        {comp.name} ({comp.symbol.replace(".NS", "")})
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}

            {getStockPerformance.isLoading ? (
              <div className="flex items-center justify-center mt-4">
                <Loader2 className="animate-spin text-primary" />
              </div>
            ) : performance ? (
              <div className="mt-4 space-y-2 text-sm">
                <div className="border px-3 py-2">
                  <strong>Start Price:</strong> ₹
                  {performance.start_price.toFixed(2)}
                </div>
                <div className="border px-3 py-2">
                  <strong>End Price:</strong> ₹
                  {performance.end_price.toFixed(2)}
                </div>
                <div className="border px-3 py-2 flex items-center gap-2">
                  <strong>Absolute Change:</strong>
                  <span
                    className={
                      performance.absolute_change >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {performance.absolute_change >= 0 ? "+" : ""}
                    {performance.absolute_change.toFixed(2)}
                  </span>
                </div>
                <div className="border px-3 py-2 flex items-center gap-2">
                  <strong>Return %:</strong>
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-semibold ${
                      performance.return_pct >= 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {performance.return_pct >= 0 ? "+" : ""}
                    {performance.return_pct.toFixed(2)}%
                  </span>
                  {performance.trend === "up" && (
                    <TrendingUp className="text-green-500" />
                  )}
                  {performance.trend === "down" && (
                    <TrendingDown className="text-red-500" />
                  )}
                </div>
                <div className="border px-3 py-2">
                  <strong>Trend:</strong>{" "}
                  <span className={trendColor}>
                    {performance.trend.toUpperCase()}
                  </span>
                </div>
              </div>
            ) : (
              <div className="mt-4 text-sm text-muted-foreground">
                No performance data
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
