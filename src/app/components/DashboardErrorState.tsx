// src/app/components/DashboardErrorState.tsx
import React from "react";
import { AlertOctagon, RefreshCw } from "lucide-react";

interface DashboardErrorStateProps {
  onRetry: () => void;
  errorMessage?: string;
}

export function DashboardErrorState({ onRetry, errorMessage }: DashboardErrorStateProps) {
  return (
    <div className="bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 rounded-2xl p-12 text-center shadow-xs space-y-5 my-6 flex flex-col items-center justify-center min-h-[400px]">
      <div className="w-16 h-16 rounded-2xl bg-rose-100 dark:bg-rose-900/60 border border-rose-300 dark:border-rose-800 flex items-center justify-center text-rose-600 dark:text-rose-400 shadow-inner">
        <AlertOctagon className="w-8 h-8 animate-bounce" />
      </div>

      <div className="space-y-1 max-w-md">
        <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
          Telemetry Stream Incident Detected
        </h3>
        <p className="text-xs text-rose-600 dark:text-rose-400 font-medium">
          {errorMessage || "Unable to establish websocket connection with Guardian Layer Gateway Telemetry service."}
        </p>
      </div>

      <button
        type="button"
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        Retry Stream Connection
      </button>
    </div>
  );
}
