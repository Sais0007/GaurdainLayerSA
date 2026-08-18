// src/app/components/Playground.tsx
import React, { useState, useRef, useEffect } from "react";
import {
  Key,
  Cpu,
  Trash2,
  Code2,
  Paperclip,
  ArrowUp,
  Bot,
  Zap,
  Copy,
  Check,
  RefreshCw,
  User,
  Sparkles,
  X,
  SlidersHorizontal,
} from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "./hb/listing";

export interface VirtualKeyItem {
  id: string;
  name: string;
  key: string;
}

export interface ModelItem {
  id: string;
  name: string;
  provider: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  telemetry?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
    latencyMs: number;
    costUsd: number;
  };
}

const VIRTUAL_KEYS: VirtualKeyItem[] = [
  { id: "vk-crm", name: "CRM KEY (Sales Integration) (Sales Team)", key: "sk-vk-crm892341..." },
  { id: "vk-support", name: "Support Prod Key (Support Team)", key: "sk-vk-sup103982..." },
  { id: "vk-marketing", name: "Marketing Analytics Key (Marketing)", key: "sk-vk-mkt551029..." },
  { id: "vk-dev", name: "Developer Sandbox Key (Dev Team)", key: "sk-vk-dev992140..." },
];

const MODELS: ModelItem[] = [
  { id: "gpt-4o-mini", name: "GPT-4o Mini (OpenAI)", provider: "OpenAI" },
  { id: "gpt-4o", name: "GPT-4o (OpenAI)", provider: "OpenAI" },
  { id: "claude-3-5-sonnet", name: "Claude 3.5 Sonnet (Anthropic)", provider: "Anthropic" },
  { id: "claude-3-5-haiku", name: "Claude 3.5 Haiku (Anthropic)", provider: "Anthropic" },
  { id: "gemini-1-5-pro", name: "Gemini 1.5 Pro (Google)", provider: "Google" },
  { id: "deepseek-v3", name: "DeepSeek V3 (DeepSeek)", provider: "DeepSeek" },
];

const SUGGESTED_PROMPTS = [
  { id: "poem", text: "Write a poem" },
  { id: "summarize", text: "Summarize this text" },
  { id: "quantum", text: "Explain quantum computing" },
  { id: "sql", text: "Generate SQL query" },
  { id: "email", text: "Draft an email" },
];

