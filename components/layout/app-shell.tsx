"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationItems, overviewStats } from "@/components/layout/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen cream-gradient lg:flex">
      <aside className="sidebar-gradient sticky top-0 z-30 flex h-auto flex-col border-r border-white/10 px-4 py-5 text-white lg:h-screen lg:w-72">
        <div className="mb-7 flex items-center gap-3 px-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/10 font-serif text-xl font-bold shadow-lg">IB</div>
          <div>
            <p className="font-serif text-xl font-bold tracking-tight">Isabella Bella</p>
            <p className="text-xs uppercase tracking-[0.24em] text-white/48">Dream Center</p>
          </div>
        </div>

        <nav className="grid gap-1 lg:flex-1">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold text-white/68 transition hover:bg-white/10 hover:text-white",
                  isActive && "bg-white/14 text-white shadow-inner",
                )}
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-white/10 text-[10px] font-bold text-[#d7a279]">{item.icon}</span>
                {item.title}
              </Link>
            );
          })}
        </nav>

        <div className="mt-6 hidden rounded-3xl border border-white/10 bg-white/[0.07] p-4 lg:block">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-white/45">This week</p>
          <div className="space-y-3">
            {overviewStats.map((stat) => {
              return (
                <div key={stat.label} className="flex items-center justify-between gap-2 text-sm">
                  <span className="flex items-center gap-2 text-white/70"><span className="flex h-5 w-5 items-center justify-center rounded-md bg-white/10 text-[10px] font-bold text-[#d7a279]">{stat.icon}</span>{stat.label}</span>
                  <span className="font-bold text-white">{stat.value}</span>
                </div>
              );
            })}
          </div>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 border-b border-border/70 bg-[#fbf6ed]/86 px-4 py-4 backdrop-blur md:px-8">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-muted-foreground">Premium bakery command center</p>
              <h1 className="font-serif text-2xl font-bold tracking-tight md:text-3xl">Isabella Bella Dream Center</h1>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative min-w-0 sm:w-80">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">⌕</span>
                <input className="h-10 w-full rounded-full border border-border bg-card pl-9 pr-4 text-sm outline-none transition focus:ring-2 focus:ring-ring" placeholder="Search recipes, launches, orders…" />
              </div>
              <Button variant="accent" className="gap-2"><span>＋</span>Quick Capture</Button>
              <Button variant="outline" size="md" aria-label="Notifications">Alerts</Button>
              <div className="flex items-center gap-3 rounded-full border border-border bg-card py-1.5 pl-2 pr-4 shadow-sm">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">IB</div>
                <div className="leading-tight">
                  <p className="text-sm font-bold">Isabella</p>
                  <p className="text-xs text-muted-foreground">Founder</p>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="px-4 py-6 md:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
