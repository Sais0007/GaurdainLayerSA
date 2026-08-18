// src/app/components/dashboard/FinancialHealthOverview.tsx
import React from "react";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";

export function FinancialHealthOverview() {
  return (
    <div className="space-y-3 animate-fadeIn">
      {/* Section Header */}
      <div>
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800 text-emerald-600">
            <Wallet className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-base text-neutral-900 dark:text-white">
            Financial Health &amp; Budget Overview
          </h3>
        </div>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
          Primary financial impact metrics, budget burn pace, and projected end-of-cycle spend
        </p>
      </div>

      {/* 4 KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Period Spend */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 sm:p-5 shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
              Period Spend
            </span>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 dark:bg-rose-950/60 text-rose-600 border border-rose-200 dark:border-rose-800">
              <TrendingUp className="w-3 h-3" />
              <span>11.4%</span>
            </span>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white font-mono tracking-tight">
              $7,800.00
            </div>

            {/* Mini Blue Sparkline Bar Chart */}
            <div className="flex items-end gap-1 h-3 mt-3">
              {[40, 55, 30, 65, 80, 50, 75, 90, 85, 100].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-primary-600 rounded-xs opacity-90"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[11px]">
            <span className="text-neutral-400">Spend for selected period</span>
            <span className="font-mono text-neutral-500 dark:text-neutral-400">Avg/Req: $0.042</span>
          </div>
        </div>

        {/* KPI 2: Budget Utilization */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 sm:p-5 shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
              Budget Utilization
            </span>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-600 border border-amber-200 dark:border-amber-800">
              <TrendingUp className="w-3 h-3" />
              <span>11.4%</span>
            </span>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white font-mono tracking-tight">
              78%
            </div>

            {/* Blue-Indigo Progress Bar */}
            <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-2 rounded-full mt-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full transition-all"
                style={{ width: "78%" }}
              />
            </div>
          </div>

          <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[11px]">
            <span className="text-neutral-500">$7,800 of $10,000</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">On Track</span>
          </div>
        </div>

        {/* KPI 3: Remaining Budget */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 sm:p-5 shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
              Remaining Budget
            </span>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 border border-emerald-200 dark:border-emerald-800">
              <TrendingDown className="w-3 h-3" />
              <span>8.4%</span>
            </span>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono tracking-tight">
              $2,200.00
            </div>

            {/* Mini Emerald Bar Chart */}
            <div className="flex items-end gap-1 h-3 mt-3">
              {[100, 100, 100, 100, 40, 40, 20, 20, 20, 20].map((h, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-xs ${
                    i < 4 ? "bg-emerald-500" : "bg-neutral-200 dark:bg-neutral-800"
                  }`}
                  style={{ height: "100%" }}
                />
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[11px]">
            <span className="text-neutral-500">22% remaining &middot; 12 days left</span>
            <span className="font-mono text-neutral-500">Cap: $10,000</span>
          </div>
        </div>

        {/* KPI 4: Forecasted Cycle-End Spend */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 sm:p-5 shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
              Forecasted Cycle-End Spend
            </span>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 dark:bg-rose-950/60 text-rose-600 border border-rose-200 dark:border-rose-800">
              <TrendingUp className="w-3 h-3" />
              <span>2.2%</span>
            </span>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white font-mono tracking-tight">
              $10,218.00
            </div>

            {/* Dual Progress Bar (Blue + Red Overflow) */}
            <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-2 rounded-full mt-4 overflow-hidden flex">
              <div className="bg-blue-600 h-full w-[90%]" />
              <div className="bg-rose-500 h-full w-[10%]" />
            </div>
          </div>

          <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[11px]">
            <span className="font-semibold text-rose-600 dark:text-rose-400">Forecast: $218 over cap</span>
            <span className="text-neutral-400">Projected Total</span>
          </div>
        </div>
      </div>
    </div>
  );
}
