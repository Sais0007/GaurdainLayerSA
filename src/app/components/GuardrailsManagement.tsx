// src/app/components/GuardrailsManagement.tsx
import React from "react";
import { ShieldAlert } from "lucide-react";
import { PageHeader } from "./hb/listing";

export default function GuardrailsManagement() {
  return (
    <div className="p-6 space-y-6 animate-fadeIn max-w-[1400px] mx-auto">
      {/* Header */}
      <PageHeader
        title="Guardrails & Safety Policies"
        subtitle="Real-time content moderation, PII redaction, topic blocking, and hallucination defense engine"
      />

      {/* Main Hero Coming Soon Card */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 sm:p-12 shadow-sm text-center flex flex-col items-center justify-center space-y-6 relative overflow-hidden">
        {/* Decorative Background Gradients */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Animated Coming Soon Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-950/80 border border-primary-200 dark:border-primary-800 text-primary-600 dark:text-primary-400 text-xs font-extrabold uppercase tracking-wider shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-primary-600 animate-ping" />
          <span>MODULE IN DEVELOPMENT &bull; COMING SOON</span>
        </div>

        {/* Animated GIF Hero Media */}
        <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-xl flex items-center justify-center bg-neutral-950 relative group">
          <img
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3ZpdTFndmFwbGN0NHZxcTloNGV5Nm9kZHFyM3Iwa3A4bHE0Z3U0eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/L1R1tvI9svkIWwpVYr/giphy.gif"
            alt="AI Guardrails Security Shield Animation"
            className="w-full h-full object-cover rounded-2xl opacity-90 transition-all group-hover:scale-105"
            onError={(e) => {
              // Fallback to high tech CSS animation icon if network GIF fails
              (e.target as HTMLElement).style.display = "none";
            }}
          />
          {/* Fallback Icon Container */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-3 bg-neutral-900/90 pointer-events-none hidden group-has-[img[style*='display: none']]:flex">
            <div className="p-4 rounded-2xl bg-primary-600/20 text-primary-400 border border-primary-500/30 animate-pulse">
              <ShieldAlert className="w-12 h-12" />
            </div>
            <span className="text-xs font-bold text-white font-mono">AI Guardrails Security Engine</span>
          </div>
        </div>
      </div>
    </div>
  );
}
