// src/app/components/dashboard/spend-budget/CostOptimizationCard.tsx
import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export function CostOptimizationCard() {
  const recommendations = [
    {
      id: "rec-1",
      title: "Model Auto-Routing Rule",
      savings: "~$420 / Mo",
      desc: "Route simple summarization prompts from Claude 3.5 Sonnet to DeepSeek R1.",
    },
    {
      id: "rec-2",
      title: "Enable Prompt Cache Baseline",
      savings: "~$280 / Mo",
      desc: "Cache 4.2K static system prompts across Marketing & Support virtual key endpoints.",
    },
  ];

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
        <div>
          <h3 className="font-bold text-base text-neutral-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            AI Cost Savings Recommendations
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">Automated prompt compression & smart routing optimizations.</p>
        </div>
      </div>

      <div className="space-y-3 pt-1">
        {recommendations.map((r) => (
          <div key={r.id} className="p-3.5 rounded-xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200/60 dark:border-purple-900/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-neutral-900 dark:text-white">{r.title}</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200">
                SAVE {r.savings}
              </span>
            </div>
            <p className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {r.desc}
            </p>
            <button
              type="button"
              onClick={() => toast.success(`Applied optimization rule: ${r.title}`)}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-primary-600 hover:text-primary-700 dark:hover:text-primary-400 pt-1"
            >
              <span>Apply Optimization Rule</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
