// src/app/components/dashboard/spend-budget/CostOptimizationCard.tsx
import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";

export function CostOptimizationCard() {
  const insights = [
    {
      id: "co-1",
      title: "Move OPT-4o requests to OPT-4o-Mini",
      desc: "34.2K low-complexity prompt requests identified using GPT-4o.",
      priority: "Critical",
      priorityStyle: "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300",
      savings: "Savings: ~$420 / month",
      action: "Optimize &rarr;",
    },
    {
      id: "co-2",
      title: "Unused Virtual Key Cleanup",
      desc: "2 virtual keys with active caps have zero requests in last 14 days.",
      priority: "High",
      priorityStyle: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
      savings: "Savings: ~$700 / month",
      action: "Deactivate &rarr;",
    },
    {
      id: "co-3",
      title: "Idle Budget Cap Reallocation",
      desc: "Product team holds $450 unused buffer while Support 1 is near limit.",
      priority: "Medium",
      priorityStyle: "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300",
      savings: "Reallocate allocation",
      action: "Reallocate &rarr;",
    },
  ];

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs space-y-4 animate-fadeIn flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
        <div>
          <h3 className="font-bold text-base text-neutral-900 dark:text-white flex items-center gap-2">
            <span className="p-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-600">
              <Sparkles className="w-4 h-4" />
            </span>
            Cost Optimization Insights
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Recommended actions to improve cost efficiency
          </p>
        </div>

        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-full">
          Est. Savings: ~$1,240/mo
        </span>
      </div>

      {/* List */}
      <div className="space-y-3 pt-1 flex-1">
        {insights.map((item) => (
          <div key={item.id} className="p-3 rounded-xl bg-neutral-50/60 dark:bg-neutral-850 border border-neutral-200/60 dark:border-neutral-800 text-xs space-y-1">
            <div className="flex items-center justify-between font-bold">
              <span className="text-neutral-900 dark:text-white flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {item.title}
              </span>
              <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${item.priorityStyle}`}>
                {item.priority}
              </span>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 text-[11px] leading-relaxed">
              {item.desc}
            </p>
            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                {item.savings}
              </span>
              <button type="button" className="text-[11px] font-bold text-primary-600 hover:underline cursor-pointer">
                {item.action}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400">
        <span>AI intelligence engine recommendations</span>
        <button type="button" className="font-bold text-primary-600 hover:underline cursor-pointer">
          Run Audit &rarr;
        </button>
      </div>
    </div>
  );
}
