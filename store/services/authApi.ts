import { api } from "./api";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),

    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),

    refresh: builder.mutation({
      query: (refreshToken: string) => ({
        url: "/auth/refresh",
        method: "POST",
        body: { refreshToken },
      }),
    }),

    logoutApi: builder.mutation({
      query: (refreshToken: string) => ({
        url: "/auth/logout",
        method: "POST",
        body: { refreshToken }, // accessToken handled by prepareHeaders
      }),
    }),

    getUsers: builder.query({
      query: () => "/auth/users",
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useRefreshMutation,
  useLogoutApiMutation,
  useGetUsersQuery,
} = authApi;
