// src/app/components/dashboard/spend-budget/BudgetBurnTrajectory.tsx
import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { MOCK_BUDGET_BURN_DATA } from "../dashboardData";
import { TrendingUp, AlertCircle } from "lucide-react";

export function BudgetBurnTrajectory() {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-100 dark:border-neutral-800">
        <div>
          <h3 className="font-bold text-base text-neutral-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary-600" />
            Budget Burn Rate Trajectory (Hero Analytics)
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            30-day cumulative spend rate vs expected linear pace & $10,000 monthly limit.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-primary-600" />
            <span className="text-neutral-600 dark:text-neutral-400">Actual ($8.05K)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-purple-400 border border-dashed" />
            <span className="text-neutral-600 dark:text-neutral-400">Forecast ($8.69K)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-rose-500" />
            <span className="text-neutral-600 dark:text-neutral-400">Ceiling ($10.00K)</span>
          </div>
        </div>
      </div>

      <div className="h-[420px] w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={MOCK_BUDGET_BURN_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="heroActualGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.45} />
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="heroForecastGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <XAxis dataKey="date" tickLine={false} axisLine={{ stroke: "#e5e5e5" }} tick={{ fontSize: 11, fill: "#888888" }} />
            <YAxis tickLine={false} axisLine={false} tickFormatter={(val) => `$${(val / 1000).toFixed(1)}k`} tick={{ fontSize: 11, fill: "#888888" }} domain={[0, 11000]} />
            
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-neutral-900 border border-neutral-800 text-white p-3.5 rounded-xl shadow-2xl text-xs space-y-1 z-[99999]">
                      <div className="font-bold border-b border-neutral-800 pb-1 text-primary-400">{label}</div>
                      {data.actualSpend !== null && (
                        <div className="flex justify-between gap-4">
                          <span className="text-neutral-400">Actual Cumulative:</span>
                          <span className="font-mono font-bold text-emerald-400">${data.actualSpend.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between gap-4">
                        <span className="text-neutral-400">Forecasted Pace:</span>
                        <span className="font-mono font-bold text-purple-400">${data.forecastSpend.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between gap-4 border-t border-neutral-800 pt-1">
                        <span className="text-neutral-400">Monthly Ceiling:</span>
                        <span className="font-mono font-bold text-rose-400">${data.budgetCeiling.toFixed(2)}</span>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />

            <ReferenceLine y={10000} stroke="#ef4444" strokeDasharray="4 4" label={{ value: "Max Budget Ceiling: $10,000", fill: "#ef4444", fontSize: 11, position: "insideTopRight" }} />

            <Area type="monotone" dataKey="forecastSpend" stroke="#a855f7" strokeWidth={2} strokeDasharray="4 4" fill="url(#heroForecastGrad)" name="Forecasted Spend" />
            <Area type="monotone" dataKey="actualSpend" stroke="#4f46e5" strokeWidth={3} fill="url(#heroActualGrad)" name="Actual Spend" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center gap-2 p-3 rounded-xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-900/50 text-xs text-purple-800 dark:text-purple-300">
        <AlertCircle className="w-4 h-4 shrink-0 text-purple-600" />
        <span>
          <strong>Trajectory Summary:</strong> Spending velocity is running at <strong>86.9%</strong> of linear budget expectation. Monthly budget is projected to close at <strong>$8,694.00</strong> on Day 30.
        </span>
      </div>
    </div>
  );
}
