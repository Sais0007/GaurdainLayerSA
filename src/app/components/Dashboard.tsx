import React, { useState } from "react";
import { 
  Sparkles, 
  Clock, 
  Rocket, 
  Bell, 
  BarChart3, 
  ShieldCheck, 
  Activity, 
  Layers, 
  ArrowRight, 
  CheckCircle2,
  Lock,
  Cpu,
  TrendingUp,
  Zap
} from "lucide-react";
import { PageHeader } from "./hb/listing/PageHeader";
import { PrimaryButton, SecondaryButton } from "./hb/listing";
import { toast } from "sonner";

export default function Dashboard() {
  const [isNotified, setIsNotified] = useState(false);

  const handleNotifyMe = () => {
    setIsNotified(true);
    toast.success("You'll be notified when Dashboard Analytics goes live!");
  };

  return (
    <div className="p-4 sm:p-6 max-w-[1600px] mx-auto space-y-6">
      {/* HB Page Header */}
      <PageHeader
        pageId="dashboard"
        action="list"
      />

      {/* Main "Coming Soon" Hero Container */}
      <div className="relative overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 sm:p-16 text-center shadow-sm space-y-8">
        {/* Subtle Background Glow Accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-500/10 dark:bg-primary-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Animated Icon Centerpiece */}
        <div className="relative inline-flex items-center justify-center">
          {/* Pulsing Ring Backdrop */}
          <div className="absolute w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-primary-500/15 dark:bg-primary-400/20 animate-ping opacity-75 pointer-events-none" />
          
          {/* Rotating Outer Gradient Orbit Ring */}
          <div className="absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full border-2 border-dashed border-primary-500/40 dark:border-primary-400/40 animate-[spin_12s_linear_infinite]" />

          {/* Core Animated Icon Badge */}
          <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr from-neutral-900 via-neutral-800 to-neutral-900 dark:from-white dark:via-neutral-100 dark:to-white text-white dark:text-neutral-900 flex items-center justify-center shadow-xl transform transition-transform hover:scale-105 duration-300">
            <Sparkles className="w-10 h-10 sm:w-14 sm:h-14 animate-pulse text-amber-400 dark:text-amber-500" />
            
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

        {/* Text & Typography */}
        <div className="max-w-2xl mx-auto space-y-3 relative">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary-50 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800">
            <Clock className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Next-Gen Analytics Engine</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Dashboard Coming Soon
          </h1>

          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            We are building an enterprise-grade telemetry dashboard for real-time model usage analytics, platform spend monitoring, token throughput tracking, and system health governance.
          </p>
        </div>

        {/* Feature Preview Pill Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-left relative">
          <div className="p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-2 hover:border-neutral-300 transition-colors">
            <div className="p-2 w-fit rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
              <Activity className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-neutral-900 dark:text-white">Real-Time Telemetry</h3>
            <p className="text-[11px] text-neutral-500 leading-normal">
              Monitor live RPM, TPM limits, and request latencies across all organizations.
            </p>
          </div>

          <div className="p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-2 hover:border-neutral-300 transition-colors">
            <div className="p-2 w-fit rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-neutral-900 dark:text-white">Spend & Budget Cap</h3>
            <p className="text-[11px] text-neutral-500 leading-normal">
              Track lifetime organization spend and soft/hard budget allocations dynamically.
            </p>
          </div>

          <div className="p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-2 hover:border-neutral-300 transition-colors">
            <div className="p-2 w-fit rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-neutral-900 dark:text-white">Platform Governance</h3>
            <p className="text-[11px] text-neutral-500 leading-normal">
              Audit logs, security compliance enforcement, and model master management.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 relative">
          <PrimaryButton onClick={handleNotifyMe}>
            {isNotified ? (
              <>
                <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-400" />
                Notification Enabled
              </>
            ) : (
              <>
                <Bell className="w-4 h-4 mr-1.5" />
                Notify Me on Release
              </>
            )}
          </PrimaryButton>

          <SecondaryButton onClick={() => window.dispatchEvent(new CustomEvent("reset-view-state", { detail: { pageId: "organizations" } }))}>
            <span>Explore Organizations</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
}
