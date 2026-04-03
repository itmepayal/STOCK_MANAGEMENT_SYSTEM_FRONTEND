"use client";

import Link from "next/link";
import { TrendingUp } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-700 mt-20 py-8 px-6 md:px-16 lg:px-24 xl:px-32 text-slate-400">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-indigo-500" />
          <span className="font-semibold text-white">StockAI</span>
        </Link>

        {/* Links */}
        <div className="flex gap-6 text-sm">
          <Link href="/" className="hover:text-white transition">
            Home
          </Link>
          <Link href="/login" className="hover:text-white transition">
            Login
          </Link>
          <Link href="/dashboard" className="hover:text-white transition">
            Dashboard
          </Link>
        </div>

        {/* Developer */}
        <p className="text-sm text-slate-400">
          Developed by{" "}
          <span className="text-white font-medium">Payal Yadav</span>
        </p>

        {/* Copyright */}
        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} StockAI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
