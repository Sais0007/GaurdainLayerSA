// src/app/components/dashboard/spend-budget/TeamBudgetUtilization.tsx
import React from "react";
import { Users, AlertTriangle } from "lucide-react";

export function TeamBudgetUtilization() {
  const teams = [
    { id: "t1", name: "Research & AI Dev", spend: 3240.50, cap: 4000.00, percentage: 81.0, status: "Healthy" },
    { id: "t2", name: "Customer Support Eng", spend: 2150.00, cap: 2500.00, percentage: 86.0, status: "Near Limit" },
    { id: "t3", name: "Marketing Content Gen", spend: 1420.75, cap: 1500.00, percentage: 94.7, status: "Warning" },
    { id: "t4", name: "Financial Risk Modeling", spend: 840.25, cap: 1200.00, percentage: 70.0, status: "Healthy" },
    { id: "t5", name: "Legal Document Proc", spend: 398.50, cap: 800.00, percentage: 49.8, status: "Healthy" },
  ];

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
        <div>
          <h3 className="font-bold text-base text-neutral-900 dark:text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-primary-600" />
            Team Budget Utilization
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            5-team spent vs allocated budget progress tracker.
          </p>
        </div>
      </div>

      <div className="space-y-4 pt-1">
        {teams.map((t) => (
          <div key={t.id} className="space-y-1.5 p-3 rounded-xl bg-neutral-50/60 dark:bg-neutral-800/40 border border-neutral-200/60 dark:border-neutral-800 hover:border-neutral-300 transition-all">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                {t.name}
                {t.percentage >= 90 && <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />}
              </span>

              <div className="flex items-center gap-2 font-mono">
                <span className="font-bold text-neutral-900 dark:text-white">${t.spend.toFixed(2)}</span>
                <span className="text-neutral-400">/ ${t.cap.toFixed(2)}</span>
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                  t.percentage >= 90
                    ? "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
                    : t.percentage >= 80
                    ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                    : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                }`}>
                  {t.percentage}%
                </span>
              </div>
            </div>

            <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-2.5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  t.percentage >= 90
                    ? "bg-rose-500"
                    : t.percentage >= 80
                    ? "bg-amber-500"
                    : "bg-primary-600"
                }`}
                style={{ width: `${t.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
