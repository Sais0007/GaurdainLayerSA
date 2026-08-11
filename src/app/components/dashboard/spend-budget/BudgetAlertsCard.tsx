// src/app/components/dashboard/spend-budget/BudgetAlertsCard.tsx
import React from "react";
import { ShieldAlert, AlertTriangle, CheckCircle2 } from "lucide-react";

export function BudgetAlertsCard() {
  const alerts = [
    {
      id: "ba-1",
      severity: "critical",
      title: "Virtual Key Hard Cap Exceeded",
      desc: "marketing-prod-key reached 101.4% ($1,420.75 / $1,400.00). System enforced fallback.",
      time: "22 mins ago",
    },
    {
      id: "ba-2",
      severity: "warning",
      title: "Team Threshold Warning (90%)",
      desc: "Marketing Content Gen team reached 94.7% ($1,420.75 / $1,500.00) budget capacity.",
      time: "2 hours ago",
    },
    {
      id: "ba-3",
      severity: "warning",
      title: "Virtual Key Near Ceiling (95%)",
      desc: "research-analysis-key reached 96.3% ($2,890.00 / $3,000.00) budget limit.",
      time: "5 hours ago",
    },
  ];

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
        <div>
          <h3 className="font-bold text-base text-neutral-900 dark:text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-500" />
            Budget & SLA Breach Alerts
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">Real-time alert notifications for threshold triggers.</p>
        </div>
      </div>

      <div className="space-y-3 pt-1">
        {alerts.map((a) => (
          <div
            key={a.id}
            className={`p-3.5 rounded-xl border text-xs space-y-1 ${
              a.severity === "critical"
                ? "bg-rose-50/70 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/60"
                : "bg-amber-50/70 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/60"
            }`}
          >
            <div className="flex items-center justify-between font-bold">
              <span className={`flex items-center gap-1.5 ${a.severity === "critical" ? "text-rose-700 dark:text-rose-300" : "text-amber-700 dark:text-amber-300"}`}>
                {a.severity === "critical" ? <ShieldAlert className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                {a.title}
              </span>
              <span className="text-[10px] font-mono text-neutral-400 font-normal">{a.time}</span>
            </div>
            <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed text-[11px]">
              {a.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
