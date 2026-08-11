// src/app/components/dashboard/InsightCardsGrid.tsx
import React from "react";
import { Sparkles, ArrowRight, ShieldAlert, Cpu, Zap, DollarSign, Activity } from "lucide-react";

export function InsightCardsGrid() {
  const insights = [
    {
      id: "i-1",
      icon: Cpu,
      color: "purple",
      title: "Model Routing Optimization Opportunity",
      badge: "SAVE ~$420/MO",
      desc: "32% of simple classification prompts sent to Claude 3.5 Sonnet can be routed to DeepSeek R1 without quality loss.",
      action: "Configure Auto-Router",
    },
    {
      id: "i-2",
      icon: Sparkles,
      color: "blue",
      title: "Token Payload Compression Active",
      badge: "2.1M TOKENS SAVED",
      desc: "System prompt caching achieved an 84.2% cache hit rate across Customer Support virtual keys in the last 7 days.",
      action: "View Cache Analytics",
    },
    {
      id: "i-3",
      icon: ShieldAlert,
      color: "rose",
      title: "Anthropic Gateway SLA Breach Alert",
      badge: "7.3% FAILURES",
      desc: "503 Service Unavailable spikes detected on Anthropic endpoints at 14:00 UTC. Fallback routing was engaged.",
      action: "Inspect Incident Trace",
    },
    {
      id: "i-4",
      icon: Zap,
      color: "amber",
      title: "Capacity Throttle Warning (RPM)",
      badge: "92.5% OF RPM CAP",
      desc: "marketing-prod-key reached 462 RPM against the 500 RPM ceiling. Recommend increasing capacity limit.",
      action: "Adjust Key Ceiling",
    },
    {
      id: "i-5",
      icon: Activity,
      color: "emerald",
      title: "High Usage Efficiency Benchmark",
      badge: "OPTIMAL RATIO",
      desc: "Research & AI Dev team maintained 1.93:1 Input/Output token ratio with zero hard budget threshold triggers.",
      action: "View Team Breakdown",
    },
    {
      id: "i-6",
      icon: DollarSign,
      color: "emerald",
      title: "Monthly Budget Forecast Pace",
      badge: "UNDER BUDGET",
      desc: "Projected period spend is $8,694.00 against the $10,000 ceiling. Remaining allocation: $2,271.00.",
      action: "View Budget Details",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-base text-neutral-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          AI Gateway Financial & Operational Intelligence (6 Insights)
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {insights.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-neutral-300 dark:hover:border-neutral-700 transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div
                    className={`p-2.5 rounded-xl border ${
                      item.color === "purple"
                        ? "bg-purple-50 dark:bg-purple-950/60 border-purple-200 dark:border-purple-800 text-purple-600"
                        : item.color === "rose"
                        ? "bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800 text-rose-600"
                        : item.color === "amber"
                        ? "bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800 text-amber-600"
                        : item.color === "blue"
                        ? "bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800 text-blue-600"
                        : "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800 text-emerald-600"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                      item.color === "rose"
                        ? "bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border-rose-200"
                        : item.color === "amber"
                        ? "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-200"
                        : "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-200"
                    }`}
                  >
                    {item.badge}
                  </span>
                </div>

                <h4 className="font-bold text-sm text-neutral-900 dark:text-white leading-snug">
                  {item.title}
                </h4>

                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs font-semibold text-primary-600 hover:text-primary-700 dark:hover:text-primary-400">
                <span>{item.action}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
