import React, { useState, useEffect, useMemo } from "react";
import { X, Cpu, Search, Sparkles, Layers, ShieldCheck, CheckCircle2 } from "lucide-react";

export interface AIModelItemInfo {
  id: string;
  name: string;
  badge?: string;
  description?: string;
}

export interface AIProviderGroupInfo {
  id: string;
  name: string;
  badge?: string;
  description?: string;
  models: AIModelItemInfo[];
}

// Global master provider list fallback (matches HB Admin catalog)
export const DEFAULT_AI_PROVIDERS: AIProviderGroupInfo[] = [
  {
    id: "openai",
    name: "OpenAI",
    badge: "OpenAI",
    description: "GPT-4o, GPT-4.1, o3, o4-mini, and Codex models",
    models: [
      { id: "gpt-4o", name: "GPT-4o", badge: "Multimodal" },
      { id: "gpt-4.1", name: "GPT-4.1", badge: "Flagship" },
      { id: "gpt-4-turbo", name: "GPT-4 Turbo" },
      { id: "gpt-4o-mini", name: "GPT-4o Mini", badge: "Fast" },
      { id: "o3", name: "o3", badge: "Reasoning" },
      { id: "o4-mini", name: "o4-mini" },
      { id: "codex-mini-latest", name: "Codex", badge: "Code" },
      { id: "gpt-4-mini", name: "GPT-4 Mini", badge: "Fast" },
    ],
  },
  {
    id: "anthropic",
    name: "Anthropic",
    badge: "Anthropic",
    description: "Claude 3.5 Sonnet, Claude 4, Opus, and Haiku models",
    models: [
      { id: "claude-3-5-sonnet", name: "Claude 3.5 Sonnet", badge: "Reasoning" },
      { id: "claude-4", name: "Claude 4", badge: "Next-Gen" },
      { id: "claude-3-5-haiku", name: "Claude 3.5 Haiku", badge: "Fast" },
      { id: "claude-3-opus", name: "Claude 3 Opus" },
      { id: "claude-3-sonnet", name: "Claude 3 Sonnet" },
    ],
  },
  {
    id: "google",
    name: "Gemini",
    badge: "Gemini",
    description: "Gemini 2.5 Pro, Gemini 1.5 Pro, Flash, and Gemini Pro",
    models: [
      { id: "gemini-2-5-pro", name: "Gemini 2.5 Pro", badge: "Recommended" },
      { id: "gemini-1-5-pro", name: "Gemini 1.5 Pro", badge: "1M Context" },
      { id: "gemini-pro", name: "Gemini Pro" },
      { id: "gemini-1-5-flash", name: "Gemini 1.5 Flash", badge: "Fast" },
      { id: "gemini-ultra", name: "Gemini Ultra" },
    ],
  },
  {
    id: "azure-openai",
    name: "Azure OpenAI",
    badge: "Azure OpenAI",
    description: "Enterprise deployed OpenAI instances on Azure",
    models: [
      { id: "azure-gpt-4o", name: "Azure GPT-4o" },
      { id: "azure-gpt-4-32k", name: "Azure GPT-4 32k" },
      { id: "azure-embeddings", name: "Azure Embeddings" },
    ],
  },
  {
    id: "meta",
    name: "Meta",
    badge: "Meta",
    description: "Llama 3 70B, Llama 3 8B, and Llama 3.1 405B",
    models: [
      { id: "llama-3-70b", name: "Llama 3 70B", badge: "Open Source" },
      { id: "llama-3-8b", name: "Llama 3 8B" },
      { id: "llama-3-1-405b", name: "Llama 3.1 405B" },
    ],
  },
  {
    id: "mistral",
    name: "Mistral",
    badge: "Mistral",
    description: "Mistral Large, Mistral Medium, and Mixtral 8x7B",
    models: [
      { id: "mistral-large", name: "Mistral Large", badge: "Fast" },
      { id: "mistral-medium", name: "Mistral Medium" },
      { id: "mixtral-8x7b", name: "Mixtral 8x7B" },
    ],
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    badge: "DeepSeek",
    description: "DeepSeek-V3, DeepSeek-R1, DeepSeek Chat, and Coder models",
    models: [
      { id: "deepseek-v3", name: "DeepSeek-V3" },
      { id: "deepseek-r1", name: "DeepSeek-R1", badge: "Reasoning" },
      { id: "deepseek-chat", name: "DeepSeek Chat" },
      { id: "deepseek-coder", name: "DeepSeek Coder" },
    ],
  },
  {
    id: "ollama",
    name: "Ollama",
    badge: "Ollama",
    description: "Self-hosted local model runner instances",
    models: [
      { id: "ollama-qwen-25", name: "Ollama Qwen 2.5" },
      { id: "ollama-phi-3", name: "Ollama Phi-3" },
      { id: "ollama-deepseek-r1", name: "Ollama DeepSeek-R1" },
    ],
  },
  {
    id: "custom",
    name: "Custom Provider",
    badge: "Custom Provider",
    description: "Private internal LLM gateway deployments",
    models: [
      { id: "custom-gateway-v1", name: "Custom Enterprise Gateway LLM" },
      { id: "private-finetune-v1", name: "Private Fine-Tuned v1" },
    ],
  },
];

