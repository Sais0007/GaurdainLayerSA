import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, X, Check } from "lucide-react";

export interface DropdownOption {
  id: string;
  name: string;
  badge?: string;
}

export interface MultiSelectSearchableDropdownProps {
  options: DropdownOption[];
  selectedValues: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
}

export function MultiSelectSearchableDropdown({
  options,
  selectedValues,
  onChange,
  placeholder = "Select models...",
}: MultiSelectSearchableDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Dismiss dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter(
    (opt) =>
      opt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (opt.badge && opt.badge.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const toggleOption = (val: string) => {
    if (selectedValues.includes(val)) {
      onChange(selectedValues.filter((v) => v !== val));
    } else {
      onChange([...selectedValues, val]);
    }
  };

  const removeValue = (val: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(selectedValues.filter((v) => v !== val));
  };

  const visibleChips = selectedValues.slice(0, 2);
  const hiddenCount = selectedValues.length - visibleChips.length;

  return (
    <div className="relative w-full text-xs" ref={containerRef}>
      {/* Single Integrated Control Box (Input + Chips + Controls) */}
      <div
        onClick={() => {
          setIsOpen(true);
          inputRef.current?.focus();
        }}
        className={`w-full min-h-[42px] px-3 py-1.5 bg-neutral-50 dark:bg-neutral-800 border transition-all rounded-lg text-xs flex items-center justify-between cursor-text select-none ${
          isOpen
            ? "border-primary-500 ring-2 ring-primary-500/20 bg-white dark:bg-neutral-900 shadow-xs"
            : "border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600"
        }`}
      >
        <div className="flex flex-wrap gap-1.5 items-center flex-1 min-w-0 pr-2">
          {/* Selected Chips */}
          {visibleChips.map((val) => (
            <span
              key={val}
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-primary-50 dark:bg-primary-950/80 text-primary-700 dark:text-primary-300 text-[11px] font-semibold border border-primary-200/70 dark:border-primary-800/70 shrink-0"
            >
              <span className="truncate max-w-[120px]">{val}</span>
              <button
                type="button"
                onClick={(e) => removeValue(val, e)}
                className="hover:text-rose-600 dark:hover:text-rose-400 p-0.5 rounded transition-colors"
                title={`Remove ${val}`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {hiddenCount > 0 && (
            <div className="relative inline-block">
              <span
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className="px-2 py-0.5 rounded-md bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-[11px] font-bold cursor-pointer shrink-0 hover:bg-neutral-300 transition-colors"
              >
                +{hiddenCount} More
              </span>

              {/* Hover Tooltip showing all hidden selected items */}
              {showTooltip && (
                <div className="absolute left-0 bottom-full mb-1.5 z-50 w-48 p-2 bg-neutral-900 text-white text-[11px] rounded-lg shadow-xl border border-neutral-700 animate-fadeIn pointer-events-none">
                  <div className="font-semibold text-neutral-300 mb-1 border-b border-neutral-800 pb-0.5">
                    Selected Models ({selectedValues.length}):
                  </div>
                  <div className="max-h-32 overflow-y-auto space-y-0.5 leading-tight text-neutral-200">
                    {selectedValues.map((name) => (
                      <div key={name} className="truncate">• {name}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Integrated Search Input inside the field */}
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (!isOpen) setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder={selectedValues.length === 0 ? placeholder : "Search models..."}
            className="flex-1 min-w-[90px] bg-transparent outline-none text-neutral-900 dark:text-white placeholder:text-neutral-400 text-xs py-0.5 font-medium"
          />
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-1.5 text-neutral-400 shrink-0 ml-1">
          {(selectedValues.length > 0 || searchQuery) && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange([]);
                setSearchQuery("");
              }}
              className="p-1 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
              title="Clear all"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180 text-primary-600" : ""}`}
          />
        </div>
      </div>

      {/* Floating Options Panel (Single Clean List) */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-2xl p-2 text-xs animate-fadeIn">
          {/* Quick Toolbar */}
          <div className="flex items-center justify-between px-2 py-1 border-b border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-500 font-medium mb-1">
            <span>
              {selectedValues.length} of {options.length} Selected
            </span>
            <div className="flex gap-2.5">
              {selectedValues.length < options.length && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange(options.map((o) => o.name));
                  }}
                  className="text-primary-600 dark:text-primary-400 font-bold hover:underline"
                >
                  Select All
                </button>
              )}
              {selectedValues.length > 0 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange([]);
                  }}
                  className="text-rose-600 dark:text-rose-400 font-bold hover:underline"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>

          {/* Options List */}
          <div className="max-h-56 overflow-y-auto space-y-0.5 pr-1">
            {filteredOptions.length === 0 ? (
              <div className="py-4 text-center text-neutral-400 text-xs font-medium">
                No models matching "{searchQuery}"
              </div>
            ) : (
              filteredOptions.map((opt) => {
                const isSelected = selectedValues.includes(opt.name);
                return (
                  <div
                    key={opt.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleOption(opt.name);
                    }}
                    className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-colors cursor-pointer select-none ${
                      isSelected
                        ? "bg-primary-50/80 dark:bg-primary-950/50 text-primary-900 dark:text-primary-100 font-semibold"
                        : "hover:bg-neutral-50 dark:hover:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center transition-colors shrink-0 ${
                        isSelected
                          ? "bg-primary-600 border-primary-600 text-white"
                          : "border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900"
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span className="flex-1 text-xs truncate">{opt.name}</span>
                    {opt.badge && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500 border border-neutral-200/50 shrink-0">
                        {opt.badge}
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}


