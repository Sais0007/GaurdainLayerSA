// src/app/components/dashboard/reliability/ReliabilityKPICards.tsx
import React from "react";
import { CheckCircle2, XCircle, AlertTriangle, Key, Users, Cpu, ShieldAlert } from "lucide-react";

export function ReliabilityKPICards() {
  const cards = [
    { title: "Success Rate", val: "96.2%", sub: "Target SLA: 98.0%", icon: CheckCircle2, color: "emerald" },
    { title: "Failure Rate", val: "3.8%", sub: "6,941 failed reqs", icon: XCircle, color: "rose" },
    { title: "Successful Reqs", val: "175,699", sub: "2xx Handled", icon: CheckCircle2, color: "emerald" },
    { title: "Failed Requests", val: "6,941", sub: "4xx & 5xx total", icon: XCircle, color: "rose" },
    { title: "Elevated Periods", val: "1 Event", sub: "Spike at 14:00 UTC", icon: AlertTriangle, color: "amber" },
    { title: "Affected Keys", val: "3 Keys", sub: "At risk of SLA drop", icon: Key, color: "amber" },
    { title: "Affected Teams", val: "3 Teams", sub: "8 Users Impacted", icon: Users, color: "purple" },
    { title: "Most Failed Model", val: "Claude 3.5 Sonnet", sub: "7.3% failure rate", icon: Cpu, color: "rose" },
    { title: "Most Failed Provider", val: "Anthropic", sub: "7.3% failure rate", icon: ShieldAlert, color: "rose" },
    { title: "Primary Error Code", val: "503 Down", sub: "49.3% of all errors", icon: ShieldAlert, color: "rose" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
      {cards.map((c, i) => {
        const Icon = c.icon;
        return (
          <div key={i} className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 truncate">{c.title}</span>
              <Icon className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            </div>
            <div className="text-xl font-extrabold text-neutral-900 dark:text-white mt-1.5 font-mono truncate">{c.val}</div>
            <div className="text-[10px] font-medium text-neutral-400 mt-1 truncate">{c.sub}</div>
          </div>
        );
      })}
    </div>
  );
}
