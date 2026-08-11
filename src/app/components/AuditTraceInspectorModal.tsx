// src/app/components/AuditTraceInspectorModal.tsx
import React, { useState } from "react";
import { X, Search, Copy, Check, Terminal, AlertTriangle, ShieldAlert, RefreshCw, Layers } from "lucide-react";
import { MOCK_INCIDENT_TRACES, IncidentTraceLog } from "./dashboard/dashboardData";
import { toast } from "sonner";

interface AuditTraceInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTraceId?: string;
}

export function AuditTraceInspectorModal({ isOpen, onClose, initialTraceId }: AuditTraceInspectorModalProps) {
  const [search, setSearch] = useState("");
  const [selectedTrace, setSelectedTrace] = useState<IncidentTraceLog>(() => {
    if (initialTraceId) {
      const found = MOCK_INCIDENT_TRACES.find((t) => t.id === initialTraceId);
      if (found) return found;
    }
    return MOCK_INCIDENT_TRACES[0];
  });
  const [copiedId, setCopiedId] = useState(false);
  const [copiedPayload, setCopiedPayload] = useState(false);

  if (!isOpen) return null;

  const filteredTraces = MOCK_INCIDENT_TRACES.filter(
    (t) =>
      !search ||
      t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.virtualKey.toLowerCase().includes(search.toLowerCase()) ||
      t.errorCategory.toLowerCase().includes(search.toLowerCase()) ||
      t.team.toLowerCase().includes(search.toLowerCase())
  );

  const handleCopy = (text: string, isId: boolean) => {
    navigator.clipboard.writeText(text);
    if (isId) {
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
      toast.success("Copied Trace ID to clipboard");
    } else {
      setCopiedPayload(true);
      setTimeout(() => setCopiedPayload(false), 2000);
      toast.success("Copied Error Payload to clipboard");
    }
  };

  const handleSimulateRetry = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: `Re-transmitting payload to ${selectedTrace.provider} gateway...`,
        success: `Trace ${selectedTrace.id} successfully retried & resolved!`,
        error: "Retry failed: Upstream rate limit still active.",
      }
    );
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/80 dark:bg-neutral-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 flex items-center justify-center text-rose-600">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                Audit & Incident Trace Inspector
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                  LIVE INCIDENTS
                </span>
              </h2>
              <p className="text-xs text-neutral-500">
                Inspect raw payload snippets, SLA status codes, and provider error tracebacks.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
          
          {/* Left Column: Trace List */}
          <div className="md:col-span-5 border-r border-neutral-200 dark:border-neutral-800 p-4 space-y-3 flex flex-col bg-neutral-50/50 dark:bg-neutral-900/40">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Filter by Trace ID, Key, Error..."
                className="w-full h-9 pl-9 pr-3 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs focus:ring-2 focus:ring-primary-500 focus:outline-hidden"
              />
              <Search className="w-4 h-4 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>

            {/* List of Traces */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {filteredTraces.map((trace) => {
                const isSelected = selectedTrace.id === trace.id;
                return (
                  <div
                    key={trace.id}
                    onClick={() => setSelectedTrace(trace)}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                      isSelected
                        ? "bg-white dark:bg-neutral-800 border-primary-500 shadow-xs"
                        : "bg-white/70 dark:bg-neutral-950/70 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-neutral-900 dark:text-white text-[11px]">
                        {trace.id}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          trace.statusCode >= 500
                            ? "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
                            : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                        }`}
                      >
                        HTTP {trace.statusCode}
                      </span>
                    </div>

                    <div className="text-[11px] text-neutral-500 mt-1 font-semibold">
                      {trace.errorCategory}
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-neutral-400 mt-2">
                      <span>{trace.team}</span>
                      <span className="font-mono">{trace.latencyMs}ms</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Detailed Trace Inspector */}
          <div className="md:col-span-7 p-5 space-y-4 overflow-y-auto bg-white dark:bg-neutral-900">
            
            {/* Trace Title Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-100 dark:border-neutral-800">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-mono font-bold text-sm text-neutral-900 dark:text-white">
                    {selectedTrace.id}
                  </h3>
                  <button
                    type="button"
                    onClick={() => handleCopy(selectedTrace.id, true)}
                    className="p-1 rounded text-neutral-400 hover:text-primary-600"
                    title="Copy Trace ID"
                  >
                    {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className="text-[11px] font-mono text-neutral-400 mt-0.5">
                  {selectedTrace.timestamp}
                </div>
              </div>

              <button
                type="button"
                onClick={handleSimulateRetry}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-primary-600 hover:bg-primary-700 text-white shadow-xs transition-colors self-start sm:self-auto"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Retry Request Payload
              </button>
            </div>

            {/* Metadata Summary Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-neutral-50 dark:bg-neutral-800/40 p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800">
              <div>
                <span className="text-[10px] text-neutral-400 block font-semibold">VIRTUAL KEY</span>
                <span className="font-mono text-neutral-800 dark:text-neutral-200 font-semibold text-[11px] truncate block">
                  {selectedTrace.virtualKey}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-neutral-400 block font-semibold">TEAM / USER</span>
                <span className="text-neutral-800 dark:text-neutral-200 font-semibold text-[11px] block truncate">
                  {selectedTrace.team}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-neutral-400 block font-semibold">PROVIDER & MODEL</span>
                <span className="text-neutral-800 dark:text-neutral-200 font-semibold text-[11px] block">
                  {selectedTrace.provider} ({selectedTrace.model})
                </span>
              </div>
              <div>
                <span className="text-[10px] text-neutral-400 block font-semibold">LATENCY</span>
                <span className="font-mono text-amber-600 dark:text-amber-400 font-semibold">{selectedTrace.latencyMs} ms</span>
              </div>
              <div>
                <span className="text-[10px] text-neutral-400 block font-semibold">PROMPT / COMPLETION</span>
                <span className="font-mono text-neutral-700 dark:text-neutral-300 font-semibold">
                  {selectedTrace.promptTokens} / {selectedTrace.completionTokens}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-neutral-400 block font-semibold">ESTIMATED COST</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">${selectedTrace.cost.toFixed(4)}</span>
              </div>
            </div>

            {/* Prompt Snippet */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-primary-600" />
                Prompt Snippet Preview
              </label>
              <div className="p-3 bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl text-xs font-mono text-neutral-700 dark:text-neutral-300">
                "{selectedTrace.promptSnippet}"
              </div>
            </div>

            {/* Raw Error Payload JSON Viewer */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-rose-500" />
                  Raw Upstream Error Payload
                </label>
                <button
                  type="button"
                  onClick={() => handleCopy(selectedTrace.errorPayload, false)}
                  className="text-xs text-primary-600 hover:underline flex items-center gap-1 font-semibold"
                >
                  {copiedPayload ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  {copiedPayload ? "Copied" : "Copy Payload"}
                </button>
              </div>

              <pre className="p-4 bg-neutral-950 text-rose-400 rounded-xl text-[11px] font-mono overflow-x-auto border border-neutral-800 max-h-48">
                {selectedTrace.errorPayload}
              </pre>
            </div>

          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-bold rounded-xl transition-colors"
          >
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  );
}
