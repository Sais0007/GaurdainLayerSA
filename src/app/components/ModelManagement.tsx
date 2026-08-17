// src/app/components/ModelManagement.tsx
// Master Model Management - Super Admin AI Gateway Module
// Synchronized 1:1 with Organization Model Management.dc spec & HB Design System

import React, { useState, useMemo } from "react";
import {
  Plus,
  Search,
  ChevronRight,
  ChevronDown,
  ArrowLeft,
  Cpu,
  Layers,
  Sparkles,
  Check,
  X,
  Building2,
  DollarSign,
  Maximize2,
  Zap,
  Filter,
  RefreshCw,
  SlidersHorizontal,
  Sliders,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Code2,
  Copy,
  Terminal,
  Activity
} from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "./hb/listing/PageHeader";

// --- Provider & Model Types & Catalog ---
export interface ProviderDef {
  id: string;
  name: string;
  count: number;
  color: string;
  addedQuota: number;
  isCustom?: boolean;
}

export interface ModelRecord {
  id: string;
  shortId: string;
  name: string;
  alias: string;
  providerId: string;
  providerName: string;
  color: string;
  status: "Active" | "Inactive";
  health: "Healthy" | "Degraded" | "Suspended";
  lastSuccess: string;
  added: boolean;
  contextWindow: number;
  maxInput: number;
  maxOutput: number;
  inputPrice: number;
  outputPrice: number;
  capabilities: string[];
}

const PALETTE = [
  "#2563eb",
  "#7c3aed",
  "#db2777",
  "#059669",
  "#d97706",
  "#0891b2",
  "#dc2626",
  "#4f46e5",
  "#65a30d",
  "#9333ea",
];

const INITIAL_PROVIDERS: ProviderDef[] = [
  { id: "openai", name: "OpenAI", count: 65, color: "#2563eb", addedQuota: 5 },
  { id: "anthropic", name: "Anthropic", count: 35, color: "#7c3aed", addedQuota: 5 },
  { id: "gemini", name: "Google Gemini", count: 55, color: "#db2777", addedQuota: 5 },
  { id: "azure", name: "Azure OpenAI", count: 50, color: "#059669", addedQuota: 5 },
  { id: "bedrock", name: "AWS Bedrock", count: 80, color: "#d97706", addedQuota: 1 },
  { id: "mistral", name: "Mistral AI", count: 40, color: "#0891b2", addedQuota: 1 },
  { id: "cohere", name: "Cohere", count: 25, color: "#dc2626", addedQuota: 1 },
  { id: "groq", name: "Groq", count: 18, color: "#4f46e5", addedQuota: 1 },
  { id: "perplexity", name: "Perplexity", count: 12, color: "#65a30d", addedQuota: 1 },
  { id: "deepseek", name: "DeepSeek", count: 20, color: "#9333ea", addedQuota: 1 },
  { id: "xai", name: "xAI", count: 10, color: "#2563eb", addedQuota: 1 },
  { id: "metaLlama", name: "Meta Llama", count: 30, color: "#7c3aed", addedQuota: 1 },
  { id: "watsonx", name: "IBM watsonx", count: 22, color: "#db2777", addedQuota: 1 },
  { id: "ai21", name: "AI21 Labs", count: 15, color: "#059669", addedQuota: 1 },
  { id: "voyage", name: "Voyage AI", count: 13, color: "#d97706", addedQuota: 1 },
  { id: "huggingface", name: "HuggingFace", count: 380, color: "#0891b2", addedQuota: 0 },
  { id: "openrouter", name: "OpenRouter", count: 220, color: "#dc2626", addedQuota: 0 },
  { id: "together", name: "Together AI", count: 150, color: "#4f46e5", addedQuota: 0 },
  { id: "fireworks", name: "Fireworks AI", count: 120, color: "#65a30d", addedQuota: 0 },
  { id: "replicate", name: "Replicate", count: 90, color: "#9333ea", addedQuota: 0 },
];

const CURATED_CATALOG: Record<string, string[]> = {
  openai: [
    "gpt-4o",
    "gpt-4o-mini",
    "gpt-4.1",
    "gpt-4.1-mini",
    "gpt-4.1-nano",
    "gpt-3.5-turbo",
    "o3",
    "o3-mini",
    "o4-mini",
    "gpt-image-1",
    "tts-1",
    "tts-1-hd",
    "whisper-1",
    "text-embedding-3-large",
    "text-embedding-3-small",
  ],
  anthropic: [
    "claude-opus-4-5",
    "claude-sonnet-4-5",
    "claude-haiku-4-5",
    "claude-4-opus-20250514",
    "claude-4-sonnet-20250514",
    "claude-3-5-sonnet-20241022",
    "claude-3-5-haiku-20241022",
    "claude-3-opus-20240229",
  ],
  gemini: [
    "gemini/gemini-2.5-flash",
    "gemini/gemini-2.5-pro",
    "gemini-pro-latest",
    "gemini-flash-latest",
    "gemini-flash-lite-latest",
    "gemini-exp-1206",
    "gemini-2.5-flash-preview-tts",
    "gemini/gemini-3.1-flash-live-preview",
    "gemini-embedding-001",
  ],
  azure: [
    "azure/gpt-4o",
    "azure/gpt-4o-mini",
    "azure/gpt-4.1",
    "azure/gpt-3.5-turbo-instruct",
    "azure/tts-1",
    "azure/o3-mini",
    "azure/text-embedding-3-large",
  ],
  bedrock: [
    "amazon.titan-text-express-v1",
    "amazon.titan-embed-text-v2",
    "anthropic.claude-3-sonnet-20240229-v1:0",
    "anthropic.claude-3-haiku-20240307-v1:0",
    "meta.llama3-70b-instruct-v1:0",
    "meta.llama3-8b-instruct-v1:0",
    "mistral.mixtral-8x7b-instruct-v0:1",
    "cohere.command-r-plus-v1:0",
    "ai21.jamba-instruct-v1:0",
  ],
  mistral: [
    "mistral-large-latest",
    "mistral-small-latest",
    "mixtral-8x7b-instruct",
    "codestral-latest",
    "mistral-embed",
    "pixtral-large-latest",
  ],
  cohere: [
    "command-r-plus",
    "command-r",
    "command-light",
    "embed-english-v3.0",
    "rerank-english-v3.0",
  ],
  groq: ["llama-3.3-70b-versatile", "llama-3.1-8b-instant", "mixtral-8x7b-32768", "gemma2-9b-it"],
  perplexity: ["sonar-pro", "sonar", "sonar-reasoning", "sonar-deep-research"],
  deepseek: ["deepseek-chat", "deepseek-reasoner", "deepseek-coder"],
  xai: ["grok-3", "grok-3-mini", "grok-2-vision", "grok-beta"],
  metaLlama: ["llama-3.3-70b", "llama-3.1-405b", "llama-3.1-8b", "llama-guard-3-8b"],
  watsonx: ["granite-13b-chat-v2", "granite-20b-multilingual", "llama-3-70b-instruct"],
  ai21: ["jamba-1.5-large", "jamba-1.5-mini", "j2-ultra"],
  voyage: ["voyage-3", "voyage-3-lite", "voyage-code-3", "voyage-multimodal-3"],
};

