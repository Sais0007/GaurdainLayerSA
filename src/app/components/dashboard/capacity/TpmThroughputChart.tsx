// src/app/components/dashboard/capacity/TpmThroughputChart.tsx
import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { MOCK_CAPACITY_TPM_DATA } from "../dashboardData";
import { Cpu } from "lucide-react";

export function TpmThroughputChart() {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-100 dark:border-neutral-800">
        <div>
          <h3 className="font-bold text-base text-neutral-900 dark:text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-purple-600" />
            TPM Burst Throughput (Peak vs 2.0M TPM Ceiling)
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">Token burst volume per minute vs gateway token limit.</p>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-purple-500" />
            <span className="text-neutral-600 dark:text-neutral-400">Actual TPM (Peak 1.85M)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-rose-500 border border-dashed" />
            <span className="text-neutral-600 dark:text-neutral-400">TPM Limit (2.0M TPM)</span>
          </div>
        </div>
      </div>

      <div className="h-[300px] w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={MOCK_CAPACITY_TPM_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <XAxis dataKey="hour" tickLine={false} axisLine={{ stroke: "#e5e5e5" }} tick={{ fontSize: 11, fill: "#888888" }} />
            <YAxis tickLine={false} axisLine={false} tickFormatter={(v) => `${v}M`} tick={{ fontSize: 11, fill: "#888888" }} domain={[0, 2.5]} />

            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-neutral-900 border border-neutral-800 text-white p-3 rounded-xl shadow-2xl text-xs space-y-1 z-[99999]">
                      <div className="font-bold border-b border-neutral-800 pb-1 text-purple-400">Hour: {label}</div>
                      <div className="flex justify-between gap-4"><span className="text-neutral-400">Actual TPM:</span><span className="font-mono font-bold text-purple-400">{data.actualTpm}M TPM</span></div>
                      <div className="flex justify-between gap-4"><span className="text-neutral-400">Limit:</span><span className="font-mono font-bold text-rose-400">{data.thresholdTpm}M TPM</span></div>
                    </div>
                  );
                }
                return null;
              }}
            />

            <ReferenceLine y={2.0} stroke="#ef4444" strokeDasharray="4 4" label={{ value: "2.0M TPM Limit", fill: "#ef4444", fontSize: 10, position: "insideTopRight" }} />
            <Line type="monotone" dataKey="actualTpm" stroke="#a855f7" strokeWidth={3} dot={false} name="Actual TPM" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
