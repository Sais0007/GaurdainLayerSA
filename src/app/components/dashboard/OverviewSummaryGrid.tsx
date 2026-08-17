// src/app/components/dashboard/OverviewSummaryGrid.tsx
import React, { useState } from "react";
import {
  TrendingUp,
  Cpu,
  ShieldCheck,
  DollarSign,
  Users,
  Activity,
  ArrowRight,
  AlertTriangle,
} from "lucide-react";

interface OverviewSummaryGridProps {
  onTabChange?: (tab: "overview" | "spend" | "requests" | "tokens" | "reliability" | "capacity") => void;
  onInspectTrace?: (traceId?: string) => void;
}

export function OverviewSummaryGrid({ onTabChange, onInspectTrace }: OverviewSummaryGridProps) {
  const [topContribMetric, setTopContribMetric] = useState<"spend" | "requests" | "tokens">("spend");
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
      {/* CARD 1: Request Volume */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary-600" />
              <h4 className="font-bold text-sm text-neutral-900 dark:text-white">Request Volume</h4>
            </div>
            <p className="text-[11px] text-neutral-400 mt-0.5">Request trajectory trend</p>
          </div>

          <button
            type="button"
            onClick={() => onTabChange?.("requests")}
            className="inline-flex items-center gap-1 text-[11px] font-bold text-primary-600 hover:text-primary-700 hover:underline cursor-pointer"
          >
            <span>View Request Volume</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Smooth SVG Trendline */}
        <div className="h-24 w-full relative pt-2">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 300 80" preserveAspectRatio="none">
            <defs>
              <linearGradient id="reqGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path
              d="M 0,60 Q 50,20 100,45 T 200,30 T 300,10 L 300,80 L 0,80 Z"
              fill="url(#reqGradient)"
            />
            <path
              d="M 0,60 Q 50,20 100,45 T 200,30 T 300,10"
              fill="none"
              stroke="#2563eb"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Footer Metrics */}
        <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[11px]">
          <div>
            <span className="text-neutral-400">Top Model: </span>
            <span className="font-bold text-neutral-800 dark:text-neutral-200">Claude Sonnet</span>
          </div>
          <div>
            <span className="text-neutral-400">Top Team: </span>
            <span className="font-bold text-neutral-800 dark:text-neutral-200">Support</span>
          </div>
        </div>
      </div>

      {/* CARD 2: Token Consumption */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-purple-600" />
              <h4 className="font-bold text-sm text-neutral-900 dark:text-white">Token Consumption</h4>
            </div>
            <p className="text-[11px] text-neutral-400 mt-0.5">Input vs Output token split</p>
          </div>

          <button
            type="button"
            onClick={() => onTabChange?.("tokens")}
            className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-600 hover:text-purple-700 hover:underline cursor-pointer"
          >
            <span>View Tokens</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Mini Stacked Bar Chart */}
        <div className="h-24 w-full flex items-end justify-between gap-2 pt-2 px-1 relative">
          {[
            { in: 60, out: 30 },
            { in: 45, out: 25 },
            { in: 70, out: 35 },
            { in: 80, out: 40 },
            { in: 55, out: 28 },
            { in: 65, out: 32 },
            { in: 90, out: 45 },
          ].map((bar, i) => (
            <div
              key={i}
              className="flex-1 flex flex-col justify-end gap-1 h-full cursor-pointer relative group"
              onMouseEnter={() => setHoveredBar(i)}
              onMouseLeave={() => setHoveredBar(null)}
            >
              <div
                className="w-full bg-purple-500 rounded-t-sm transition-all group-hover:bg-purple-600"
                style={{ height: `${bar.out}%` }}
              />
              <div
                className="w-full bg-primary-600 rounded-b-sm transition-all group-hover:bg-primary-700"
                style={{ height: `${bar.in}%` }}
              />
              {hoveredBar === i && (
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-[10px] p-2 rounded-lg shadow-xl whitespace-nowrap z-20 pointer-events-none">
                  <div>Input: {(bar.in * 15).toFixed(0)}M</div>
                  <div>Output: {(bar.out * 8).toFixed(0)}M</div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer Metrics */}
        <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[11px]">
          <div>
            <span className="text-neutral-400">Ratio: </span>
            <span className="font-mono font-bold text-neutral-800 dark:text-neutral-200">1.93 : 1</span>
          </div>
          <div>
            <span className="text-neutral-400">Avg/Req: </span>
            <span className="font-mono font-bold text-neutral-800 dark:text-neutral-200">89,800</span>
          </div>
        </div>
      </div>

      {/* CARD 3: Request Reliability */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <h4 className="font-bold text-sm text-neutral-900 dark:text-white">Request Reliability</h4>
            </div>
            <p className="text-[11px] text-neutral-400 mt-0.5">SLA baseline & error metrics</p>
          </div>

          <button
            type="button"
            onClick={() => onTabChange?.("reliability")}
            className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 hover:text-emerald-700 hover:underline cursor-pointer"
          >
            <span>View Reliability</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-500">Success Rate:</span>
            <span className="font-mono font-bold text-emerald-600">96.2% <span className="text-[10px] text-neutral-400 font-normal">(Target: 98.0%)</span></span>
          </div>

          {/* Alert Box */}
          <div className="p-2.5 bg-rose-50/80 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/80 rounded-xl text-[11px] text-rose-700 dark:text-rose-300 space-y-1">
            <div className="flex items-center gap-1.5 font-bold">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
              <span>Aug 4 Incident Window (2:00 PM - 3:30 PM)</span>
            </div>
            <p className="text-[10.5px] leading-tight text-rose-600/90 dark:text-rose-400">
              Failure Rate increased to 8.4%. Claude Sonnet accounted for 72% of errors.
            </p>
          </div>
        </div>

        {/* Footer Metrics */}
        <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[11px]">
          <span className="inline-flex items-center gap-1.5 text-emerald-600 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Gateways Operational
          </span>
          <span className="text-neutral-400">6,941 Period Errors</span>
        </div>
      </div>

      {/* CARD 4: Cost Efficiency */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <h4 className="font-bold text-sm text-neutral-900 dark:text-white">Cost Efficiency</h4>
            </div>
            <p className="text-[11px] text-neutral-400 mt-0.5">Unit economic ratios</p>
          </div>

          <button
            type="button"
            onClick={() => onTabChange?.("spend")}
            className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 hover:text-emerald-700 hover:underline cursor-pointer"
          >
            <span>View Details</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1 text-xs">
          <div className="p-2.5 bg-neutral-50 dark:bg-neutral-850 rounded-xl border border-neutral-100 dark:border-neutral-800">
            <span className="text-[10px] text-neutral-400 font-medium block">Avg Cost / Request</span>
            <span className="font-mono font-bold text-neutral-900 dark:text-white text-sm">$0.042</span>
          </div>
          <div className="p-2.5 bg-neutral-50 dark:bg-neutral-850 rounded-xl border border-neutral-100 dark:border-neutral-800">
            <span className="text-[10px] text-neutral-400 font-medium block">Cost / 1M Tokens</span>
            <span className="font-mono font-bold text-neutral-900 dark:text-white text-sm">$0.000475</span>
          </div>
        </div>

        {/* Footer Metrics */}
        <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[11px]">
          <div>
            <span className="text-neutral-400">Highest Cost Model: </span>
            <span className="font-bold text-neutral-800 dark:text-neutral-200">Claude Sonnet</span>
          </div>
          <div>
            <span className="text-neutral-400">Highest Spend Team: </span>
            <span className="font-bold text-neutral-800 dark:text-neutral-200">Support ($2,450)</span>
          </div>
        </div>
      </div>

      {/* CARD 5: Top Contributors */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary-600" />
              <h4 className="font-bold text-sm text-neutral-900 dark:text-white">Top Contributors</h4>
            </div>
            <p className="text-[11px] text-neutral-400 mt-0.5">Ranked organizational drivers</p>
          </div>

          <div className="relative">
            <select
              value={topContribMetric}
              onChange={(e) => setTopContribMetric(e.target.value as any)}
              className="h-7 px-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-[11px] font-bold text-neutral-700 dark:text-neutral-300 cursor-pointer"
            >
              <option value="spend">Spend ($)</option>
              <option value="requests">Requests</option>
              <option value="tokens">Tokens</option>
            </select>
          </div>
        </div>

        {/* Ranked List */}
        <div className="space-y-2 pt-1 text-xs">
          {[
            { rank: "#1", name: "Support Team", type: "Team", val: "$2,450.00", pct: "31.4%" },
            { rank: "#2", name: "support-prod-key", type: "Key", val: "$2,150.00", pct: "27.6%" },
            { rank: "#3", name: "Clinical Operations", type: "Team", val: "$1,520.00", pct: "19.5%" },
            { rank: "#4", name: "Research Team", type: "Team", val: "$1,150.00", pct: "14.7%" },
            { rank: "#5", name: "Claude Sonnet", type: "Model", val: "$1,150.00", pct: "14.7%" },
          ].map((item) => (
            <div key={item.rank} className="flex items-center justify-between py-1 border-b border-neutral-100 dark:border-neutral-800/60 last:border-none">
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-mono text-[10px] text-neutral-400 font-bold shrink-0">{item.rank}</span>
                <span className="font-semibold text-neutral-800 dark:text-neutral-200 truncate">{item.name}</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500 shrink-0">{item.type}</span>
              </div>
              <div className="text-right shrink-0">
                <span className="font-mono font-bold text-neutral-900 dark:text-white">{item.val}</span>
                <span className="text-[10px] text-neutral-400 ml-1.5">({item.pct})</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CARD 6: Capacity & Rate Limits */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-500" />
              <h4 className="font-bold text-sm text-neutral-900 dark:text-white">Capacity & Rate Limits</h4>
            </div>
            <p className="text-[11px] text-neutral-400 mt-0.5">RPM / TPM throttle ceiling</p>
          </div>

          <button
            type="button"
            onClick={() => onTabChange?.("capacity")}
            className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 hover:text-amber-700 hover:underline cursor-pointer"
          >
            <span>View Capacity</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Progress Bars */}
        <div className="space-y-3 pt-1 text-xs">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-neutral-500">Peak RPM Utilization:</span>
              <span className="font-mono font-bold text-amber-600">92.4% <span className="text-[10px] text-neutral-400 font-normal">(462 / 500 RPM)</span></span>
            </div>
            <div className="w-full h-2 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: "92.4%" }} />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-neutral-500">Peak TPM Utilization:</span>
              <span className="font-mono font-bold text-amber-600">92.5% <span className="text-[10px] text-neutral-400 font-normal">(1.85M / 2.0M TPM)</span></span>
            </div>
            <div className="w-full h-2 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: "92.5%" }} />
            </div>
          </div>
        </div>

        {/* Footer Metrics */}
        <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[11px]">
          <span className="text-rose-600 dark:text-rose-400 font-semibold">
            Keys Near Limit: 2 (support-prod-key, key-5)
          </span>
        </div>
      </div>
    </div>
  );
}
