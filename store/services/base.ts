import { fetchBaseQuery, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/store";
import { setCredentials, logout } from "@/store/features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://stock-management-system-qgvh.onrender.com",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<any, unknown, unknown> = async (
  args,
  api,
  extraOptions,
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (
    result.error &&
    (result.error.status === 401 || result.error.status === "FETCH_ERROR")
  ) {
    if ((args as any).url === "/auth/refresh") {
      api.dispatch(logout());
      return result;
    }

    const state = api.getState() as RootState;
    const refreshToken = state.auth.refreshToken;

    if (!refreshToken) {
      api.dispatch(logout());
      return result;
    }

    const refreshResult: any = await baseQuery(
      {
        url: "/auth/refresh",
        method: "POST",
        body: { refresh_token: refreshToken },
      },
      api,
      extraOptions,
    );

    const refreshData = refreshResult?.data?.data;

    console.log(refreshResult);
    console.log(refreshData);

    if (refreshData) {
      api.dispatch(
        setCredentials({
          user: state.auth.user,
          accessToken: refreshData.access_token,
          refreshToken: refreshData.refresh_token,
        }),
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export default baseQueryWithReauth;
