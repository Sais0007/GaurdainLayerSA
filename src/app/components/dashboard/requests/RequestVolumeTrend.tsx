// src/app/components/dashboard/requests/RequestVolumeTrend.tsx
import React, { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { MOCK_REQUEST_VOLUME_TREND } from "../dashboardData";
import { Zap } from "lucide-react";

export function RequestVolumeTrend() {
  const [metricToggle, setMetricToggle] = useState<"total" | "successful" | "failed">("total");

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-100 dark:border-neutral-800">
        <div>
          <h3 className="font-bold text-base text-neutral-900 dark:text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-600" />
            Request Volume Trajectory Trend
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">24-hour request throughput volume & failure spike detection.</p>
        </div>

        <div className="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl text-xs">
          <button
            type="button"
            onClick={() => setMetricToggle("total")}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${metricToggle === "total" ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-2xs font-bold" : "text-neutral-500"}`}
          >
            Total Reqs
          </button>
          <button
            type="button"
            onClick={() => setMetricToggle("successful")}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${metricToggle === "successful" ? "bg-white dark:bg-neutral-900 text-emerald-600 shadow-2xs font-bold" : "text-neutral-500"}`}
          >
            Successful
          </button>
          <button
            type="button"
            onClick={() => setMetricToggle("failed")}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${metricToggle === "failed" ? "bg-white dark:bg-neutral-900 text-rose-600 shadow-2xs font-bold" : "text-neutral-500"}`}
          >
            Failed Spikes
          </button>
        </div>
      </div>

      <div className="h-[340px] w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={MOCK_REQUEST_VOLUME_TREND} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="reqTotalGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="reqSuccessGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="reqFailedGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <XAxis dataKey="hour" tickLine={false} axisLine={{ stroke: "#e5e5e5" }} tick={{ fontSize: 11, fill: "#888888" }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#888888" }} />

            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-neutral-900 border border-neutral-800 text-white p-3 rounded-xl shadow-2xl text-xs space-y-1 z-[99999]">
                      <div className="font-bold border-b border-neutral-800 pb-1 text-blue-400">Hour: {label}</div>
                      <div className="flex justify-between gap-4"><span className="text-neutral-400">Total Volume:</span><span className="font-mono font-bold text-blue-400">{data.total.toLocaleString()}</span></div>
                      <div className="flex justify-between gap-4"><span className="text-neutral-400">Successful:</span><span className="font-mono font-bold text-emerald-400">{data.successful.toLocaleString()}</span></div>
                      <div className="flex justify-between gap-4"><span className="text-neutral-400">Failed:</span><span className="font-mono font-bold text-rose-400">{data.failed.toLocaleString()}</span></div>
                    </div>
                  );
                }
                return null;
              }}
            />

            {metricToggle === "total" && <Area type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={3} fill="url(#reqTotalGrad)" name="Total Requests" />}
            {metricToggle === "successful" && <Area type="monotone" dataKey="successful" stroke="#10b981" strokeWidth={3} fill="url(#reqSuccessGrad)" name="Successful Requests" />}
            {metricToggle === "failed" && <Area type="monotone" dataKey="failed" stroke="#ef4444" strokeWidth={3} fill="url(#reqFailedGrad)" name="Failed Requests" />}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
