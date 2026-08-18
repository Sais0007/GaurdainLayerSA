// src/app/components/AIGatewayModelManagement.tsx
import React, { useState, useMemo } from "react";
import {
  Search,
  Plus,
  Filter,
  RefreshCw,
  Check,
  X,
  ShieldAlert,
  Cpu,
  Layers,
  Zap,
  ArrowLeft,
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
  Key,
  Globe,
  Lock,
  SlidersHorizontal,
  ChevronRight,
  Sparkles,
  Server,
  Building2,
  Copy,
  Eye,
  EyeOff,
  RotateCw,
} from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "./hb/listing";

export interface GatewayProviderDef {
  id: string;
  name: string;
  color: string;
}

export interface GatewayModelRecord {
  id: string;
  name: string;
  alias?: string;
  providerId: string;
  providerName: string;
  color: string;
  contextWindow: number;
  inputPrice: number;
  outputPrice: number;
  status: "Active" | "Inactive";
  configured: boolean;
  credentialName?: string;
  maxInput: number;
  maxOutput: number;
  capabilities: string[];
}

export interface CredentialOption {
  id: string;
  name: string;
  provider: string;
}

const PROVIDERS: GatewayProviderDef[] = [
  { id: "gemini", name: "Gemini", color: "#2563eb" },
  { id: "anthropic", name: "Anthropic", color: "#7c3aed" },
  { id: "aiml", name: "Aiml", color: "#db2777" },
  { id: "openai", name: "OpenAI", color: "#059669" },
  { id: "azure", name: "Azure", color: "#d97706" },
  { id: "azure_text", name: "Azure_text", color: "#0891b2" },
];

const INITIAL_MODELS: GatewayModelRecord[] = [
  {
    id: "gw-1",
    name: "gemini/gemini-2.5-flash",
    alias: "prod-flash-2.5",
    providerId: "gemini",
    providerName: "Gemini",
    color: "#2563eb",
    contextWindow: 1000000,
    inputPrice: 0.07,
    outputPrice: 0.3,
    status: "Active",
    configured: true,
    credentialName: "Prod Key Vault",
    maxInput: 1000000,
    maxOutput: 8192,
    capabilities: ["function", "vision", "json", "streaming"],
  },
  {
    id: "gw-2",
    name: "claude-4-opus-20250514",
    alias: "claude-4-opus",
    providerId: "anthropic",
    providerName: "Anthropic",
    color: "#7c3aed",
    contextWindow: 200000,
    inputPrice: 15.0,
    outputPrice: 75.0,
    status: "Active",
    configured: true,
    credentialName: "Anthropic Enterprise API Key",
    maxInput: 200000,
    maxOutput: 4096,
    capabilities: ["function", "vision", "streaming", "caching"],
  },
  {
    id: "gw-3",
    name: "aiml/custom-model",
    providerId: "aiml",
    providerName: "Aiml",
    color: "#db2777",
    contextWindow: 32768,
    inputPrice: 0.5,
    outputPrice: 1.5,
    status: "Active",
    configured: false,
    maxInput: 32768,
    maxOutput: 4096,
    capabilities: ["streaming"],
  },
  {
    id: "gw-4",
    name: "claude-haiku-4-5",
    alias: "fast-haiku",
    providerId: "anthropic",
    providerName: "Anthropic",
    color: "#7c3aed",
    contextWindow: 128000,
    inputPrice: 0.25,
    outputPrice: 1.25,
    status: "Active",
    configured: true,
    credentialName: "Anthropic Enterprise API Key",
    maxInput: 128000,
    maxOutput: 4096,
    capabilities: ["function", "streaming"],
  },
  {
    id: "gw-5",
    name: "claude-opus-4-5",
    providerId: "anthropic",
    providerName: "Anthropic",
    color: "#7c3aed",
    contextWindow: 200000,
    inputPrice: 15.0,
    outputPrice: 75.0,
    status: "Active",
    configured: false,
    maxInput: 200000,
    maxOutput: 4096,
    capabilities: ["function", "vision", "json", "streaming"],
  },
  {
    id: "gw-6",
    name: "claude-4-sonnet-20250514",
    alias: "main-sonnet-4",
    providerId: "anthropic",
    providerName: "Anthropic",
    color: "#7c3aed",
    contextWindow: 200000,
    inputPrice: 3.0,
    outputPrice: 15.0,
    status: "Active",
    configured: true,
    credentialName: "Anthropic Enterprise API Key",
    maxInput: 200000,
    maxOutput: 8192,
    capabilities: ["function", "vision", "json", "streaming", "toolChoice"],
  },
  {
    id: "gw-7",
    name: "gpt-4o-mini",
    alias: "team-gpt4o-mini",
    providerId: "openai",
    providerName: "OpenAI",
    color: "#059669",
    contextWindow: 128000,
    inputPrice: 0.15,
    outputPrice: 0.6,
    status: "Active",
    configured: true,
    credentialName: "Production OpenAI Master Key",
    maxInput: 128000,
    maxOutput: 16384,
    capabilities: ["function", "vision", "json", "streaming"],
  },
  {
    id: "gw-8",
    name: "azure/o4-mini",
    providerId: "azure",
    providerName: "Azure",
    color: "#d97706",
    contextWindow: 128000,
    inputPrice: 1.1,
    outputPrice: 4.4,
    status: "Active",
    configured: false,
    maxInput: 128000,
    maxOutput: 8192,
    capabilities: ["function", "json", "streaming"],
  },
  {
    id: "gw-9",
    name: "gpt-4o",
    alias: "flagship-gpt4o",
    providerId: "openai",
    providerName: "OpenAI",
    color: "#059669",
    contextWindow: 128000,
    inputPrice: 2.5,
    outputPrice: 10.0,
    status: "Active",
    configured: true,
    credentialName: "Production OpenAI Master Key",
    maxInput: 128000,
    maxOutput: 16384,
    capabilities: ["function", "vision", "json", "streaming", "parallel"],
  },
  {
    id: "gw-10",
    name: "gemini/gemini-2.5-flash-lite",
    providerId: "gemini",
    providerName: "Gemini",
    color: "#2563eb",
    contextWindow: 1000000,
    inputPrice: 0.03,
    outputPrice: 0.1,
    status: "Active",
    configured: false,
    maxInput: 1000000,
    maxOutput: 8192,
    capabilities: ["streaming"],
  },
  {
    id: "gw-11",
    name: "azure/gpt-4o-mini",
    alias: "azure-mini-eastus",
    providerId: "azure",
    providerName: "Azure",
    color: "#d97706",
    contextWindow: 128000,
    inputPrice: 0.15,
    outputPrice: 0.6,
    status: "Active",
    configured: true,
    credentialName: "Azure OpenAI East US Endpoint",
    maxInput: 128000,
    maxOutput: 16384,
    capabilities: ["function", "json", "streaming"],
  },
  {
    id: "gw-12",
    name: "gemini/gemini-2.5-pro",
    alias: "gemini-pro-2.5",
    providerId: "gemini",
    providerName: "Gemini",
    color: "#2563eb",
    contextWindow: 2000000,
    inputPrice: 1.25,
    outputPrice: 5.0,
    status: "Active",
    configured: true,
    credentialName: "Prod Key Vault",
    maxInput: 2000000,
    maxOutput: 8192,
    capabilities: ["function", "vision", "json", "streaming", "caching"],
  },
  {
    id: "gw-13",
    name: "azure/gpt-3.5-turbo-instruct",
    providerId: "azure_text",
    providerName: "Azure_text",
    color: "#0891b2",
    contextWindow: 4096,
    inputPrice: 1.5,
    outputPrice: 2.0,
    status: "Active",
    configured: false,
    maxInput: 4096,
    maxOutput: 4096,
    capabilities: ["streaming"],
  },
  {
    id: "gw-14",
    name: "high/1536-x-1024/gpt-image-1",
    providerId: "openai",
    providerName: "OpenAI",
    color: "#059669",
    contextWindow: 8192,
    inputPrice: 10.0,
    outputPrice: 30.0,
    status: "Inactive",
    configured: false,
    maxInput: 8192,
    maxOutput: 2048,
    capabilities: ["vision"],
  },
  {
    id: "gw-15",
    name: "azure/tts-1",
    alias: "audio-synth-1",
    providerId: "azure",
    providerName: "Azure",
    color: "#d97706",
    contextWindow: 8192,
    inputPrice: 15.0,
    outputPrice: 15.0,
    status: "Active",
    configured: true,
    credentialName: "Azure OpenAI East US Endpoint",
    maxInput: 8192,
    maxOutput: 2048,
    capabilities: ["audio"],
  },
];

