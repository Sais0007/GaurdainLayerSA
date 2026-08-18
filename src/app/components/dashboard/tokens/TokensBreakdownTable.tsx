// src/app/components/dashboard/tokens/TokensBreakdownTable.tsx
import React, { useState } from "react";

type Dimension = "teams" | "users" | "keys" | "models" | "providers";

export function TokensBreakdownTable() {
  const [activeDimension, setActiveDimension] = useState<Dimension>("teams");

  const dataMap: Record<
    Dimension,
    Array<{ name: string; tokens: string; percentage: number; inputRatio: number; outputRatio: number }>
  > = {
    teams: [
      { name: "Support", tokens: "4.61B", percentage: 29.7, inputRatio: 65, outputRatio: 35 },
      { name: "Clinical Operations", tokens: "3.58B", percentage: 23.1, inputRatio: 66, outputRatio: 34 },
      { name: "Research", tokens: "3.28B", percentage: 21.1, inputRatio: 64, outputRatio: 36 },
      { name: "Marketing", tokens: "2.50B", percentage: 16.1, inputRatio: 65, outputRatio: 35 },
      { name: "Product", tokens: "1.56B", percentage: 10.0, inputRatio: 62, outputRatio: 38 },
    ],
    users: [
      { name: "Dr. Sarah Chen", tokens: "2.76B", percentage: 17.8, inputRatio: 65, outputRatio: 35 },
      { name: "Alex Rivera", tokens: "2.30B", percentage: 14.8, inputRatio: 64, outputRatio: 36 },
      { name: "Marcus Vance", tokens: "1.90B", percentage: 12.2, inputRatio: 66, outputRatio: 34 },
      { name: "Emily Watson", tokens: "1.50B", percentage: 9.7, inputRatio: 65, outputRatio: 35 },
      { name: "John Doe", tokens: "1.15B", percentage: 7.4, inputRatio: 63, outputRatio: 37 },
    ],
    keys: [
      { name: "research-analysis-key", tokens: "3.80B", percentage: 23.2, inputRatio: 65, outputRatio: 35 },
      { name: "support-prod-key", tokens: "3.58B", percentage: 23.1, inputRatio: 66, outputRatio: 34 },
      { name: "clinical-ops-key", tokens: "2.90B", percentage: 18.7, inputRatio: 64, outputRatio: 36 },
      { name: "marketing-key", tokens: "2.10B", percentage: 13.5, inputRatio: 65, outputRatio: 35 },
      { name: "product-key", tokens: "1.50B", percentage: 9.7, inputRatio: 62, outputRatio: 38 },
    ],
    models: [
      { name: "Claude Sonnet", tokens: "6.30B", percentage: 38.4, inputRatio: 65, outputRatio: 35 },
      { name: "GPT-4.1", tokens: "4.15B", percentage: 25.3, inputRatio: 66, outputRatio: 34 },
      { name: "GPT-5", tokens: "2.60B", percentage: 15.8, inputRatio: 64, outputRatio: 36 },
      { name: "Gemini Pro", tokens: "1.75B", percentage: 10.7, inputRatio: 65, outputRatio: 35 },
      { name: "Llama 3.1", tokens: "1.10B", percentage: 6.7, inputRatio: 62, outputRatio: 38 },
    ],
    providers: [
      { name: "Anthropic", tokens: "5.81B", percentage: 37.4, inputRatio: 65, outputRatio: 35 },
      { name: "OpenAI", tokens: "7.08B", percentage: 45.6, inputRatio: 66, outputRatio: 34 },
      { name: "Google", tokens: "1.77B", percentage: 11.4, inputRatio: 64, outputRatio: 36 },
      { name: "Meta", tokens: "0.86B", percentage: 5.6, inputRatio: 63, outputRatio: 37 },
    ],
  };

  const rows = dataMap[activeDimension];

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs space-y-6 animate-fadeIn">
      {/* Header with Title, Subtitle, and Dimension Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-neutral-100 dark:border-neutral-800">
        <div>
          <h3 className="font-bold text-base text-neutral-900 dark:text-white">
            Token Consumption Breakdown
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Compare prompt context vs completion output across entities
          </p>
        </div>

        {/* Dimension Switcher Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-neutral-100 dark:bg-neutral-850 rounded-xl text-xs shrink-0 self-start sm:self-auto">
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-2 hidden md:inline">
            VIEW BY:
          </span>
          {(
            [
              { id: "teams", label: "Team" },
              { id: "users", label: "User" },
              { id: "keys", label: "Virtual Key" },
              { id: "models", label: "Model" },
              { id: "providers", label: "Provider" },
            ] as const
          ).map((dim) => (
            <button
              key={dim.id}
              type="button"
              onClick={() => setActiveDimension(dim.id)}
              className={`px-3 py-1 rounded-lg font-semibold text-xs transition-all ${
                activeDimension === dim.id
                  ? "bg-white dark:bg-neutral-900 text-emerald-600 dark:text-emerald-400 shadow-2xs font-bold border border-neutral-200 dark:border-neutral-700"
                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              {dim.label}
            </button>
          ))}
        </div>
      </div>

      {/* Breakdown Rows */}
      <div className="space-y-5 pt-1">
        {rows.map((row) => (
          <div key={row.name} className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-neutral-900 dark:text-white font-sans">
                {row.name}
              </span>
              <div className="font-mono text-xs text-neutral-900 dark:text-white font-bold">
                {row.tokens} Tokens ({row.percentage}%)
              </div>
            </div>

            {/* Stacked Blue (Input) + Emerald Green (Output) Progress Track */}
            <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-2.5 rounded-full overflow-hidden flex">
              <div
                className="h-full bg-blue-600 transition-all rounded-l-full"
                style={{ width: `${row.percentage * (row.inputRatio / 100)}%` }}
                title={`Input Tokens (${row.inputRatio}% of row total)`}
              />
              <div
                className="h-full bg-emerald-500 transition-all rounded-r-full"
                style={{ width: `${row.percentage * (row.outputRatio / 100)}%` }}
                title={`Output Tokens (${row.outputRatio}% of row total)`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
