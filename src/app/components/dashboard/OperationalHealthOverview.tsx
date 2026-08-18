// src/app/components/dashboard/OperationalHealthOverview.tsx
import React from "react";
import { Activity, TrendingUp, TrendingDown, AlertTriangle, Cpu } from "lucide-react";

export function OperationalHealthOverview() {
  return (
    <div className="space-y-3 animate-fadeIn">
      {/* Section Header */}
      <div>
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-md bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800 text-blue-600">
            <Activity className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-base text-neutral-900 dark:text-white">
            Operational Health &amp; Gateway Volume
          </h3>
        </div>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
          Request processing totals, token volume, SLA success baseline, and error failure counts
        </p>
      </div>

      {/* 4 KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Total Requests */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 sm:p-5 shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
              Total Requests
            </span>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 border border-emerald-200 dark:border-emerald-800">
              <TrendingUp className="w-3 h-3" />
              <span>18.3%</span>
            </span>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white font-mono tracking-tight">
              182,640
            </div>

            {/* Mini Blue Sparkline Bar Chart */}
            <div className="flex items-end gap-1 h-3 mt-3">
              {[45, 60, 50, 75, 80, 65, 85, 90, 70, 100].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-primary-600 rounded-xs opacity-90"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[11px]">
            <span className="text-neutral-400">Processed during selected period</span>
            <span className="font-mono text-neutral-500 dark:text-neutral-400">Peak: 8,302/h</span>
          </div>
        </div>

        {/* KPI 2: Success Rate */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 sm:p-5 shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
              Success Rate
            </span>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 border border-emerald-200 dark:border-emerald-800">
              <TrendingUp className="w-3 h-3" />
              <span>1.8%</span>
            </span>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono tracking-tight">
              96.2%
            </div>

            {/* Solid Emerald Progress Bar */}
            <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-2 rounded-full mt-4 overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all"
                style={{ width: "96.2%" }}
              />
            </div>
          </div>

          <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[11px]">
            <span className="text-neutral-500">Target: 98% SLA</span>
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 rounded-full px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/60">
              &check; SLA Met
            </span>
          </div>
        </div>

        {/* KPI 3: Failed Requests (Red Warning Card Style) */}
        <div className="bg-rose-50/20 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 rounded-2xl p-4 sm:p-5 shadow-xs hover:border-rose-300 dark:hover:border-rose-800 transition-all flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              Failed Requests
            </span>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 dark:bg-rose-950/80 text-rose-600 border border-rose-200 dark:border-rose-800">
              <TrendingDown className="w-3 h-3" />
              <span>65%</span>
            </span>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-rose-600 dark:text-rose-400 font-mono tracking-tight">
              6,941
            </div>

            {/* Mini Red Sparkline Bar Chart with Spikes */}
            <div className="flex items-end gap-1 h-3 mt-3">
              {[20, 25, 20, 30, 90, 100, 85, 30, 20, 25].map((h, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-xs ${
                    h > 50 ? "bg-rose-600" : "bg-rose-300 dark:bg-rose-800/80"
                  }`}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-rose-200/60 dark:border-rose-900/60 flex items-center justify-between text-[11px]">
            <span className="font-semibold text-rose-600 dark:text-rose-400">72% Claude 3.5 Sonnet</span>
            <span className="font-semibold text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-900/60 border border-rose-200 dark:border-rose-800 rounded-md px-1.5 py-0.5">
              Incident Window
            </span>
          </div>
        </div>

        {/* KPI 4: Total Tokens */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 sm:p-5 shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-purple-600" />
              Total Tokens
            </span>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-purple-50 dark:bg-purple-950/60 text-purple-600 border border-purple-200 dark:border-purple-800">
              <TrendingUp className="w-3 h-3" />
              <span>14.1%</span>
            </span>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white font-mono tracking-tight">
              16.4B
            </div>

            {/* Dual Progress Bar (Blue Input + Purple Output) */}
            <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-2 rounded-full mt-4 overflow-hidden flex">
              <div className="bg-blue-600 h-full w-[65.8%]" />
              <div className="bg-purple-600 h-full w-[34.2%]" />
            </div>
          </div>

          <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[11px]">
            <span className="text-neutral-500">10.8B Input &middot; 5.6B Output</span>
            <span className="font-mono text-neutral-500">Avg: 89,800/req</span>
          </div>
        </div>
      </div>
    </div>
  );
}
