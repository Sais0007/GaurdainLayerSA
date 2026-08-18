// src/app/components/dashboard/spend-budget/BudgetAlertsCard.tsx
import React from "react";
import { AlertCircle, ArrowRight } from "lucide-react";

export function BudgetAlertsCard() {
  const alerts = [
    {
      id: "ba-1",
      title: "Support Team",
      desc: "Budget utilization reached 81.7% ($2,450 / $3,000 Cap)",
      time: "14 mins ago",
      action: "View Team →",
    },
    {
      id: "ba-2",
      title: "marketing-prod-key",
      desc: "Abnormal spend spike (+32% vs yesterday average)",
      time: "2 hours ago",
      action: "Inspect Key →",
    },
    {
      id: "ba-3",
      title: "Claude 3.5 Sonnet",
      desc: "Projected model spend exceeds monthly target by $218",
      time: "4 hours ago",
      action: "Optimize Model →",
    },
  ];

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs space-y-4 animate-fadeIn flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
        <div>
          <h3 className="font-bold text-base text-neutral-900 dark:text-white flex items-center gap-2">
            <span className="p-1 rounded-md bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-600">
              <AlertCircle className="w-4 h-4" />
            </span>
            Budget Alerts
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Real-time financial risk and anomaly notifications
          </p>
        </div>

        <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 px-2 py-0.5 rounded-full">
          4 Active Alerts
        </span>
      </div>

      {/* List */}
      <div className="space-y-3 pt-1 flex-1">
        {alerts.map((a) => (
          <div key={a.id} className="p-3 rounded-xl bg-neutral-50/60 dark:bg-neutral-850 border border-neutral-200/60 dark:border-neutral-800 text-xs space-y-1">
            <div className="flex items-center justify-between font-bold">
              <span className="text-neutral-900 dark:text-white flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                {a.title}
              </span>
              <span className="text-[10px] text-neutral-400 font-normal">{a.time}</span>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 text-[11px] leading-relaxed">
              {a.desc}
            </p>
            <div className="pt-0.5 text-right">
              <button type="button" className="text-[11px] font-bold text-primary-600 hover:underline cursor-pointer">
                {a.action}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400">
        <span>Evaluated against active rules</span>
        <button type="button" className="font-bold text-primary-600 hover:underline cursor-pointer">
          Configure Rules &rarr;
        </button>
      </div>
    </div>
  );
}
