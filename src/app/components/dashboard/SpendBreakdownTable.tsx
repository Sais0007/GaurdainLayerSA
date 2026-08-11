// src/app/components/dashboard/SpendBreakdownTable.tsx
import React, { useState } from "react";
import { MOCK_SPEND_BREAKDOWN, SpendBreakdownRow } from "./dashboardData";
import { Search, ChevronRight, Layers, Eye } from "lucide-react";

interface SpendBreakdownTableProps {
  onInspectTrace?: (id?: string) => void;
}

export function SpendBreakdownTable({ onInspectTrace }: SpendBreakdownTableProps) {
  const [activeTab, setActiveTab] = useState<"teams" | "users" | "virtual_keys" | "models" | "providers">("teams");
  const [searchQuery, setSearchQuery] = useState("");

  const rows: SpendBreakdownRow[] = MOCK_SPEND_BREAKDOWN[activeTab] || [];
  const filteredRows = rows.filter((r) =>
    !searchQuery || r.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs space-y-4">
      {/* Header & 5-Mode Dimension Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-100 dark:border-neutral-800">
        <div>
          <h3 className="font-bold text-base text-neutral-900 dark:text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-primary-600" />
            Resource Allocation & Spend Breakdown
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            Multi-dimension cost distribution ranked by total usage & contribution percentage.
          </p>
        </div>

        {/* Dimension Switcher Tabs */}
        <div className="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl overflow-x-auto">
          {(
            [
              { id: "teams", label: "Teams" },
              { id: "users", label: "Users" },
              { id: "virtual_keys", label: "Virtual Keys" },
              { id: "models", label: "Models" },
              { id: "providers", label: "Providers" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-2xs font-bold"
                  : "text-neutral-500 hover:text-neutral-800 dark:hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="flex items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${activeTab.replace("_", " ")}...`}
            className="w-full h-9 pl-9 pr-3 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-hidden"
          />
          <Search className="w-4 h-4 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <span className="text-xs text-neutral-400 font-medium">
          Showing {filteredRows.length} items
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-neutral-200 dark:border-neutral-800 rounded-xl">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-neutral-50 dark:bg-neutral-800/60 text-neutral-500 dark:text-neutral-400 border-b border-neutral-200 dark:border-neutral-800 font-semibold whitespace-nowrap">
              <th className="py-3 px-4">Dimension Name</th>
              <th className="py-3 px-4">Period Spend</th>
              <th className="py-3 px-4">Request Volume</th>
              <th className="py-3 px-4">Total Tokens</th>
              <th className="py-3 px-4">Spend Contribution</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/80 text-neutral-800 dark:text-neutral-200">
            {filteredRows.map((row) => (
              <tr key={row.id} className="hover:bg-neutral-50/70 dark:hover:bg-neutral-800/40 transition-colors">
                <td className="py-3.5 px-4 font-bold text-neutral-900 dark:text-white whitespace-nowrap">
                  {row.name}
                </td>

                <td className="py-3.5 px-4 font-mono font-bold text-neutral-900 dark:text-white whitespace-nowrap">
                  ${row.spend.toFixed(2)}
                </td>

                <td className="py-3.5 px-4 font-mono text-neutral-600 dark:text-neutral-400 whitespace-nowrap">
                  {row.requests.toLocaleString()}
                </td>

                <td className="py-3.5 px-4 font-mono text-neutral-600 dark:text-neutral-400 whitespace-nowrap">
                  {row.tokens}
                </td>

                {/* Contribution Progress Bar */}
                <td className="py-3.5 px-4 w-48">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-neutral-100 dark:bg-neutral-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-primary-600 h-full rounded-full transition-all"
                        style={{ width: `${row.percentage}%` }}
                      />
                    </div>
                    <span className="font-mono font-semibold text-[11px] w-10 text-right">
                      {row.percentage}%
                    </span>
                  </div>
                </td>

                {/* Status Badge */}
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                      row.status === "Healthy"
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
                        : row.status === "Near Limit"
                        ? "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800"
                        : row.status === "Warning"
                        ? "bg-orange-50 text-orange-700 dark:bg-orange-950/60 dark:text-orange-300 border-orange-200 dark:border-orange-800"
                        : "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>

                {/* Action */}
                <td className="py-3.5 px-4 text-right whitespace-nowrap">
                  <button
                    type="button"
                    onClick={() => onInspectTrace?.(row.id)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 hover:text-primary-700 dark:hover:text-primary-400 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Inspect Trace
                    <ChevronRight className="w-3.5 h-3.5" />
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
