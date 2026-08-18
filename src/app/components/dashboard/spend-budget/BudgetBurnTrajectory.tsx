// src/app/components/dashboard/spend-budget/BudgetBurnTrajectory.tsx
import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { MOCK_BUDGET_BURN_DATA } from "../dashboardData";
import { DollarSign, ShieldCheck } from "lucide-react";

export function BudgetBurnTrajectory() {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs space-y-5 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-100 dark:border-neutral-800">
        <div>
          <h3 className="font-bold text-base text-neutral-900 dark:text-white flex items-center gap-2">
            <span className="p-1 rounded-md bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600">
              <DollarSign className="w-4 h-4" />
            </span>
            Budget Burn Rate Trajectory
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Cumulative organization spend versus monthly budget trajectory
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-600 border border-amber-200 dark:border-amber-800 self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <span>Near Limit</span>
        </span>
      </div>

      {/* Main Chart Area */}
      <div className="h-[340px] w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={MOCK_BUDGET_BURN_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="spendActualGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <XAxis dataKey="date" tickLine={false} axisLine={{ stroke: "#e5e5e5" }} tick={{ fontSize: 11, fill: "#888888" }} />
            <YAxis tickLine={false} axisLine={false} tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`} tick={{ fontSize: 11, fill: "#888888" }} domain={[0, 11000]} />

            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-neutral-900 border border-neutral-800 text-white p-3.5 rounded-xl shadow-2xl text-xs space-y-1.5 z-[99999]">
                      <div className="font-bold border-b border-neutral-800 pb-1 text-primary-400">{label}</div>
                      {data.actualSpend !== null && (
                        <div className="flex justify-between gap-4">
                          <span className="text-neutral-400">Current Spend:</span>
                          <span className="font-mono font-bold text-white">${data.actualSpend.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between gap-4">
                        <span className="text-neutral-400">Expected Pace:</span>
                        <span className="font-mono font-bold text-amber-400">${data.forecastSpend.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between gap-4 border-t border-neutral-800 pt-1">
                        <span className="text-neutral-400">Variance:</span>
                        <span className="font-mono font-bold text-emerald-400">+$8,050</span>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />

            <ReferenceLine y={10000} stroke="#ef4444" strokeDasharray="3 3" label={{ value: "Budget Ceiling $10,000 Cap", fill: "#ef4444", fontSize: 11, position: "top" }} />

            <Area type="monotone" dataKey="forecastSpend" stroke="#f59e0b" strokeWidth={2} strokeDasharray="4 4" fill="none" name="Forecast Pace" />
            <Area type="monotone" dataKey="actualSpend" stroke="#4f46e5" strokeWidth={3} fill="url(#spendActualGrad)" name="Actual Cumulative Spend" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Legends */}
      <div className="flex flex-wrap items-center justify-center gap-6 text-xs border-t border-b border-neutral-100 dark:border-neutral-800 py-2.5">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
          <span className="font-medium text-neutral-700 dark:text-neutral-300">Actual Cumulative Spend</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <span className="font-medium text-neutral-700 dark:text-neutral-300">Forecast Pace</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
          <span className="font-medium text-neutral-700 dark:text-neutral-300">Budget Ceiling $10,000 Cap</span>
        </div>
      </div>

      {/* 4 Bottom Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
        <div className="p-3.5 bg-neutral-50 dark:bg-neutral-850 rounded-xl border border-neutral-200/60 dark:border-neutral-800 space-y-1">
          <div className="flex items-center justify-between text-neutral-500">
            <span>Current Period Spend</span>
            <DollarSign className="w-3.5 h-3.5" />
          </div>
          <div className="text-lg font-extrabold font-mono text-neutral-900 dark:text-white">$8,050</div>
          <div className="text-[10px] text-neutral-400">Increase spend for period billing cycle</div>
        </div>

        <div className="p-3.5 bg-neutral-50 dark:bg-neutral-850 rounded-xl border border-neutral-200/60 dark:border-neutral-800 space-y-1">
          <div className="flex items-center justify-between text-neutral-500">
            <span>Monthly Budget Cap</span>
            <DollarSign className="w-3.5 h-3.5" />
          </div>
          <div className="text-lg font-extrabold font-mono text-neutral-900 dark:text-white">$10,000</div>
          <div className="text-[10px] text-neutral-400">Configured organization ceiling cap</div>
        </div>

        <div className="p-3.5 bg-neutral-50 dark:bg-neutral-850 rounded-xl border border-neutral-200/60 dark:border-neutral-800 space-y-1">
          <div className="flex items-center justify-between text-neutral-500">
            <span>Projected End-of-Month</span>
            <DollarSign className="w-3.5 h-3.5" />
          </div>
          <div className="text-lg font-extrabold font-mono text-primary-600 dark:text-primary-400">$8,694</div>
          <div className="text-[10px] text-neutral-400">Month-end trajectory forecast</div>
        </div>

        <div className="p-3.5 bg-neutral-50 dark:bg-neutral-850 rounded-xl border border-neutral-200/60 dark:border-neutral-800 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-neutral-500">Budget Variance</span>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-1.5 py-0.5 rounded-full">
              &bull; Under Cap
            </span>
          </div>
          <div className="text-lg font-extrabold font-mono text-emerald-600 dark:text-emerald-400">+$1,306 below cap</div>
          <div className="text-[10px] text-neutral-400">13.1% available safety buffer</div>
        </div>
      </div>
    </div>
  );
}
