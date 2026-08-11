// src/app/components/dashboard/spend-budget/VirtualKeyBudgetUtilization.tsx
import React from "react";
import { Key, ShieldAlert } from "lucide-react";

export function VirtualKeyBudgetUtilization() {
  const keys = [
    { id: "vk1", name: "research-analysis-key", key: "sk-grd-8492", spend: 2890.00, limit: 3000.00, percentage: 96.3, status: "Near Limit" },
    { id: "vk2", name: "support-prod-key", key: "sk-grd-1039", spend: 2150.00, limit: 2500.00, percentage: 86.0, status: "Healthy" },
    { id: "vk3", name: "marketing-prod-key", key: "sk-grd-5510", spend: 1420.75, limit: 1400.00, percentage: 101.4, status: "Exceeded" },
    { id: "vk4", name: "fintech-risk-key", key: "sk-grd-9921", spend: 840.25, limit: 1500.00, percentage: 56.0, status: "Healthy" },
    { id: "vk5", name: "legal-doc-key", key: "sk-grd-3381", spend: 398.50, limit: 1000.00, percentage: 39.8, status: "Healthy" },
  ];

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
        <div>
          <h3 className="font-bold text-base text-neutral-900 dark:text-white flex items-center gap-2">
            <Key className="w-5 h-5 text-amber-500" />
            Virtual Key Budget Utilization
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            Key-level real-time spend ceiling tracker & hard-limit breach warnings.
          </p>
        </div>
      </div>

      <div className="space-y-4 pt-1">
        {keys.map((k) => (
          <div key={k.id} className="space-y-1.5 p-3 rounded-xl bg-neutral-50/60 dark:bg-neutral-800/40 border border-neutral-200/60 dark:border-neutral-800 hover:border-neutral-300 transition-all">
            <div className="flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <span className="font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                  {k.name}
                  {k.percentage > 100 && <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />}
                </span>
                <span className="text-[10px] font-mono text-neutral-400 block">{k.key}</span>
              </div>

              <div className="flex items-center gap-2 font-mono">
                <span className="font-bold text-neutral-900 dark:text-white">${k.spend.toFixed(2)}</span>
                <span className="text-neutral-400">/ ${k.limit.toFixed(2)}</span>
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                  k.percentage > 100
                    ? "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border border-rose-200"
                    : k.percentage >= 90
                    ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border border-amber-200"
                    : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200"
                }`}>
                  {k.percentage}%
                </span>
              </div>
            </div>

            <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-2.5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  k.percentage > 100
                    ? "bg-rose-600"
                    : k.percentage >= 90
                    ? "bg-amber-500"
                    : "bg-emerald-500"
                }`}
                style={{ width: `${Math.min(k.percentage, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
