// src/app/components/dashboard/spend-budget/SpendDistributionCard.tsx
import React, { useState } from "react";
import { PieChart as RechartsPie, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { PieChart } from "lucide-react";

type EntityTab = "teams" | "users" | "keys" | "models" | "providers";

export function SpendDistributionCard() {
  const [activeTab, setActiveTab] = useState<EntityTab>("teams");

  const dataMap: Record<EntityTab, Array<{ name: string; value: number; pct: string; color: string }>> = {
    teams: [
      { name: "Support", value: 2450, pct: "31.4%", color: "#8b5cf6" },
      { name: "Clinical Operations", value: 1520, pct: "19.5%", color: "#3b82f6" },
      { name: "Research", value: 1150, pct: "14.7%", color: "#10b981" },
      { name: "Marketing", value: 1200, pct: "15.4%", color: "#f59e0b" },
      { name: "Product", value: 350, pct: "4.5%", color: "#06b6d4" },
    ],
    users: [
      { name: "Dr. Sarah Chen", value: 1150, pct: "14.7%", color: "#8b5cf6" },
      { name: "Michael Scott", value: 920, pct: "11.8%", color: "#3b82f6" },
      { name: "Alex Chen", value: 850, pct: "10.9%", color: "#10b981" },
      { name: "Ann Lee", value: 780, pct: "10.0%", color: "#f59e0b" },
      { name: "Emily Watson", value: 650, pct: "8.3%", color: "#06b6d4" },
    ],
    keys: [
      { name: "support-prod-key", value: 2150, pct: "27.6%", color: "#8b5cf6" },
      { name: "marketing-prod-key", value: 1200, pct: "15.4%", color: "#3b82f6" },
      { name: "research-analysis-key", value: 1150, pct: "14.7%", color: "#10b981" },
      { name: "clinical-ops-key", value: 1520, pct: "19.5%", color: "#f59e0b" },
      { name: "product-assistant-key", value: 350, pct: "4.5%", color: "#06b6d4" },
    ],
    models: [
      { name: "Claude 3.5 Sonnet", value: 3180, pct: "40.7%", color: "#8b5cf6" },
      { name: "GPT-4o", value: 2450, pct: "31.4%", color: "#3b82f6" },
      { name: "GPT-4 Mini", value: 1370, pct: "17.6%", color: "#10b981" },
      { name: "Gemini Pro", value: 620, pct: "7.9%", color: "#f59e0b" },
      { name: "Llama 3.1", value: 180, pct: "2.3%", color: "#06b6d4" },
    ],
    providers: [
      { name: "Anthropic", value: 3180, pct: "40.7%", color: "#8b5cf6" },
      { name: "OpenAI", value: 3820, pct: "49.0%", color: "#3b82f6" },
      { name: "Google", value: 620, pct: "7.9%", color: "#10b981" },
      { name: "Meta", value: 180, pct: "2.3%", color: "#f59e0b" },
    ],
  };

  const data = dataMap[activeTab];

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs space-y-4 animate-fadeIn flex flex-col justify-between">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-100 dark:border-neutral-800">
        <div>
          <h3 className="font-bold text-base text-neutral-900 dark:text-white flex items-center gap-2">
            <span className="p-1 rounded-md bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600">
              <PieChart className="w-4 h-4" />
            </span>
            Spend Distribution
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Breakdown of spend across organizational entities
          </p>
        </div>

        {/* Dimension Switcher */}
        <div className="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-850 rounded-xl text-xs shrink-0 self-start sm:self-auto">
          {(
            [
              { id: "teams", label: "Teams" },
              { id: "users", label: "Users" },
              { id: "keys", label: "Virtual Keys" },
              { id: "models", label: "Models" },
              { id: "providers", label: "Providers" },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`px-2.5 py-1 rounded-lg font-semibold text-xs transition-all ${
                activeTab === t.id
                  ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-2xs font-bold"
                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Donut Chart and Legend Side-by-Side */}
      <div className="flex flex-col md:flex-row items-center gap-6 py-2 flex-1">
        {/* Donut Chart Container */}
        <div className="relative w-44 h-44 shrink-0 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPie>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={72}
                paddingAngle={3}
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
                      <div className="bg-neutral-900 text-white p-2.5 rounded-xl shadow-xl text-xs z-[99999]">
                        <div className="font-bold">{item.name}</div>
                        <div className="font-mono font-bold text-emerald-400">${item.value.toLocaleString()} ({item.pct})</div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </RechartsPie>
          </ResponsiveContainer>

          {/* Donut Center Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">TOTAL SPEND</span>
            <span className="text-base font-extrabold font-mono text-neutral-900 dark:text-white">$7,800</span>
          </div>
        </div>

        {/* Legend List */}
        <div className="space-y-2 flex-1 w-full text-xs">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between py-1 border-b border-neutral-100 dark:border-neutral-800/60 last:border-none">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="font-semibold text-neutral-800 dark:text-neutral-200 truncate">{item.name}</span>
              </div>
              <div className="font-mono shrink-0">
                <span className="font-bold text-neutral-900 dark:text-white">${item.value.toLocaleString()}</span>{" "}
                <span className="text-neutral-400">({item.pct})</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400">
        <span>Showing spend distribution by {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</span>
        <span>Updated continuously from gateway logs</span>
      </div>
    </div>
  );
}
