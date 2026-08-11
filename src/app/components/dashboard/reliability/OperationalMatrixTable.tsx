// src/app/components/dashboard/reliability/OperationalMatrixTable.tsx
import React from "react";
import { MOCK_OPERATIONAL_MATRIX } from "../dashboardData";
import { Cpu, Eye } from "lucide-react";

interface OperationalMatrixTableProps {
  onInspectTrace: (id?: string) => void;
}

export function OperationalMatrixTable({ onInspectTrace }: OperationalMatrixTableProps) {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
        <div>
          <h3 className="font-bold text-base text-neutral-900 dark:text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-blue-600" />
            Model & Provider Operational Unit Economics Matrix
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">Latency, error rate, cost per 1K tokens, and SLA health status.</p>
        </div>
      </div>

      <div className="overflow-x-auto border border-neutral-200 dark:border-neutral-800 rounded-xl">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-neutral-50 dark:bg-neutral-800/60 text-neutral-500 dark:text-neutral-400 border-b border-neutral-200 dark:border-neutral-800 font-semibold whitespace-nowrap">
              <th className="py-3 px-4">Model Name</th>
              <th className="py-3 px-4">Provider</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Avg Latency</th>
              <th className="py-3 px-4">Error Rate</th>
              <th className="py-3 px-4">Cost / 1K Tokens</th>
              <th className="py-3 px-4">Success Rate</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800 text-neutral-800 dark:text-neutral-200">
            {MOCK_OPERATIONAL_MATRIX.map((m) => (
              <tr key={m.id} className="hover:bg-neutral-50/70 dark:hover:bg-neutral-800/40 transition-colors">
                <td className="py-3.5 px-4 font-bold text-neutral-900 dark:text-white whitespace-nowrap">{m.model}</td>
                <td className="py-3.5 px-4 font-semibold text-neutral-600 dark:text-neutral-400 whitespace-nowrap">{m.provider}</td>
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                    m.status === "HEALTHY"
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200"
                      : "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200"
                  }`}>
                    {m.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 font-mono whitespace-nowrap">{m.latencyMs} ms</td>
                <td className="py-3.5 px-4 font-mono font-bold text-rose-600 dark:text-rose-400 whitespace-nowrap">{m.errorRate}</td>
                <td className="py-3.5 px-4 font-mono font-semibold whitespace-nowrap">{m.costPer1K}</td>
                <td className="py-3.5 px-4 font-mono font-bold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">{m.successRate}</td>
                <td className="py-3.5 px-4 text-right whitespace-nowrap">
                  <button
                    type="button"
                    onClick={() => onInspectTrace("trace-984021-sonnet")}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:underline"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Inspect Log
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
