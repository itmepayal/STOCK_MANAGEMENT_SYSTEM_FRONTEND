import { api } from "./api";

export const stockApi = api.injectEndpoints({
  endpoints: (builder) => ({
    loadAll: builder.mutation({
      query: () => ({
        url: "/stocks/load-all/",
        method: "POST",
      }),
    }),

    getStockData: builder.query<any, string>({
      query: (symbol) => `/stocks/data/${symbol}`,
    }),

    getCompanies: builder.query<any, void>({
      query: () => "/stocks/companies",
    }),

    getSummary: builder.query<any, string>({
      query: (symbol) => `/stocks/summary/${symbol}`,
    }),

    followStock: builder.mutation({
      query: (symbol) => ({
        url: `/stocks/follow/${symbol}`,
        method: "POST",
      }),
    }),

    unfollowStock: builder.mutation({
      query: (symbol) => ({
        url: `/stocks/unfollow/${symbol}`,
        method: "DELETE",
      }),
    }),

    getMyStocks: builder.query<any, void>({
      query: () => "/stocks/my-stocks",
    }),

    getTopMovers: builder.query<any, void>({
      query: () => "/stocks/top-movers",
    }),

    compareStocks: builder.query<any, Record<string, any>>({
      query: (params) => ({
        url: "/stocks/compare",
        params,
      }),
    }),

    getStockRisk: builder.query<any, string>({
      query: (symbol) => `/stocks/risk/${symbol}`,
    }),

    getStockPerformance: builder.query<any, string>({
      query: (symbol) => `/stocks/performance/${symbol}`,
    }),

    getStockPrediction: builder.query<any, string>({
      query: (symbol) => `/stocks/predict/${symbol}`,
    }),

    getPortfolio: builder.query<any, void>({
      query: () => "/portfolio/",
    }),

    addPortfolioItem: builder.mutation<any, { symbol: string; amount: number }>(
      {
        query: (body) => ({
          url: "/portfolio/",
          method: "POST",
          body,
        }),
      },
    ),
  }),
  overrideExisting: true,
});

export const {
  useLoadAllMutation,
  useGetStockDataQuery,
  useGetCompaniesQuery,
  useGetSummaryQuery,
  useFollowStockMutation,
  useUnfollowStockMutation,
  useGetMyStocksQuery,
  useGetTopMoversQuery,
  useCompareStocksQuery,
  useGetStockRiskQuery,
  useGetStockPerformanceQuery,
  useGetStockPredictionQuery,
  useGetPortfolioQuery,
  useAddPortfolioItemMutation,
} = stockApi;
