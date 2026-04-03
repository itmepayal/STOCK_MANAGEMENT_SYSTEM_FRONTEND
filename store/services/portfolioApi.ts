import { api } from "./api";

export const portfolioApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getPortfolio: builder.query<any, void>({
      query: () => "/portfolio/",
    }),

    addPortfolio: builder.mutation<any, any>({
      query: (data) => ({
        url: "/portfolio/",
        method: "POST",
        body: data,
      }),
    }),

    followStock: builder.mutation<any, string>({
      query: (symbol) => ({
        url: `/stocks/follow/${symbol}/`,
        method: "POST",
      }),
    }),

    myStocks: builder.mutation<any, string>({
      query: (symbol) => ({
        url: `/stocks/my-stocks/`,
        method: "GET",
      }),
    }),

    unfollowStock: builder.mutation<any, string>({
      query: (symbol) => ({
        url: `/stocks/unfollow/${symbol}/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetPortfolioQuery,
  useAddPortfolioMutation,
  useFollowStockMutation,
  useUnfollowStockMutation,
} = portfolioApi;
