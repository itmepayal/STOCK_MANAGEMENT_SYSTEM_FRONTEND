"use client";

import {
  useGetPortfolioQuery,
  useAddPortfolioMutation,
  useFollowStockMutation,
  useUnfollowStockMutation,
} from "@/store/services/portfolioApi";

export function usePortfolio() {
  // Query
  const portfolio = useGetPortfolioQuery();

  // Mutations
  const [addPortfolio, addPortfolioState] = useAddPortfolioMutation();
  const [followStock, followStockState] = useFollowStockMutation();
  const [unfollowStock, unfollowStockState] = useUnfollowStockMutation();

  return {
    // query
    portfolio,

    // triggers
    addPortfolio,
    followStock,
    unfollowStock,

    // states
    addPortfolioState,
    followStockState,
    unfollowStockState,
  };
}