export interface AssignedModelsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  orgName: string;
  assignedModels: string[];
  modelSelectionType?: "all" | "selected";
  providerCatalog?: AIProviderGroupInfo[];
  isLoading?: boolean;
}

// Brand logo / badge color component for AI Providers
function ProviderLogo({ providerId, name }: { providerId: string; name: string }) {
  const pId = providerId.toLowerCase();
  
  if (pId.includes("openai") && !pId.includes("azure")) {
    return (
      <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold text-[10px] shrink-0">
        <Sparkles className="w-3.5 h-3.5" />
      </div>
    );
  }
  if (pId.includes("anthropic")) {
    return (
      <div className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center justify-center font-bold text-[10px] shrink-0">
        <span className="font-serif font-black text-xs">A</span>
      </div>
    );
  }
  if (pId.includes("google") || pId.includes("gemini")) {
    return (
      <div className="w-6 h-6 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 flex items-center justify-center font-bold text-[10px] shrink-0">
        <span className="font-sans font-bold text-xs">G</span>
      </div>
    );
  }
  if (pId.includes("azure")) {
    return (
      <div className="w-6 h-6 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 flex items-center justify-center font-bold text-[10px] shrink-0">
        <span className="font-mono font-bold text-[10px]">Az</span>
      </div>
    );
  }
  if (pId.includes("meta")) {
    return (
      <div className="w-6 h-6 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 flex items-center justify-center font-bold text-[10px] shrink-0">
        <Layers className="w-3.5 h-3.5" />
      </div>
    );
  }
  if (pId.includes("mistral")) {
    return (
      <div className="w-6 h-6 rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 flex items-center justify-center font-bold text-[10px] shrink-0">
        <span className="font-mono font-black text-xs">M</span>
      </div>
    );
  }
  if (pId.includes("deepseek")) {
    return (
      <div className="w-6 h-6 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 flex items-center justify-center font-bold text-[10px] shrink-0">
        <span className="font-mono font-bold text-[11px]">DS</span>
      </div>
    );
  }

  return (
    <div className="w-6 h-6 rounded-lg bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20 flex items-center justify-center font-bold text-[10px] shrink-0">
      <Cpu className="w-3.5 h-3.5" />
    </div>
  );
}

