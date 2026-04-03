"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Loader2 } from "lucide-react";
import { useStocks } from "@/hooks/use-stocks";

export function ChartAreaInteractive() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("90d");

  const { getStockData } = useStocks("RELIANCE.NS");

  React.useEffect(() => {
    if (isMobile) setTimeRange("7d");
  }, [isMobile]);

  const apiData = getStockData.data?.data || [];

  const sortedData = [...apiData].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  const chartData = sortedData.map((item: any) => ({
    date: item.date,
    price: Number(item.close.toFixed(2)),
  }));

  const filteredData = chartData.filter((item: any) => {
    const date = new Date(item.date);
    const referenceDate = new Date(chartData[chartData.length - 1]?.date);

    let days = 90;
    if (timeRange === "30d") days = 30;
    if (timeRange === "7d") days = 7;

    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - days);

    return date >= startDate;
  });

  const chartConfig = {
    price: {
      label: "Closing Price",
      color: "#4f46e5",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stock Performance</CardTitle>
        <CardDescription>Closing price trend over time</CardDescription>

        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={(val) => val && setTimeRange(val)}
            variant="outline"
          >
            <ToggleGroupItem value="90d">90d</ToggleGroupItem>
            <ToggleGroupItem value="30d">30d</ToggleGroupItem>
            <ToggleGroupItem value="7d">7d</ToggleGroupItem>
          </ToggleGroup>
        </CardAction>
      </CardHeader>

      <CardContent className="h-72 flex items-center justify-center">
        {getStockData.isLoading && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading chart...
          </div>
        )}

        {getStockData.isError && (
          <div className="text-red-500 text-sm">Failed to load data</div>
        )}

        {!getStockData.isLoading &&
          !getStockData.isError &&
          filteredData.length === 0 && (
            <div className="text-muted-foreground text-sm">
              No data available
            </div>
          )}

        {!getStockData.isLoading &&
          !getStockData.isError &&
          filteredData.length > 0 && (
            <ChartContainer config={chartConfig} className="w-full h-full">
              <AreaChart data={filteredData}>
                {/* Gradient */}
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-price)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-price)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid vertical={false} />

                <XAxis
                  dataKey="date"
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                />

                <YAxis
                  domain={["dataMin - 20", "dataMax + 20"]}
                  tickFormatter={(value) => `₹${value}`}
                />

                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      labelFormatter={(value) =>
                        new Date(value).toLocaleDateString()
                      }
                    />
                  }
                />

                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="var(--color-price)"
                  fill="url(#colorPrice)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          )}
      </CardContent>
    </Card>
  );
}
