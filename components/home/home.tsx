"use client";

import { useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { TrendingUp, BarChart3, Menu, X } from "lucide-react";

export function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const accessToken = useSelector((state: any) => state.auth.accessToken);
  const isLoggedIn = !!accessToken;

  return (
    <section className="flex flex-col items-center text-white text-sm font-[Poppins] relative overflow-hidden">
      {/* Background */}
      <svg
        className="absolute -z-10 w-screen -mt-40 md:mt-0"
        width="1440"
        height="676"
        viewBox="0 0 1440 676"
        fill="none"
      >
        <rect
          x="-92"
          y="-948"
          width="1624"
          height="1624"
          rx="812"
          fill="url(#a)"
        />
        <defs>
          <radialGradient
            id="a"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="rotate(90 428 292)scale(812)"
          >
            <stop offset=".63" stopColor="#372AAC" stopOpacity="0" />
            <stop offset="1" stopColor="#372AAC" />
          </radialGradient>
        </defs>
      </svg>

      {/* Navbar */}
      <nav className="z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-32 backdrop-blur">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <TrendingUp className="w-7 h-7 text-indigo-500" />
          <h1 className="text-xl font-bold tracking-wide">StockAI</h1>
        </Link>

        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <Link href="/dashboard">
              <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md transition">
                Dashboard
              </button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <button className="px-6 py-2 border border-slate-400 rounded-md hover:bg-slate-300/20 transition">
                  Login
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-100 bg-black/60 backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded"
        >
          <X className="w-5 h-5" />
          Close
        </button>
      </div>

      {/* Hero Badge */}
      <div className="flex items-center mt-32 gap-2 border border-slate-600 rounded-full px-4 py-2">
        <TrendingUp className="w-4 h-4 text-green-500" />
        <span>Real-time stock insights & predictions</span>
      </div>

      {/* Heading */}
      <h1 className="text-center text-4xl md:text-6xl mt-4 font-semibold max-w-4xl leading-tight">
        Smarter Stock Trading with AI Insights
      </h1>

      {/* Description */}
      <p className="text-center max-w-lg mt-3 text-slate-300">
        Analyze markets, track your portfolio, and make data-driven investment
        decisions — all in one powerful platform built for modern traders.
      </p>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row items-center gap-4 mt-8">
        {isLoggedIn && (
          <Link href="/dashboard">
            <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-7 h-11 rounded-lg transition">
              <BarChart3 className="w-5 h-5" />
              Get started
            </button>
          </Link>
        )}

        <Link href="#visualization">
          <button className="flex items-center gap-2 border border-slate-400 px-8 h-11 rounded-lg hover:bg-white/10 transition">
            <TrendingUp className="w-5 h-5" />
            View Market Trends
          </button>
        </Link>
      </div>

      {/* Image */}
      <img
        src="./dashboard.png"
        alt="hero"
        className="w-full max-w-4xl mt-16 border p-3 rounded-xl"
      />
    </section>
  );
}