function generateInitialModels(providers: ProviderDef[]): ModelRecord[] {
  const HUB = new Set(["huggingface", "openrouter", "together", "fireworks", "replicate"]);
  const SUFFIXES = ["preview", "latest", "2024-08-06", "2025-01-15", "ft-001", "turbo", "exp"];
  const FAMILIES = [
    "llama-3",
    "mistral-7b",
    "mixtral-8x7b",
    "qwen2.5-72b",
    "gemma-2-9b",
    "phi-3-medium",
    "falcon-40b",
    "yi-34b",
    "deepseek-v2",
    "vicuna-13b",
    "starcoder2-15b",
    "codellama-34b",
  ];
  const ORGS = [
    "meta-llama",
    "mistralai",
    "Qwen",
    "google",
    "microsoft",
    "tiiuae",
    "01-ai",
    "deepseek-ai",
    "lmsys",
    "bigcode",
  ];
  const SIZES = ["1.3", "2.7", "7", "13", "34", "70", "8x7"];
  const VARIANTS = ["instruct", "chat", "it", "base", "distill-awq"];

  const models: ModelRecord[] = [];
  let counter = 0;

  providers.forEach((p) => {
    const n = p.count;
    const base = CURATED_CATALOG[p.id] || [`${p.id}-model`];

    for (let i = 0; i < n; i++) {
      let name: string;
      if (HUB.has(p.id)) {
        const org = ORGS[i % ORGS.length];
        const fam = FAMILIES[(i * 3) % FAMILIES.length];
        const size = SIZES[(i * 7) % SIZES.length];
        const variant = VARIANTS[(i * 11) % VARIANTS.length];
        name = `${org}/${fam.split("-")[0]}-${size}b-${variant}`;
      } else if (i < base.length) {
        name = base[i];
      } else {
        const suf = SUFFIXES[Math.floor(i / base.length - 1) % SUFFIXES.length];
        name = `${base[i % base.length]}-${suf}`;
      }

      counter++;
      const statusRoll = (counter * 7) % 100;
      const status: "Active" | "Inactive" = statusRoll < 4 ? "Inactive" : "Active";
      const health: "Healthy" | "Degraded" | "Suspended" =
        status === "Active" ? (statusRoll < 9 ? "Degraded" : "Healthy") : "Suspended";

      const CTX = [4096, 8192, 16384, 32768, 65536, 131072, 200000, 1000000];
      const contextWindow = CTX[counter % CTX.length];
      const maxOutput = [1024, 2048, 4096, 8192, 16384][counter % 5];
      const maxInput = Math.max(1024, contextWindow - maxOutput);
      const inputPrice = Math.round((((counter * 17) % 300) / 100) * 100) / 100;
      const outputPrice = Math.round(inputPrice * (2 + (counter % 3)) * 100) / 100;

      const capabilities: string[] = [];
      if (counter % 3 === 0) capabilities.push("vision");
      if (counter % 2 === 0) capabilities.push("function");
      if (counter % 5 === 0) capabilities.push("json");
      if (counter % 7 !== 0) capabilities.push("streaming");

      models.push({
        id: `${p.id}-${i}`,
        shortId: (Math.imul(counter + 1, 2654435761) >>> 0).toString(16).padStart(8, "0"),
        name,
        alias: name,
        providerId: p.id,
        providerName: p.name,
        color: p.color,
        status,
        health,
        lastSuccess: `${String(1 + (counter % 28)).padStart(2, "0")}/${String(
          1 + ((counter * 3) % 12)
        ).padStart(2, "0")}/2026`,
        added: i < p.addedQuota,
        contextWindow,
        maxInput,
        maxOutput,
        inputPrice,
        outputPrice,
        capabilities,
      });
    }
  });

  return models;
}

function formatContext(n: number): string {
  if (n >= 1000000) return `${n / 1000000}M`;
  if (n >= 1000) return `${Math.round(n / 1000)}K`;
  return String(n);
}

export interface ModelManagementProps {
  hideHeader?: boolean;
  orgName?: string;
  orgId?: string;
}

