import { cn } from "@/lib/utils";

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <section className={cn("rounded-2xl border border-border bg-card p-5 shadow-soft", className)}>{children}</section>;
}

export function CardHeader({ title, eyebrow, action }: { title: string; eyebrow?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-start justify-between gap-4">
      <div>
        {eyebrow ? <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">{eyebrow}</p> : null}
        <h2 className="mt-1 text-lg font-bold text-foreground">{title}</h2>
      </div>
      {action}
    </div>
  );
}
