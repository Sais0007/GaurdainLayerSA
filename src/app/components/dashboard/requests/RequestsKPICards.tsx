// src/app/components/dashboard/requests/RequestsKPICards.tsx
import React from "react";
import { Zap, CheckCircle2, XCircle, Clock, Users, User, Key, Cpu, Building2, Activity } from "lucide-react";

export function RequestsKPICards() {
  const cards = [
    { title: "Total Requests", val: "182,640", sub: "Period Total", icon: Zap, color: "blue" },
    { title: "Successful Reqs", val: "175,699", sub: "96.2% Success Rate", icon: CheckCircle2, color: "emerald" },
    { title: "Failed Requests", val: "6,941", sub: "3.8% Failure Rate", icon: XCircle, color: "rose" },
    { title: "Avg Reqs / Day", val: "6,088", sub: "Daily Baseline", icon: Clock, color: "purple" },
    { title: "Peak Request Hour", val: "8,420", sub: "At 14:00 UTC", icon: Activity, color: "amber" },
    { title: "Top Consumer Team", val: "Support Eng", sub: "58,200 requests", icon: Users, color: "blue" },
    { title: "Top Consumer User", val: "Dr. Sarah Chen", sub: "34,200 requests", icon: User, color: "purple" },
    { title: "Top Virtual Key", val: "support-prod-key", sub: "58,200 requests", icon: Key, color: "amber" },
    { title: "Top AI Model", val: "Claude 3.5 Sonnet", sub: "74,200 requests", icon: Cpu, color: "emerald" },
    { title: "Top LLM Provider", val: "Anthropic", sub: "74,200 requests", icon: Building2, color: "blue" },
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
