// src/app/components/DashboardSkeleton.tsx
import React from "react";

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse p-4 sm:p-6 max-w-[1600px] mx-auto">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs">
        <div className="space-y-2">
          <div className="h-7 w-64 bg-neutral-200 dark:bg-neutral-800 rounded-lg" />
          <div className="h-4 w-96 bg-neutral-100 dark:bg-neutral-850 rounded-md" />
        </div>
        <div className="flex items-center gap-3">
          <div className="h-9 w-28 bg-neutral-200 dark:bg-neutral-800 rounded-xl" />
          <div className="h-9 w-32 bg-neutral-200 dark:bg-neutral-800 rounded-xl" />
        </div>
      </div>

      {/* Navigation Tabs Skeleton */}
      <div className="h-12 w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-2 flex gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-8 flex-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl" />
        ))}
      </div>

      {/* KPI Row Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 space-y-3 shadow-xs">
            <div className="h-4 w-28 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
            <div className="h-8 w-36 bg-neutral-300 dark:bg-neutral-700 rounded-lg" />
            <div className="h-3 w-48 bg-neutral-100 dark:bg-neutral-850 rounded-md" />
          </div>
        ))}
      </div>

      {/* Chart & Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 h-[420px] shadow-xs space-y-4">
          <div className="h-6 w-48 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
          <div className="h-[320px] w-full bg-neutral-100 dark:bg-neutral-850 rounded-xl" />
        </div>
        <div className="lg:col-span-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 h-[420px] shadow-xs space-y-4">
          <div className="h-6 w-36 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
          <div className="h-[320px] w-full bg-neutral-100 dark:bg-neutral-850 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
