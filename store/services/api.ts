import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./base";

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Auth"],
  endpoints: () => ({}),
});