export function AssignedModelsDrawer({
  isOpen,
  onClose,
  orgName,
  assignedModels,
  modelSelectionType = "selected",
  providerCatalog = DEFAULT_AI_PROVIDERS,
  isLoading: initialLoading = false,
}: AssignedModelsDrawerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [internalLoading, setInternalLoading] = useState(false);

  // Dynamic fetch simulation on drawer open
  useEffect(() => {
    if (isOpen) {
      setSearchQuery("");
      setInternalLoading(true);
      const timer = setTimeout(() => {
        setInternalLoading(false);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [isOpen, assignedModels, orgName]);

  const isLoading = initialLoading || internalLoading;

  // Group models by AI Provider
  const groupedProviders = useMemo(() => {
    const isAllSelected = modelSelectionType === "all" || assignedModels.includes("All Models");

    if (isAllSelected) {
      // Return all providers and their models
      return providerCatalog.map((p) => ({
        ...p,
        assignedModels: p.models,
      }));
    }

    if (!assignedModels || assignedModels.length === 0) {
      return [];
    }

    const groupsMap = new Map<string, { provider: AIProviderGroupInfo; models: AIModelItemInfo[] }>();

    assignedModels.forEach((modelName) => {
      let foundProvider: AIProviderGroupInfo | undefined;
      let matchedModel: AIModelItemInfo | undefined;

      // Find matching provider and model item from catalog
      for (const provider of providerCatalog) {
        const m = provider.models.find(
          (mod) => mod.name.toLowerCase() === modelName.toLowerCase() || mod.id.toLowerCase() === modelName.toLowerCase()
        );
        if (m) {
          foundProvider = provider;
          matchedModel = m;
          break;
        }
      }

      // Fallback matching by provider name keywords
      if (!foundProvider) {
        const lower = modelName.toLowerCase();
        if (lower.startsWith("azure")) {
          foundProvider = providerCatalog.find((p) => p.id === "azure-openai");
        } else if (lower.includes("gpt") || lower.includes("codex") || lower.startsWith("o1") || lower.startsWith("o3") || lower.startsWith("o4")) {
          foundProvider = providerCatalog.find((p) => p.id === "openai");
        } else if (lower.includes("claude") || lower.includes("anthropic")) {
          foundProvider = providerCatalog.find((p) => p.id === "anthropic");
        } else if (lower.includes("gemini") || lower.includes("google")) {
          foundProvider = providerCatalog.find((p) => p.id === "google");
        } else if (lower.includes("llama") || lower.includes("meta")) {
          foundProvider = providerCatalog.find((p) => p.id === "meta");
        } else if (lower.includes("mistral") || lower.includes("mixtral")) {
          foundProvider = providerCatalog.find((p) => p.id === "mistral");
        } else if (lower.includes("deepseek")) {
          foundProvider = providerCatalog.find((p) => p.id === "deepseek");
        } else if (lower.includes("ollama") || lower.includes("qwen") || lower.includes("phi")) {
          foundProvider = providerCatalog.find((p) => p.id === "ollama");
        }
      }

      const providerToUse = foundProvider || {
        id: "other",
        name: "Other Providers",
        badge: "Other",
        description: "Custom & Uncategorized Models",
        models: [],
      };

      const modelItemToUse = matchedModel || {
        id: modelName.toLowerCase().replace(/\s+/g, "-"),
        name: modelName,
      };

      if (!groupsMap.has(providerToUse.id)) {
        groupsMap.set(providerToUse.id, {
          provider: providerToUse,
          models: [],
        });
      }

      const existing = groupsMap.get(providerToUse.id)!;
      if (!existing.models.some((m) => m.name.toLowerCase() === modelItemToUse.name.toLowerCase())) {
        existing.models.push(modelItemToUse);
      }
    });

    return Array.from(groupsMap.values()).map((g) => ({
      ...g.provider,
      assignedModels: g.models,
    }));
  }, [assignedModels, modelSelectionType, providerCatalog]);

  // Filter grouped providers by search query
  const filteredGroupedProviders = useMemo(() => {
    if (!searchQuery.trim()) return groupedProviders;
    const q = searchQuery.toLowerCase().trim();

    return groupedProviders
      .map((group) => {
        const providerMatches = group.name.toLowerCase().includes(q);
        const matchingModels = group.assignedModels.filter((m) => m.name.toLowerCase().includes(q) || (m.badge && m.badge.toLowerCase().includes(q)));

        if (providerMatches) {
          return group;
        }
        if (matchingModels.length > 0) {
          return {
            ...group,
            assignedModels: matchingModels,
          };
        }
        return null;
      })
      .filter((g): g is NonNullable<typeof g> => g !== null);
  }, [groupedProviders, searchQuery]);

  const totalAssignedCount = useMemo(() => {
    return groupedProviders.reduce((acc, g) => acc + g.assignedModels.length, 0);
  }, [groupedProviders]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-neutral-900/50 dark:bg-black/60 backdrop-blur-xs animate-fadeIn">
      {/* Backdrop overlay listener */}
      <div className="absolute inset-0" onClick={onClose} aria-label="Close Drawer Backdrop" />

      {/* Right Side Drawer Panel */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white dark:bg-neutral-900 w-full sm:w-[460px] md:w-[70%] lg:w-[460px] max-w-full h-full shadow-2xl flex flex-col justify-between z-10 border-l border-neutral-200 dark:border-neutral-800 animate-slideLeft"
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-neutral-200 dark:border-neutral-800 flex items-start justify-between bg-neutral-50/50 dark:bg-neutral-900/50">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base text-neutral-900 dark:text-white tracking-tight">
                Assigned Models
              </h3>
              {!isLoading && (
                <span className="px-2 py-0.5 rounded-full bg-primary-50 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 border border-primary-200/60 dark:border-primary-800/60 text-[11px] font-bold">
                  {totalAssignedCount}
                </span>
              )}
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 font-medium flex items-center gap-1.5">
              <span>{orgName}</span>
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            title="Close Drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Quick Search Bar */}
          {!isLoading && groupedProviders.length > 0 && (
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search models or providers..."
                className="w-full h-9 pl-9 pr-8 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-xs font-medium focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all placeholder:text-neutral-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          {/* Loading Skeleton State */}
          {isLoading ? (
            <div className="space-y-6 animate-pulse">
              {[1, 2, 3].map((idx) => (
                <div key={idx} className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-100 dark:border-neutral-800">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-neutral-200 dark:bg-neutral-800" />
                      <div className="w-24 h-4 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
                    </div>
                    <div className="w-10 h-3 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-8 bg-neutral-100 dark:bg-neutral-850 rounded-lg border border-neutral-200/50 dark:border-neutral-800" />
                    <div className="h-8 bg-neutral-100 dark:bg-neutral-850 rounded-lg border border-neutral-200/50 dark:border-neutral-800" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredGroupedProviders.length === 0 ? (
            /* Empty State */
            <div className="py-12 px-4 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mx-auto text-neutral-400 dark:text-neutral-500">
                <Cpu className="w-6 h-6 stroke-1.5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                  {searchQuery ? "No Matching Models Found" : "No models assigned to this organization."}
                </h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-xs mx-auto">
                  {searchQuery
                    ? `No assigned models match "${searchQuery}". Try clearing the search.`
                    : "No AI models have been assigned to this organization yet."}
                </p>
              </div>
            </div>
          ) : (
            /* Provider Sections & Models */
            <div className="space-y-6">
              {filteredGroupedProviders.map((group) => (
                <div key={group.id} className="space-y-3">
                  {/* Provider Section Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-100 dark:border-neutral-800">
                    <div className="flex items-center gap-2">
                      <ProviderLogo providerId={group.id} name={group.name} />
                      <span className="font-bold text-xs text-neutral-900 dark:text-white tracking-wide">
                        {group.name} <span className="text-neutral-400 font-normal">({group.assignedModels.length})</span>
                      </span>
                    </div>
                  </div>

                  {/* Model Items Grid/List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {group.assignedModels.map((model) => (
                      <div
                        key={model.id || model.name}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-neutral-50/70 dark:bg-neutral-800/50 border border-neutral-200/60 dark:border-neutral-800 hover:border-primary-500/40 dark:hover:border-primary-500/40 transition-all group"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                          <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 truncate group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                            {model.name}
                          </span>
                        </div>
                        {model.badge && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 flex-shrink-0">
                            {model.badge}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center gap-1.5 text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Active in Gateway</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-lg font-semibold text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
