"use client";

import {
  useGetStockPerformanceQuery,
  useGetPortfolioQuery,
  useGetStockDataQuery,
  useGetMyStocksQuery,
  useGetTopMoversQuery,
  useGetStockRiskQuery,
  useGetCompaniesQuery,
  useGetStockPredictionQuery,
  useGetSummaryQuery,
  useCompareStocksQuery,
} from "@/store/services/stockApi";

export function useStocks(symbol?: string, symbol1?: string, symbol2?: string) {
  const getStockPerformance = useGetStockPerformanceQuery(symbol!, {
    skip: !symbol,
  });

  const getStockData = useGetStockDataQuery(symbol!, {
    skip: !symbol,
  });

  const getStockRisk = useGetStockRiskQuery(symbol!, {
    skip: !symbol,
  });

  const getPrediction = useGetStockPredictionQuery(symbol!, {
    skip: !symbol,
  });

  const getSummary = useGetSummaryQuery(symbol!, {
    skip: !symbol,
  });

  const getPortfolio = useGetPortfolioQuery();
  const getMyStocks = useGetMyStocksQuery();
  const getTopMovers = useGetTopMoversQuery();
  const getCompany = useGetCompaniesQuery();

  const getCompare = useCompareStocksQuery(
    { symbol1: symbol1!, symbol2: symbol2! },
    { skip: !symbol1 || !symbol2 },
  );

  return {
    getStockPerformance,
    getPortfolio,
    getStockData,
    getStockRisk,
    getMyStocks,
    getTopMovers,
    getCompany,
    getPrediction,
    getSummary,
    getCompare,
  };
}
