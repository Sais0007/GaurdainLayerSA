// src/app/components/dashboard/spend-budget/SpendDistributionCard.tsx
import React from "react";
import { PieChart as RechartsPie, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { PieChart } from "lucide-react";

export function SpendDistributionCard() {
  const data = [
    { name: "Anthropic", value: 3620.00, color: "#8b5cf6" },
    { name: "OpenAI", value: 2480.50, color: "#3b82f6" },
    { name: "Google Gemini", value: 1120.00, color: "#10b981" },
    { name: "DeepSeek", value: 540.25, color: "#f59e0b" },
    { name: "Meta (Llama)", value: 289.25, color: "#ec4899" },
  ];

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
        <div>
          <h3 className="font-bold text-base text-neutral-900 dark:text-white flex items-center gap-2">
            <PieChart className="w-5 h-5 text-purple-600" />
            Spend Distribution by Provider
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">Share of period cost across LLM vendor infrastructure.</p>
        </div>
      </div>

      <div className="h-[220px] w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPie>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload;
                  return (
                    <div className="bg-neutral-900 text-white p-2.5 rounded-xl shadow-xl text-xs space-y-0.5 z-[99999]">
                      <div className="font-bold">{item.name}</div>
                      <div className="font-mono font-bold text-emerald-400">${item.value.toFixed(2)}</div>
                    </div>
                  );
                }
                return null;
              }}
            />
          </RechartsPie>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        {data.map((d) => (
          <div key={d.name} className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
            <span className="text-neutral-600 dark:text-neutral-400 truncate">{d.name}:</span>
            <span className="font-mono font-bold text-neutral-900 dark:text-white ml-auto">${d.value.toFixed(0)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
