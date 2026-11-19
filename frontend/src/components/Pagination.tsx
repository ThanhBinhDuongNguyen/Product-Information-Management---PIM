"use client";

export function Pagination({ page, totalItems, pageSize, onChange }: { page: number; totalItems: number; pageSize: number; onChange: (page: number) => void }) {
  const pages = Math.max(1, Math.ceil(totalItems / pageSize));
  if (pages === 1) return null;
  const items = Array.from({ length: pages }, (_, index) => index + 1).slice(Math.max(0, page - 3), Math.max(0, page - 3) + 5);
  return <nav aria-label="Pagination" className="mt-8 flex items-center justify-center gap-2"><button disabled={page === 1} onClick={() => onChange(page - 1)} className="rounded-full border border-[#c7d0df] px-3 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-40">Previous</button>{items.map(item => <button key={item} aria-current={item === page ? "page" : undefined} onClick={() => onChange(item)} className={item === page ? "rounded-full border border-[#9d4ed1] px-4 py-1 text-sm text-[#9d4ed1]" : "rounded-full border border-[#c7d0df] px-4 py-1 text-sm text-[#58708e]"}>{item}</button>)}<button disabled={page === pages} onClick={() => onChange(page + 1)} className="rounded-full border border-[#c7d0df] px-3 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-40">Next</button></nav>;
}