export default function Playground() {
  const [selectedKeyId, setSelectedKeyId] = useState<string>("vk-crm");
  const [selectedModelId, setSelectedModelId] = useState<string>("gpt-4o-mini");
  const [inputPrompt, setInputPrompt] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState<boolean>(false);
  const [codeLang, setCodeLang] = useState<"python" | "curl" | "javascript" | "http">("python");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isGenerating]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputPrompt).trim();
    if (!text || isGenerating) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputPrompt("");
    setIsGenerating(true);

    // Simulate AI response stream
    setTimeout(() => {
      const selectedModelObj = MODELS.find((m) => m.id === selectedModelId);
      const modelName = selectedModelObj ? selectedModelObj.name : selectedModelId;

      let replyContent = "";
      if (text.toLowerCase().includes("poem")) {
        replyContent = `In silicon realms where algorithms glide,\nData flows like a silver tide.\nWith Guardian Layer guarding every gateway call,\nModels excel and answers enthrall.`;
      } else if (text.toLowerCase().includes("sql")) {
        replyContent = `SELECT u.id, u.name, COUNT(o.id) AS total_orders, SUM(o.amount) AS total_spent\nFROM users u\nJOIN orders o ON u.id = o.user_id\nWHERE o.created_at >= NOW() - INTERVAL '30 days'\nGROUP BY u.id, u.name\nORDER BY total_spent DESC\nLIMIT 10;`;
      } else if (text.toLowerCase().includes("quantum")) {
        replyContent = `Quantum computing leverages principles of quantum mechanics—such as superposition and entanglement—to process complex information exponentially faster than classical computers for specific problem sets.`;
      } else {
        replyContent = `This is a live response completion from **${modelName}** routed via Guardian Layer AI Gateway.\n\nYour prompt: "${text}" has been authenticated and processed with zero latency overhead.`;
      }

      const promptTokens = Math.floor(text.length / 3.5) + 25;
      const completionTokens = Math.floor(replyContent.length / 3.5);
      const totalTokens = promptTokens + completionTokens;

      const assistantMsg: ChatMessage = {
        id: `ast-${Date.now() + 1}`,
        role: "assistant",
        content: replyContent,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        telemetry: {
          promptTokens,
          completionTokens,
          totalTokens,
          latencyMs: Math.floor(Math.random() * 180) + 140,
          costUsd: totalTokens * 0.000004,
        },
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsGenerating(false);
    }, 900);
  };

  const handleClearChat = () => {
    setMessages([]);
    toast.info("Playground chat cleared");
  };

  const handleCopyMessage = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedMsgId(id);
    toast.success("Message copied to clipboard");
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  const handleAttachment = () => {
    toast.info("Attachment uploaded (Simulation)");
  };

  const getCodeSnippet = () => {
    const keyObj = VIRTUAL_KEYS.find((k) => k.id === selectedKeyId);
    const keyVal = keyObj ? keyObj.key : "sk-vk-crm892341...";
    const modelVal = selectedModelId;

    switch (codeLang) {
      case "python":
        return `from openai import OpenAI

client = OpenAI(
    base_url="https://gateway.guardianlayer.io/v1",
    api_key="${keyVal}"
)

response = client.chat.completions.create(
    model="${modelVal}",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Hello!"}
    ]
)

print(response.choices[0].message.content)`;

      case "curl":
        return `curl https://gateway.guardianlayer.io/v1/chat/completions \\
  -H "Authorization: Bearer ${keyVal}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "${modelVal}",
    "messages": [
      {"role": "user", "content": "Hello!"}
    ]
  }'`;

      case "javascript":
        return `import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'https://gateway.guardianlayer.io/v1',
  apiKey: '${keyVal}',
});

async function main() {
  const completion = await openai.chat.completions.create({
    model: '${modelVal}',
    messages: [{ role: 'user', content: 'Hello!' }],
  });

  console.log(completion.choices[0].message.content);
}

main();`;

      case "http":
        return `POST /v1/chat/completions HTTP/1.1
Host: gateway.guardianlayer.io
Authorization: Bearer ${keyVal}
Content-Type: application/json

{
  "model": "${modelVal}",
  "messages": [
    { "role": "user", "content": "Hello!" }
  ]
}`;
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(getCodeSnippet());
    setCopiedCode(true);
    toast.success("Code copied");
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="p-6 space-y-4 animate-fadeIn max-w-[1600px] mx-auto">
      {/* Top Bar / Controls Header matching reference image exactly */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 rounded-2xl p-3.5 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        {/* Left Controls: Virtual Key & Model */}
        <div className="flex flex-wrap items-center gap-5 text-xs">
          {/* Virtual Key Selection */}
          <div className="flex items-center gap-1.5">
            <span className="p-1 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-500 border border-amber-200/60 dark:border-amber-800/60">
              <Key className="w-3.5 h-3.5" />
            </span>
            <span className="font-semibold text-neutral-800 dark:text-neutral-200">
              Virtual Key <span className="text-rose-500 font-bold">*</span>
            </span>
            <div className="relative ml-1">
              <select
                value={selectedKeyId}
                onChange={(e) => setSelectedKeyId(e.target.value)}
                className="h-9 pl-3 pr-8 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs font-medium text-neutral-900 dark:text-white appearance-none cursor-pointer focus:outline-none focus:border-amber-500 shadow-2xs max-w-[260px] truncate"
              >
                {VIRTUAL_KEYS.map((k) => (
                  <option key={k.id} value={k.id}>
                    ▼ {k.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Model Selection */}
          <div className="flex items-center gap-1.5">
            <span className="p-1 rounded-md bg-sky-50 dark:bg-sky-950/60 text-sky-500 border border-sky-200/60 dark:border-sky-800/60">
              <Cpu className="w-3.5 h-3.5" />
            </span>
            <span className="font-semibold text-neutral-800 dark:text-neutral-200">
              Model <span className="text-rose-500 font-bold">*</span>
            </span>
            <div className="relative ml-1">
              <select
                value={selectedModelId}
                onChange={(e) => setSelectedModelId(e.target.value)}
                className="h-9 pl-3 pr-8 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs font-medium text-neutral-900 dark:text-white appearance-none cursor-pointer focus:outline-none focus:border-sky-500 shadow-2xs max-w-[240px] truncate"
              >
                {MODELS.map((m) => (
                  <option key={m.id} value={m.id}>
                    ▼ {m.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleClearChat}
            className="h-9 px-3.5 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/50 text-rose-600 dark:text-rose-400 border border-rose-200/70 dark:border-rose-800/60 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Chat</span>
          </button>

          <button
            type="button"
            onClick={() => setIsCodeModalOpen(true)}
            className="h-9 px-4 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
          >
            <Code2 className="w-3.5 h-3.5 text-neutral-500" />
            <span>Get Code</span>
          </button>
        </div>
      </div>

      {/* Main Chat Canvas Box matching reference image */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 rounded-3xl p-6 shadow-xs flex flex-col justify-between min-h-[calc(100vh-210px)] relative">
        {/* Messages / Canvas Container */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-2 mb-4">
          {messages.length === 0 ? (
            /* EMPTY INITIAL STATE (Exact match to reference screenshot) */
            <div className="h-full min-h-[460px] flex flex-col items-center justify-center text-center p-8 space-y-6">
              {/* Bot Icon Badge in yellow/orange */}
              <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/70 border border-amber-200 dark:border-amber-800/80 text-amber-500 flex items-center justify-center shadow-xs">
                <Bot className="w-7 h-7" />
              </div>

              {/* Title & Subtitle */}
              <div className="max-w-md space-y-2">
                <h2 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight">
                  Start testing your AI models
                </h2>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  Select a Virtual Key and Model to begin testing prompt completions in real-time.
                </p>
              </div>

              {/* Suggested Prompts Section */}
              <div className="space-y-3 pt-2">
                <div className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                  SUGGESTED PROMPTS
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-xl">
                  {SUGGESTED_PROMPTS.map((prompt) => (
                    <button
                      key={prompt.id}
                      onClick={() => handleSendMessage(prompt.text)}
                      className="px-4 py-2 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 rounded-full text-xs font-medium transition-all shadow-2xs hover:shadow-xs flex items-center gap-1.5 cursor-pointer group"
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20 group-hover:scale-110 transition-transform" />
                      <span>{prompt.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* ACTIVE CONVERSATION MESSAGES */
            messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${
                  m.role === "user" ? "items-end" : "items-start"
                } space-y-1.5`}
              >
                <div className="flex items-center gap-2 text-[11px] text-neutral-400 font-semibold px-1">
                  <span>{m.role === "user" ? "You" : "AI Model"}</span>
                  <span>&bull;</span>
                  <span>{m.timestamp}</span>
                </div>

                <div
                  className={`max-w-[80%] p-4 rounded-2xl text-xs leading-relaxed ${
                    m.role === "user"
                      ? "bg-amber-500 text-white rounded-tr-none font-medium shadow-2xs"
                      : "bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-tl-none border border-neutral-200/80 dark:border-neutral-700/80 whitespace-pre-wrap shadow-2xs relative group"
                  }`}
                >
                  {m.content}

                  {m.role === "assistant" && (
                    <button
                      onClick={() => handleCopyMessage(m.id, m.content)}
                      className="absolute top-2 right-2 p-1 text-neutral-400 hover:text-neutral-700 dark:hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {copiedMsgId === m.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                </div>

                {/* Telemetry info for assistant response */}
                {m.telemetry && (
                  <div className="flex items-center gap-3 text-[10px] font-mono text-neutral-400 px-1">
                    <span>Tokens: {m.telemetry.totalTokens}</span>
                    <span>Latency: {m.telemetry.latencyMs}ms</span>
                    <span>Cost: ${m.telemetry.costUsd.toFixed(5)}</span>
                  </div>
                )}
              </div>
            ))
          )}

          {isGenerating && (
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 dark:text-amber-400 animate-pulse p-2">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Generating response from AI model...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Bottom Input Area matching reference screenshot */}
        <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 space-y-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-3 bg-neutral-50/80 dark:bg-neutral-800/60 border border-neutral-200/90 dark:border-neutral-700/80 rounded-2xl px-4 py-2 shadow-2xs focus-within:border-amber-500 transition-colors"
          >
            {/* File Attachment Paperclip Icon */}
            <button
              type="button"
              onClick={handleAttachment}
              className="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors cursor-pointer shrink-0"
              title="Attach file"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            {/* Input Text Area / Input */}
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder="Ask your model anything... (Shift + Enter for new line)"
              className="flex-1 bg-transparent text-xs text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none"
            />

            {/* Orange Circle Send Button with Up Arrow */}
            <button
              type="submit"
              disabled={isGenerating || !inputPrompt.trim()}
              className="w-8 h-8 rounded-full bg-amber-400 hover:bg-amber-500 disabled:bg-neutral-200 dark:disabled:bg-neutral-700 text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer disabled:cursor-not-allowed shadow-2xs"
            >
              <ArrowUp className="w-4 h-4 stroke-[3]" />
            </button>
          </form>

          {/* Subtext below input matching reference screenshot */}
          <div className="text-center text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
            Enter to send &bull; Shift + Enter for newline
          </div>
        </div>
      </div>

      {/* Get Code Modal */}
      {isCodeModalOpen && (
        <div
          onClick={() => setIsCodeModalOpen(false)}
          className="fixed inset-0 bg-neutral-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl w-full max-w-2xl shadow-2xl p-6 space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
              <div className="flex items-center gap-2 font-bold text-base text-neutral-900 dark:text-white">
                <Code2 className="w-5 h-5 text-amber-500" />
                <span>Export Session Code</span>
              </div>
              <button
                onClick={() => setIsCodeModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-neutral-600 dark:hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Language Selector Tabs */}
            <div className="flex items-center gap-2 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
              {(
                [
                  { id: "python", label: "Python" },
                  { id: "curl", label: "cURL" },
                  { id: "javascript", label: "Node.js" },
                  { id: "http", label: "HTTP Raw" },
                ] as const
              ).map((lang) => (
                <button
                  key={lang.id}
                  type="button"
                  onClick={() => setCodeLang(lang.id)}
                  className={`flex-1 py-1.5 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                    codeLang === lang.id
                      ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-2xs"
                      : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {/* Code Box */}
            <div className="relative bg-neutral-950 text-neutral-100 p-4 rounded-2xl font-mono text-[11px] leading-relaxed overflow-x-auto max-h-80 border border-neutral-800">
              <pre>{getCodeSnippet()}</pre>
              <button
                type="button"
                onClick={handleCopyCode}
                className="absolute top-3 right-3 px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors flex items-center gap-1 text-[11px] font-semibold cursor-pointer"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? "Copied" : "Copy"}</span>
              </button>
            </div>

            <div className="pt-2 text-right">
              <button
                type="button"
                onClick={() => setIsCodeModalOpen(false)}
                className="px-5 py-2 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
