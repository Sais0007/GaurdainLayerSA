// src/app/components/dashboard/capacity/VirtualKeysCapacityList.tsx
import React from "react";
import { MOCK_CAPACITY_KEYS_RISK } from "../dashboardData";
import { Key, ShieldAlert } from "lucide-react";

export function VirtualKeysCapacityList() {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
        <div>
          <h3 className="font-bold text-base text-neutral-900 dark:text-white flex items-center gap-2">
            <Key className="w-5 h-5 text-amber-500" />
            Virtual Keys Capacity & Throttle Risk Analysis
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">5 key risk rows with dual progress bars for RPM & TPM utilization.</p>
        </div>
      </div>

      <div className="space-y-4 pt-1">
        {MOCK_CAPACITY_KEYS_RISK.map((k) => (
          <div key={k.id} className="p-4 rounded-xl bg-neutral-50/60 dark:bg-neutral-800/40 border border-neutral-200/60 dark:border-neutral-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-bold text-xs text-neutral-900 dark:text-white flex items-center gap-2">
                  {k.keyName}
                  {k.riskColor === "red" && <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />}
                </span>
                <span className="text-[11px] text-neutral-400 block">{k.team}</span>
              </div>

              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border self-start sm:self-auto ${
                  k.riskColor === "red"
                    ? "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border-rose-200"
                    : k.riskColor === "orange"
                    ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border-amber-200"
                    : k.riskColor === "yellow"
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300 border-yellow-200"
                    : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200"
                }`}
              >
                {k.riskBadge}
              </span>
            </div>

            {/* Dual Progress Track (RPM vs TPM) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-neutral-500 font-semibold">RPM Utilization:</span>
                  <span className="font-mono font-bold">{k.rpmUtil}%</span>
                </div>
                <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-2 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all ${k.rpmUtil >= 90 ? "bg-rose-500" : k.rpmUtil >= 80 ? "bg-amber-500" : "bg-blue-500"}`} style={{ width: `${k.rpmUtil}%` }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-neutral-500 font-semibold">TPM Utilization:</span>
                  <span className="font-mono font-bold">{k.tpmUtil}%</span>
                </div>
                <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-2 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all ${k.tpmUtil >= 90 ? "bg-purple-600" : k.tpmUtil >= 80 ? "bg-amber-500" : "bg-emerald-500"}`} style={{ width: `${k.tpmUtil}%` }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
