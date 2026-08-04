import React, { useState, useRef, useEffect } from "react";
import {
  DollarSign,
  Zap,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Sparkles,
  Calendar,
  RefreshCw,
  Download,
  Building2,
  Users,
  Key,
  Cpu,
  PieChart,
  Search,
  Activity,
  X,
  AlertCircle,
  ChevronDown
} from "lucide-react";
import { toast } from "sonner";

export interface OrgAnalyticsDashboardProps {
  orgName?: string;
  orgId?: string;
  currentSpend?: number;
  initialState?: "normal" | "loading" | "empty" | "error";
  onRefresh?: () => void;
  onExport?: () => void;
}

// 1. REUSABLE EXPANDABLE SEARCH COMPONENT
export function ExpandableSearch({
  value,
  onChange,
  placeholder = "Search...",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const handleBlur = () => {
    if (!value.trim()) {
      setIsExpanded(false);
    }
  };

  return (
    <div className="relative flex items-center">
      {isExpanded ? (
        <div className="relative animate-fadeIn">
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={handleBlur}
            placeholder={placeholder}
            className="h-8 pl-8 pr-7 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs font-medium w-48 sm:w-56 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-all shadow-2xs"
          />
          {value && (
            <button
              type="button"
              onClick={() => {
                onChange("");
                inputRef.current?.focus();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsExpanded(true)}
          className="w-8 h-8 rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700 flex items-center justify-center text-neutral-500 transition-colors shadow-2xs"
          title="Search..."
        >
          <Search className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}

// 2. REUSABLE WIDGET HEADER COMPONENT
export function AnalyticsWidgetHeader({
  title,
  subtitle,
  icon: Icon,
  iconColor = "text-purple-600",
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search...",
  viewMode,
  onViewModeChange,
}: {
  title: string;
  subtitle: string;
  icon: any;
  iconColor?: string;
  searchValue?: string;
  onSearchChange?: (val: string) => void;
  searchPlaceholder?: string;
  viewMode: "table" | "chart";
  onViewModeChange: (mode: "table" | "chart") => void;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-100 dark:border-neutral-800">
      <div>
        <h3 className="font-bold text-sm text-neutral-900 dark:text-white flex items-center gap-2">
          <Icon className={`w-4 h-4 ${iconColor}`} />
          <span>{title}</span>
        </h3>
        <p className="text-[11px] text-neutral-500 mt-0.5">{subtitle}</p>
      </div>

      <div className="flex items-center gap-2.5 self-end sm:self-center">
        {onSearchChange !== undefined && (
          <ExpandableSearch
            value={searchValue || ""}
            onChange={onSearchChange}
            placeholder={searchPlaceholder}
          />
        )}

        <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 p-0.5 rounded-lg border border-neutral-200/60 dark:border-neutral-700/60">
          <button
            type="button"
            onClick={() => onViewModeChange("table")}
            className={`px-2.5 py-1 rounded text-[10px] font-semibold transition-all ${
              viewMode === "table"
                ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-2xs font-bold"
                : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
            }`}
          >
            Table View
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange("chart")}
            className={`px-2.5 py-1 rounded text-[10px] font-semibold transition-all ${
              viewMode === "chart"
                ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-2xs font-bold"
                : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
            }`}
          >
            Chart View
          </button>
        </div>
      </div>
    </div>
  );
}

// 3. REUSABLE KPI CARD COMPONENT
export function KpiCard({
  title,
  value,
  trend,
  isPositive = true,
  subtext,
  icon: Icon,
  iconBg = "bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400",
}: {
  title: string;
  value: string;
  trend: string;
  isPositive?: boolean;
  subtext: string;
  icon: any;
  iconBg?: string;
}) {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-neutral-600 dark:text-neutral-300 tracking-tight">
          {title}
        </span>
        <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${iconBg}`}>
          <Icon className="w-3.5 h-3.5" />
        </span>
      </div>

      <div className="flex items-baseline justify-between pt-0.5">
        <div className="text-2xl font-bold text-neutral-900 dark:text-white font-mono tracking-tight">
          {value}
        </div>
      </div>

      <div className="flex items-center justify-between pt-1 border-t border-neutral-100 dark:border-neutral-800/60">
        <span
          className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${
            isPositive
              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/60"
              : "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200/60"
          }`}
        >
          {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {trend} <span className="font-normal text-neutral-400">vs prev period</span>
        </span>

        <svg className={`w-12 h-5 fill-none stroke-current stroke-2 ${isPositive ? "text-emerald-500" : "text-rose-500"}`} viewBox="0 0 50 20">
          <path d={isPositive ? "M0 16 Q18 14, 32 8 T50 3" : "M0 4 Q15 2, 30 14 T50 18"} />
        </svg>
      </div>

      <p className="text-[10px] text-neutral-400 font-medium truncate" title={subtext}>
        {subtext}
      </p>
    </div>
  );
}

// Helper to generate smooth Cardinal Spline path passing 100% through all points
function generateCardinalSplinePath(pts: { x: number; y: number }[], tension = 0.25): string {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = i > 0 ? pts[i - 1] : pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = i < pts.length - 2 ? pts[i + 2] : p2;

    const cp1x = p1.x + (p2.x - p0.x) * tension;
    const cp1y = p1.y + (p2.y - p0.y) * tension;
    const cp2x = p2.x - (p3.x - p1.x) * tension;
    const cp2y = p2.y - (p3.y - p1.y) * tension;

    d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x} ${p2.y}`;
  }
  return d;
}

// 4. REUSABLE INTERACTIVE DAILY SPEND TREND CHART COMPONENT
export function DailySpendTrendChart({ totalSpend, timeRange }: { totalSpend: number; timeRange: string }) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(6); // Default hover on Aug 02 (index 6) to match reference screenshot

  // Exact 8 data points mapped to SVG space (700 width, 180 height)
  const points = [
    { date: "Jul 27", spend: 31.20, requests: "22,400", successful: "22,180", failed: 220, tokens: "4.1M", x: 35, y: 116.3 },
    { date: "Jul 28", spend: 41.50, requests: "29,800", successful: "29,500", failed: 300, tokens: "5.4M", x: 125, y: 101.9 },
    { date: "Jul 29", spend: 38.00, requests: "27,100", successful: "26,850", failed: 250, tokens: "4.8M", x: 215, y: 106.8 },
    { date: "Jul 30", spend: 55.40, requests: "38,900", successful: "38,500", failed: 400, tokens: "6.9M", x: 305, y: 82.4 },
    { date: "Jul 31", spend: 62.10, requests: "43,500", successful: "43,000", failed: 500, tokens: "7.8M", x: 395, y: 73.1 },
    { date: "Aug 01", spend: 52.80, requests: "36,200", successful: "35,800", failed: 400, tokens: "6.5M", x: 485, y: 86.1 },
    { date: "Aug 02", spend: 71.30, requests: "49,800", successful: "49,200", failed: 600, tokens: "8.9M", x: 575, y: 60.2 },
    { date: "Aug 03", spend: 84.50, requests: "58,200", successful: "57,500", failed: 700, tokens: "10.4M", x: 665, y: 41.7 },
  ];

  const linePath = generateCardinalSplinePath(points);
  const areaPath = `${linePath} L ${points[points.length - 1].x} 160 L ${points[0].x} 160 Z`;
  const activePoint = hoverIndex !== null ? points[hoverIndex] : null;

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 shadow-2xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
        <div>
          <h3 className="font-bold text-sm text-neutral-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>Daily Spend Trend</span>
          </h3>
          <p className="text-[11px] text-neutral-500 mt-0.5">
            Daily organization USD spending trajectory and Gateway call metrics
          </p>
        </div>
        <span className="text-[11px] font-mono text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-200/50">
          ${totalSpend.toFixed(2)} Total ({timeRange.toUpperCase()})
        </span>
      </div>

      {/* Main Chart Grid & SVG Area */}
      <div className="relative pt-2">
        <div className="flex gap-3">
          {/* Y-Axis Labels */}
          <div className="w-10 flex flex-col justify-between text-[11px] font-medium text-neutral-400 select-none h-48 pb-5">
            <span>$100</span>
            <span>$75</span>
            <span>$50</span>
            <span>$25</span>
            <span>$0</span>
          </div>

          {/* SVG Canvas & Hover Area */}
          <div className="flex-1 relative h-48">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 700 180" preserveAspectRatio="none">
              <defs>
                <linearGradient id="spendGradientArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0284c7" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#0284c7" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal Grid Lines */}
              <line x1="0" y1="20" x2="700" y2="20" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="0" y1="55" x2="700" y2="55" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="0" y1="90" x2="700" y2="90" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="0" y1="125" x2="700" y2="125" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="0" y1="160" x2="700" y2="160" stroke="#e2e8f0" strokeWidth="1" />

              {/* Area Path & Smooth Line */}
              <path d={areaPath} fill="url(#spendGradientArea)" />
              <path d={linePath} fill="none" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

              {/* Vertical Guideline line on hover */}
              {activePoint && (
                <line
                  x1={activePoint.x}
                  y1={20}
                  x2={activePoint.x}
                  y2={160}
                  stroke="#cbd5e1"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />
              )}

              {/* Point Circles (Sitting 100% ON TOP of the blue line) */}
              {points.map((pt, idx) => (
                <circle
                  key={pt.date}
                  cx={pt.x}
                  cy={pt.y}
                  r={hoverIndex === idx ? 6 : 4}
                  fill={hoverIndex === idx ? "#0284c7" : "#ffffff"}
                  stroke="#0284c7"
                  strokeWidth={hoverIndex === idx ? 3 : 2.5}
                  className="transition-all duration-150 cursor-pointer"
                />
              ))}
            </svg>

            {/* Floating Tooltip Box */}
            {activePoint && (
              <div
                className="absolute z-20 transition-all duration-200 pointer-events-none"
                style={{
                  left: hoverIndex! >= 5 ? `calc(${((activePoint.x - 35) / 630) * 100}% - 220px)` : `calc(${((activePoint.x - 35) / 630) * 100}% + 15px)`,
                  top: `10px`,
                }}
              >
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-3.5 shadow-xl w-52 text-xs space-y-2">
                  <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-2">
                    <span className="font-bold text-neutral-900 dark:text-white text-sm">{activePoint.date}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200/60">
                      Cost Breakdown
                    </span>
                  </div>

                  <div className="space-y-1.5 pt-0.5">
                    <div className="flex justify-between items-center text-neutral-500">
                      <span>Total Spend:</span>
                      <span className="font-bold text-neutral-900 dark:text-white font-mono">${activePoint.spend.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-neutral-500">
                      <span>Total Requests:</span>
                      <span className="font-bold text-neutral-700 dark:text-neutral-300 font-mono">{activePoint.requests}</span>
                    </div>
                    <div className="flex justify-between items-center text-neutral-500">
                      <span>Successful:</span>
                      <span className="font-bold text-emerald-600 font-mono">{activePoint.successful}</span>
                    </div>
                    <div className="flex justify-between items-center text-neutral-500">
                      <span>Failed:</span>
                      <span className="font-bold text-rose-500 font-mono">{activePoint.failed}</span>
                    </div>
                    <div className="flex justify-between items-center text-neutral-500">
                      <span>Tokens:</span>
                      <span className="font-bold text-purple-600 font-mono">{activePoint.tokens}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Hover Trigger Overlay Columns */}
            <div className="absolute inset-0 flex justify-between">
              {points.map((pt, idx) => (
                <div
                  key={pt.date}
                  onMouseEnter={() => setHoverIndex(idx)}
                  className="flex-1 h-full cursor-pointer"
                />
              ))}
            </div>
          </div>
        </div>

        {/* X-Axis Date Labels (Mapped to exact X percentages) */}
        <div className="relative w-full h-6 text-[11px] font-semibold text-neutral-400 mt-2 ml-13">
          {points.map((pt, idx) => (
            <span
              key={pt.date}
              style={{ left: `calc(${((pt.x - 35) / 630) * 90}% + 20px)` }}
              className={`absolute -translate-x-1/2 transition-colors ${hoverIndex === idx ? "text-primary-600 dark:text-primary-400 font-bold" : ""}`}
            >
              {pt.date}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// 5. REUSABLE MODEL ACTIVITY DASHBOARD COMPONENT (1:1 CLONE OF ORGANIZATION ADMIN)

// 5. REUSABLE MODEL ACTIVITY DASHBOARD COMPONENT (1:1 CLONE OF ORGANIZATION ADMIN)

// A. TOTAL TOKENS OVER TIME (LARGE CHART - MATCHING SCREENSHOT 2)
export function TotalTokensOverTimeChart() {
  const [hoverIdx, setHoverIdx] = useState<number | null>(1); // Default Jul 28 to match screenshot 2

  const pointsInput = [
    { date: "Jul 27", input: "1.8M", output: "2.4M", total: "4.2M", x: 30, y: 135 },
    { date: "Jul 28", input: "2.2", output: "3", total: "5.2", x: 107, y: 125 },
    { date: "Jul 29", input: "1.9M", output: "2.6M", total: "4.5M", x: 184, y: 130 },
    { date: "Jul 30", input: "2.8M", output: "3.5M", total: "6.3M", x: 261, y: 110 },
    { date: "Jul 31", input: "3.2M", output: "3.8M", total: "7.0M", x: 338, y: 100 },
    { date: "Aug 01", input: "2.4M", output: "3.1M", total: "5.5M", x: 415, y: 115 },
    { date: "Aug 02", input: "3.9M", output: "4.6M", total: "8.5M", x: 492, y: 85 },
    { date: "Aug 03", input: "4.5M", output: "5.3M", total: "9.8M", x: 570, y: 70 },
  ];

  const pointsOutput = [
    { x: 30, y: 120 },
    { x: 107, y: 110 },
    { x: 184, y: 115 },
    { x: 261, y: 95 },
    { x: 338, y: 85 },
    { x: 415, y: 100 },
    { x: 492, y: 65 },
    { x: 570, y: 50 },
  ];

  const pointsTotal = [
    { x: 30, y: 110 },
    { x: 107, y: 95 },
    { x: 184, y: 105 },
    { x: 261, y: 80 },
    { x: 338, y: 70 },
    { x: 415, y: 90 },
    { x: 492, y: 50 },
    { x: 570, y: 35 },
  ];

  const pathTotal = generateCardinalSplinePath(pointsTotal);
  const pathOutput = generateCardinalSplinePath(pointsOutput);
  const pathInput = generateCardinalSplinePath(pointsInput);

  const areaTotal = `${pathTotal} L 570 155 L 30 155 Z`;
  const areaInput = `${pathInput} L 570 155 L 30 155 Z`;

  const activePt = hoverIdx !== null ? pointsInput[hoverIdx] : null;

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 shadow-2xs space-y-3">
      <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
        <div>
          <h3 className="font-bold text-sm text-neutral-900 dark:text-white flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-purple-50 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center">
              <Cpu className="w-3.5 h-3.5" />
            </span>
            <span>Total Tokens Over Time</span>
          </h3>
          <p className="text-[11px] text-neutral-500 mt-0.5">Input vs Output Token distribution across all models</p>
        </div>
      </div>

      <div className="relative pt-2">
        <div className="flex gap-3">
          {/* Y-Axis */}
          <div className="w-9 flex flex-col justify-between text-[11px] font-medium text-neutral-400 select-none h-44 pb-5">
            <span>12M</span>
            <span>9M</span>
            <span>6M</span>
            <span>3M</span>
            <span>0M</span>
          </div>

          {/* SVG Grid Canvas */}
          <div className="flex-1 relative h-44">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 600 160" preserveAspectRatio="none">
              <defs>
                <linearGradient id="tokGradTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="tokGradInput" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0284c7" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#0284c7" stopOpacity="0.05" />
                </linearGradient>
              </defs>

              {/* Dashed Grid Lines */}
              <line x1="0" y1="15" x2="600" y2="15" stroke="#f1f5f9" strokeDasharray="3 3" />
              <line x1="0" y1="50" x2="600" y2="50" stroke="#f1f5f9" strokeDasharray="3 3" />
              <line x1="0" y1="85" x2="600" y2="85" stroke="#f1f5f9" strokeDasharray="3 3" />
              <line x1="0" y1="120" x2="600" y2="120" stroke="#f1f5f9" strokeDasharray="3 3" />
              <line x1="0" y1="155" x2="600" y2="155" stroke="#e2e8f0" />

              {/* Dynamic Spline Area Paths */}
              <path d={areaTotal} fill="url(#tokGradTotal)" />
              <path d={areaInput} fill="url(#tokGradInput)" />

              {/* Dynamic Spline Curves */}
              <path d={pathTotal} fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d={pathOutput} fill="none" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d={pathInput} fill="none" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

              {/* Vertical Guideline on hover (Aligned 100% exactly with pt.x) */}
              {activePt && (
                <line
                  x1={activePt.x}
                  y1={15}
                  x2={activePt.x}
                  y2={155}
                  stroke="#cbd5e1"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />
              )}

              {/* Dots on Hover (Centered 100% exactly on guideline and curve) */}
              {hoverIdx !== null && (
                <>
                  <circle cx={pointsInput[hoverIdx].x} cy={pointsInput[hoverIdx].y} r={4} fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
                  <circle cx={pointsOutput[hoverIdx].x} cy={pointsOutput[hoverIdx].y} r={4} fill="#8b5cf6" stroke="#ffffff" strokeWidth="2" />
                  <circle cx={pointsTotal[hoverIdx].x} cy={pointsTotal[hoverIdx].y} r={4} fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
                </>
              )}
            </svg>

            {/* Exact Hover Tooltip (Matching Screenshot 2) */}
            {activePt && (
              <div
                className="absolute z-20 transition-all duration-200 pointer-events-none"
                style={{
                  left: hoverIdx! >= 5 ? `calc(${(activePt.x / 600) * 100}% - 180px)` : `calc(${(activePt.x / 600) * 100}% + 15px)`,
                  top: "10px",
                }}
              >
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-3 shadow-xl w-44 text-xs space-y-1.5 font-medium">
                  <div className="font-bold text-neutral-900 dark:text-white pb-1 border-b border-neutral-100 dark:border-neutral-800">
                    {activePt.date}
                  </div>
                  <div className="text-[#0284c7] font-semibold">Input Tokens : {activePt.input}</div>
                  <div className="text-[#8b5cf6] font-semibold">Output Tokens : {activePt.output}</div>
                  <div className="text-[#3b82f6] font-bold">Total Tokens : {activePt.total}</div>
                </div>
              </div>
            )}

            {/* Hover Trigger Overlay */}
            <div className="absolute inset-0 flex justify-between">
              {pointsInput.map((_, idx) => (
                <div key={idx} onMouseEnter={() => setHoverIdx(idx)} className="flex-1 h-full cursor-pointer" />
              ))}
            </div>
          </div>
        </div>

        {/* X-Axis Date Labels */}
        <div className="flex justify-between text-[11px] font-semibold text-neutral-400 pl-12 pr-2 pt-1">
          {pointsInput.map((pt, idx) => (
            <span key={pt.date} className={hoverIdx === idx ? "text-primary-600 font-bold" : ""}>
              {pt.date}
            </span>
          ))}
        </div>

        {/* Legend (Matching Screenshot 2) */}
        <div className="flex items-center justify-center gap-6 text-[11px] font-semibold pt-2">
          <span className="flex items-center gap-1.5 text-[#0284c7]">
            <span className="w-2.5 h-0.5 bg-[#0284c7] rounded" /> Input Tokens
          </span>
          <span className="flex items-center gap-1.5 text-[#8b5cf6]">
            <span className="w-2.5 h-0.5 bg-[#8b5cf6] rounded" /> Output Tokens
          </span>
          <span className="flex items-center gap-1.5 text-[#3b82f6]">
            <span className="w-2.5 h-0.5 bg-[#3b82f6] rounded" /> Total Tokens
          </span>
        </div>
      </div>
    </div>
  );
}

// B. TOTAL REQUESTS OVER TIME (LARGE CHART - MATCHING SCREENSHOT media_1785769537974.png)
export function TotalRequestsOverTimeChart() {
  const [hoverIdx, setHoverIdx] = useState<number | null>(3); // Default Jul 30 hover to match screenshot

  const pointsSucc = [
    { date: "Jul 27", success: "22180", failed: "220", x: 30, y: 110 },
    { date: "Jul 28", success: "29500", failed: "300", x: 107, y: 90 },
    { date: "Jul 29", success: "26850", failed: "250", x: 184, y: 100 },
    { date: "Jul 30", success: "38500", failed: "400", x: 261, y: 65 },
    { date: "Jul 31", success: "43000", failed: "500", x: 338, y: 50 },
    { date: "Aug 01", success: "35800", failed: "400", x: 415, y: 75 },
    { date: "Aug 02", success: "49200", failed: "600", x: 492, y: 35 },
    { date: "Aug 03", success: "57500", failed: "700", x: 570, y: 20 },
  ];

  const pathSucc = generateCardinalSplinePath(pointsSucc);
  const areaSucc = `${pathSucc} L 570 155 L 30 155 Z`;

  const activePt = hoverIdx !== null ? pointsSucc[hoverIdx] : null;

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 shadow-2xs space-y-3">
      <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
        <div>
          <h3 className="font-bold text-sm text-neutral-900 dark:text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-600" />
            <span>Total Requests Over Time</span>
          </h3>
          <p className="text-[11px] text-neutral-500 mt-0.5">Successful (HB Green) vs Failed (HB Red) API executions</p>
        </div>
      </div>
      <div className="relative pt-2">
        <div className="flex gap-3">
          {/* Y-Axis (Matching Screenshot media_1785769537974.png: 60000, 45000, 30000, 15000, 0) */}
          <div className="w-9 flex flex-col justify-between text-[11px] font-medium text-neutral-400 select-none h-44 pb-5">
            <span>60000</span>
            <span>45000</span>
            <span>30000</span>
            <span>15000</span>
            <span>0</span>
          </div>

          {/* SVG Grid Canvas */}
          <div className="flex-1 relative h-44">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 600 160" preserveAspectRatio="none">
              <defs>
                <linearGradient id="reqGradGreen" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="15" x2="600" y2="15" stroke="#f1f5f9" strokeDasharray="3 3" />
              <line x1="0" y1="50" x2="600" y2="50" stroke="#f1f5f9" strokeDasharray="3 3" />
              <line x1="0" y1="85" x2="600" y2="85" stroke="#f1f5f9" strokeDasharray="3 3" />
              <line x1="0" y1="120" x2="600" y2="120" stroke="#f1f5f9" strokeDasharray="3 3" />
              <line x1="0" y1="155" x2="600" y2="155" stroke="#e2e8f0" />

              {/* Area & Line */}
              <path d={areaSucc} fill="url(#reqGradGreen)" />
              <path d={pathSucc} fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="0" y1="153" x2="600" y2="153" stroke="#ef4444" strokeWidth="2" />

              {/* Hover Line (Centered on activePt.x) */}
              {activePt && (
                <line x1={activePt.x} y1="15" x2={activePt.x} y2="155" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
              )}

              {/* Point Circles on Hover (Centered 100% on activePt.x and curve) */}
              {activePt && (
                <>
                  <circle cx={activePt.x} cy={activePt.y} r="4" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                  <circle cx={activePt.x} cy="153" r="4" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
                </>
              )}
            </svg>

            {/* Hover Tooltip (Matching Screenshot media_1785769537974.png) */}
            {activePt && (
              <div
                className="absolute z-20 transition-all duration-200 pointer-events-none"
                style={{
                  left: hoverIdx! >= 5 ? `calc(${(activePt.x / 600) * 100}% - 200px)` : `calc(${(activePt.x / 600) * 100}% + 15px)`,
                  top: "15px",
                }}
              >
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-3 shadow-xl w-52 text-xs space-y-1.5 font-medium">
                  <div className="font-bold text-neutral-900 dark:text-white pb-1 border-b border-neutral-100 dark:border-neutral-800">
                    {activePt.date}
                  </div>
                  <div className="text-[#10b981] font-semibold">Successful Requests : {activePt.success}</div>
                  <div className="text-[#ef4444] font-semibold">Failed Requests : {activePt.failed}</div>
                </div>
              </div>
            )}

            {/* Hover Trigger Overlay */}
            <div className="absolute inset-0 flex justify-between">
              {pointsSucc.map((_, idx) => (
                <div key={idx} onMouseEnter={() => setHoverIdx(idx)} className="flex-1 h-full cursor-pointer" />
              ))}
            </div>
          </div>
        </div>

        {/* X-Axis */}
        <div className="flex justify-between text-[11px] font-semibold text-neutral-400 pl-12 pr-2 pt-1">
          {pointsSucc.map((pt, idx) => (
            <span key={pt.date} className={hoverIdx === idx ? "text-primary-600 font-bold" : ""}>
              {pt.date}
            </span>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 text-[11px] font-semibold text-neutral-500 pt-1">
          <span className="flex items-center gap-1.5 text-[#10b981]">
            <span className="w-2.5 h-0.5 bg-[#10b981] rounded" /> Successful Requests
          </span>
          <span className="flex items-center gap-1.5 text-[#ef4444]">
            <span className="w-2.5 h-0.5 bg-[#ef4444] rounded" /> Failed Requests
          </span>
        </div>
      </div>
    </div>
  );
}

// C. MINI TOTAL TOKENS CHART (MATCHING SCREENSHOT media_1785769516745.png)
export function MiniTotalTokensChart() {
  const [hoverIdx, setHoverIdx] = useState<number | null>(2); // Default Jul 29 hover

  const ptsIn = [
    { date: "Jul 27", in: "1.8", out: "2.4", tot: "4.2", x: 15, y: 70 },
    { date: "Jul 28", in: "2.2", out: "3.0", tot: "5.2", x: 55, y: 65 },
    { date: "Jul 29", in: "2", out: "2.8", tot: "4.8", x: 95, y: 68 },
    { date: "Jul 30", in: "2.8", out: "3.5", tot: "6.3", x: 135, y: 58 },
    { date: "Jul 31", in: "3.2", out: "3.8", tot: "7.0", x: 175, y: 52 },
    { date: "Aug 01", in: "2.4", out: "3.1", tot: "5.5", x: 215, y: 62 },
    { date: "Aug 03", in: "4.5", out: "5.3", tot: "9.8", x: 255, y: 38 },
  ];

  const ptsOut = [
    { x: 15, y: 55 },
    { x: 55, y: 50 },
    { x: 95, y: 52 },
    { x: 135, y: 42 },
    { x: 175, y: 38 },
    { x: 215, y: 48 },
    { x: 255, y: 25 },
  ];

  const ptsTot = [
    { x: 15, y: 40 },
    { x: 55, y: 35 },
    { x: 95, y: 38 },
    { x: 135, y: 28 },
    { x: 175, y: 22 },
    { x: 215, y: 32 },
    { x: 255, y: 12 },
  ];

  const pathTot = generateCardinalSplinePath(ptsTot);
  const pathOut = generateCardinalSplinePath(ptsOut);
  const pathIn = generateCardinalSplinePath(ptsIn);
  const areaTot = `${pathTot} L 255 90 L 15 90 Z`;

  const activePt = hoverIdx !== null ? ptsIn[hoverIdx] : null;

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-2xs space-y-2">
      <span className="font-bold text-xs text-neutral-900 dark:text-white block">Total Tokens</span>
      <span className="text-[10px] text-neutral-400 block">Input vs Output Token distribution</span>

      <div className="pt-2">
        <div className="flex gap-2">
          {/* Y-Axis (12M, 9M, 6M, 3M, 0M) */}
          <div className="w-6 flex flex-col justify-between text-[9px] font-medium text-neutral-400 select-none h-28 pb-4">
            <span>12M</span>
            <span>9M</span>
            <span>6M</span>
            <span>3M</span>
            <span>0M</span>
          </div>

          {/* SVG Area */}
          <div className="flex-1 relative h-28">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 270 90" preserveAspectRatio="none">
              <defs>
                <linearGradient id="miniTokGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Dashed Grid */}
              <line x1="0" y1="10" x2="270" y2="10" stroke="#f1f5f9" strokeDasharray="2 2" />
              <line x1="0" y1="30" x2="270" y2="30" stroke="#f1f5f9" strokeDasharray="2 2" />
              <line x1="0" y1="50" x2="270" y2="50" stroke="#f1f5f9" strokeDasharray="2 2" />
              <line x1="0" y1="70" x2="270" y2="70" stroke="#f1f5f9" strokeDasharray="2 2" />
              <line x1="0" y1="90" x2="270" y2="90" stroke="#e2e8f0" />

              {/* Dynamic Spline Curves */}
              <path d={areaTot} fill="url(#miniTokGrad)" />
              <path d={pathTot} fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d={pathOut} fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d={pathIn} fill="none" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

              {/* Hover Line */}
              {activePt && (
                <line x1={activePt.x} y1="10" x2={activePt.x} y2="90" stroke="#cbd5e1" strokeDasharray="2 2" strokeWidth="1.5" />
              )}

              {/* Hover Point Circles (Centered 100% on activePt.x and curves) */}
              {hoverIdx !== null && (
                <>
                  <circle cx={ptsIn[hoverIdx].x} cy={ptsIn[hoverIdx].y} r="3" fill="#0284c7" stroke="#fff" strokeWidth="1.5" />
                  <circle cx={ptsOut[hoverIdx].x} cy={ptsOut[hoverIdx].y} r="3" fill="#8b5cf6" stroke="#fff" strokeWidth="1.5" />
                  <circle cx={ptsTot[hoverIdx].x} cy={ptsTot[hoverIdx].y} r="3" fill="#3b82f6" stroke="#fff" strokeWidth="1.5" />
                </>
              )}
            </svg>

            {/* Hover Tooltip (Matching Screenshot media_1785769516745.png) */}
            {activePt && (
              <div
                className="absolute z-20 transition-all duration-150 pointer-events-none"
                style={{
                  left: hoverIdx! >= 4 ? `calc(${(activePt.x / 270) * 100}% - 140px)` : `calc(${(activePt.x / 270) * 100}% + 10px)`,
                  top: "0px",
                }}
              >
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-md p-2.5 shadow-lg text-[11px] w-36 space-y-1 font-medium">
                  <div className="font-bold text-neutral-900 dark:text-white border-b border-neutral-100 dark:border-neutral-800 pb-1">
                    {activePt.date}
                  </div>
                  <div className="text-[#0284c7]">Input Tokens : {activePt.in}</div>
                  <div className="text-[#8b5cf6]">Output Tokens : {activePt.out}</div>
                  <div className="text-[#3b82f6] font-bold">Total Tokens : {activePt.tot}</div>
                </div>
              </div>
            )}

            {/* Hover Triggers */}
            <div className="absolute inset-0 flex justify-between">
              {ptsIn.map((_, idx) => (
                <div key={idx} onMouseEnter={() => setHoverIdx(idx)} className="flex-1 h-full cursor-pointer" />
              ))}
            </div>
          </div>
        </div>

        {/* X-Axis */}
        <div className="flex justify-between text-[9px] font-semibold text-neutral-400 pl-8 pr-1 pt-1">
          {ptsIn.map((pt, idx) => (
            <span key={pt.date} className={hoverIdx === idx ? "text-primary-600 font-bold" : ""}>
              {pt.date}
            </span>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-3 text-[10px] font-semibold pt-1">
          <span className="text-[#0284c7] flex items-center gap-1">
            <span className="w-2 h-0.5 bg-[#0284c7] rounded" /> Input Tokens
          </span>
          <span className="text-[#8b5cf6] flex items-center gap-1">
            <span className="w-2 h-0.5 bg-[#8b5cf6] rounded" /> Output Tokens
          </span>
          <span className="text-[#3b82f6] flex items-center gap-1">
            <span className="w-2 h-0.5 bg-[#3b82f6] rounded" /> Total Tokens
          </span>
        </div>
      </div>
    </div>
  );
}

// D. MINI REQUESTS PER DAY CHART (MATCHING SCREENSHOT media_1785769524173.png)
export function MiniRequestsPerDayChart() {
  const [hoverIdx, setHoverIdx] = useState<number | null>(1); // Default Jul 28 hover

  const pts = [
    { date: "Jul 27", req: "14,200", x: 15, y: 70 },
    { date: "Jul 28", req: "17,800", x: 55, y: 55 },
    { date: "Jul 29", req: "15,900", x: 95, y: 62 },
    { date: "Jul 30", req: "21,400", x: 135, y: 45 },
    { date: "Jul 31", req: "23,500", x: 175, y: 38 },
    { date: "Aug 01", req: "19,200", x: 215, y: 50 },
    { date: "Aug 03", req: "31,800", x: 255, y: 18 },
  ];

  const pathReq = generateCardinalSplinePath(pts);
  const areaReq = `${pathReq} L 255 90 L 15 90 Z`;
  const activePt = hoverIdx !== null ? pts[hoverIdx] : null;

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-2xs space-y-2">
      <span className="font-bold text-xs text-neutral-900 dark:text-white block">Requests Per Day</span>
      <span className="text-[10px] text-neutral-400 block">Daily API call count</span>

      <div className="pt-2">
        <div className="flex gap-2">
          {/* Y-Axis (34000, 25500, 17000, 8500, 0) */}
          <div className="w-8 flex flex-col justify-between text-[9px] font-medium text-neutral-400 select-none h-28 pb-4">
            <span>34000</span>
            <span>25500</span>
            <span>17000</span>
            <span>8500</span>
            <span>0</span>
          </div>

          {/* SVG Area */}
          <div className="flex-1 relative h-28">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 270 90" preserveAspectRatio="none">
              <defs>
                <linearGradient id="miniReqGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid */}
              <line x1="0" y1="10" x2="270" y2="10" stroke="#f1f5f9" strokeDasharray="2 2" />
              <line x1="0" y1="30" x2="270" y2="30" stroke="#f1f5f9" strokeDasharray="2 2" />
              <line x1="0" y1="50" x2="270" y2="50" stroke="#f1f5f9" strokeDasharray="2 2" />
              <line x1="0" y1="70" x2="270" y2="70" stroke="#f1f5f9" strokeDasharray="2 2" />
              <line x1="0" y1="90" x2="270" y2="90" stroke="#e2e8f0" />

              {/* Area & Line */}
              <path d={areaReq} fill="url(#miniReqGrad)" />
              <path d={pathReq} fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

              {/* Hover Line (Centered on activePt.x) */}
              {activePt && (
                <line x1={activePt.x} y1="10" x2={activePt.x} y2="90" stroke="#cbd5e1" strokeDasharray="2 2" strokeWidth="1.5" />
              )}

              {/* Hover Circle (Centered 100% on activePt.x and curve) */}
              {activePt && (
                <circle cx={activePt.x} cy={activePt.y} r="3.5" fill="#3b82f6" stroke="#fff" strokeWidth="1.5" />
              )}
            </svg>

            {/* Hover Tooltip (Matching Screenshot media_1785769524173.png) */}
            {activePt && (
              <div
                className="absolute z-20 transition-all duration-150 pointer-events-none"
                style={{
                  left: hoverIdx! >= 4 ? `calc(${(activePt.x / 270) * 100}% - 130px)` : `calc(${(activePt.x / 270) * 100}% + 10px)`,
                  top: "15px",
                }}
              >
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-md p-2.5 shadow-lg text-[11px] w-32 space-y-1 font-medium">
                  <div className="font-bold text-neutral-900 dark:text-white border-b border-neutral-100 dark:border-neutral-800 pb-1">
                    {activePt.date}
                  </div>
                  <div className="text-[#3b82f6] font-semibold">Requests : {activePt.req}</div>
                </div>
              </div>
            )}

            {/* Hover Triggers */}
            <div className="absolute inset-0 flex justify-between">
              {pts.map((_, idx) => (
                <div key={idx} onMouseEnter={() => setHoverIdx(idx)} className="flex-1 h-full cursor-pointer" />
              ))}
            </div>
          </div>
        </div>

        {/* X-Axis */}
        <div className="flex justify-between text-[9px] font-semibold text-neutral-400 pl-10 pr-1 pt-1">
          {pts.map((pt, idx) => (
            <span key={pt.date} className={hoverIdx === idx ? "text-primary-600 font-bold" : ""}>
              {pt.date}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// E. MINI SUCCESS VS FAILED REQUESTS CHART (MATCHING SCREENSHOT media_1785769530648.png)
export function MiniSuccessVsFailedChart() {
  const [hoverIdx, setHoverIdx] = useState<number | null>(5); // Default Aug 01 hover

  const pts = [
    { date: "Jul 27", succ: "22180", fail: "220", x: 15, y: 60 },
    { date: "Jul 28", succ: "29500", fail: "300", x: 55, y: 48 },
    { date: "Jul 29", succ: "26850", fail: "250", x: 95, y: 52 },
    { date: "Jul 30", succ: "38500", fail: "400", x: 135, y: 38 },
    { date: "Jul 31", succ: "43000", fail: "500", x: 175, y: 30 },
    { date: "Aug 01", succ: "33900", fail: "300", x: 215, y: 42 },
    { date: "Aug 03", succ: "57500", fail: "700", x: 255, y: 15 },
  ];

  const pathSucc = generateCardinalSplinePath(pts);
  const areaSucc = `${pathSucc} L 255 90 L 15 90 Z`;
  const activePt = hoverIdx !== null ? pts[hoverIdx] : null;

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-2xs space-y-2">
      <span className="font-bold text-xs text-neutral-900 dark:text-white block">Success vs Failed Requests</span>
      <span className="text-[10px] text-neutral-400 block">Execution status ratio (HB Green / Red)</span>

      <div className="pt-2">
        <div className="flex gap-2">
          {/* Y-Axis (60000, 45000, 30000, 15000, 0) */}
          <div className="w-8 flex flex-col justify-between text-[9px] font-medium text-neutral-400 select-none h-28 pb-4">
            <span>60000</span>
            <span>45000</span>
            <span>30000</span>
            <span>15000</span>
            <span>0</span>
          </div>

          {/* SVG Area */}
          <div className="flex-1 relative h-28">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 270 90" preserveAspectRatio="none">
              <defs>
                <linearGradient id="miniSuccGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid */}
              <line x1="0" y1="10" x2="270" y2="10" stroke="#f1f5f9" strokeDasharray="2 2" />
              <line x1="0" y1="30" x2="270" y2="30" stroke="#f1f5f9" strokeDasharray="2 2" />
              <line x1="0" y1="50" x2="270" y2="50" stroke="#f1f5f9" strokeDasharray="2 2" />
              <line x1="0" y1="70" x2="270" y2="70" stroke="#f1f5f9" strokeDasharray="2 2" />
              <line x1="0" y1="90" x2="270" y2="90" stroke="#e2e8f0" />

              {/* Area & Lines */}
              <path d={areaSucc} fill="url(#miniSuccGrad)" />
              <path d={pathSucc} fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="0" y1="88" x2="270" y2="88" stroke="#ef4444" strokeWidth="1.5" />

              {/* Hover Line (Centered on activePt.x) */}
              {activePt && (
                <line x1={activePt.x} y1="10" x2={activePt.x} y2="90" stroke="#cbd5e1" strokeDasharray="2 2" strokeWidth="1.5" />
              )}

              {/* Hover Circles (Centered 100% on activePt.x and curves) */}
              {activePt && (
                <>
                  <circle cx={activePt.x} cy={activePt.y} r="3.5" fill="#10b981" stroke="#fff" strokeWidth="1.5" />
                  <circle cx={activePt.x} cy="88" r="3.5" fill="#ef4444" stroke="#fff" strokeWidth="1.5" />
                </>
              )}
            </svg>

            {/* Hover Tooltip (Matching Screenshot media_1785769530648.png) */}
            {activePt && (
              <div
                className="absolute z-20 transition-all duration-150 pointer-events-none"
                style={{
                  left: hoverIdx! >= 4 ? `calc(${(activePt.x / 270) * 100}% - 140px)` : `calc(${(activePt.x / 270) * 100}% + 10px)`,
                  top: "5px",
                }}
              >
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-md p-2.5 shadow-lg text-[11px] w-36 space-y-1 font-medium">
                  <div className="font-bold text-neutral-900 dark:text-white border-b border-neutral-100 dark:border-neutral-800 pb-1">
                    {activePt.date}
                  </div>
                  <div className="text-[#10b981] font-semibold">Successful : {activePt.succ}</div>
                  <div className="text-[#ef4444] font-semibold">Failed : {activePt.fail}</div>
                </div>
              </div>
            )}

            {/* Hover Triggers */}
            <div className="absolute inset-0 flex justify-between">
              {pts.map((_, idx) => (
                <div key={idx} onMouseEnter={() => setHoverIdx(idx)} className="flex-1 h-full cursor-pointer" />
              ))}
            </div>
          </div>
        </div>

        {/* X-Axis */}
        <div className="flex justify-between text-[9px] font-semibold text-neutral-400 pl-10 pr-1 pt-1">
          {pts.map((pt, idx) => (
            <span key={pt.date} className={hoverIdx === idx ? "text-primary-600 font-bold" : ""}>
              {pt.date}
            </span>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 text-[10px] font-semibold pt-1">
          <span className="text-[#10b981] flex items-center gap-1">
            <span className="w-2 h-0.5 bg-[#10b981] rounded" /> Successful
          </span>
          <span className="text-[#ef4444] flex items-center gap-1">
            <span className="w-2 h-0.5 bg-[#ef4444] rounded" /> Failed
          </span>
        </div>
      </div>
    </div>
  );
}

// F. TOP VIRTUAL KEYS BY SPEND CHART VIEW (MATCHING SCREENSHOT 4)
export function TopVirtualKeysChartView({ modelName }: { modelName: string }) {
  const [hoverBarIdx, setHoverBarIdx] = useState<number | null>(1); // Default Support Desk Bot Key hovered

  const barData = [
    { keyName: "CRM Automations Key", spend: "$58.40", val: 58.4, pct: 95 },
    { keyName: "Support Desk Bot Key", spend: "$32.10", val: 32.1, pct: 55 },
    { keyName: "Production API Gateway", spend: "$22.30", val: 22.3, pct: 36 },
  ];

  return (
    <div className="space-y-4 pt-1">
      {/* Chart Canvas */}
      <div className="relative border-b border-neutral-200 dark:border-neutral-800 pb-6 pt-2">
        <div className="space-y-5">
          {barData.map((bar, idx) => {
            const isHovered = hoverBarIdx === idx;
            return (
              <div
                key={bar.keyName}
                onMouseEnter={() => setHoverBarIdx(idx)}
                className={`flex items-center gap-4 p-2 rounded-lg transition-colors cursor-pointer relative ${
                  isHovered ? "bg-neutral-100/80 dark:bg-neutral-800/60" : ""
                }`}
              >
                {/* Y-Axis Label */}
                <div className="w-36 text-[11px] font-medium text-neutral-600 dark:text-neutral-400 text-right truncate">
                  {bar.keyName}
                </div>

                {/* Bar Track */}
                <div className="flex-1 bg-neutral-100 dark:bg-neutral-800/50 h-5 rounded-r-md overflow-hidden relative">
                  <div
                    className="bg-[#0284c7] h-full rounded-r-md transition-all duration-300"
                    style={{ width: `${bar.pct}%` }}
                  />
                </div>

                {/* Hover Tooltip (Matching Screenshot 4) */}
                {isHovered && (
                  <div className="absolute right-12 -top-8 z-20 pointer-events-none animate-fadeIn">
                    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-2.5 shadow-xl text-xs space-y-0.5">
                      <div className="font-bold text-neutral-900 dark:text-white">{bar.keyName}</div>
                      <div className="text-[#0284c7] font-semibold">Spend : ${bar.val}</div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* X-Axis Scale (Matching Screenshot 4: $0, $15, $30, $45, $60) */}
        <div className="flex justify-between text-[11px] font-medium text-neutral-400 pl-40 pr-4 pt-4 border-t border-neutral-100 dark:border-neutral-800">
          <span>$0</span>
          <span>$15</span>
          <span>$30</span>
          <span>$45</span>
          <span>$60</span>
        </div>
      </div>
    </div>
  );
}

// 7. REUSABLE MODEL ACTIVITY DASHBOARD CONTAINER
export function ModelActivityDashboard({ timeRange }: { timeRange: string }) {
  const [expandedModelId, setExpandedModelId] = useState<string | null>("gpt-4o-mini"); // Default gpt-4o-mini expanded matching screenshot 3 & 4
  const [modelKeysView, setModelKeysView] = useState<"table" | "chart">("table");
  const [modelKeysSearch, setModelKeysSearch] = useState("");

  const deployedModels = [
    {
      id: "gpt-4o-mini",
      name: "gpt-4o-mini",
      provider: "OpenAI",
      providerBg: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200",
      totalSpend: "$112.80",
      totalRequests: "145,000",
      reqCount: 145000,
      successCount: 143200,
      tokens: "18.9M",
      spendVal: 112.80,
    },
    {
      id: "claude-3-5-sonnet",
      name: "claude-3-5-sonnet",
      provider: "Anthropic",
      providerBg: "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200",
      totalSpend: "$384.50",
      totalRequests: "280,000",
      reqCount: 280000,
      successCount: 277900,
      tokens: "44.2M",
      spendVal: 384.50,
    },
    {
      id: "gemini-1.5-pro",
      name: "gemini-1.5-pro",
      provider: "Google Gemini",
      providerBg: "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200",
      totalSpend: "$76.40",
      totalRequests: "52,000",
      reqCount: 52000,
      successCount: 51320,
      tokens: "8.1M",
      spendVal: 76.40,
    },
  ];

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* 1. OVERALL USAGE KPI CARDS (4 CARDS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <KpiCard
          title="Total Requests"
          value="842,190"
          trend="+6.4%"
          isPositive={true}
          subtext="Total API gateway calls across all models"
          icon={Zap}
          iconBg="bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400"
        />
        <KpiCard
          title="Total Successful Requests"
          value="834,102"
          trend="99.04% success rate"
          isPositive={true}
          subtext="Successfully resolved API executions"
          icon={CheckCircle2}
          iconBg="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400"
        />
        <KpiCard
          title="Total Tokens"
          value="142.8M"
          trend="~169 avg tokens / req"
          isPositive={true}
          subtext="Prompt & completion token total"
          icon={Zap}
          iconBg="bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400"
        />
        <KpiCard
          title="Total Spend (USD)"
          value="$1,248.50"
          trend="~$0.0015 avg spend / req"
          isPositive={true}
          subtext="Total organization AI model expenditure"
          icon={DollarSign}
          iconBg="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400"
        />
      </div>

      {/* 2. OVERALL CHARTS ROW (2 CARDS) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* TOTAL TOKENS OVER TIME */}
        <TotalTokensOverTimeChart />

        {/* TOTAL REQUESTS OVER TIME */}
        <TotalRequestsOverTimeChart />
      </div>

      {/* 3. DEPLOYED MODEL ANALYTICS (ACCORDION SECTION) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
            Deployed Model Analytics ({deployedModels.length})
          </h3>
          <span className="text-[11px] text-neutral-400 font-medium">
            Click accordion to expand model breakdown
          </span>
        </div>

        <div className="space-y-3">
          {deployedModels.map((model) => {
            const isExpanded = expandedModelId === model.id;
            return (
              <div
                key={model.id}
                className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden shadow-2xs transition-all"
              >
                {/* Accordion Header */}
                <button
                  type="button"
                  onClick={() => setExpandedModelId(isExpanded ? null : model.id)}
                  className="w-full p-4 flex items-center justify-between hover:bg-neutral-50/80 dark:hover:bg-neutral-800/40 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-lg border text-[11px] font-bold ${model.providerBg}`}>
                      {model.name}
                    </div>
                    <span className="text-[10px] font-semibold text-neutral-400">
                      {model.provider}
                    </span>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right font-mono text-xs hidden sm:block">
                      <div className="text-neutral-400 text-[10px]">Total Spend</div>
                      <div className="font-bold text-neutral-900 dark:text-white">{model.totalSpend}</div>
                    </div>
                    <div className="text-right font-mono text-xs hidden sm:block">
                      <div className="text-neutral-400 text-[10px]">Total Requests</div>
                      <div className="font-bold text-neutral-900 dark:text-white">{model.totalRequests}</div>
                    </div>
                    <div className={`p-1.5 rounded-lg transition-transform ${isExpanded ? "rotate-180 bg-neutral-100 dark:bg-neutral-800" : ""}`}>
                      <ChevronDown className="w-4 h-4 text-neutral-500" />
                    </div>
                  </div>
                </button>

                {/* Accordion Content */}
                {isExpanded && (
                  <div className="p-5 border-t border-neutral-100 dark:border-neutral-800 space-y-5 bg-neutral-50/30 dark:bg-neutral-950/20">
                    {/* Model KPI Cards (Matching Screenshot 3) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-2xs space-y-1">
                        <span className="text-[11px] font-medium text-neutral-500">Total Requests</span>
                        <div className="text-xl font-bold font-mono text-neutral-900 dark:text-white">{model.totalRequests}</div>
                        <p className="text-[10px] text-neutral-400">{model.successCount.toLocaleString()} successful</p>
                      </div>
                      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-2xs space-y-1">
                        <span className="text-[11px] font-medium text-neutral-500">Total Successful Requests</span>
                        <div className="text-xl font-bold font-mono text-emerald-600">{model.successCount.toLocaleString()}</div>
                        <p className="text-[10px] text-emerald-600 font-bold">98.8% success rate</p>
                      </div>
                      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-2xs space-y-1">
                        <span className="text-[11px] font-medium text-neutral-500">Total Tokens</span>
                        <div className="text-xl font-bold font-mono text-[#8b5cf6]">{model.tokens}</div>
                        <p className="text-[10px] text-neutral-400">132 avg per successful request</p>
                      </div>
                      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-2xs space-y-1">
                        <span className="text-[11px] font-medium text-neutral-500">Total Spend</span>
                        <div className="text-xl font-bold font-mono text-[#f59e0b]">{model.totalSpend}</div>
                        <p className="text-[10px] text-neutral-400">$0.00078 per successful request</p>
                      </div>
                    </div>

                    {/* Top Virtual Keys by Spend for this Model (Table View & Chart View Toggles) */}
                    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 shadow-2xs space-y-4">
                      <AnalyticsWidgetHeader
                        title="Top Virtual Keys by Spend"
                        subtitle={`Virtual key cost allocation for ${model.name}`}
                        icon={Key}
                        iconColor="text-amber-500"
                        searchValue={modelKeysSearch}
                        onSearchChange={setModelKeysSearch}
                        searchPlaceholder="Search..."
                        viewMode={modelKeysView}
                        onViewModeChange={setModelKeysView}
                      />

                      {modelKeysView === "table" ? (
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse text-xs">
                            <thead>
                              <tr className="border-b border-neutral-100 dark:border-neutral-800 text-neutral-400 font-semibold">
                                <th className="py-2.5 px-2">Virtual Key Alias</th>
                                <th className="py-2.5 px-2">Total Requests</th>
                                <th className="py-2.5 px-2">Total Tokens</th>
                                <th className="py-2.5 px-2">Total Spend ↑↓</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60 font-medium">
                              <tr className="hover:bg-neutral-50/60 dark:hover:bg-neutral-800/40">
                                <td className="py-2.5 px-2 font-bold text-neutral-900 dark:text-white">CRM Automations Key</td>
                                <td className="py-2.5 px-2 font-mono text-neutral-600">75,000</td>
                                <td className="py-2.5 px-2 font-mono text-[#8b5cf6] font-semibold">9.8M</td>
                                <td className="py-2.5 px-2 font-mono font-bold text-[#f59e0b]">$58.40</td>
                              </tr>
                              <tr className="hover:bg-neutral-50/60 dark:hover:bg-neutral-800/40">
                                <td className="py-2.5 px-2 font-bold text-neutral-900 dark:text-white">Support Desk Bot Key</td>
                                <td className="py-2.5 px-2 font-mono text-neutral-600">41,190</td>
                                <td className="py-2.5 px-2 font-mono text-[#8b5cf6] font-semibold">5.2M</td>
                                <td className="py-2.5 px-2 font-mono font-bold text-[#f59e0b]">$32.10</td>
                              </tr>
                              <tr className="hover:bg-neutral-50/60 dark:hover:bg-neutral-800/40">
                                <td className="py-2.5 px-2 font-bold text-neutral-900 dark:text-white">Production API Gateway</td>
                                <td className="py-2.5 px-2 font-mono text-neutral-600">28,810</td>
                                <td className="py-2.5 px-2 font-mono text-[#8b5cf6] font-semibold">3.9M</td>
                                <td className="py-2.5 px-2 font-mono font-bold text-[#f59e0b]">$22.30</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <TopVirtualKeysChartView modelName={model.name} />
                      )}
                    </div>

                    {/* Spend Per Day for this Model (Matching Screenshot 5) */}
                    <DailySpendTrendChart totalSpend={model.spendVal} timeRange={timeRange} />

                    {/* 3-Column Bottom Mini Charts Row (Matching Screenshots media_1785769516745.png, media_1785769524173.png, media_1785769530648.png) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <MiniTotalTokensChart />
                      <MiniRequestsPerDayChart />
                      <MiniSuccessVsFailedChart />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// 8. MODEL USAGE CHART VIEW FOR VIRTUAL KEYS
export function ModelUsageChartView({ keyName }: { keyName: string }) {
  const [hoverBarIdx, setHoverBarIdx] = useState<number | null>(0); // Default gpt-4o hovered

  const modelBars = [
    { model: "gpt-4o", spend: "$312.40", val: 312.4, pct: 90 },
    { model: "claude-3-5-sonnet", spend: "$142.80", val: 142.8, pct: 45 },
    { model: "gpt-4o-mini", spend: "$57.40", val: 57.4, pct: 18 },
  ];

  return (
    <div className="space-y-4 pt-1">
      <div className="relative border-b border-neutral-200 dark:border-neutral-800 pb-6 pt-2">
        <div className="space-y-5">
          {modelBars.map((bar, idx) => {
            const isHovered = hoverBarIdx === idx;
            return (
              <div
                key={bar.model}
                onMouseEnter={() => setHoverBarIdx(idx)}
                className={`flex items-center gap-4 p-2 rounded-lg transition-colors cursor-pointer relative ${
                  isHovered ? "bg-neutral-100/80 dark:bg-neutral-800/60" : ""
                }`}
              >
                <div className="w-36 text-[11px] font-medium text-neutral-600 dark:text-neutral-400 text-right truncate">
                  {bar.model}
                </div>

                <div className="flex-1 bg-neutral-100 dark:bg-neutral-800/50 h-5 rounded-r-md overflow-hidden relative">
                  <div
                    className="bg-[#f59e0b] h-full rounded-r-md transition-all duration-300"
                    style={{ width: `${bar.pct}%` }}
                  />
                </div>

                {isHovered && (
                  <div className="absolute right-12 -top-8 z-20 pointer-events-none animate-fadeIn">
                    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-2.5 shadow-xl text-xs space-y-0.5 font-medium">
                      <div className="font-bold text-neutral-900 dark:text-white">{bar.model}</div>
                      <div className="text-[#f59e0b] font-semibold">Spend : ${bar.val.toFixed(2)}</div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex justify-between text-[11px] font-medium text-neutral-400 pl-40 pr-4 pt-4 border-t border-neutral-100 dark:border-neutral-800">
          <span>$0</span>
          <span>$100</span>
          <span>$200</span>
          <span>$300</span>
          <span>$400</span>
        </div>
      </div>
    </div>
  );
}

// 9. REUSABLE VIRTUAL KEY ACTIVITY DASHBOARD CONTAINER (1:1 CLONE OF ORGANIZATION ADMIN)
export function VirtualKeyActivityDashboard({ timeRange }: { timeRange: string }) {
  const [expandedKeyId, setExpandedKeyId] = useState<string | null>("vk_prod_gateway"); // Default expanded
  const [modelUsageView, setModelUsageView] = useState<"table" | "chart">("table");
  const [modelUsageSearch, setModelUsageSearch] = useState("");

  const virtualKeys = [
    {
      id: "vk_prod_gateway",
      alias: "Production API Gateway",
      hash: "key-hash-85eff432aeed218390b14",
      team: "Team: Core Engineering",
      badgeBg: "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200",
      totalSpend: "$512.60",
      totalRequests: "380,000",
      reqCount: 380000,
      successCount: 376200,
      tokens: "61.2M",
      spendVal: 512.60,
    },
    {
      id: "vk_stg_key",
      alias: "Staging Integration Key",
      hash: "key-hash-48182bcf931a88310c813",
      team: "Team: Product AI & Design",
      badgeBg: "bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200",
      totalSpend: "$264.10",
      totalRequests: "195,000",
      reqCount: 195000,
      successCount: 193050,
      tokens: "32.4M",
      spendVal: 264.10,
    },
    {
      id: "vk_crm_key",
      alias: "CRM Automations Key",
      hash: "key-hash-77291aeb0391482099641",
      team: "Team: Customer Success Bot",
      badgeBg: "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200",
      totalSpend: "$198.40",
      totalRequests: "142,000",
      reqCount: 142000,
      successCount: 140580,
      tokens: "24.1M",
      spendVal: 198.40,
    },
  ];

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* 1. OVERALL USAGE KPI CARDS (4 CARDS MATCHING REFERENCE SCREENSHOT) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <KpiCard
          title="Total Requests"
          value="842,190"
          trend="+6.4%"
          isPositive={true}
          subtext="Total API gateway calls"
          icon={Zap}
          iconBg="bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400"
        />
        <KpiCard
          title="Total Successful Requests"
          value="834,102"
          trend="99.04% success rate"
          isPositive={true}
          subtext="Successfully resolved API executions"
          icon={CheckCircle2}
          iconBg="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400"
        />
        <KpiCard
          title="Total Tokens"
          value="142.8M"
          trend="~169 avg tokens / req"
          isPositive={true}
          subtext="Prompt & completion token total"
          icon={Zap}
          iconBg="bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400"
        />
        <KpiCard
          title="Total Spend (USD)"
          value="$1,248.50"
          trend="~$0.0015 avg spend / req"
          isPositive={true}
          subtext="Total organization AI expenditure"
          icon={DollarSign}
          iconBg="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400"
        />
      </div>

      {/* 2. OVERALL CHARTS ROW (2-COLUMN GRID MATCHING REFERENCE SCREENSHOT) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <TotalTokensOverTimeChart />
        <TotalRequestsOverTimeChart />
      </div>

      {/* 3. VIRTUAL KEY ANALYTICS (ACCORDION SECTION) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
            Virtual Key Analytics ({virtualKeys.length})
          </h3>
          <span className="text-[11px] text-neutral-400 font-medium">
            Click accordion to expand virtual key breakdown
          </span>
        </div>

        <div className="space-y-3">
          {virtualKeys.map((vk) => {
            const isExpanded = expandedKeyId === vk.id;
            return (
              <div
                key={vk.id}
                className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden shadow-2xs transition-all"
              >
                {/* Accordion Header */}
                <button
                  type="button"
                  onClick={() => setExpandedKeyId(isExpanded ? null : vk.id)}
                  className="w-full p-4 flex items-center justify-between hover:bg-neutral-50/80 dark:hover:bg-neutral-800/40 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-neutral-900 dark:text-white">{vk.hash}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${vk.badgeBg}`}>
                          {vk.alias}
                        </span>
                      </div>
                      <div className="text-[10px] text-neutral-400 mt-0.5 font-medium">{vk.team}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right font-mono text-xs hidden sm:block">
                      <div className="text-neutral-400 text-[10px]">Total Spend</div>
                      <div className="font-bold text-neutral-900 dark:text-white">{vk.totalSpend}</div>
                    </div>
                    <div className="text-right font-mono text-xs hidden sm:block">
                      <div className="text-neutral-400 text-[10px]">Total Requests</div>
                      <div className="font-bold text-neutral-900 dark:text-white">{vk.totalRequests}</div>
                    </div>
                    <div className={`p-1.5 rounded-lg transition-transform ${isExpanded ? "rotate-180 bg-neutral-100 dark:bg-neutral-800" : ""}`}>
                      <ChevronDown className="w-4 h-4 text-neutral-500" />
                    </div>
                  </div>
                </button>

                {/* Accordion Content */}
                {isExpanded && (
                  <div className="p-5 border-t border-neutral-100 dark:border-neutral-800 space-y-5 bg-neutral-50/30 dark:bg-neutral-950/20">
                    {/* Key KPI Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-2xs space-y-1">
                        <span className="text-[11px] font-medium text-neutral-500">Total Requests</span>
                        <div className="text-xl font-bold font-mono text-neutral-900 dark:text-white">{vk.totalRequests}</div>
                        <p className="text-[10px] text-neutral-400">{vk.successCount.toLocaleString()} successful</p>
                      </div>
                      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-2xs space-y-1">
                        <span className="text-[11px] font-medium text-neutral-500">Total Successful Requests</span>
                        <div className="text-xl font-bold font-mono text-emerald-600">{vk.successCount.toLocaleString()}</div>
                        <p className="text-[10px] text-emerald-600 font-bold">99.0% success rate</p>
                      </div>
                      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-2xs space-y-1">
                        <span className="text-[11px] font-medium text-neutral-500">Total Tokens</span>
                        <div className="text-xl font-bold font-mono text-[#8b5cf6]">{vk.tokens}</div>
                        <p className="text-[10px] text-neutral-400">161 avg per successful request</p>
                      </div>
                      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-2xs space-y-1">
                        <span className="text-[11px] font-medium text-neutral-500">Total Spend</span>
                        <div className="text-xl font-bold font-mono text-[#f59e0b]">{vk.totalSpend}</div>
                        <p className="text-[10px] text-neutral-400">$0.00136 per successful request</p>
                      </div>
                    </div>

                    {/* Model Usage for this Virtual Key */}
                    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 shadow-2xs space-y-4">
                      <AnalyticsWidgetHeader
                        title="Model Usage"
                        subtitle={`AI model consumption for ${vk.alias}`}
                        icon={Cpu}
                        iconColor="text-purple-500"
                        searchValue={modelUsageSearch}
                        onSearchChange={setModelUsageSearch}
                        searchPlaceholder="Search..."
                        viewMode={modelUsageView}
                        onViewModeChange={setModelUsageView}
                      />

                      {modelUsageView === "table" ? (
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse text-xs">
                            <thead>
                              <tr className="border-b border-neutral-100 dark:border-neutral-800 text-neutral-400 font-semibold">
                                <th className="py-2.5 px-2">Model</th>
                                <th className="py-2.5 px-2">Spend (USD) ↑↓</th>
                                <th className="py-2.5 px-2">Successful Req.</th>
                                <th className="py-2.5 px-2">Failed Req.</th>
                                <th className="py-2.5 px-2">Tokens</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60 font-medium">
                              <tr className="hover:bg-neutral-50/60 dark:hover:bg-neutral-800/40">
                                <td className="py-2.5 px-2 font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                                  <span>gpt-4o</span>
                                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/60">OpenAI</span>
                                </td>
                                <td className="py-2.5 px-2 font-mono font-bold text-[#f59e0b]">$312.40</td>
                                <td className="py-2.5 px-2 font-mono text-emerald-600 font-semibold">208,100</td>
                                <td className="py-2.5 px-2 font-mono text-rose-500 font-semibold">1,900</td>
                                <td className="py-2.5 px-2 font-mono text-[#8b5cf6] font-semibold">36.8M</td>
                              </tr>
                              <tr className="hover:bg-neutral-50/60 dark:hover:bg-neutral-800/40">
                                <td className="py-2.5 px-2 font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                                  <span>claude-3-5-sonnet</span>
                                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200/60">Anthropic</span>
                                </td>
                                <td className="py-2.5 px-2 font-mono font-bold text-[#f59e0b]">$142.80</td>
                                <td className="py-2.5 px-2 font-mono text-emerald-600 font-semibold">108,900</td>
                                <td className="py-2.5 px-2 font-mono text-rose-500 font-semibold">1,100</td>
                                <td className="py-2.5 px-2 font-mono text-[#8b5cf6] font-semibold">18.4M</td>
                              </tr>
                              <tr className="hover:bg-neutral-50/60 dark:hover:bg-neutral-800/40">
                                <td className="py-2.5 px-2 font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                                  <span>gpt-4o-mini</span>
                                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/60">OpenAI</span>
                                </td>
                                <td className="py-2.5 px-2 font-mono font-bold text-[#f59e0b]">$57.40</td>
                                <td className="py-2.5 px-2 font-mono text-emerald-600 font-semibold">59,200</td>
                                <td className="py-2.5 px-2 font-mono text-rose-500 font-semibold">400</td>
                                <td className="py-2.5 px-2 font-mono text-[#8b5cf6] font-semibold">6.0M</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <ModelUsageChartView keyName={vk.alias} />
                      )}
                    </div>

                    {/* Spend Per Day for this Virtual Key */}
                    <DailySpendTrendChart totalSpend={vk.spendVal} timeRange={timeRange} />

                    {/* 3-Column Bottom Mini Charts Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <MiniTotalTokensChart />
                      <MiniRequestsPerDayChart />
                      <MiniSuccessVsFailedChart />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// 10. MAIN ORG ANALYTICS DASHBOARD CONTAINER
export function OrgAnalyticsDashboard({
  orgName = "Acme Enterprise",
  orgId,
  currentSpend = 1248.50,
  initialState = "normal",
  onRefresh,
  onExport,
}: OrgAnalyticsDashboardProps) {
  // Text-Only Sub-Tabs (Title Case)
  const [subTab, setSubTab] = useState<"cost" | "model_activity" | "key_activity">("cost");

  // State Switcher (Normal, Loading, Empty, Error)
  const [viewState, setViewState] = useState<"normal" | "loading" | "empty" | "error">(initialState);

  // Time Range Filter
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d" | "custom">("30d");

  // View Toggles (Table vs Chart)
  const [teamsView, setTeamsView] = useState<"table" | "chart">("table");
  const [membersView, setMembersView] = useState<"table" | "chart">("table");
  const [keysView, setKeysView] = useState<"table" | "chart">("table");
  const [modelsView, setModelsView] = useState<"table" | "chart">("table");

  // Expandable Search States
  const [keysSearch, setKeysSearch] = useState("");
  const [modelsSearch, setModelsSearch] = useState("");

  const handleRefreshClick = () => {
    if (onRefresh) onRefresh();
    else toast.success(`Refreshed analytics data for ${orgName}`);
  };

  const handleExportClick = () => {
    if (onExport) onExport();
    else toast.success(`Exported analytics telemetry report for ${orgName}`);
  };

  // Mock Teams Data
  const teamsData = [
    { name: "Core Engineering", spend: 482.40, successReq: "309,900", failedReq: "2,100", tokens: "54.2M" },
    { name: "Product AI & Design", spend: 318.90, successReq: "212,200", failedReq: "1,800", tokens: "38.6M" },
    { name: "Customer Success Bot", spend: 215.10, successReq: "182,600", failedReq: "2,400", tokens: "26.1M" },
    { name: "Data Science R&D", spend: 142.80, successReq: "82,800", failedReq: "1,200", tokens: "15.4M" },
    { name: "Marketing Automation", spend: 89.30, successReq: "46,602", failedReq: "588", tokens: "8.5M" },
  ];

  // Mock Members Data
  const membersData = [
    { name: "Alex Rivera", dept: "Core Engineering", spend: 164.20, requests: "124,000", tokens: "21.4M", successRate: "99.4%" },
    { name: "Sophia Chen", dept: "Product AI & Design", spend: 156.80, requests: "98,000", tokens: "18.1M", successRate: "99.1%" },
    { name: "Marcus Vance", dept: "Data Science R&D", spend: 128.40, requests: "76,000", tokens: "14.8M", successRate: "98.8%" },
    { name: "Emily Watson", dept: "Customer Success", spend: 94.10, requests: "68,000", tokens: "11.2M", successRate: "99.6%" },
    { name: "David Kim", dept: "Core Engineering", spend: 78.50, requests: "52,000", tokens: "9.4M", successRate: "99.2%" },
  ];

  // Mock Keys Data
  const keysData = [
    { alias: "Production API Gateway", keyId: "vk_live_94811", spend: 512.60, requests: "380,000", tokens: "61.2M" },
    { alias: "Staging Integration Key", keyId: "vk_stg_48181", spend: 264.10, requests: "195,000", tokens: "32.4M" },
    { alias: "CRM Automations Key", keyId: "vk_crm_77391", spend: 108.40, requests: "142,000", tokens: "22.8M" },
    { alias: "R&D Sandbox Key", keyId: "vk_dev_11001", spend: 142.30, requests: "84,000", tokens: "16.5M" },
    { alias: "Support Desk Bot Key", keyId: "vk_bot_23918", spend: 111.10, requests: "41,190", tokens: "9.9M" },
  ];

  // Mock Models Data
  const modelsData = [
    { name: "gpt-4o", provider: "OpenAI", spend: 642.10, successReq: "336,800", failedReq: "3,200", tokens: "68.4M" },
    { name: "claude-3-5-sonnet", provider: "Anthropic", spend: 384.50, successReq: "277,900", failedReq: "2,100", tokens: "44.2M" },
    { name: "gpt-4o-mini", provider: "OpenAI", spend: 112.80, successReq: "143,200", failedReq: "1,800", tokens: "18.9M" },
    { name: "gemini-1.5-pro", provider: "Google Gemini", spend: 76.40, successReq: "51,320", failedReq: "680", tokens: "8.1M" },
    { name: "text-embedding-3-small", provider: "OpenAI", spend: 32.70, successReq: "24,882", failedReq: "308", tokens: "3.2M" },
  ];

  const filteredKeys = keysData.filter(
    (k) =>
      k.alias.toLowerCase().includes(keysSearch.toLowerCase()) ||
      k.keyId.toLowerCase().includes(keysSearch.toLowerCase())
  );

  const filteredModels = modelsData.filter(
    (m) =>
      m.name.toLowerCase().includes(modelsSearch.toLowerCase()) ||
      m.provider.toLowerCase().includes(modelsSearch.toLowerCase())
  );

  return (
    <div className="space-y-5 text-xs animate-fadeIn">
      {/* SECTION 1: TEXT-ONLY SUB-TABS & SINGLE-ROW TOOLBAR */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-2xs">
        {/* Text-Only Tabs (No Icons, Title Case, Equal Height & Alignment) */}
        <div className="flex items-center gap-6 overflow-x-auto border-b lg:border-b-0 border-neutral-200 dark:border-neutral-800 pb-2 lg:pb-0">
          {[
            { id: "cost", label: "Dashboard (Cost Analytics)" },
            { id: "model_activity", label: "Model Activity" },
            { id: "key_activity", label: "Virtual Key Activity" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSubTab(tab.id as any)}
              className={`pb-2 lg:pb-1 border-b-2 text-xs transition-colors whitespace-nowrap ${
                subTab === tab.id
                  ? "border-primary-600 text-primary-600 dark:text-primary-400 font-bold"
                  : "border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white font-medium"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Toolbar (Single Horizontal Row: State Selector -> Time Range -> Refresh -> Export Data) */}
        <div className="flex items-center gap-2.5 flex-nowrap overflow-x-auto">
          {/* State Selector */}
          <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-lg border border-neutral-200/60 dark:border-neutral-700/60 flex-shrink-0">
            <span className="text-[10px] font-bold text-neutral-400 px-1">STATE:</span>
            {(["normal", "loading", "empty", "error"] as const).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setViewState(st)}
                className={`px-2 py-0.5 rounded text-[10px] font-semibold capitalize transition-colors ${
                  viewState === st
                    ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-2xs font-bold"
                    : "text-neutral-500 hover:text-neutral-800"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Time Range Selector */}
          <div className="flex items-center gap-1.5 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg px-2.5 py-1.5 shadow-2xs flex-shrink-0">
            <Calendar className="w-3.5 h-3.5 text-neutral-400" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="bg-transparent text-xs font-semibold text-neutral-800 dark:text-neutral-200 focus:outline-none"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          {/* Refresh Button */}
          <button
            type="button"
            onClick={handleRefreshClick}
            className="px-3 py-1.5 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-lg font-semibold flex items-center gap-1.5 transition-colors shadow-2xs flex-shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5 text-neutral-500" />
            <span>Refresh</span>
          </button>

          {/* Export Data Button */}
          <button
            type="button"
            onClick={handleExportClick}
            className="px-3.5 py-1.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold flex items-center gap-1.5 transition-colors shadow-2xs flex-shrink-0 whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Data</span>
          </button>
        </div>
      </div>

      {/* VIEW STATE HANDLERS */}
      {viewState === "loading" && (
        <div className="space-y-4 animate-pulse">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-28 bg-neutral-200 dark:bg-neutral-800 rounded-xl" />
            ))}
          </div>
          <div className="h-64 bg-neutral-200 dark:bg-neutral-800 rounded-xl" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="h-56 bg-neutral-200 dark:bg-neutral-800 rounded-xl" />
            <div className="h-56 bg-neutral-200 dark:bg-neutral-800 rounded-xl" />
          </div>
        </div>
      )}

      {viewState === "empty" && (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-16 text-center space-y-3 shadow-2xs">
          <Activity className="w-12 h-12 mx-auto text-neutral-300 dark:text-neutral-700 stroke-1" />
          <h4 className="text-base font-bold text-neutral-800 dark:text-neutral-200">No usage data available for this organization.</h4>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            There are no API gateway request logs or spending records for {orgName} in the selected timeframe.
          </p>
        </div>
      )}

      {viewState === "error" && (
        <div className="bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 rounded-xl p-8 text-center space-y-3 text-rose-900 dark:text-rose-200 shadow-2xs">
          <AlertCircle className="w-10 h-10 mx-auto text-rose-600" />
          <h4 className="text-base font-bold">Failed to load organization analytics</h4>
          <p className="text-xs text-rose-700 dark:text-rose-300 max-w-md mx-auto">
            A network telemetry timeout occurred while fetching aggregated gateway records.
          </p>
          <button
            type="button"
            onClick={handleRefreshClick}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-lg text-xs"
          >
            Retry Telemetry Fetch
          </button>
        </div>
      )}

      {/* NORMAL DASHBOARD CONTENT */}
      {viewState === "normal" && (
        <>
          {subTab === "model_activity" ? (
            <ModelActivityDashboard timeRange={timeRange} />
          ) : subTab === "key_activity" ? (
            <VirtualKeyActivityDashboard timeRange={timeRange} />
          ) : (
            <>
              {/* SECTION 2: 5 KPI CARDS ROW (Title Case Titles & Standardized Footers) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            <KpiCard
              title="Total Spend (USD)"
              value={`$${currentSpend.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              trend="+14.2%"
              isPositive={true}
              subtext="Total organization API cost accrued"
              icon={DollarSign}
              iconBg="bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400"
            />
            <KpiCard
              title="Total Requests"
              value="842,190"
              trend="+6.4%"
              isPositive={true}
              subtext="Total API gateway call volume"
              icon={Zap}
              iconBg="bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400"
            />
            <KpiCard
              title="Successful Requests"
              value="834,102"
              trend="+8.5%"
              isPositive={true}
              subtext="99.04% completion rate"
              icon={CheckCircle2}
              iconBg="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400"
            />
            <KpiCard
              title="Failed Requests"
              value="8,088"
              trend="-14.1%"
              isPositive={false}
              subtext="0.96% failure rate (4xx/5xx)"
              icon={AlertTriangle}
              iconBg="bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400"
            />
            <KpiCard
              title="Total Tokens"
              value="142.8M"
              trend="+19.3%"
              isPositive={true}
              subtext="Prompt & completion token total"
              icon={Zap}
              iconBg="bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400"
            />
          </div>

          {/* SECTION 3: DAILY SPEND TREND (Interactive Chart with Y-Axis, Guidelines, and Cost Breakdown Tooltip) */}
          <DailySpendTrendChart totalSpend={currentSpend} timeRange={timeRange} />

          {/* SECTION 4 & SECTION 5: TOP TEAMS & TOP MEMBERS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* TOP TEAMS BY SPEND */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 shadow-2xs space-y-4">
              <AnalyticsWidgetHeader
                title="Top Teams by Spend"
                subtitle="Cost breakdown by organizational engineering and product teams"
                icon={Building2}
                iconColor="text-purple-600"
                viewMode={teamsView}
                onViewModeChange={setTeamsView}
              />

              {teamsView === "table" ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-neutral-100 dark:border-neutral-800 text-neutral-400 font-semibold">
                        <th className="py-2.5 px-2">Team Name</th>
                        <th className="py-2.5 px-2">Spend (USD) ↑↓</th>
                        <th className="py-2.5 px-2">Successful Req.</th>
                        <th className="py-2.5 px-2">Failed Req.</th>
                        <th className="py-2.5 px-2">Total Tokens</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60 font-medium">
                      {teamsData.map((t) => (
                        <tr key={t.name} className="hover:bg-neutral-50/60 dark:hover:bg-neutral-800/40 transition-colors">
                          <td className="py-2.5 px-2 font-bold text-neutral-900 dark:text-white">{t.name}</td>
                          <td className="py-2.5 px-2 font-mono font-bold text-purple-600 dark:text-purple-400">${t.spend.toFixed(2)}</td>
                          <td className="py-2.5 px-2 font-mono text-emerald-600 font-semibold">{t.successReq}</td>
                          <td className="py-2.5 px-2 font-mono text-rose-500 font-semibold">{t.failedReq}</td>
                          <td className="py-2.5 px-2 font-mono text-neutral-600 dark:text-neutral-400">{t.tokens}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="space-y-3 pt-2">
                  {teamsData.map((t) => {
                    const pct = Math.min(100, Math.round((t.spend / currentSpend) * 100));
                    return (
                      <div key={t.name} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span>{t.name}</span>
                          <span className="font-mono text-purple-600">${t.spend.toFixed(2)} ({pct}%)</span>
                        </div>
                        <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-2.5 rounded-full overflow-hidden">
                          <div className="bg-purple-600 h-full rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* TOP MEMBERS BY SPEND */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 shadow-2xs space-y-4">
              <AnalyticsWidgetHeader
                title="Top Members by Spend"
                subtitle="Highest individual user spend metrics"
                icon={Users}
                iconColor="text-blue-600"
                viewMode={membersView}
                onViewModeChange={setMembersView}
              />

              {membersView === "table" ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-neutral-100 dark:border-neutral-800 text-neutral-400 font-semibold">
                        <th className="py-2.5 px-2">Member Name</th>
                        <th className="py-2.5 px-2">Spend ↑↓</th>
                        <th className="py-2.5 px-2">Requests</th>
                        <th className="py-2.5 px-2">Tokens</th>
                        <th className="py-2.5 px-2">Success Rate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60 font-medium">
                      {membersData.map((m) => (
                        <tr key={m.name} className="hover:bg-neutral-50/60 dark:hover:bg-neutral-800/40 transition-colors">
                          <td className="py-2.5 px-2">
                            <div className="font-bold text-neutral-900 dark:text-white">{m.name}</div>
                            <div className="text-[10px] text-neutral-400">{m.dept}</div>
                          </td>
                          <td className="py-2.5 px-2 font-mono font-bold text-blue-600 dark:text-blue-400">${m.spend.toFixed(2)}</td>
                          <td className="py-2.5 px-2 font-mono text-neutral-600 dark:text-neutral-400">{m.requests}</td>
                          <td className="py-2.5 px-2 font-mono text-neutral-600 dark:text-neutral-400">{m.tokens}</td>
                          <td className="py-2.5 px-2 font-mono text-emerald-600 font-bold">{m.successRate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="space-y-3 pt-2">
                  {membersData.map((m) => {
                    const pct = Math.min(100, Math.round((m.spend / currentSpend) * 100));
                    return (
                      <div key={m.name} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span>{m.name} ({m.dept})</span>
                          <span className="font-mono text-blue-600">${m.spend.toFixed(2)} ({pct}%)</span>
                        </div>
                        <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-2.5 rounded-full overflow-hidden">
                          <div className="bg-blue-600 h-full rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* SECTION 6 & SECTION 7: TOP VIRTUAL KEYS & TOP MODELS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* TOP VIRTUAL KEYS (WITH EXPANDABLE SEARCH) */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 shadow-2xs space-y-4">
              <AnalyticsWidgetHeader
                title="Top Virtual Keys"
                subtitle="Virtual key alias usage and cost consumption"
                icon={Key}
                iconColor="text-amber-500"
                searchValue={keysSearch}
                onSearchChange={setKeysSearch}
                searchPlaceholder="Search virtual keys..."
                viewMode={keysView}
                onViewModeChange={setKeysView}
              />

              {keysView === "table" ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-neutral-100 dark:border-neutral-800 text-neutral-400 font-semibold">
                        <th className="py-2.5 px-2">Virtual Key Alias</th>
                        <th className="py-2.5 px-2">Key ID</th>
                        <th className="py-2.5 px-2">Spend (USD) ↑↓</th>
                        <th className="py-2.5 px-2">Requests</th>
                        <th className="py-2.5 px-2">Tokens</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60 font-medium">
                      {filteredKeys.map((k) => (
                        <tr key={k.keyId} className="hover:bg-neutral-50/60 dark:hover:bg-neutral-800/40 transition-colors">
                          <td className="py-2.5 px-2 font-bold text-neutral-900 dark:text-white">{k.alias}</td>
                          <td className="py-2.5 px-2 font-mono text-neutral-400">{k.keyId}</td>
                          <td className="py-2.5 px-2 font-mono font-bold text-amber-600 dark:text-amber-400">${k.spend.toFixed(2)}</td>
                          <td className="py-2.5 px-2 font-mono text-neutral-600 dark:text-neutral-400">{k.requests}</td>
                          <td className="py-2.5 px-2 font-mono text-neutral-600 dark:text-neutral-400">{k.tokens}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="space-y-3 pt-2">
                  {filteredKeys.map((k) => {
                    const pct = Math.min(100, Math.round((k.spend / currentSpend) * 100));
                    return (
                      <div key={k.keyId} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span>{k.alias}</span>
                          <span className="font-mono text-amber-600">${k.spend.toFixed(2)} ({pct}%)</span>
                        </div>
                        <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-2.5 rounded-full overflow-hidden">
                          <div className="bg-amber-500 h-full rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* TOP MODELS (WITH EXPANDABLE SEARCH) */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 shadow-2xs space-y-4">
              <AnalyticsWidgetHeader
                title="Top Models"
                subtitle="Spend breakdown across deployed AI model endpoints"
                icon={Cpu}
                iconColor="text-emerald-600"
                searchValue={modelsSearch}
                onSearchChange={setModelsSearch}
                searchPlaceholder="Search models..."
                viewMode={modelsView}
                onViewModeChange={setModelsView}
              />

              {modelsView === "table" ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-neutral-100 dark:border-neutral-800 text-neutral-400 font-semibold">
                        <th className="py-2.5 px-2">Model</th>
                        <th className="py-2.5 px-2">Spend ↑↓</th>
                        <th className="py-2.5 px-2">Successful Req.</th>
                        <th className="py-2.5 px-2">Failed Req.</th>
                        <th className="py-2.5 px-2">Tokens</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60 font-medium">
                      {filteredModels.map((m) => (
                        <tr key={m.name} className="hover:bg-neutral-50/60 dark:hover:bg-neutral-800/40 transition-colors">
                          <td className="py-2.5 px-2">
                            <div className="font-bold text-neutral-900 dark:text-white font-mono">{m.name}</div>
                            <div className="text-[10px] text-neutral-400">{m.provider}</div>
                          </td>
                          <td className="py-2.5 px-2 font-mono font-bold text-emerald-600 dark:text-emerald-400">${m.spend.toFixed(2)}</td>
                          <td className="py-2.5 px-2 font-mono text-emerald-600 font-semibold">{m.successReq}</td>
                          <td className="py-2.5 px-2 font-mono text-rose-500 font-semibold">{m.failedReq}</td>
                          <td className="py-2.5 px-2 font-mono text-neutral-600 dark:text-neutral-400">{m.tokens}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="space-y-3 pt-2">
                  {filteredModels.map((m) => {
                    const pct = Math.min(100, Math.round((m.spend / currentSpend) * 100));
                    return (
                      <div key={m.name} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span>{m.name} ({m.provider})</span>
                          <span className="font-mono text-emerald-600">${m.spend.toFixed(2)} ({pct}%)</span>
                        </div>
                        <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-2.5 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* SECTION 8: PROVIDER USAGE & COST DISTRIBUTION (35% LARGER DONUT & PERFECT VERTICAL ALIGNMENT) */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
              <div>
                <h3 className="font-bold text-sm text-neutral-900 dark:text-white flex items-center gap-2">
                  <PieChart className="w-4 h-4 text-emerald-600" />
                  <span>Provider Usage & Cost Distribution</span>
                </h3>
                <p className="text-[11px] text-neutral-500 mt-0.5">
                  Aggregated spending split across foundational AI model providers (OpenAI, Anthropic, Google Gemini)
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-2">
              {/* 35% Larger Donut Chart Visual (5 cols) */}
              <div className="lg:col-span-4 flex items-center justify-center relative py-4">
                <svg className="w-56 h-56 -rotate-90 transform" viewBox="0 0 100 100">
                  {/* OpenAI 63.1% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="#10b981"
                    strokeWidth="14"
                    fill="transparent"
                    strokeDasharray="150.66 238.76"
                    strokeDashoffset="0"
                  />
                  {/* Anthropic 30.8% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="#f59e0b"
                    strokeWidth="14"
                    fill="transparent"
                    strokeDasharray="73.54 238.76"
                    strokeDashoffset="-150.66"
                  />
                  {/* Google Gemini 6.1% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="#3b82f6"
                    strokeWidth="14"
                    fill="transparent"
                    strokeDasharray="14.56 238.76"
                    strokeDashoffset="-224.20"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center pointer-events-none text-center">
                  <span className="text-[10px] font-bold text-neutral-400 tracking-wider">TOTAL SPEND</span>
                  <span className="text-base font-extrabold text-neutral-900 dark:text-white font-mono">${currentSpend.toFixed(2)}</span>
                </div>
              </div>

              {/* Provider Breakdown Cards with Vertically Aligned Metrics (7 cols) */}
              <div className="lg:col-span-8 space-y-3.5">
                {/* OpenAI */}
                <div className="p-4 bg-neutral-50/70 dark:bg-neutral-800/40 rounded-xl border border-neutral-200/80 dark:border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 font-bold text-neutral-900 dark:text-white">
                      <span className="w-3 h-3 rounded-full bg-emerald-500 flex-shrink-0" />
                      <span className="text-sm">OpenAI</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50">
                        63.1% of spend
                      </span>
                    </div>
                    <div className="font-mono font-bold text-base text-neutral-900 dark:text-white">$787.00</div>
                  </div>
                  <div className="w-full bg-neutral-200 dark:bg-neutral-700 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: "63.1%" }} />
                  </div>
                  <div className="flex justify-between items-center text-xs text-neutral-400 font-mono pt-0.5">
                    <span>Requests: <strong className="text-neutral-700 dark:text-neutral-300">510,190</strong></span>
                    <span>Tokens: <strong className="text-neutral-700 dark:text-neutral-300">90.5M</strong></span>
                  </div>
                </div>

                {/* Anthropic */}
                <div className="p-4 bg-neutral-50/70 dark:bg-neutral-800/40 rounded-xl border border-neutral-200/80 dark:border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 font-bold text-neutral-900 dark:text-white">
                      <span className="w-3 h-3 rounded-full bg-amber-500 flex-shrink-0" />
                      <span className="text-sm">Anthropic</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200/50">
                        30.8% of spend
                      </span>
                    </div>
                    <div className="font-mono font-bold text-base text-neutral-900 dark:text-white">$384.50</div>
                  </div>
                  <div className="w-full bg-neutral-200 dark:bg-neutral-700 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: "30.8%" }} />
                  </div>
                  <div className="flex justify-between items-center text-xs text-neutral-400 font-mono pt-0.5">
                    <span>Requests: <strong className="text-neutral-700 dark:text-neutral-300">280,000</strong></span>
                    <span>Tokens: <strong className="text-neutral-700 dark:text-neutral-300">44.2M</strong></span>
                  </div>
                </div>

                {/* Google Gemini */}
                <div className="p-4 bg-neutral-50/70 dark:bg-neutral-800/40 rounded-xl border border-neutral-200/80 dark:border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 font-bold text-neutral-900 dark:text-white">
                      <span className="w-3 h-3 rounded-full bg-blue-500 flex-shrink-0" />
                      <span className="text-sm">Google Gemini</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/50">
                        6.1% of spend
                      </span>
                    </div>
                    <div className="font-mono font-bold text-base text-neutral-900 dark:text-white">$76.40</div>
                  </div>
                  <div className="w-full bg-neutral-200 dark:bg-neutral-700 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: "6.1%" }} />
                  </div>
                  <div className="flex justify-between items-center text-xs text-neutral-400 font-mono pt-0.5">
                    <span>Requests: <strong className="text-neutral-700 dark:text-neutral-300">52,000</strong></span>
                    <span>Tokens: <strong className="text-neutral-700 dark:text-neutral-300">8.1M</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
