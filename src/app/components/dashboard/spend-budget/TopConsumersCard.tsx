// src/app/components/dashboard/spend-budget/TopConsumersCard.tsx
import React from "react";
import { TrendingUp } from "lucide-react";

export function TopConsumersCard() {
  const consumers = [
    { rank: 1, name: "Claude 3.5 Sonnet", type: "Model", spend: 3620.00, share: "45.0%" },
    { rank: 2, name: "Research & AI Dev", type: "Team", spend: 3240.50, share: "40.2%" },
    { rank: 3, name: "research-analysis-key", type: "Key", spend: 2890.00, share: "35.9%" },
    { rank: 4, name: "GPT-4o", type: "Model", spend: 2480.50, share: "30.8%" },
    { rank: 5, name: "Customer Support Eng", type: "Team", spend: 2150.00, share: "26.7%" },
  ];

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
        <div>
          <h3 className="font-bold text-base text-neutral-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            Top Budget Consumers
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">Ranked top 5 drivers of monthly period spend.</p>
        </div>
      </div>

      <div className="space-y-3 pt-1">
        {consumers.map((c) => (
          <div key={c.name} className="flex items-center justify-between p-3 rounded-xl bg-neutral-50/60 dark:bg-neutral-800/40 border border-neutral-200/60 dark:border-neutral-800 text-xs">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-lg bg-neutral-200 dark:bg-neutral-800 font-mono font-bold flex items-center justify-center text-neutral-700 dark:text-neutral-300">
                #{c.rank}
              </span>
              <div>
                <span className="font-bold text-neutral-900 dark:text-white block">{c.name}</span>
                <span className="text-[10px] text-neutral-400 font-semibold uppercase">{c.type}</span>
              </div>
            </div>

            <div className="text-right font-mono">
              <span className="font-bold text-neutral-900 dark:text-white block">${c.spend.toFixed(2)}</span>
              <span className="text-[10px] text-emerald-600 font-bold">{c.share} share</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
