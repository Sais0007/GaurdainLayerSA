// src/app/components/dashboard/spend-budget/TopConsumersCard.tsx
import React, { useState } from "react";
import { TrendingUp, Users } from "lucide-react";

export function TopConsumersCard() {
  const [metric, setMetric] = useState<"spend" | "requests" | "tokens">("spend");

  const consumers = [
    { rank: "#1", name: "Support Team", type: "Team", val: "$2,450", pct: "31.4% share", trend: "up" },
    { rank: "#2", name: "support-prod-key", type: "Key", val: "$2,150", pct: "27.6% share", trend: "up" },
    { rank: "#3", name: "Clinical Operations", type: "Team", val: "$1,520", pct: "19.5% share", trend: "up" },
    { rank: "#4", name: "Research Team", type: "Team", val: "$1,150", pct: "14.7% share", trend: "neutral" },
    { rank: "#5", name: "Sarah Chen", type: "User", val: "$1,150", pct: "14.7% share", trend: "up" },
  ];

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs space-y-4 animate-fadeIn flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
        <div>
          <h3 className="font-bold text-base text-neutral-900 dark:text-white flex items-center gap-2">
            <span className="p-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-600">
              <TrendingUp className="w-4 h-4" />
            </span>
            Top Budget Consumers
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Ranked organizational drivers by metric volume
          </p>
        </div>

        <select
          value={metric}
          onChange={(e) => setMetric(e.target.value as any)}
          className="h-8 px-2.5 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-700 rounded-lg text-xs font-bold text-neutral-700 dark:text-neutral-300 cursor-pointer"
        >
          <option value="spend">Spend ($)</option>
          <option value="requests">Requests</option>
          <option value="tokens">Tokens</option>
        </select>
      </div>

      {/* List */}
      <div className="space-y-3 pt-1 flex-1">
        {consumers.map((c) => (
          <div key={c.rank} className="flex items-center justify-between py-1.5 border-b border-neutral-100 dark:border-neutral-800/60 last:border-none text-xs">
            <div className="flex items-center gap-3 min-w-0">
              <span className="font-mono text-xs font-bold text-neutral-400 shrink-0">{c.rank}</span>
              <div className="min-w-0">
                <span className="font-semibold text-neutral-900 dark:text-white block truncate">{c.name}</span>
                <span className="text-[10px] text-neutral-400">{c.type}</span>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="font-mono font-bold text-neutral-900 dark:text-white block">{c.val}</span>
              <span className="text-[10px] text-emerald-600 font-semibold">{c.pct}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400">
        <span>Displaying Top 5 organizational drivers</span>
        <span>Ranked by Spend</span>
      </div>
    </div>
  );
}
