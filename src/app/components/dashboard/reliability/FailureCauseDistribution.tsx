// src/app/components/dashboard/reliability/FailureCauseDistribution.tsx
import React from "react";
import { AlertOctagon } from "lucide-react";

export function FailureCauseDistribution() {
  const causes = [
    { code: "503 Provider Down", count: 3420, percentage: 49.3, desc: "Anthropic / OpenAI API backend overload & capacity exhaustion" },
    { code: "504 Gateway Timeout", count: 1840, percentage: 26.5, desc: "Upstream HTTP timeout waiting for completion response (>30s)" },
    { code: "429 RPM Limit", count: 890, percentage: 12.8, desc: "Virtual key request-per-minute ceiling breach" },
    { code: "429 TPM Limit", count: 520, percentage: 7.5, desc: "Virtual key token-per-minute burst limit breach" },
    { code: "402 Budget Exceeded", count: 180, percentage: 2.6, desc: "Hard budget cap enforcement trigger" },
    { code: "401 Auth Failure", count: 91, percentage: 1.3, desc: "Invalid or revoked virtual key signature" },
  ];

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
        <div>
          <h3 className="font-bold text-base text-neutral-900 dark:text-white flex items-center gap-2">
            <AlertOctagon className="w-5 h-5 text-rose-600" />
            Normalized Root Cause Failure Distribution
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">Distribution breakdown of failed request status codes (6,941 total errors).</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
        {causes.map((c) => (
          <div key={c.code} className="p-3.5 rounded-xl bg-neutral-50/60 dark:bg-neutral-800/40 border border-neutral-200/60 dark:border-neutral-800 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-rose-600 dark:text-rose-400 font-mono">{c.code}</span>
              <span className="font-mono text-neutral-500 font-bold">{c.count.toLocaleString()} reqs ({c.percentage}%)</span>
            </div>

            <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-2.5 rounded-full overflow-hidden">
              <div className="bg-rose-500 h-full rounded-full transition-all" style={{ width: `${c.percentage}%` }} />
            </div>

            <p className="text-[11px] text-neutral-400 leading-tight pt-0.5">
              {c.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
