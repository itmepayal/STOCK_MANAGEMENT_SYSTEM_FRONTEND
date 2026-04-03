"use client";

import { useState } from "react";
import { useStocks } from "@/hooks/use-stocks";
import { Badge } from "@/components/ui/badge";
import { Loader2, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePortfolio } from "@/hooks/use-portfolio";
import { toast } from "sonner";

export function SettingsCard() {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(
    "RELIANCE.NS",
  );
  const [loadingSymbol, setLoadingSymbol] = useState<string | null>(null);

  const { followStock, unfollowStock } = usePortfolio();
  const { getCompany, getMyStocks } = useStocks();

  const { data: companyData, isLoading: companyLoading } = getCompany;

  const {
    data: myStocksData,
    refetch: refetchMyStocks,
    isFetching: stocksLoading,
  } = getMyStocks;

  const companies = companyData?.data || [];
  const stocks = myStocksData?.data?.data || [];

  const followedSet = new Set(stocks.map((item: any) => item.symbol));

  const isFollowed = (symbol: string) => followedSet.has(symbol);

  const handleFollow = async (symbol: string) => {
    setLoadingSymbol(symbol);
    try {
      await followStock(symbol).unwrap();

      toast("Stock Followed", {
        description: `${symbol} added to your portfolio`,
      });

      await refetchMyStocks();
    } catch (err: any) {
      toast("Error", {
        description: err?.data?.message || "Failed to follow stock",
      });
    } finally {
      setLoadingSymbol(null);
    }
  };

  const handleUnfollow = async (symbol: string) => {
    setLoadingSymbol(symbol);
    try {
      await unfollowStock(symbol).unwrap();

      toast("Stock Unfollowed", {
        description: `${symbol} removed from your portfolio`,
      });

      await refetchMyStocks();
    } catch (err: any) {
      toast("Error", {
        description: err?.data?.message || "Failed to unfollow stock",
      });
    } finally {
      setLoadingSymbol(null);
    }
  };

  if (companyLoading || stocksLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin w-10 h-10 text-primary" />
      </div>
    );
  }

  return (
    <div className="px-4 lg:px-8 w-full space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold">Stock Settings</h2>
        <p className="text-sm text-muted-foreground">
          Manage your followed stocks and preferences
        </p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {companies.map((company: any) => {
          const followed = isFollowed(company.symbol);
          const isLoading = loadingSymbol === company.symbol;

          return (
            <Card
              key={company.symbol}
              className={`cursor-pointer transition hover:shadow-md ${
                selectedCompany === company.symbol ? "border-primary" : ""
              }`}
              onClick={() => setSelectedCompany(company.symbol)}
            >
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{company.name}</span>
                  <Badge variant="outline">{company.sector || "N/A"}</Badge>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Symbol: {company.symbol}
                </p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    followed
                      ? handleUnfollow(company.symbol)
                      : handleFollow(company.symbol);
                  }}
                  disabled={isLoading}
                  className={`flex items-center justify-center w-full py-2 rounded-md transition ${
                    followed
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300 text-black"
                  } ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <Heart
                      className={`w-4 h-4 mr-2 ${followed ? "fill-white" : ""}`}
                    />
                  )}

                  {followed ? "Following" : "Follow"}
                </button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