const INITIAL_POOL: GatewayModelRecord[] = [
  {
    id: "pool-1",
    name: "gpt-4.1",
    providerId: "openai",
    providerName: "OpenAI",
    color: "#059669",
    contextWindow: 128000,
    inputPrice: 2.0,
    outputPrice: 8.0,
    status: "Active",
    configured: false,
    maxInput: 128000,
    maxOutput: 16384,
    capabilities: ["function", "vision", "json", "streaming"],
  },
  {
    id: "pool-2",
    name: "claude-3-5-haiku-20241022",
    providerId: "anthropic",
    providerName: "Anthropic",
    color: "#7c3aed",
    contextWindow: 200000,
    inputPrice: 0.8,
    outputPrice: 4.0,
    status: "Active",
    configured: false,
    maxInput: 200000,
    maxOutput: 8192,
    capabilities: ["function", "streaming"],
  },
  {
    id: "pool-3",
    name: "gemini/gemini-1.5-pro",
    providerId: "gemini",
    providerName: "Gemini",
    color: "#2563eb",
    contextWindow: 1000000,
    inputPrice: 1.25,
    outputPrice: 5.0,
    status: "Active",
    configured: false,
    maxInput: 1000000,
    maxOutput: 8192,
    capabilities: ["function", "vision", "json", "streaming"],
  },
  {
    id: "pool-4",
    name: "azure/gpt-4-turbo",
    providerId: "azure",
    providerName: "Azure",
    color: "#d97706",
    contextWindow: 128000,
    inputPrice: 10.0,
    outputPrice: 30.0,
    status: "Active",
    configured: false,
    maxInput: 128000,
    maxOutput: 4096,
    capabilities: ["function", "json", "streaming"],
  },
  {
    id: "pool-5",
    name: "aiml/mixtral-8x7b",
    providerId: "aiml",
    providerName: "Aiml",
    color: "#db2777",
    contextWindow: 32768,
    inputPrice: 0.6,
    outputPrice: 1.8,
    status: "Active",
    configured: false,
    maxInput: 32768,
    maxOutput: 4096,
    capabilities: ["streaming"],
  },
];

const AVAILABLE_CREDENTIALS: CredentialOption[] = [
  { id: "cred-1", name: "Production OpenAI Master Key", provider: "OpenAI" },
  { id: "cred-2", name: "Anthropic Enterprise API Key", provider: "Anthropic" },
  { id: "cred-3", name: "Azure OpenAI East US Endpoint", provider: "Azure" },
  { id: "cred-4", name: "Team Shared Key", provider: "All" },
  { id: "cred-5", name: "Prod Key Vault", provider: "All" },
  { id: "cred-6", name: "Manual", provider: "Custom" },
];

function formatContext(n: number): string {
  if (n >= 1000000) return `${n / 1000000}M`;
  if (n >= 1000) return `${Math.round(n / 1000)}K`;
  return String(n);
}

