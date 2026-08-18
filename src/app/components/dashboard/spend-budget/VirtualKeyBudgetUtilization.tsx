// src/app/components/dashboard/spend-budget/VirtualKeyBudgetUtilization.tsx
import React from "react";
import { Key, ArrowRight } from "lucide-react";

export function VirtualKeyBudgetUtilization() {
  const keys = [
    {
      id: "vk1",
      name: "support-prod-key",
      teamInfo: "Support Team · Assigned to: Sarah Chen",
      spend: 2150,
      limit: 2500,
      percentage: 86.0,
      statusBadge: "Near Limit",
      statusBadgeStyle: "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950 dark:border-amber-800",
      pctStyle: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/80 dark:text-amber-400",
      barStyle: "bg-amber-500",
    },
    {
      id: "vk2",
      name: "marketing-prod-key",
      teamInfo: "Marketing Team · Assigned to: Michael Scott",
      spend: 1200,
      limit: 1500,
      percentage: 80.0,
      statusBadge: "Near Limit",
      statusBadgeStyle: "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950 dark:border-amber-800",
      pctStyle: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/80 dark:text-amber-400",
      barStyle: "bg-amber-500",
    },
    {
      id: "vk3",
      name: "research-analysis-key",
      teamInfo: "Research Team · Assigned to: Alex Chen",
      spend: 1150,
      limit: 1200,
      percentage: 95.8,
      statusBadge: "Healthy",
      statusBadgeStyle: "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950 dark:border-emerald-800",
      pctStyle: "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300",
      barStyle: "bg-amber-500",
    },
    {
      id: "vk4",
      name: "clinical-ops-key",
      teamInfo: "Clinical Operations · Assigned to: Ann Lee",
      spend: 1520,
      limit: 2000,
      percentage: 76.0,
      statusBadge: "Healthy",
      statusBadgeStyle: "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950 dark:border-emerald-800",
      pctStyle: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/80 dark:text-amber-400",
      barStyle: "bg-amber-500",
    },
    {
      id: "vk5",
      name: "product-assistant-key",
      teamInfo: "Product Team · Assigned to: Emily Watson",
      spend: 350,
      limit: 800,
      percentage: 43.8,
      statusBadge: "Healthy",
      statusBadgeStyle: "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950 dark:border-emerald-800",
      pctStyle: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/80 dark:text-emerald-400",
      barStyle: "bg-blue-600",
    },
  ];

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs space-y-4 animate-fadeIn flex flex-col justify-between">
      <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
        <div>
          <h3 className="font-bold text-base text-neutral-900 dark:text-white flex items-center gap-2">
            <span className="p-1 rounded-md bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-600">
              <Key className="w-4 h-4" />
            </span>
            Virtual Key Budget Utilization
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Monitor spending and utilization across active virtual keys
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-1 text-xs font-bold text-primary-600 hover:underline cursor-pointer"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-4 pt-1 flex-1">
        {keys.map((k) => (
          <div key={k.id} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold font-mono text-neutral-900 dark:text-white">
                  {k.name}
                </span>
                <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold border ${k.statusBadgeStyle}`}>
                  {k.statusBadge}
                </span>
              </div>

              <div className="flex items-center gap-2 font-mono">
                <span className="font-semibold text-neutral-700 dark:text-neutral-300">
                  ${k.spend.toLocaleString()} / ${k.limit.toLocaleString()}
                </span>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${k.pctStyle}`}>
                  {k.percentage}%
                </span>
              </div>
            </div>

            <div className="text-[10px] text-neutral-400">
              {k.teamInfo}
            </div>

            <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-2.5 rounded-full overflow-hidden mt-1">
              <div
                className={`h-full rounded-full transition-all ${k.barStyle}`}
                style={{ width: `${k.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400">
        <span>Showing Top 5 active Virtual Keys</span>
        <span>Updated continuously from gateway logs</span>
      </div>
    </div>
  );
}
