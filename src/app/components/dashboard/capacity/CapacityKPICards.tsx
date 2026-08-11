// src/app/components/dashboard/capacity/CapacityKPICards.tsx
import React from "react";
import { Zap, ShieldAlert, AlertTriangle, Key, Users, Cpu } from "lucide-react";

export function CapacityKPICards() {
  const cards = [
    { title: "Peak RPM", val: "420 RPM", sub: "Max 1-min request rate", icon: Zap, color: "orange" },
    { title: "Gateway RPM Limit", val: "500 RPM", sub: "Gateway hard cap", icon: ShieldAlert, color: "rose" },
    { title: "Peak TPM", val: "1.85M TPM", sub: "Max 1-min token burst", icon: Zap, color: "purple" },
    { title: "Gateway TPM Limit", val: "2.0M TPM", sub: "Gateway token ceiling", icon: ShieldAlert, color: "rose" },
    { title: "Throttle Breaches", val: "820 Events", sub: "429 Throttle status triggers", icon: AlertTriangle, color: "rose" },
    { title: "Keys Near Capacity", val: "2 Keys", sub: "Operating > 85% ceiling", icon: Key, color: "amber" },
    { title: "Highest RPM Key", val: "marketing-prod-key", sub: "462 RPM (92.5% util)", icon: Key, color: "rose" },
    { title: "Highest TPM Key", val: "research-key", sub: "1.88M TPM (94.2% util)", icon: Key, color: "purple" },
    { title: "Top Throttle Team", val: "Marketing", sub: "420 throttle events", icon: Users, color: "amber" },
    { title: "Top Throttle Model", val: "Claude 3.5 Sonnet", sub: "540 throttle events", icon: Cpu, color: "rose" },
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
