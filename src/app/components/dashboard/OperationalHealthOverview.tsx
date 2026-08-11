// src/app/components/dashboard/OperationalHealthOverview.tsx
import React from "react";
import { Zap, CheckCircle2, XCircle, Cpu } from "lucide-react";

export function OperationalHealthOverview() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      
      {/* KPI 1: Total Requests */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
            Total Requests
          </span>
          <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600">
            <Zap className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-extrabold text-neutral-900 dark:text-white mt-2 font-mono">
          182,640
        </div>
        <div className="text-[11px] font-medium text-neutral-400 mt-2">
          Avg ~6,088 reqs / day
        </div>
      </div>

      {/* KPI 2: Success Rate */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
            Success Rate
          </span>
          <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-600">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-2 font-mono flex items-baseline gap-2">
          <span>96.2%</span>
          <span className="text-xs font-medium text-neutral-400 font-sans">SLA Target 98%</span>
        </div>
        <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-2 rounded-full mt-3 overflow-hidden">
          <div className="bg-emerald-500 h-full rounded-full transition-all" style={{ width: "96.2%" }} />
        </div>
      </div>

      {/* KPI 3: Failed Requests */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
            Failed Requests
          </span>
          <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-600">
            <XCircle className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-extrabold text-rose-600 dark:text-rose-400 mt-2 font-mono">
          6,941
        </div>
        <div className="text-[11px] font-medium text-rose-500 mt-2">
          3.8% Failure Rate (Primary: 503 Provider Down)
        </div>
      </div>

      {/* KPI 4: Total Tokens */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
            Total Tokens Processed
          </span>
          <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-purple-600">
            <Cpu className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-extrabold text-neutral-900 dark:text-white mt-2 font-mono">
          16.4B
        </div>
        <div className="text-[11px] font-medium text-neutral-400 mt-2 font-mono">
          10.8B Input / 5.6B Output (1.93:1 Ratio)
        </div>
      </div>

    </div>
  );
}
