"use client";

export type FilterConfig = { id: string; label: string; options: string[] };

export function FilterPanel({ filters, values, onChange, variant = "sidebar" }: { filters: FilterConfig[]; values: Record<string, string>; onChange: (id: string, value: string) => void; variant?: "sidebar" | "inline" }) {
  return <div className={variant === "inline" ? "flex flex-wrap items-center gap-x-4 gap-y-3" : "space-y-7"}>{filters.map(filter => <label key={filter.id} className={variant === "inline" ? "text-sm" : "block"}><span className={variant === "inline" ? "mr-1" : "mb-2 block text-sm text-[#7588a0]"}>{filter.label}</span><select value={values[filter.id] ?? "All"} onChange={event => onChange(filter.id, event.target.value)} className={variant === "inline" ? "bg-transparent text-[#9d4ed1] outline-none" : "w-full bg-transparent font-medium outline-none"}>{filter.options.map(option => <option key={option}>{option}</option>)}</select></label>)}</div>;
}