export default function AIGatewayModelManagement() {
  // Main Data States
  const [models, setModels] = useState<GatewayModelRecord[]>(INITIAL_MODELS);
  const [poolModels, setPoolModels] = useState<GatewayModelRecord[]>(INITIAL_POOL);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Navigation View State: "list" | "detail"
  const [view, setView] = useState<"list" | "detail">("list");
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);

  // Listing Search & Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [providerFilterIds, setProviderFilterIds] = useState<Record<string, boolean>>({});
  const [priceFilter, setPriceFilter] = useState<string>("all");
  const [priceOutFilter, setPriceOutFilter] = useState<string>("all");
  const [contextFilter, setContextFilter] = useState<string>("all");

  // Dropdown Open States for Facets
  const [openFacet, setOpenFacet] = useState<string | null>(null);

  // Sorting & Pagination State
  const [sortField, setSortField] = useState<keyof GatewayModelRecord>("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const pageSize = 15;

  // Modal States: Configure Model
  const [configModalModel, setConfigModalModel] = useState<GatewayModelRecord | null>(null);
  const [credSelectionMode, setCredSelectionMode] = useState<"existing" | "new">("existing");
  const [selectedCredId, setSelectedCredId] = useState<string>("");
  const [newCredName, setNewCredName] = useState<string>("");
  const [newBaseUrl, setNewBaseUrl] = useState<string>("");
  const [newApiKey, setNewApiKey] = useState<string>("");
  const [showApiKey, setShowApiKey] = useState<boolean>(false);
  const [aliasDraft, setAliasDraft] = useState<string>("");
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<"none" | "success" | "failure">("none");

  // Modal States: Add Model
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addSearch, setAddSearch] = useState("");
  const [addSelectedIds, setAddSelectedIds] = useState<Record<string, boolean>>({});

  // Reset all filters
  const resetFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setProviderFilterIds({});
    setPriceFilter("all");
    setPriceOutFilter("all");
    setContextFilter("all");
    setPage(1);
    setOpenFacet(null);
  };

  const hasActiveFilters = useMemo(() => {
    return (
      Boolean(search) ||
      statusFilter !== "all" ||
      Object.values(providerFilterIds).some(Boolean) ||
      priceFilter !== "all" ||
      priceOutFilter !== "all" ||
      contextFilter !== "all"
    );
  }, [search, statusFilter, providerFilterIds, priceFilter, priceOutFilter, contextFilter]);

  // Statistics Calculations
  const statTotal = models.length;
  const statConfigured = useMemo(() => models.filter((m) => m.configured).length, [models]);
  const statActive = useMemo(() => models.filter((m) => m.status === "Active").length, [models]);
  const statProviders = useMemo(() => new Set(models.map((m) => m.providerId)).size, [models]);

  // Filtered & Sorted Models Listing
  const filteredModels = useMemo(() => {
    const activeProviderList = Object.keys(providerFilterIds).filter((k) => providerFilterIds[k]);

    return models.filter((m) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.providerName.toLowerCase().includes(q) ||
        (m.alias || "").toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "configured" && m.configured) ||
        (statusFilter === "unconfigured" && !m.configured);

      const matchesProvider =
        activeProviderList.length === 0 || activeProviderList.includes(m.providerId);

      // Price In filtering
      let matchesPriceIn = true;
      if (priceFilter === "u1") matchesPriceIn = m.inputPrice < 1;
      else if (priceFilter === "u3") matchesPriceIn = m.inputPrice < 3;
      else if (priceFilter === "u10") matchesPriceIn = m.inputPrice < 10;
      else if (priceFilter === "o10") matchesPriceIn = m.inputPrice >= 10;

      // Price Out filtering
      let matchesPriceOut = true;
      if (priceOutFilter === "u1") matchesPriceOut = m.outputPrice < 1;
      else if (priceOutFilter === "u3") matchesPriceOut = m.outputPrice < 3;
      else if (priceOutFilter === "u10") matchesPriceOut = m.outputPrice < 10;
      else if (priceOutFilter === "o10") matchesPriceOut = m.outputPrice >= 10;

      // Context Window filtering
      let matchesContext = true;
      if (contextFilter === "8k") matchesContext = m.contextWindow >= 8192;
      else if (contextFilter === "32k") matchesContext = m.contextWindow >= 32768;
      else if (contextFilter === "128k") matchesContext = m.contextWindow >= 131072;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesProvider &&
        matchesPriceIn &&
        matchesPriceOut &&
        matchesContext
      );
    });
  }, [
    models,
    search,
    statusFilter,
    providerFilterIds,
    priceFilter,
    priceOutFilter,
    contextFilter,
  ]);

  const sortedModels = useMemo(() => {
    return [...filteredModels].sort((a, b) => {
      let aVal: any = a[sortField];
      let bVal: any = b[sortField];
      if (typeof aVal === "string") aVal = aVal.toLowerCase();
      if (typeof bVal === "string") bVal = bVal.toLowerCase();

      if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredModels, sortField, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sortedModels.length / pageSize));
  const currentPageModels = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedModels.slice(start, start + pageSize);
  }, [sortedModels, page, pageSize]);

  const handleSort = (field: keyof GatewayModelRecord) => {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  // Open Configure Modal for a specific model
  const openConfigureModal = (model: GatewayModelRecord, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setConfigModalModel(model);
    setAliasDraft(model.alias || model.name);
    setCredSelectionMode("existing");
    setSelectedCredId("");
    setNewCredName("");
    setNewBaseUrl("");
    setNewApiKey("");
    setShowApiKey(false);
    setIsTesting(false);
    setTestResult("none");
  };

  const closeConfigureModal = () => {
    setConfigModalModel(null);
  };

  const handleTestConnection = () => {
    setIsTesting(true);
    setTestResult("none");
    setTimeout(() => {
      setIsTesting(false);
      // Valid if alias & credentials provided
      if (
        aliasDraft.trim() &&
        ((credSelectionMode === "existing" && selectedCredId) ||
          (credSelectionMode === "new" && newCredName.trim() && newApiKey.trim()))
      ) {
        setTestResult("success");
        toast.success("Connection test successful!");
      } else {
        setTestResult("failure");
        toast.error("Connection test failed. Please verify credentials.");
      }
    }, 800);
  };

  const handleSaveConfiguration = () => {
    if (!configModalModel) return;

    let credName = "";
    if (credSelectionMode === "existing") {
      const found = AVAILABLE_CREDENTIALS.find((c) => c.id === selectedCredId);
      credName = found ? found.name : "Existing Credential";
    } else {
      credName = newCredName.trim() || "New Credential";
    }

    setModels((prev) =>
      prev.map((m) => {
        if (m.id === configModalModel.id) {
          return {
            ...m,
            configured: true,
            alias: aliasDraft.trim() || m.name,
            credentialName: credName,
          };
        }
        return m;
      })
    );

    toast.success(`Model "${configModalModel.name}" configured successfully!`);
    closeConfigureModal();
  };

  const isSaveDisabled = useMemo(() => {
    if (!aliasDraft.trim()) return true;
    if (credSelectionMode === "existing" && !selectedCredId) return true;
    if (credSelectionMode === "new" && (!newCredName.trim() || !newApiKey.trim())) return true;
    return false;
  }, [aliasDraft, credSelectionMode, selectedCredId, newCredName, newApiKey]);

  // Open Add Model Modal
  const openAddModal = () => {
    setIsAddModalOpen(true);
    setAddSearch("");
    setAddSelectedIds({});
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const filteredPoolModels = useMemo(() => {
    return poolModels.filter((m) => {
      const q = addSearch.toLowerCase();
      return !q || m.name.toLowerCase().includes(q) || m.providerName.toLowerCase().includes(q);
    });
  }, [poolModels, addSearch]);

  const addSelectedCount = useMemo(() => {
    return Object.values(addSelectedIds).filter(Boolean).length;
  }, [addSelectedIds]);

  const handleAddSelectedModels = () => {
    const selectedIdsList = Object.keys(addSelectedIds).filter((k) => addSelectedIds[k]);
    if (selectedIdsList.length === 0) return;

    const toAdd = poolModels.filter((m) => selectedIdsList.includes(m.id));
    setModels((prev) => [...prev, ...toAdd]);
    setPoolModels((prev) => prev.filter((m) => !selectedIdsList.includes(m.id)));

    toast.success(`Added ${toAdd.length} model(s) to AI Gateway.`);
    closeAddModal();
  };

  // Currently Selected Model for Detail View
  const selectedModel = useMemo(() => {
    return models.find((m) => m.id === selectedModelId) || null;
  }, [models, selectedModelId]);

  return (
    <div className="p-6 space-y-6 animate-fadeIn max-w-[1600px] mx-auto min-h-screen">
      {/* -------------------- DETAIL VIEW -------------------- */}
      {view === "detail" && selectedModel ? (
        <div className="space-y-6">
          {/* Header & Back Navigation */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs space-y-4">
            <button
              onClick={() => {
                setView("list");
                setSelectedModelId(null);
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Model Management</span>
            </button>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-neutral-100 dark:border-neutral-800">
              <div className="flex items-center gap-4 min-w-0">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-xs"
                  style={{ backgroundColor: selectedModel.color }}
                >
                  {selectedModel.providerName[0]}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h1 className="text-xl font-mono font-bold text-neutral-900 dark:text-white truncate">
                      {selectedModel.name}
                    </h1>
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                      {selectedModel.name.includes("embed") ? "EMBEDDING" : "CHAT"}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        selectedModel.status === "Active"
                          ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
                          : "bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          selectedModel.status === "Active" ? "bg-emerald-500" : "bg-rose-500"
                        }`}
                      />
                      {selectedModel.status}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    {selectedModel.providerName} &bull; Alias:{" "}
                    <span className="font-mono text-neutral-800 dark:text-neutral-200 font-semibold">
                      {selectedModel.alias ? `<${selectedModel.alias}>` : "—"}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openConfigureModal(selectedModel)}
                  className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-900 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Key className="w-3.5 h-3.5" />
                  <span>{selectedModel.configured ? "Edit Configuration" : "Configure Now"}</span>
                </button>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-neutral-100 dark:border-neutral-800">
              <div className="p-3 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl">
                <div className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Context Window
                </div>
                <div className="text-lg font-bold text-neutral-900 dark:text-white mt-0.5">
                  {formatContext(selectedModel.contextWindow)}
                </div>
              </div>
              <div className="p-3 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl">
                <div className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Input Price
                </div>
                <div className="text-lg font-bold text-neutral-900 dark:text-white mt-0.5">
                  ${selectedModel.inputPrice.toFixed(2)}/M
                </div>
              </div>
              <div className="p-3 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl">
                <div className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Output Price
                </div>
                <div className="text-lg font-bold text-neutral-900 dark:text-white mt-0.5">
                  ${selectedModel.outputPrice.toFixed(2)}/M
                </div>
              </div>
              <div className="p-3 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl">
                <div className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Max Output
                </div>
                <div className="text-lg font-bold text-neutral-900 dark:text-white mt-0.5">
                  {selectedModel.maxOutput.toLocaleString()} tokens
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Info Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Card 1: Token Pricing */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs space-y-4">
              <div>
                <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                  Token Pricing
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">Per 1M tokens where applicable</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                    INPUT
                  </span>
                  <div className="text-base font-bold text-neutral-900 dark:text-white mt-1">
                    ${selectedModel.inputPrice.toFixed(2)}
                  </div>
                </div>

                <div className="p-3.5 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                    OUTPUT
                  </span>
                  <div className="text-base font-bold text-neutral-900 dark:text-white mt-1">
                    ${selectedModel.outputPrice.toFixed(2)}
                  </div>
                </div>

                <div className="p-3.5 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                    CACHE READ
                  </span>
                  <div className="text-base font-bold text-neutral-900 dark:text-white mt-1">
                    ${(selectedModel.inputPrice * 0.1).toFixed(2)}
                  </div>
                </div>

                <div className="p-3.5 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                    CACHE WRITE
                  </span>
                  <div className="text-base font-bold text-neutral-900 dark:text-white mt-1">
                    ${(selectedModel.inputPrice * 1.25).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Model Info */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs space-y-4">
              <div>
                <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                  Model Information
                </h3>
              </div>

              <div className="divide-y divide-neutral-100 dark:divide-neutral-800 text-xs">
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-neutral-500">Provider</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">
                    {selectedModel.providerName}
                  </span>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-neutral-500">Mode</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">
                    {selectedModel.name.includes("embed") ? "EMBEDDING" : "CHAT"}
                  </span>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-neutral-500">Max Input</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">
                    {selectedModel.maxInput.toLocaleString()} tokens
                  </span>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-neutral-500">Max Output</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">
                    {selectedModel.maxOutput.toLocaleString()} tokens
                  </span>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-neutral-500">Status</span>
                  <span
                    className={`font-semibold ${
                      selectedModel.status === "Active" ? "text-emerald-600" : "text-rose-600"
                    }`}
                  >
                    ● {selectedModel.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3: Features */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs space-y-4">
              <div>
                <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                  Supported Features
                </h3>
              </div>

              <div className="space-y-2 text-xs">
                {[
                  { key: "function", label: "Function Calling" },
                  { key: "vision", label: "Vision Capabilities" },
                  { key: "json", label: "Structured JSON Output" },
                  { key: "streaming", label: "Real-time Streaming" },
                  { key: "toolChoice", label: "Tool Choice Control" },
                  { key: "parallel", label: "Parallel Tool Execution" },
                  { key: "caching", label: "Prompt Caching" },
                ].map((feat) => {
                  const supported = selectedModel.capabilities.includes(feat.key);
                  return (
                    <div
                      key={feat.key}
                      className="flex items-center justify-between p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800/40"
                    >
                      <span className="text-neutral-700 dark:text-neutral-300 font-medium">
                        {feat.label}
                      </span>
                      {supported ? (
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Supported
                        </span>
                      ) : (
                        <span className="text-neutral-400 font-normal">&mdash;</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Configuration Status Card */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs">
            <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-4">
              Configuration Status
            </h3>

            {selectedModel.configured ? (
              <div className="flex flex-wrap items-center justify-between gap-6 p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/50">
                <div className="flex items-center gap-6 flex-wrap">
                  <div>
                    <div className="text-[11px] font-semibold text-neutral-500">Status</div>
                    <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" /> Configured
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] font-semibold text-neutral-500">Business Alias</div>
                    <div className="text-xs font-mono font-bold text-neutral-900 dark:text-white mt-0.5">
                      {selectedModel.alias || selectedModel.name}
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] font-semibold text-neutral-500">Assigned Credential</div>
                    <div className="text-xs font-bold text-neutral-900 dark:text-white mt-0.5">
                      {selectedModel.credentialName || "Default Credential"}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => openConfigureModal(selectedModel)}
                  className="px-4 py-2 border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 text-neutral-800 dark:text-white font-bold text-xs rounded-xl shadow-2xs transition-colors cursor-pointer"
                >
                  Edit Configuration
                </button>
              </div>
            ) : (
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span className="text-xs font-medium text-amber-800 dark:text-amber-300">
                    This model has no credentials set &mdash; it cannot be routed until configured.
                  </span>
                </div>

                <button
                  onClick={() => openConfigureModal(selectedModel)}
                  className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-900 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer shrink-0"
                >
                  Configure Now
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* -------------------- MAIN LISTING VIEW -------------------- */
        <div className="space-y-6">
          {/* Header */}
          <PageHeader
            title="Model Management"
            subtitle="AI Gateway > Model Management"
            actions={
              <button
                onClick={openAddModal}
                className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Model</span>
              </button>
            }
          />

          {/* API Error / Loading State Banners */}
          {apiError && (
            <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-medium flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4" />
                <span>{apiError}</span>
              </div>
              <button
                onClick={() => setApiError(null)}
                className="text-xs font-bold underline hover:no-underline cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Summary Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs">
              <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                Total Providers
              </div>
              <div className="text-2xl font-extrabold text-neutral-900 dark:text-white mt-1">
                {statProviders}
              </div>
              <div className="text-[11px] text-neutral-400 mt-1">Granted by Super Admin</div>
            </div>

            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs">
              <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                Total Models Assigned
              </div>
              <div className="text-2xl font-extrabold text-neutral-900 dark:text-white mt-1">
                {statTotal}
              </div>
              <div className="text-[11px] text-neutral-400 mt-1">Granted by Super Admin</div>
            </div>

            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs">
              <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                Configured
              </div>
              <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
                {statConfigured}
              </div>
              <div className="text-[11px] text-neutral-400 mt-1">Ready to use</div>
            </div>

            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs">
              <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                Active Models
              </div>
              <div className="text-2xl font-extrabold text-neutral-900 dark:text-white mt-1">
                {statActive}
              </div>
              <div className="text-[11px] text-neutral-400 mt-1">Routing Traffic</div>
            </div>
          </div>

          {/* Search & Filter Controls */}
          <div className="space-y-3">
            {/* Top row: Search input + Configuration Dropdown */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search by model name, alias, or provider..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl text-xs text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 shadow-2xs"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                className="px-3.5 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl text-xs font-medium text-neutral-700 dark:text-neutral-300 focus:outline-none shadow-2xs cursor-pointer min-w-[200px]"
              >
                <option value="all">All configuration states</option>
                <option value="configured">Configured only</option>
                <option value="unconfigured">Needs configuration</option>
              </select>
            </div>

            {/* Bottom row: Facet Dropdowns + Reset Filters */}
            <div className="flex flex-wrap items-center gap-2.5 relative">
              {/* Provider Facet */}
              <div className="relative">
                <button
                  onClick={() => setOpenFacet(openFacet === "provider" ? null : "provider")}
                  className={`px-3 py-2 border rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    Object.values(providerFilterIds).some(Boolean) || openFacet === "provider"
                      ? "border-neutral-900 dark:border-white bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                      : "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300"
                  }`}
                >
                  <span>
                    Providers
                    {Object.values(providerFilterIds).filter(Boolean).length > 0 &&
                      ` (${Object.values(providerFilterIds).filter(Boolean).length})`}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                </button>

                {openFacet === "provider" && (
                  <div className="absolute top-full left-0 mt-1.5 w-60 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl p-3 z-30 space-y-1">
                    <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider px-2 py-1">
                      Filter by Provider
                    </div>
                    <div className="max-h-56 overflow-y-auto space-y-0.5">
                      {PROVIDERS.map((p) => {
                        const checked = Boolean(providerFilterIds[p.id]);
                        const count = models.filter((m) => m.providerId === p.id).length;
                        return (
                          <button
                            key={p.id}
                            onClick={() => {
                              setProviderFilterIds((prev) => ({ ...prev, [p.id]: !prev[p.id] }));
                              setPage(1);
                            }}
                            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                              checked
                                ? "bg-neutral-100 dark:bg-neutral-800 font-semibold text-neutral-900 dark:text-white"
                                : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-4 h-4 rounded border flex items-center justify-center text-white ${
                                  checked
                                    ? "bg-neutral-900 dark:bg-white border-neutral-900 dark:border-white text-white dark:text-neutral-900"
                                    : "border-neutral-300 dark:border-neutral-700"
                                }`}
                              >
                                {checked && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                              <span>{p.name}</span>
                            </div>
                            <span className="text-[11px] text-neutral-400">{count}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Price In Facet */}
              <div className="relative">
                <button
                  onClick={() => setOpenFacet(openFacet === "priceIn" ? null : "priceIn")}
                  className={`px-3 py-2 border rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    priceFilter !== "all" || openFacet === "priceIn"
                      ? "border-neutral-900 dark:border-white bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                      : "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300"
                  }`}
                >
                  <span>
                    Price In
                    {priceFilter !== "all" &&
                      ` (${
                        priceFilter === "u1"
                          ? "<$1"
                          : priceFilter === "u3"
                          ? "<$3"
                          : priceFilter === "u10"
                          ? "<$10"
                          : "$10+"
                      })`}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                </button>

                {openFacet === "priceIn" && (
                  <div className="absolute top-full left-0 mt-1.5 w-48 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl p-2 z-30 space-y-0.5">
                    {[
                      { val: "all", label: "Any Price" },
                      { val: "u1", label: "Under $1 / 1M" },
                      { val: "u3", label: "Under $3 / 1M" },
                      { val: "u10", label: "Under $10 / 1M" },
                      { val: "o10", label: "$10+ / 1M" },
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        onClick={() => {
                          setPriceFilter(opt.val);
                          setPage(1);
                          setOpenFacet(null);
                        }}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer ${
                          priceFilter === opt.val
                            ? "bg-neutral-100 dark:bg-neutral-800 font-bold text-neutral-900 dark:text-white"
                            : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Out Facet */}
              <div className="relative">
                <button
                  onClick={() => setOpenFacet(openFacet === "priceOut" ? null : "priceOut")}
                  className={`px-3 py-2 border rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    priceOutFilter !== "all" || openFacet === "priceOut"
                      ? "border-neutral-900 dark:border-white bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                      : "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300"
                  }`}
                >
                  <span>
                    Price Out
                    {priceOutFilter !== "all" &&
                      ` (${
                        priceOutFilter === "u1"
                          ? "<$1"
                          : priceOutFilter === "u3"
                          ? "<$3"
                          : priceOutFilter === "u10"
                          ? "<$10"
                          : "$10+"
                      })`}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                </button>

                {openFacet === "priceOut" && (
                  <div className="absolute top-full left-0 mt-1.5 w-48 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl p-2 z-30 space-y-0.5">
                    {[
                      { val: "all", label: "Any Price" },
                      { val: "u1", label: "Under $1 / 1M" },
                      { val: "u3", label: "Under $3 / 1M" },
                      { val: "u10", label: "Under $10 / 1M" },
                      { val: "o10", label: "$10+ / 1M" },
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        onClick={() => {
                          setPriceOutFilter(opt.val);
                          setPage(1);
                          setOpenFacet(null);
                        }}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer ${
                          priceOutFilter === opt.val
                            ? "bg-neutral-100 dark:bg-neutral-800 font-bold text-neutral-900 dark:text-white"
                            : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Context Facet */}
              <div className="relative">
                <button
                  onClick={() => setOpenFacet(openFacet === "context" ? null : "context")}
                  className={`px-3 py-2 border rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    contextFilter !== "all" || openFacet === "context"
                      ? "border-neutral-900 dark:border-white bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                      : "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300"
                  }`}
                >
                  <span>
                    Context
                    {contextFilter !== "all" && ` (${contextFilter.toUpperCase()}+)`}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                </button>

                {openFacet === "context" && (
                  <div className="absolute top-full left-0 mt-1.5 w-44 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl p-2 z-30 space-y-0.5">
                    {[
                      { val: "all", label: "Any Context" },
                      { val: "8k", label: "8K+ tokens" },
                      { val: "32k", label: "32K+ tokens" },
                      { val: "128k", label: "128K+ tokens" },
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        onClick={() => {
                          setContextFilter(opt.val);
                          setPage(1);
                          setOpenFacet(null);
                        }}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer ${
                          contextFilter === opt.val
                            ? "bg-neutral-100 dark:bg-neutral-800 font-bold text-neutral-900 dark:text-white"
                            : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Reset Filters button */}
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="px-3 py-2 text-xs font-bold text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 flex items-center gap-1 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>
          </div>

          {/* Model Data Table */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto max-h-[calc(100vh-360px)]">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-neutral-50 dark:bg-neutral-800/80 border-b border-neutral-200 dark:border-neutral-800 text-[11px] font-bold text-neutral-400 uppercase tracking-wider sticky top-0 z-10">
                    <th
                      onClick={() => handleSort("name")}
                      className="px-4 py-3 cursor-pointer select-none hover:text-neutral-700 dark:hover:text-neutral-200"
                    >
                      <div className="flex items-center gap-1">
                        <span>Model</span>
                        {sortField === "name" && (
                          <span className="text-neutral-600 dark:text-neutral-300 font-extrabold">
                            {sortDir === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </div>
                    </th>
                    <th className="px-4 py-3">Alias</th>
                    <th
                      onClick={() => handleSort("providerName")}
                      className="px-4 py-3 cursor-pointer select-none hover:text-neutral-700 dark:hover:text-neutral-200"
                    >
                      <div className="flex items-center gap-1">
                        <span>Provider</span>
                        {sortField === "providerName" && (
                          <span className="text-neutral-600 dark:text-neutral-300 font-extrabold">
                            {sortDir === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("contextWindow")}
                      className="px-4 py-3 cursor-pointer select-none hover:text-neutral-700 dark:hover:text-neutral-200"
                    >
                      <div className="flex items-center gap-1">
                        <span>Context</span>
                        {sortField === "contextWindow" && (
                          <span className="text-neutral-600 dark:text-neutral-300 font-extrabold">
                            {sortDir === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("inputPrice")}
                      className="px-4 py-3 cursor-pointer select-none hover:text-neutral-700 dark:hover:text-neutral-200"
                    >
                      <div className="flex items-center gap-1">
                        <span>In $/1M</span>
                        {sortField === "inputPrice" && (
                          <span className="text-neutral-600 dark:text-neutral-300 font-extrabold">
                            {sortDir === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("outputPrice")}
                      className="px-4 py-3 cursor-pointer select-none hover:text-neutral-700 dark:hover:text-neutral-200"
                    >
                      <div className="flex items-center gap-1">
                        <span>Out $/1M</span>
                        {sortField === "outputPrice" && (
                          <span className="text-neutral-600 dark:text-neutral-300 font-extrabold">
                            {sortDir === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </div>
                    </th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right pr-6">Configuration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                  {currentPageModels.length > 0 ? (
                    currentPageModels.map((m) => (
                      <tr
                        key={m.id}
                        onClick={() => {
                          setSelectedModelId(m.id);
                          setView("detail");
                        }}
                        className="hover:bg-neutral-50/80 dark:hover:bg-neutral-800/40 transition-colors cursor-pointer group"
                      >
                        <td className="px-4 py-3 font-mono font-bold text-neutral-900 dark:text-white max-w-[220px] truncate">
                          {m.name}
                        </td>
                        <td className="px-4 py-3 font-mono text-neutral-500 dark:text-neutral-400">
                          {m.alias ? `<${m.alias}>` : "—"}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className="px-2 py-0.5 rounded-md font-semibold text-[11px]"
                            style={{
                              backgroundColor: `${m.color}15`,
                              color: m.color,
                              border: `1px solid ${m.color}30`,
                            }}
                          >
                            {m.providerName}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300 font-medium">
                          {formatContext(m.contextWindow)}
                        </td>
                        <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">
                          ${m.inputPrice.toFixed(2)}
                        </td>
                        <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">
                          ${m.outputPrice.toFixed(2)}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${
                              m.status === "Active"
                                ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400"
                                : "bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                m.status === "Active" ? "bg-emerald-500" : "bg-rose-500"
                              }`}
                            />
                            {m.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right pr-6">
                          {m.configured ? (
                            <button
                              onClick={(e) => openConfigureModal(m, e)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition-colors cursor-pointer"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              <span>Configured</span>
                            </button>
                          ) : (
                            <button
                              onClick={(e) => openConfigureModal(m, e)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 transition-colors cursor-pointer"
                            >
                              <AlertTriangle className="w-3 h-3 text-amber-600" />
                              <span>Not Configured</span>
                              <span className="underline ml-0.5 font-extrabold">Configure</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="px-4 py-12 text-center">
                        <div className="max-w-xs mx-auto space-y-2">
                          <ShieldAlert className="w-8 h-8 mx-auto text-neutral-300 dark:text-neutral-600" />
                          <div className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                            No models found
                          </div>
                          <p className="text-[11px] text-neutral-400">
                            No models match your search query or filter criteria.
                          </p>
                          {hasActiveFilters && (
                            <button
                              onClick={resetFilters}
                              className="px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-neutral-700 dark:text-neutral-300 font-bold text-xs rounded-lg transition-colors cursor-pointer mt-2"
                            >
                              Reset Filters
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="px-4 py-3 bg-neutral-50 dark:bg-neutral-800/60 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
              <div className="text-xs text-neutral-500 dark:text-neutral-400">
                Page {page} of {totalPages} &bull; {filteredModels.length} models
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="px-3 py-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg text-xs font-semibold text-neutral-700 dark:text-neutral-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Prev
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  className="px-3 py-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg text-xs font-semibold text-neutral-700 dark:text-neutral-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -------------------- CONCONFIGURE MODEL MODAL -------------------- */}
      {configModalModel && (
        <div
          onClick={closeConfigureModal}
          className="fixed inset-0 bg-neutral-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl w-full max-w-lg shadow-2xl p-6 space-y-5 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
              <div>
                <h2 className="text-base font-extrabold text-neutral-900 dark:text-white">
                  Configure Model
                </h2>
                <div className="font-mono text-xs text-primary-600 dark:text-primary-400 font-bold mt-0.5">
                  {configModalModel.name}
                </div>
              </div>
              <button
                onClick={closeConfigureModal}
                className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-neutral-600 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Credential Selection Mode */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                Credential Selection
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setCredSelectionMode("existing")}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    credSelectionMode === "existing"
                      ? "border-neutral-900 dark:border-white bg-neutral-50 dark:bg-neutral-800 ring-1 ring-neutral-900 dark:ring-white"
                      : "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:bg-neutral-50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                        credSelectionMode === "existing"
                          ? "border-neutral-900 dark:border-white bg-neutral-900 dark:bg-white"
                          : "border-neutral-300"
                      }`}
                    >
                      {credSelectionMode === "existing" && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white dark:bg-neutral-900" />
                      )}
                    </div>
                    <span className="text-xs font-bold text-neutral-900 dark:text-white">
                      Existing Credential
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-1 pl-5">
                    Reuse a stored credential
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setCredSelectionMode("new")}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    credSelectionMode === "new"
                      ? "border-neutral-900 dark:border-white bg-neutral-50 dark:bg-neutral-800 ring-1 ring-neutral-900 dark:ring-white"
                      : "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:bg-neutral-50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                        credSelectionMode === "new"
                          ? "border-neutral-900 dark:border-white bg-neutral-900 dark:bg-white"
                          : "border-neutral-300"
                      }`}
                    >
                      {credSelectionMode === "new" && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white dark:bg-neutral-900" />
                      )}
                    </div>
                    <span className="text-xs font-bold text-neutral-900 dark:text-white">
                      Configure New
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-1 pl-5">
                    Add base URL &amp; API key
                  </p>
                </button>
              </div>
            </div>

            {/* Credential Inputs */}
            {credSelectionMode === "existing" ? (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                  Available Credentials <span className="text-rose-500">*</span>
                </label>
                <select
                  value={selectedCredId}
                  onChange={(e) => setSelectedCredId(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl text-xs font-medium text-neutral-900 dark:text-white focus:outline-none cursor-pointer"
                >
                  <option value="">Select a credential...</option>
                  {AVAILABLE_CREDENTIALS.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.provider})
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                    Credential Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Prod OpenAI Key"
                    value={newCredName}
                    onChange={(e) => setNewCredName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl text-xs text-neutral-900 dark:text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                    Base URL <span className="text-neutral-400 font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="https://api.openai.com/v1"
                    value={newBaseUrl}
                    onChange={(e) => setNewBaseUrl(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl text-xs text-neutral-900 dark:text-white focus:outline-none font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                    API Key <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showApiKey ? "text" : "password"}
                      placeholder="sk-..."
                      value={newApiKey}
                      onChange={(e) => setNewApiKey(e.target.value)}
                      className="w-full pl-3.5 pr-10 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl text-xs text-neutral-900 dark:text-white focus:outline-none font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                    >
                      {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Model Alias */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                Model Alias <span className="text-rose-500">*</span>
              </label>
              <p className="text-[11px] text-neutral-400">
                Business alias / display name your teams will see
              </p>
              <input
                type="text"
                placeholder="e.g. team-gpt4o, support-bot-model"
                value={aliasDraft}
                onChange={(e) => setAliasDraft(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl text-xs font-mono text-neutral-900 dark:text-white focus:outline-none"
              />
            </div>

            {/* Test Connection State Feedback */}
            {testResult === "success" && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Connection verified successfully</span>
              </div>
            )}
            {testResult === "failure" && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-bold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Connection test failed. Please check your credentials.</span>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-neutral-100 dark:border-neutral-800">
              <button
                type="button"
                onClick={handleTestConnection}
                disabled={isTesting}
                className="px-3.5 py-2 border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 text-neutral-800 dark:text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {isTesting ? (
                  <RotateCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                )}
                <span>{isTesting ? "Testing..." : "Test Connection"}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={closeConfigureModal}
                  className="px-4 py-2 border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-neutral-50 text-neutral-700 dark:text-neutral-300 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveConfiguration}
                  disabled={isSaveDisabled}
                  className="px-5 py-2 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -------------------- ADD MODEL MODAL -------------------- */}
      {isAddModalOpen && (
        <div
          onClick={closeAddModal}
          className="fixed inset-0 bg-neutral-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl w-full max-w-lg shadow-2xl p-6 space-y-4 max-h-[85vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100 dark:border-neutral-800">
              <div>
                <h2 className="text-base font-extrabold text-neutral-900 dark:text-white">
                  Add Model
                </h2>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Models your Super Admin has granted access to, but that aren&apos;t in your list yet.
                </p>
              </div>
              <button
                onClick={closeAddModal}
                className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-neutral-600 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search Available Pool */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search available models..."
                value={addSearch}
                onChange={(e) => setAddSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs text-neutral-900 dark:text-white focus:outline-none"
              />
            </div>

            {/* Available Pool Model List */}
            <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
              {filteredPoolModels.length > 0 ? (
                filteredPoolModels.map((m) => {
                  const checked = Boolean(addSelectedIds[m.id]);
                  return (
                    <button
                      key={m.id}
                      onClick={() =>
                        setAddSelectedIds((prev) => ({ ...prev, [m.id]: !prev[m.id] }))
                      }
                      className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        checked
                          ? "border-neutral-900 dark:border-white bg-neutral-50 dark:bg-neutral-800"
                          : "border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/40"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center text-white shrink-0 ${
                            checked
                              ? "bg-neutral-900 dark:bg-white border-neutral-900 dark:border-white text-white dark:text-neutral-900"
                              : "border-neutral-300 dark:border-neutral-700"
                          }`}
                        >
                          {checked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div className="min-w-0">
                          <div className="font-mono font-bold text-xs text-neutral-900 dark:text-white truncate">
                            {m.name}
                          </div>
                          <div className="text-[11px] text-neutral-400">
                            {m.providerName} &bull; {formatContext(m.contextWindow)} ctx
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="py-8 text-center text-xs text-neutral-400">
                  No more granted models to add &mdash; ask your Super Admin for access to more.
                </div>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-100 dark:border-neutral-800">
              <button
                type="button"
                onClick={closeAddModal}
                className="px-4 py-2 border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-neutral-50 text-neutral-700 dark:text-neutral-300 font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddSelectedModels}
                disabled={addSelectedCount === 0}
                className="px-5 py-2 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Add {addSelectedCount > 0 ? `(${addSelectedCount})` : "Selected Models"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
