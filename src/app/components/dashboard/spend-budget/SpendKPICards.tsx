// src/app/components/dashboard/spend-budget/SpendKPICards.tsx
import React from "react";
import { DollarSign, PieChart, Wallet, TrendingUp } from "lucide-react";

export function SpendKPICards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      
      {/* 1. Period Total Spend */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">Total Period Spend</span>
          <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 border border-emerald-200 dark:border-emerald-800">
            <DollarSign className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-extrabold text-neutral-900 dark:text-white mt-2 font-mono">$8,050.00</div>
        <div className="text-xs text-emerald-600 font-semibold mt-2 flex items-center gap-1">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>+12.4% vs previous month</span>
        </div>
      </div>

      {/* 2. Budget Utilization % */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">Budget Utilization</span>
          <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 border border-amber-200 dark:border-amber-800">
            <PieChart className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-extrabold text-neutral-900 dark:text-white mt-2 font-mono flex items-baseline gap-2">
          <span>78.0%</span>
          <span className="text-xs text-neutral-400 font-normal font-sans">Cap: $10.0K</span>
        </div>
        <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-2 rounded-full mt-3 overflow-hidden">
          <div className="bg-amber-500 h-full rounded-full transition-all" style={{ width: "78%" }} />
        </div>
      </div>

      {/* 3. Remaining Allocation */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">Remaining Budget</span>
          <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 border border-blue-200 dark:border-blue-800">
            <Wallet className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-extrabold text-neutral-900 dark:text-white mt-2 font-mono">$2,271.00</div>
        <div className="text-[11px] font-medium text-neutral-400 mt-2">7 Days remaining in billing cycle</div>
      </div>

      {/* 4. Projected End Spend */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">Forecasted Month End</span>
          <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 border border-purple-200 dark:border-purple-800">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-extrabold text-neutral-900 dark:text-white mt-2 font-mono">$8,694.00</div>
        <div className="text-xs text-emerald-600 font-semibold mt-2">No budget breach predicted</div>
      </div>

    </div>
  );
}
