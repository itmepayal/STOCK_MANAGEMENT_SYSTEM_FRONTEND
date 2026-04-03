"use client";

import { RegisterForm } from "@/components/forms/register-form";
import { useAuthGuard } from "@/hooks/use-auth-guard";
import { TrendingUp } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  useAuthGuard("public");
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 self-center font-medium"
        >
          <TrendingUp className="w-7 h-7 text-indigo-500" />
          <h1 className="text-xl font-bold tracking-wide">StockAI</h1>
        </Link>
        <RegisterForm />
      </div>
    </div>
  );
}
