// src/app/components/dashboard/tokens/TokensKPICards.tsx
import React from "react";
import { Cpu, ArrowDownLeft, ArrowUpRight, Scale, Zap, Sparkles, Users, Key, Building2 } from "lucide-react";

export function TokensKPICards() {
  const cards = [
    { title: "Total Tokens", val: "16.4B", sub: "Input + Output", icon: Cpu, color: "purple" },
    { title: "Input Tokens", val: "10.8B", sub: "65.8% of Total", icon: ArrowDownLeft, color: "blue" },
    { title: "Output Tokens", val: "5.6B", sub: "34.2% of Total", icon: ArrowUpRight, color: "emerald" },
    { title: "Avg Tokens / Req", val: "89,800", sub: "Prompt Payload Size", icon: Zap, color: "amber" },
    { title: "Input / Output Ratio", val: "1.93 : 1", sub: "Efficiency Ratio", icon: Scale, color: "purple" },
    { title: "Avg Input / Req", val: "59,100", sub: "Context Length", icon: ArrowDownLeft, color: "blue" },
    { title: "Avg Output / Req", val: "30,700", sub: "Completion Length", icon: ArrowUpRight, color: "emerald" },
    { title: "Top Token Team", val: "Research & AI", sub: "5.8B Tokens", icon: Users, color: "purple" },
    { title: "Top Token Key", val: "research-key", sub: "4.9B Tokens", icon: Key, color: "amber" },
    { title: "Top Token Model", val: "Claude 3.5 Sonnet", sub: "6.8B Tokens", icon: Building2, color: "emerald" },
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