export function ModelManagement({ hideHeader = false }: ModelManagementProps) {
  // Main State
  const [providers, setProviders] = useState<ProviderDef[]>(INITIAL_PROVIDERS);
  const [models, setModels] = useState<ModelRecord[]>(() => generateInitialModels(INITIAL_PROVIDERS));

  // Navigation View: "list" | "add" | "detail"
  const [view, setView] = useState<"list" | "add" | "detail">("list");
  const [detailModelId, setDetailModelId] = useState<string | null>(null);

  // Listing Filters & Search
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [providerFilterIds, setProviderFilterIds] = useState<Record<string, boolean>>({});
  const [priceFilter, setPriceFilter] = useState<string>("all");
  const [priceOutFilter, setPriceOutFilter] = useState<string>("all");
  const [contextFilter, setContextFilter] = useState<string>("all");
  const [openFacet, setOpenFacet] = useState<string | null>(null);
  const [providerFilterSearch, setProviderFilterSearch] = useState("");

  // Table Sorting & Pagination
  const [sortKey, setSortKey] = useState<keyof ModelRecord>("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const pageSize = 50;

  // Add Model Wizard State
  const [addStep, setAddStep] = useState<number>(0);
  const [addProviderId, setAddProviderId] = useState<string | null>(null);
  const [addSearch, setAddSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<Record<string, boolean>>({});
  const [aliasPattern, setAliasPattern] = useState("{model}");
  const [aliasOverrides, setAliasOverrides] = useState<Record<string, string>>({});
  
  // Custom Provider State inside Add Model
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customProviderName, setCustomProviderName] = useState("");
  const [manualModelInput, setManualModelInput] = useState("");
  const [manualModelNames, setManualModelNames] = useState<string[]>([]);

  // Calculate Statistics
  const addedModels = useMemo(() => models.filter((m) => m.added), [models]);
  const statTotal = addedModels.length;
  const statActive = useMemo(() => addedModels.filter((m) => m.status === "Active").length, [addedModels]);
  const statInactive = useMemo(() => addedModels.filter((m) => m.status === "Inactive").length, [addedModels]);
  const statProviders = useMemo(() => new Set(addedModels.map((m) => m.providerId)).size, [addedModels]);
  const statCatalog = models.length;
  const statAllProviders = providers.length;

  // Active Facet Filters
  const activeProviderFilterList = useMemo(
    () => Object.keys(providerFilterIds).filter((k) => providerFilterIds[k]),
    [providerFilterIds]
  );
  const hasActiveFilters = Boolean(
    search ||
      statusFilter !== "all" ||
      activeProviderFilterList.length > 0 ||
      priceFilter !== "all" ||
      priceOutFilter !== "all" ||
      contextFilter !== "all"
  );

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setProviderFilterIds({});
    setPriceFilter("all");
    setPriceOutFilter("all");
    setContextFilter("all");
    setPage(1);
    setOpenFacet(null);
    toast.success("Filters reset to default.");
  };

  // Filtered & Sorted Table Rows
  const filteredModels = useMemo(() => {
    const CONTEXT_MIN: Record<string, number> = {
      all: 0,
      "8k": 8192,
      "32k": 32768,
      "128k": 131072,
      "1m": 1000000,
    };
    const contextMin = CONTEXT_MIN[contextFilter] || 0;

    const PRICE_MAX: Record<string, number> = {
      all: Infinity,
      u1: 1,
      u3: 3,
      u10: 10,
      o10: Infinity,
    };
    const priceMax = PRICE_MAX[priceFilter] ?? Infinity;
    const priceMin = priceFilter === "o10" ? 10 : 0;

    const priceOutMax = PRICE_MAX[priceOutFilter] ?? Infinity;
    const priceOutMin = priceOutFilter === "o10" ? 10 : 0;

    const s = search.toLowerCase();

    return addedModels
      .filter((m) => {
        const matchesSearch =
          !s ||
          m.name.toLowerCase().includes(s) ||
          m.providerName.toLowerCase().includes(s) ||
          m.alias.toLowerCase().includes(s);
        const matchesStatus = statusFilter === "all" || m.status === statusFilter;
        const matchesProvider =
          activeProviderFilterList.length === 0 || activeProviderFilterList.includes(m.providerId);
        const matchesContext = m.contextWindow >= contextMin;
        const matchesPriceIn = m.inputPrice >= priceMin && m.inputPrice <= priceMax;
        const matchesPriceOut = m.outputPrice >= priceOutMin && m.outputPrice <= priceOutMax;

        return (
          matchesSearch &&
          matchesStatus &&
          matchesProvider &&
          matchesContext &&
          matchesPriceIn &&
          matchesPriceOut
        );
      })
      .sort((a, b) => {
        let av = a[sortKey] ?? "";
        let bv = b[sortKey] ?? "";
        if (typeof av === "string") av = av.toLowerCase();
        if (typeof bv === "string") bv = bv.toLowerCase();

        const cmp = av < bv ? -1 : av > bv ? 1 : 0;
        return sortDir === "asc" ? cmp : -cmp;
      });
  }, [
    addedModels,
    search,
    statusFilter,
    activeProviderFilterList,
    contextFilter,
    priceFilter,
    priceOutFilter,
    sortKey,
    sortDir,
  ]);

  const totalPages = Math.max(1, Math.ceil(filteredModels.length / pageSize));
  const currentPageModels = useMemo(
    () => filteredModels.slice((page - 1) * pageSize, page * pageSize),
    [filteredModels, page, pageSize]
  );

  const handleSort = (key: keyof ModelRecord) => {
    if (sortKey === key) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  // Add Model Handlers
  const handleOpenAdd = () => {
    setView("add");
    setAddStep(0);
    setAddProviderId(null);
    setAddSearch("");
    setSelectedIds({});
    setAliasOverrides({});
    setAliasPattern("{model}");
    setShowCustomForm(false);
    setCustomProviderName("");
    setManualModelInput("");
    setManualModelNames([]);
  };

  const handleCreateCustomProvider = () => {
    const trimmed = customProviderName.trim();
    if (!trimmed) return;
    const id = `custom-${trimmed.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
    const color = PALETTE[(providers.length) % PALETTE.length];
    const newProv: ProviderDef = {
      id,
      name: trimmed,
      count: 0,
      color,
      addedQuota: 0,
      isCustom: true,
    };
    setProviders((prev) => [...prev, newProv]);
    setShowCustomForm(false);
    setCustomProviderName("");
    setAddProviderId(id);
    setAddStep(1);
    setManualModelNames([]);
    setManualModelInput("");
    toast.success(`Custom provider "${trimmed}" created.`);
  };

  const handleAddManualModel = () => {
    const trimmed = manualModelInput.trim();
    if (!trimmed) return;
    if (!manualModelNames.includes(trimmed)) {
      setManualModelNames((prev) => [...prev, trimmed]);
    }
    setManualModelInput("");
  };

  const handleRemoveManualModel = (name: string) => {
    setManualModelNames((prev) => prev.filter((n) => n !== name));
  };

  const applyPattern = (modelName: string, providerId: string) => {
    const pattern = aliasPattern || "{model}";
    return pattern.replace(/{model}/g, modelName).replace(/{provider}/g, providerId);
  };

  const handleSaveModel = () => {
    const chosenProvider = providers.find((p) => p.id === addProviderId);
    if (!chosenProvider) return;

    if (chosenProvider.isCustom) {
      let counter = models.length;
      manualModelNames.forEach((name) => {
        counter++;
        const alias = aliasOverrides[`custom-${name}`] || applyPattern(name, chosenProvider.id);
        const newModel: ModelRecord = {
          id: `${chosenProvider.id}-${name}`,
          shortId: (Math.imul(counter + 1, 2654435761) >>> 0).toString(16).padStart(8, "0"),
          name,
          alias,
          providerId: chosenProvider.id,
          providerName: chosenProvider.name,
          color: chosenProvider.color,
          status: "Active",
          health: "Healthy",
          lastSuccess: "Today",
          added: true,
          contextWindow: 128000,
          maxInput: 120000,
          maxOutput: 8192,
          inputPrice: 2.5,
          outputPrice: 10.0,
          capabilities: ["function", "streaming", "json"],
        };
        setModels((prev) => [...prev, newModel]);
        chosenProvider.count += 1;
      });
      toast.success(`Added ${manualModelNames.length} models for ${chosenProvider.name}`);
    } else {
      let addedCount = 0;
      setModels((prev) =>
        prev.map((m) => {
          if (m.providerId === chosenProvider.id && selectedIds[m.id]) {
            addedCount++;
            return {
              ...m,
              added: true,
              status: "Active",
              health: "Healthy",
              alias: aliasOverrides[m.id] || applyPattern(m.name, chosenProvider.id),
            };
          }
          return m;
        })
      );
      toast.success(`Onboarded ${addedCount} models for ${chosenProvider.name}`);
    }

    setView("list");
  };

  // Detail View Model
  const detailModel = useMemo(
    () => (detailModelId ? models.find((m) => m.id === detailModelId) : null),
    [models, detailModelId]
  );

  return (
    <div className="p-4 sm:p-6 max-w-[1600px] mx-auto space-y-6 animate-fadeIn">
      {/* 1. LISTING VIEW */}
      {view === "list" && (
        <div className="space-y-6">
          {/* Header with + Add Model action button in top right */}
          {!hideHeader && (
            <PageHeader pageId="model-management" action="list">
              <button
                type="button"
                onClick={handleOpenAdd}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-bold transition-all shadow-xs shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add Model</span>
              </button>
            </PageHeader>
          )}

          {/* 4 Summary / KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Total Providers */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs">
              <span className="text-xs font-semibold text-neutral-400 block mb-1">Total Providers</span>
              <div className="text-2xl font-bold text-neutral-900 dark:text-white font-mono">{statAllProviders}</div>
              <span className="text-[11px] text-neutral-500 mt-1 block">{statProviders} with onboarded models</span>
            </div>

            {/* Card 2: Total Models */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs">
              <span className="text-xs font-semibold text-neutral-400 block mb-1">Total Models</span>
              <div className="text-2xl font-bold text-neutral-900 dark:text-white font-mono">{statTotal}</div>
              <span className="text-[11px] text-neutral-500 mt-1 block">of {statCatalog} in catalog</span>
            </div>

            {/* Card 3: Active Models */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs">
              <span className="text-xs font-semibold text-neutral-400 block mb-1">Active Models</span>
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">{statActive}</div>
              <span className="text-[11px] text-neutral-500 mt-1 block">Routing Traffic</span>
            </div>

            {/* Card 4: Inactive Models */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs">
              <span className="text-xs font-semibold text-neutral-400 block mb-1">Inactive Models</span>
              <div className="text-2xl font-bold text-rose-600 dark:text-rose-400 font-mono">{statInactive}</div>
              <span className="text-[11px] text-neutral-500 mt-1 block">Serving Suspended</span>
            </div>
          </div>

          {/* Search & Main Filter Controls */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Search Bar */}
              <div className="relative flex-1">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search by model, alias, ID or provider..."
                  className="w-full h-10 pl-10 pr-4 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-hidden transition-all text-neutral-900 dark:text-white"
                />
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Status Filter Dropdown */}
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                className="h-10 px-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs font-semibold text-neutral-800 dark:text-neutral-200 focus:ring-2 focus:ring-primary-500 focus:outline-hidden"
              >
                <option value="all">All statuses</option>
                <option value="Active">Active only</option>
                <option value="Inactive">Inactive only</option>
              </select>
            </div>

            {/* Facet Filter Popover Pills */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1 border-t border-neutral-100 dark:border-neutral-800 relative z-20">
              
              {/* 1. Providers Facet Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setOpenFacet(openFacet === "providers" ? null : "providers")}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                    activeProviderFilterList.length > 0
                      ? "bg-primary-50 dark:bg-primary-950/60 border-primary-500 text-primary-600 dark:text-primary-400"
                      : "bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50"
                  }`}
                >
                  <span>Providers{activeProviderFilterList.length > 0 ? ` (${activeProviderFilterList.length})` : ""}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                </button>

                {openFacet === "providers" && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl p-3 z-30 space-y-2.5 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Providers</span>
                      {activeProviderFilterList.length > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            setProviderFilterIds({});
                            setPage(1);
                          }}
                          className="text-[11px] font-bold text-primary-600 hover:underline"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      value={providerFilterSearch}
                      onChange={(e) => setProviderFilterSearch(e.target.value)}
                      placeholder="Filter providers..."
                      className="w-full h-8 px-2.5 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white"
                    />
                    <div className="max-h-48 overflow-y-auto space-y-1 pr-1">
                      {providers
                        .filter((p) => p.name.toLowerCase().includes(providerFilterSearch.toLowerCase()))
                        .map((p) => {
                          const checked = Boolean(providerFilterIds[p.id]);
                          const count = models.filter((m) => m.providerId === p.id && m.added).length;
                          return (
                            <button
                              key={p.id}
                              type="button"
                              onClick={() => {
                                setProviderFilterIds((prev) => ({ ...prev, [p.id]: !prev[p.id] }));
                                setPage(1);
                              }}
                              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                                checked ? "bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 font-bold" : "hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                              }`}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${checked ? "bg-primary-600 border-primary-600 text-white" : "border-neutral-300"}`}>
                                  {checked && <Check className="w-2.5 h-2.5" />}
                                </div>
                                <span className="truncate">{p.name}</span>
                              </div>
                              <span className="text-[10px] font-mono text-neutral-400">{count}</span>
                            </button>
                          );
                        })}
                    </div>
                  </div>
                )}
              </div>

              {/* 2. Price In Facet Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setOpenFacet(openFacet === "priceIn" ? null : "priceIn")}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                    priceFilter !== "all"
                      ? "bg-primary-50 dark:bg-primary-950/60 border-primary-500 text-primary-600 dark:text-primary-400"
                      : "bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50"
                  }`}
                >
                  <span>Price In{priceFilter !== "all" ? `: ${priceFilter}` : ""}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                </button>

                {openFacet === "priceIn" && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl p-3 z-30 space-y-1 animate-fadeIn">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-2">Input $/1M</span>
                    {[
                      { id: "all", label: "Any" },
                      { id: "u1", label: "Under $1" },
                      { id: "u3", label: "Under $3" },
                      { id: "u10", label: "Under $10" },
                      { id: "o10", label: "$10+" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setPriceFilter(opt.id);
                          setPage(1);
                          setOpenFacet(null);
                        }}
                        className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                          priceFilter === opt.id ? "bg-neutral-100 dark:bg-neutral-800 font-bold text-neutral-900 dark:text-white" : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50"
                        }`}
                      >
                        <div className={`w-3 h-3 rounded-full border ${priceFilter === opt.id ? "border-primary-600 bg-primary-600" : "border-neutral-400"}`} />
                        <span>{opt.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 3. Price Out Facet Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setOpenFacet(openFacet === "priceOut" ? null : "priceOut")}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                    priceOutFilter !== "all"
                      ? "bg-primary-50 dark:bg-primary-950/60 border-primary-500 text-primary-600 dark:text-primary-400"
                      : "bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50"
                  }`}
                >
                  <span>Price Out{priceOutFilter !== "all" ? `: ${priceOutFilter}` : ""}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                </button>

                {openFacet === "priceOut" && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl p-3 z-30 space-y-1 animate-fadeIn">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-2">Output $/1M</span>
                    {[
                      { id: "all", label: "Any" },
                      { id: "u1", label: "Under $1" },
                      { id: "u3", label: "Under $3" },
                      { id: "u10", label: "Under $10" },
                      { id: "o10", label: "$10+" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setPriceOutFilter(opt.id);
                          setPage(1);
                          setOpenFacet(null);
                        }}
                        className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                          priceOutFilter === opt.id ? "bg-neutral-100 dark:bg-neutral-800 font-bold text-neutral-900 dark:text-white" : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50"
                        }`}
                      >
                        <div className={`w-3 h-3 rounded-full border ${priceOutOutFilter === opt.id ? "border-primary-600 bg-primary-600" : "border-neutral-400"}`} />
                        <span>{opt.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 4. Context Facet Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setOpenFacet(openFacet === "context" ? null : "context")}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                    contextFilter !== "all"
                      ? "bg-primary-50 dark:bg-primary-950/60 border-primary-500 text-primary-600 dark:text-primary-400"
                      : "bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50"
                  }`}
                >
                  <span>Context{contextFilter !== "all" ? `: ${contextFilter}` : ""}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                </button>

                {openFacet === "context" && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl p-3 z-30 space-y-1 animate-fadeIn">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-2">Context Window</span>
                    {[
                      { id: "all", label: "Any" },
                      { id: "8k", label: "8K+" },
                      { id: "32k", label: "32K+" },
                      { id: "128k", label: "128K+" },
                      { id: "1m", label: "1M+" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setContextFilter(opt.id);
                          setPage(1);
                          setOpenFacet(null);
                        }}
                        className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                          contextFilter === opt.id ? "bg-neutral-100 dark:bg-neutral-800 font-bold text-neutral-900 dark:text-white" : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50"
                        }`}
                      >
                        <div className={`w-3 h-3 rounded-full border ${contextFilter === opt.id ? "border-primary-600 bg-primary-600" : "border-neutral-400"}`} />
                        <span>{opt.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Reset Filters Button */}
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="px-3 py-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 dark:text-rose-400 flex items-center gap-1 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Reset filters</span>
                </button>
              )}
            </div>

            {/* Backdrop click to close facet popover */}
            {openFacet && (
              <div className="fixed inset-0 z-10" onClick={() => setOpenFacet(null)} />
            )}
          </div>

          {/* Model Table */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-neutral-50 dark:bg-neutral-800/60 border-b border-neutral-200 dark:border-neutral-800 text-neutral-400 font-semibold uppercase tracking-wider text-[11px] whitespace-nowrap">
                    <th onClick={() => handleSort("name")} className="py-3 px-4 cursor-pointer hover:text-neutral-900 dark:hover:text-white select-none">
                      MODEL {sortKey === "name" && (sortDir === "asc" ? "↑" : "↓")}
                    </th>
                    <th onClick={() => handleSort("providerName")} className="py-3 px-4 cursor-pointer hover:text-neutral-900 dark:hover:text-white select-none">
                      PROVIDER {sortKey === "providerName" && (sortDir === "asc" ? "↑" : "↓")}
                    </th>
                    <th onClick={() => handleSort("contextWindow")} className="py-3 px-4 cursor-pointer hover:text-neutral-900 dark:hover:text-white select-none">
                      CONTEXT {sortKey === "contextWindow" && (sortDir === "asc" ? "↑" : "↓")}
                    </th>
                    <th onClick={() => handleSort("maxInput")} className="py-3 px-4 cursor-pointer hover:text-neutral-900 dark:hover:text-white select-none">
                      MAX IN {sortKey === "maxInput" && (sortDir === "asc" ? "↑" : "↓")}
                    </th>
                    <th onClick={() => handleSort("maxOutput")} className="py-3 px-4 cursor-pointer hover:text-neutral-900 dark:hover:text-white select-none">
                      MAX OUT {sortKey === "maxOutput" && (sortDir === "asc" ? "↑" : "↓")}
                    </th>
                    <th onClick={() => handleSort("inputPrice")} className="py-3 px-4 cursor-pointer hover:text-neutral-900 dark:hover:text-white select-none">
                      IN $/1M {sortKey === "inputPrice" && (sortDir === "asc" ? "↑" : "↓")}
                    </th>
                    <th onClick={() => handleSort("outputPrice")} className="py-3 px-4 cursor-pointer hover:text-neutral-900 dark:hover:text-white select-none">
                      OUT $/1M {sortKey === "outputPrice" && (sortDir === "asc" ? "↑" : "↓")}
                    </th>
                    <th onClick={() => handleSort("status")} className="py-3 px-4 cursor-pointer hover:text-neutral-900 dark:hover:text-white select-none">
                      STATUS {sortKey === "status" && (sortDir === "asc" ? "↑" : "↓")}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800 text-neutral-800 dark:text-neutral-200">
                  {currentPageModels.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-neutral-400">
                        No models found matching the selected filters.
                      </td>
                    </tr>
                  ) : (
                    currentPageModels.map((row) => (
                      <tr
                        key={row.id}
                        onClick={() => {
                          setDetailModelId(row.id);
                          setView("detail");
                        }}
                        className="hover:bg-neutral-50/80 dark:hover:bg-neutral-800/50 cursor-pointer transition-colors"
                      >
                        {/* Model Name */}
                        <td className="py-3.5 px-4 font-mono font-bold text-neutral-900 dark:text-white whitespace-nowrap">
                          {row.name}
                        </td>

                        {/* Provider Badge */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-semibold text-[11px]">
                            {row.providerName}
                          </span>
                        </td>

                        {/* Context */}
                        <td className="py-3.5 px-4 font-mono text-neutral-600 dark:text-neutral-400 whitespace-nowrap">
                          {formatContext(row.contextWindow)}
                        </td>

                        {/* Max In */}
                        <td className="py-3.5 px-4 font-mono text-neutral-600 dark:text-neutral-400 whitespace-nowrap">
                          {formatContext(row.maxInput)}
                        </td>

                        {/* Max Out */}
                        <td className="py-3.5 px-4 font-mono text-neutral-600 dark:text-neutral-400 whitespace-nowrap">
                          {formatContext(row.maxOutput)}
                        </td>

                        {/* In Price */}
                        <td className="py-3.5 px-4 font-mono text-neutral-600 dark:text-neutral-400 whitespace-nowrap">
                          ${row.inputPrice.toFixed(2)}
                        </td>

                        {/* Out Price */}
                        <td className="py-3.5 px-4 font-mono text-neutral-600 dark:text-neutral-400 whitespace-nowrap">
                          ${row.outputPrice.toFixed(2)}
                        </td>

                        {/* Status Badge */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 rounded-full text-[11px] font-bold inline-flex items-center gap-1.5 ${
                              row.status === "Active"
                                ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                                : "bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800"
                            }`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="px-6 py-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-500">
              <span>
                Page {page} of {totalPages} &middot; {filteredModels.length} models
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="px-3 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-700 disabled:opacity-40 font-semibold hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                >
                  Prev
                </button>
                <button
                  type="button"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="px-3 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-700 disabled:opacity-40 font-semibold hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. ADD MODEL WIZARD VIEW */}
      {view === "add" && (
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Back Navigation Link */}
          <button
            type="button"
            onClick={() => setView("list")}
            className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Master Model Management</span>
          </button>

          {/* 3-Step Wizard Indicator */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 shadow-xs flex items-center gap-4">
            {[
              { step: 0, label: "Provider" },
              { step: 1, label: "Models" },
              { step: 2, label: "Aliases" },
            ].map((st, idx) => {
              const isDone = addStep > st.step;
              const isActive = addStep === st.step;
              return (
                <React.Fragment key={st.step}>
                  <div
                    onClick={() => isDone && setAddStep(st.step)}
                    className={`flex items-center gap-3 cursor-pointer ${isDone ? "opacity-100" : isActive ? "opacity-100" : "opacity-50"}`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isDone
                          ? "bg-primary-600 text-white"
                          : isActive
                          ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900"
                          : "bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                      }`}
                    >
                      {isDone ? <Check className="w-4 h-4" /> : st.step + 1}
                    </div>
                    <span className={`text-xs font-bold ${isActive ? "text-neutral-900 dark:text-white" : "text-neutral-500"}`}>
                      {st.label}
                    </span>
                  </div>
                  {idx < 2 && <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />}
                </React.Fragment>
              );
            })}
          </div>

          {/* STEP 1: CHOOSE A PROVIDER */}
          {addStep === 0 && (
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs space-y-6">
              <div>
                <h2 className="text-base font-bold text-neutral-900 dark:text-white">Choose a provider</h2>
                <p className="text-xs text-neutral-500 mt-1">
                  {statAllProviders} providers &middot; {statCatalog} models in the full catalog. Pick one to browse its models.
                </p>
              </div>

              {/* Action Toolbar: Search + Custom Provider Button */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={addSearch}
                    onChange={(e) => setAddSearch(e.target.value)}
                    placeholder="Search providers..."
                    className="w-full h-10 pl-10 pr-4 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-hidden"
                  />
                  <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>

                <button
                  type="button"
                  onClick={() => setShowCustomForm(!showCustomForm)}
                  className="px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-bold transition-all shadow-xs shrink-0 whitespace-nowrap"
                >
                  + Add custom provider
                </button>
              </div>

              {/* Inline Custom Provider Form */}
              {showCustomForm && (
                <div className="bg-neutral-50 dark:bg-neutral-800/60 border-2 border-primary-500 rounded-2xl p-5 space-y-3 animate-fadeIn">
                  <h4 className="text-xs font-bold text-neutral-900 dark:text-white">New provider</h4>
                  <p className="text-xs text-neutral-500">
                    For providers not in our catalog yet — e.g. an on-prem LMStudio, vLLM, or Ollama endpoint. You'll add its models manually on the next step.
                  </p>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={customProviderName}
                      onChange={(e) => setCustomProviderName(e.target.value)}
                      placeholder="Provider name (e.g. LMStudio)"
                      className="flex-1 h-9 px-3 text-xs bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCustomForm(false)}
                      className="px-3.5 py-2 text-xs font-bold text-neutral-600 hover:text-neutral-900"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      disabled={!customProviderName.trim()}
                      onClick={handleCreateCustomProvider}
                      className="px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl"
                    >
                      Create &amp; Continue
                    </button>
                  </div>
                </div>
              )}

              {/* Provider Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[420px] overflow-y-auto pr-1">
                {providers
                  .filter((p) => p.name.toLowerCase().includes(addSearch.toLowerCase()))
                  .map((p) => {
                    const isSelected = p.id === addProviderId;
                    const addedCount = models.filter((m) => m.providerId === p.id && m.added).length;
                    const availableCount = p.isCustom ? 0 : p.count - addedCount;

                    return (
                      <div
                        key={p.id}
                        onClick={() => setAddProviderId(p.id)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                          isSelected
                            ? "bg-primary-50/50 dark:bg-primary-950/40 border-primary-500 shadow-md"
                            : "bg-white dark:bg-neutral-850 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-xs"
                            style={{ backgroundColor: p.color }}
                          >
                            {p.name[0]}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-xs font-bold text-neutral-900 dark:text-white truncate">{p.name}</h4>
                            <span className="text-[11px] text-neutral-400 block mt-0.5">
                              {availableCount} available &middot; {addedCount} onboarded
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>

              {/* Wizard Bottom Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-neutral-100 dark:border-neutral-800">
                <button
                  type="button"
                  onClick={() => setView("list")}
                  className="px-4 py-2 text-xs font-bold text-neutral-600 hover:text-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={!addProviderId}
                  onClick={() => setAddStep(1)}
                  className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-bold rounded-xl disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: SELECT MODELS */}
          {addStep === 1 && (
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
                <div>
                  <h2 className="text-base font-bold text-neutral-900 dark:text-white">
                    Select models &middot; {providers.find((p) => p.id === addProviderId)?.name}
                  </h2>
                </div>
                <span className="text-xs font-bold text-primary-600 dark:text-primary-400">
                  {providers.find((p) => p.id === addProviderId)?.isCustom
                    ? `${manualModelNames.length} selected`
                    : `${Object.values(selectedIds).filter(Boolean).length} selected`}
                </span>
              </div>

              {/* Custom Provider Manual Model Entry */}
              {providers.find((p) => p.id === addProviderId)?.isCustom ? (
                <div className="space-y-4">
                  <p className="text-xs text-neutral-500">
                    No catalog for this provider — type each model's ID exactly as the endpoint expects it.
                  </p>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={manualModelInput}
                      onChange={(e) => setManualModelInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddManualModel())}
                      placeholder="Model ID (e.g. llama-3.1-8b-instruct-q4)"
                      className="flex-1 h-10 px-3.5 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl font-mono"
                    />
                    <button
                      type="button"
                      onClick={handleAddManualModel}
                      className="px-4 py-2 bg-neutral-900 text-white text-xs font-bold rounded-xl"
                    >
                      + Add
                    </button>
                  </div>

                  {/* Manual Model Chips */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {manualModelNames.map((name) => (
                      <span
                        key={name}
                        className="px-3 py-1.5 bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-800 text-xs font-mono font-bold rounded-xl flex items-center gap-2"
                      >
                        {name}
                        <button type="button" onClick={() => handleRemoveManualModel(name)} className="hover:text-rose-600">
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>

                  {manualModelNames.length === 0 && (
                    <div className="p-8 text-center border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl text-neutral-400 text-xs">
                      No models added yet. Type an ID above and press Add.
                    </div>
                  )}
                </div>
              ) : (
                /* Standard Provider Catalog Selector */
                <div className="space-y-4">
                  <p className="text-xs text-neutral-500">
                    Showing catalog models not yet onboarded. Search narrows the list before you pick.
                  </p>

                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={addSearch}
                      onChange={(e) => setAddSearch(e.target.value)}
                      placeholder={`Search ${providers.find((p) => p.id === addProviderId)?.name} models...`}
                      className="flex-1 h-10 px-3.5 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const available = models.filter((m) => m.providerId === addProviderId && !m.added);
                        const sel: Record<string, boolean> = { ...selectedIds };
                        available.forEach((m) => (sel[m.id] = true));
                        setSelectedIds(sel);
                      }}
                      className="px-3.5 py-2 text-xs font-semibold border border-neutral-200 dark:border-neutral-700 rounded-xl hover:bg-neutral-50"
                    >
                      Select all filtered
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedIds({})}
                      className="px-3.5 py-2 text-xs font-semibold border border-neutral-200 dark:border-neutral-700 rounded-xl hover:bg-neutral-50"
                    >
                      Clear
                    </button>
                  </div>

                  {/* Checkbox Model Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[380px] overflow-y-auto p-2 border border-neutral-200 dark:border-neutral-800 rounded-2xl">
                    {models
                      .filter((m) => m.providerId === addProviderId && !m.added)
                      .filter((m) => m.name.toLowerCase().includes(addSearch.toLowerCase()))
                      .map((m) => {
                        const checked = Boolean(selectedIds[m.id]);
                        return (
                          <div
                            key={m.id}
                            onClick={() => setSelectedIds((prev) => ({ ...prev, [m.id]: !prev[m.id] }))}
                            className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                              checked
                                ? "bg-primary-50/50 dark:bg-primary-950/40 border-primary-500 font-bold"
                                : "bg-white dark:bg-neutral-850 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300"
                            }`}
                          >
                            <div className={`w-4 h-4 rounded border flex items-center justify-center ${checked ? "bg-primary-600 border-primary-600 text-white" : "border-neutral-300"}`}>
                              {checked && <Check className="w-3 h-3" />}
                            </div>
                            <span className="text-xs font-mono truncate text-neutral-900 dark:text-white">{m.name}</span>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}

              {/* Wizard Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-neutral-100 dark:border-neutral-800">
                <button
                  type="button"
                  onClick={() => setAddStep(0)}
                  className="px-4 py-2 text-xs font-bold text-neutral-600 hover:text-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl"
                >
                  Back
                </button>
                <button
                  type="button"
                  disabled={
                    providers.find((p) => p.id === addProviderId)?.isCustom
                      ? manualModelNames.length === 0
                      : Object.values(selectedIds).filter(Boolean).length === 0
                  }
                  onClick={() => setAddStep(2)}
                  className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-bold rounded-xl disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: SET ALIASES */}
          {addStep === 2 && (
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs space-y-6">
              <div>
                <h2 className="text-base font-bold text-neutral-900 dark:text-white">Set aliases</h2>
                <p className="text-xs text-neutral-500 mt-1">
                  Aliases are the business-facing names apps call instead of raw provider model IDs. Apply a pattern to all selected models, then fine-tune any individually.
                </p>
              </div>

              {/* Bulk Pattern Section */}
              <div className="p-4 bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 rounded-2xl space-y-2">
                <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300">Bulk pattern</span>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={aliasPattern}
                    onChange={(e) => setAliasPattern(e.target.value)}
                    className="flex-1 h-9 px-3 text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const ov: Record<string, string> = { ...aliasOverrides };
                      const chosenP = providers.find((p) => p.id === addProviderId);
                      if (chosenP?.isCustom) {
                        manualModelNames.forEach((n) => {
                          ov[`custom-${n}`] = applyPattern(n, chosenP.id);
                        });
                      } else {
                        models
                          .filter((m) => m.providerId === addProviderId && selectedIds[m.id])
                          .forEach((m) => {
                            ov[m.id] = applyPattern(m.name, m.providerId);
                          });
                      }
                      setAliasOverrides(ov);
                      toast.success("Applied bulk pattern to all selected models.");
                    }}
                    className="px-4 py-2 bg-neutral-900 text-white text-xs font-bold rounded-xl"
                  >
                    Apply to all
                  </button>
                </div>
                <span className="text-[11px] text-neutral-400 block">Use {"{provider}"} and {"{model}"} as placeholders.</span>
              </div>

              {/* Editable Aliases List */}
              <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
                {providers.find((p) => p.id === addProviderId)?.isCustom
                  ? manualModelNames.map((name) => (
                      <div key={name} className="flex items-center gap-3 p-3 border border-neutral-200 dark:border-neutral-800 rounded-xl">
                        <span className="flex-1 text-xs font-mono text-neutral-600 dark:text-neutral-400 truncate">{name}</span>
                        <span className="text-neutral-400">&rarr;</span>
                        <input
                          type="text"
                          value={aliasOverrides[`custom-${name}`] ?? applyPattern(name, addProviderId || "")}
                          onChange={(e) => setAliasOverrides((prev) => ({ ...prev, [`custom-${name}`]: e.target.value }))}
                          className="flex-1 h-9 px-3 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl font-mono"
                        />
                      </div>
                    ))
                  : models
                      .filter((m) => m.providerId === addProviderId && selectedIds[m.id])
                      .map((m) => (
                        <div key={m.id} className="flex items-center gap-3 p-3 border border-neutral-200 dark:border-neutral-800 rounded-xl">
                          <span className="flex-1 text-xs font-mono text-neutral-600 dark:text-neutral-400 truncate">{m.name}</span>
                          <span className="text-neutral-400">&rarr;</span>
                          <input
                            type="text"
                            value={aliasOverrides[m.id] ?? applyPattern(m.name, m.providerId)}
                            onChange={(e) => setAliasOverrides((prev) => ({ ...prev, [m.id]: e.target.value }))}
                            className="flex-1 h-9 px-3 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl font-mono"
                          />
                        </div>
                      ))}
              </div>

              {/* Wizard Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-neutral-100 dark:border-neutral-800">
                <button
                  type="button"
                  onClick={() => setAddStep(1)}
                  className="px-4 py-2 text-xs font-bold text-neutral-600 hover:text-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleSaveModel}
                  className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  Save Model
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. MODEL DETAIL / VIEW MODEL VIEW */}
      {view === "detail" && detailModel && (
        <div className="space-y-6">
          {/* Back Navigation Link */}
          <button
            type="button"
            onClick={() => setView("list")}
            className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Master Model Management</span>
          </button>

          {/* Model Detail Header Card */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg shrink-0"
                  style={{ backgroundColor: detailModel.color }}
                >
                  {detailModel.providerName[0]}
                </div>
                <div className="min-w-0">
                  <h1 className="text-xl font-bold font-mono text-neutral-900 dark:text-white truncate">
                    {detailModel.name}
                  </h1>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    {detailModel.providerName} &middot; Alias: {detailModel.alias}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="px-3 py-1 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-bold text-xs">
                  {detailModel.name.includes("embed") ? "EMBEDDING" : "CHAT"}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5 ${
                    detailModel.status === "Active"
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                      : "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  {detailModel.status}
                </span>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-neutral-100 dark:border-neutral-800">
              <div>
                <span className="text-[11px] font-semibold text-neutral-400 block mb-1">Context Window</span>
                <span className="text-xl font-bold text-neutral-900 dark:text-white font-mono">
                  {formatContext(detailModel.contextWindow)}
                </span>
              </div>
              <div>
                <span className="text-[11px] font-semibold text-neutral-400 block mb-1">Input Price</span>
                <span className="text-xl font-bold text-neutral-900 dark:text-white font-mono">
                  ${detailModel.inputPrice.toFixed(2)}/M
                </span>
              </div>
              <div>
                <span className="text-[11px] font-semibold text-neutral-400 block mb-1">Output Price</span>
                <span className="text-xl font-bold text-neutral-900 dark:text-white font-mono">
                  ${detailModel.outputPrice.toFixed(2)}/M
                </span>
              </div>
              <div>
                <span className="text-[11px] font-semibold text-neutral-400 block mb-1">Max Output</span>
                <span className="text-xl font-bold text-neutral-900 dark:text-white font-mono">
                  {detailModel.maxOutput.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* 3 Cards Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Card 1: Token Pricing */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs space-y-4">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Token Pricing</h3>
                <p className="text-[11px] text-neutral-500 mt-0.5">Per 1M tokens where applicable</p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-neutral-400 block">INPUT</span>
                  <span className="text-sm font-bold font-mono text-neutral-900 dark:text-white">
                    ${detailModel.inputPrice.toFixed(2)}/M
                  </span>
                </div>
                <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-neutral-400 block">OUTPUT</span>
                  <span className="text-sm font-bold font-mono text-neutral-900 dark:text-white">
                    ${detailModel.outputPrice.toFixed(2)}/M
                  </span>
                </div>
                <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-neutral-400 block">CACHE READ</span>
                  <span className="text-sm font-bold font-mono text-neutral-900 dark:text-white">
                    ${(detailModel.inputPrice * 0.1).toFixed(2)}/M
                  </span>
                </div>
                <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-neutral-400 block">CACHE WRITE</span>
                  <span className="text-sm font-bold font-mono text-neutral-900 dark:text-white">
                    ${(detailModel.inputPrice * 1.25).toFixed(2)}/M
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2: Model Info */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Model Info</h3>

              <div className="space-y-3 text-xs divide-y divide-neutral-100 dark:divide-neutral-800">
                <div className="flex justify-between items-center pt-2">
                  <span className="text-neutral-500">Provider</span>
                  <span className="font-bold text-neutral-900 dark:text-white">{detailModel.providerName}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-neutral-500">Mode</span>
                  <span className="font-bold text-neutral-900 dark:text-white">
                    {detailModel.name.includes("embed") ? "EMBEDDING" : "CHAT"}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-neutral-500">Max Input</span>
                  <span className="font-mono font-bold text-neutral-900 dark:text-white">
                    {detailModel.maxInput.toLocaleString()} tokens
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-neutral-500">Max Output</span>
                  <span className="font-mono font-bold text-neutral-900 dark:text-white">
                    {detailModel.maxOutput.toLocaleString()} tokens
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-neutral-500">Status</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">&bull; {detailModel.status}</span>
                </div>
              </div>
            </div>

            {/* Card 3: Features */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Features</h3>

              <div className="space-y-2.5 text-xs">
                {[
                  { key: "function", label: "Function Calling" },
                  { key: "vision", label: "Vision" },
                  { key: "json", label: "JSON Mode" },
                  { key: "streaming", label: "Streaming" },
                  { key: "toolChoice", label: "Tool Choice" },
                  { key: "parallel", label: "Parallel Calls" },
                  { key: "audio", label: "Audio Input" },
                  { key: "caching", label: "Prompt Caching" },
                ].map((feat) => {
                  const supported =
                    detailModel.capabilities.includes(feat.key) ||
                    (feat.key === "toolChoice" && detailModel.capabilities.includes("function")) ||
                    feat.key === "streaming";
                  return (
                    <div key={feat.key} className="flex items-center gap-3">
                      <span className={`font-bold w-4 text-center ${supported ? "text-emerald-500" : "text-neutral-300 dark:text-neutral-700"}`}>
                        {supported ? "✓" : "—"}
                      </span>
                      <span className={supported ? "text-neutral-800 dark:text-neutral-200 font-medium" : "text-neutral-400"}>
                        {feat.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModelManagement;
