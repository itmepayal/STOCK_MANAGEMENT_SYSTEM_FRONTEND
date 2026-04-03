"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthState = {
  user: any | null;
  accessToken: string | null;
  refreshToken: string | null;
  hydrated: boolean;
};

export type SetCredentialsPayload = {
  user: any;
  accessToken: string;
  refreshToken: string;
};

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  hydrated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<SetCredentialsPayload>) => {
      const { user, accessToken, refreshToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.hydrated = true;

      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
      }
    },

    setHydrated: (state, action: PayloadAction<boolean>) => {
      state.hydrated = action.payload;
    },

    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.hydrated = true;

      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    },

    loadFromStorage: (state) => {
      if (typeof window !== "undefined") {
        const user = localStorage.getItem("user");
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        if (user && accessToken && refreshToken) {
          state.user = JSON.parse(user);
          state.accessToken = accessToken;
          state.refreshToken = refreshToken;
        }
        state.hydrated = true;
      }
    },
  },
});

export const { setCredentials, logout, setHydrated, loadFromStorage } =
  authSlice.actions;

export default authSlice.reducer;
