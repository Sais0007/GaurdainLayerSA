import React from "react";
import { Sparkles, BarChart3, Zap } from "lucide-react";
import { PageHeader } from "./hb/listing/PageHeader";

export default function Dashboard() {
  return (
    <div className="p-4 sm:p-6 max-w-[1600px] mx-auto space-y-6">
      {/* HB Page Header */}
      <PageHeader
        pageId="dashboard"
        action="list"
      />

      {/* Main "Coming Soon" Hero Container */}
      <div className="relative overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-12 sm:p-24 text-center shadow-sm space-y-8 min-h-[500px] flex flex-col items-center justify-center">
        {/* Subtle Background Glow Accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-500/10 dark:bg-primary-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Animated Icon Centerpiece */}
        <div className="relative inline-flex items-center justify-center">
          {/* Pulsing Ring Backdrop */}
          <div className="absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-primary-500/15 dark:bg-primary-400/20 animate-ping opacity-75 pointer-events-none" />
          
          {/* Rotating Outer Gradient Orbit Ring */}
          <div className="absolute w-32 h-32 sm:w-40 sm:h-40 rounded-full border-2 border-dashed border-primary-500/40 dark:border-primary-400/40 animate-[spin_12s_linear_infinite]" />

          {/* Core Animated Icon Badge */}
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-tr from-neutral-900 via-neutral-800 to-neutral-900 dark:from-white dark:via-neutral-100 dark:to-white text-white dark:text-neutral-900 flex items-center justify-center shadow-xl transform transition-transform hover:scale-105 duration-300">
            <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 animate-pulse text-amber-400 dark:text-amber-500" />
            
            {/* Floating Satellite Icon 1 */}
            <div className="absolute -top-2 -right-2 p-2 rounded-xl bg-primary-600 text-white shadow-md animate-bounce">
              <Zap className="w-4 h-4" />
            </div>

            {/* Floating Satellite Icon 2 */}
            <div className="absolute -bottom-2 -left-2 p-2 rounded-xl bg-purple-600 text-white shadow-md animate-[pulse_2s_infinite]">
              <BarChart3 className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Text & Title */}
        <div className="space-y-2 relative">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Dashboard Coming Soon
          </h1>
        </div>
      </div>
    </div>
  );
}
