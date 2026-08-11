// src/app/components/dashboard/tokens/TokensTrendChart.tsx
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { MOCK_TOKENS_TREND } from "../dashboardData";
import { Cpu } from "lucide-react";

export function TokensTrendChart() {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-100 dark:border-neutral-800">
        <div>
          <h3 className="font-bold text-base text-neutral-900 dark:text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-purple-600" />
            Input vs Output Token Consumption Trend (Stacked Bar Chart)
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">Stacked breakdown of prompt context vs completion payload tokens.</p>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-blue-500" />
            <span className="text-neutral-600 dark:text-neutral-400">Input Tokens (Blue)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-500" />
            <span className="text-neutral-600 dark:text-neutral-400">Output Tokens (Green)</span>
          </div>
        </div>
      </div>

      <div className="h-[360px] w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={MOCK_TOKENS_TREND} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <XAxis dataKey="date" tickLine={false} axisLine={{ stroke: "#e5e5e5" }} tick={{ fontSize: 11, fill: "#888888" }} />
            <YAxis tickLine={false} axisLine={false} tickFormatter={(val) => `${val}M`} tick={{ fontSize: 11, fill: "#888888" }} />

            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-neutral-900 border border-neutral-800 text-white p-3 rounded-xl shadow-2xl text-xs space-y-1 z-[99999]">
                      <div className="font-bold border-b border-neutral-800 pb-1 text-purple-400">{label}</div>
                      <div className="flex justify-between gap-4"><span className="text-neutral-400">Input Tokens:</span><span className="font-mono font-bold text-blue-400">{data.inputTokens}M</span></div>
                      <div className="flex justify-between gap-4"><span className="text-neutral-400">Output Tokens:</span><span className="font-mono font-bold text-emerald-400">{data.outputTokens}M</span></div>
                      <div className="flex justify-between gap-4 border-t border-neutral-800 pt-1"><span className="text-neutral-400">Total Tokens:</span><span className="font-mono font-bold text-purple-300">{data.totalTokens}M</span></div>
                    </div>
                  );
                }
                return null;
              }}
            />

            <Bar dataKey="inputTokens" stackId="a" fill="#3b82f6" radius={[0, 0, 4, 4]} name="Input Tokens" />
            <Bar dataKey="outputTokens" stackId="a" fill="#10b981" radius={[4, 4, 0, 0]} name="Output Tokens" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
