// src/app/components/dashboard/FinancialHealthOverview.tsx
import React from "react";
import { DollarSign, PieChart, Wallet, TrendingUp } from "lucide-react";

export function FinancialHealthOverview() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      
      {/* KPI 1: Period Spend */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
            Period Spend
          </span>
          <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-600">
            <DollarSign className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-extrabold text-neutral-900 dark:text-white mt-2 font-mono">
          $8,050.00
        </div>
        <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-emerald-600">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>+12.4% vs last period</span>
        </div>
      </div>

      {/* KPI 2: Budget Utilization */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
            Budget Utilization
          </span>
          <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-600">
            <PieChart className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-extrabold text-neutral-900 dark:text-white mt-2 font-mono flex items-baseline gap-2">
          <span>78.0%</span>
          <span className="text-xs font-normal text-neutral-400 font-sans">of $10.0K cap</span>
        </div>
        <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-2 rounded-full mt-3 overflow-hidden">
          <div className="bg-amber-500 h-full rounded-full transition-all" style={{ width: "78%" }} />
        </div>
      </div>

      {/* KPI 3: Remaining Budget */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
            Remaining Budget
          </span>
          <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600">
            <Wallet className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-extrabold text-neutral-900 dark:text-white mt-2 font-mono">
          $2,271.00
        </div>
        <div className="text-[11px] font-medium text-neutral-400 mt-2">
          Resets on Sep 1, 2026 (Monthly)
        </div>
      </div>

      {/* KPI 4: Forecasted End Spend */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
            Forecasted End Spend
          </span>
          <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-purple-600">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-extrabold text-neutral-900 dark:text-white mt-2 font-mono">
          $8,694.00
        </div>
        <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-emerald-600">
          <span>Well within $10,000 ceiling</span>
        </div>
      </div>

    </div>
  );
}
