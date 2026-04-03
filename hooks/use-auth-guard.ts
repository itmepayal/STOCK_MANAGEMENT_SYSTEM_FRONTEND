"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type RouteType = "protected" | "public";

export const useAuthGuard = (type: RouteType) => {
  const router = useRouter();
  const accessToken = useSelector((state: any) => state.auth.accessToken);
  const [hydrated, setHydrated] = useState(false);

  // Ensure client hydration
  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    if (type === "protected" && !accessToken) {
      router.replace("/login");
    } else if (type === "public" && accessToken) {
      router.replace("/dashboard");
    }
  }, [hydrated, accessToken, router, type]);
};
