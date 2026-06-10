import { cn } from "@/lib/utils";

const variants = {
  neutral: "border-stone-200 bg-stone-100 text-stone-700",
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  warning: "border-amber-200 bg-amber-50 text-amber-800",
  danger: "border-rose-200 bg-rose-50 text-rose-700",
  premium: "border-[#d8b08c] bg-[#fff4e8] text-[#7d4a2f]",
  dark: "border-white/10 bg-white/10 text-white/85",
} as const;

export function Badge({ children, variant = "neutral", className }: { children: React.ReactNode; variant?: keyof typeof variants; className?: string }) {
  return <span className={cn("inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold", variants[variant], className)}>{children}</span>;
}
