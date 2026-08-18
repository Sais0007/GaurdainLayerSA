// src/app/components/dashboard/spend-budget/TeamBudgetUtilization.tsx
import React from "react";
import { Users, ArrowRight } from "lucide-react";

export function TeamBudgetUtilization() {
  const teams = [
    { id: "t1", name: "Research", spend: 1150, cap: 1200, percentage: 95.8, status: "warning" },
    { id: "t2", name: "Marketing", spend: 1200, cap: 1500, percentage: 80.0, status: "near" },
    { id: "t3", name: "Support", spend: 2450, cap: 3000, percentage: 81.7, status: "near" },
    { id: "t4", name: "Clinical Operations", spend: 1520, cap: 2000, percentage: 76.0, status: "near" },
    { id: "t5", name: "Product", spend: 350, cap: 800, percentage: 43.8, status: "healthy" },
  ];

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs space-y-4 animate-fadeIn flex flex-col justify-between">
      <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
        <div>
          <h3 className="font-bold text-base text-neutral-900 dark:text-white flex items-center gap-2">
            <span className="p-1 rounded-md bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-purple-600">
              <Users className="w-4 h-4" />
            </span>
            Team Budget Utilization
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Ranked team budget consumption against allocated monthly budgets
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
        {teams.map((t) => (
          <div key={t.id} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-neutral-900 dark:text-white">
                {t.name}
              </span>

              <div className="flex items-center gap-2 font-mono">
                <span className="font-semibold text-neutral-700 dark:text-neutral-300">
                  ${t.spend.toLocaleString()} / ${t.cap.toLocaleString()} USD
                </span>
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                    t.status === "warning"
                      ? "bg-amber-100 text-amber-800 border border-amber-300 dark:bg-amber-950 dark:text-amber-300"
                      : t.status === "near"
                      ? "bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/80 dark:text-amber-400"
                      : "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/80 dark:text-emerald-400"
                  }`}
                >
                  {t.percentage}%
                </span>
              </div>
            </div>

            <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-2.5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  t.status === "warning"
                    ? "bg-amber-500"
                    : t.status === "near"
                    ? "bg-amber-500"
                    : "bg-blue-600"
                }`}
                style={{ width: `${t.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400">
        <span>Showing Top 5 organization teams</span>
        <span>Updated continuously from gateway logs</span>
      </div>
    </div>
  );
}
