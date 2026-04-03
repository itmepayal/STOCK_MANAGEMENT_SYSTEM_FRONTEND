"use client";

import { useEffect, ReactNode } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "@/store/index";
import { setCredentials, setHydrated } from "@/store/features/auth/authSlice";

const safeParse = (value: string | null) => {
  try {
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error("Invalid JSON in localStorage:", error);
    return null;
  }
};

function ReduxHydrator({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const user = safeParse(localStorage.getItem("user"));
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (accessToken && refreshToken && user) {
        dispatch(setCredentials({ user, accessToken, refreshToken }));
      } else {
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    } catch (error) {
      console.error("Hydration error:", error);

      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    } finally {
      dispatch(setHydrated(true));
    }
  }, [dispatch]);

  return <>{children}</>;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <ReduxHydrator>{children}</ReduxHydrator>
    </Provider>
  );
}
