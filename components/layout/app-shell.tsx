"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { navigationItems, overviewStats } from "@/components/layout/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const actionRoutes: Record<string, string> = {
  "plan production day": "/production-calendar",
  "create cookie test": "/recipe-testing",
  "add cookie idea": "/cookie-ideas",
  "add final recipe": "/recipes",
  "add ingredient": "/ingredient-costing",
  "add production block": "/production-calendar",
  "create launch plan": "/launch-planner",
  "view launch calendar": "/production-calendar",
  "add order": "/orders",
  "add campaign task": "/marketing-calendar",
  "use template": "/templates",
};

const alerts = [
  "2 orders need payment follow-up before pickup.",
  "Pistachio Rose testing still needs a flavor adjustment note.",
  "Espresso Toffee costing should be reviewed before launch planning.",
];

function normalizeAction(label: string) {
  return label.replace(/[＋+]/g, "").replace(/\s+/g, " ").trim().toLowerCase();
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const activeItem = navigationItems.find((item) => item.href === pathname) ?? navigationItems[0];
  const [searchTerm, setSearchTerm] = useState("");
  const [captureOpen, setCaptureOpen] = useState(false);
  const [alertsOpen, setAlertsOpen] = useState(false);
  const [captureText, setCaptureText] = useState("");
  const [activityLog, setActivityLog] = useState<string[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  const searchResults = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    if (!term) {
      return [];
    }

    return navigationItems.filter((item) =>
      `${item.title} ${item.href}`.toLowerCase().includes(term),
    );
  }, [searchTerm]);

  function pushActivity(message: string) {
    setActivityLog((current) => [message, ...current].slice(0, 5));
    setToast(message);
  }

  function runWorkspaceAction(label: string) {
    const normalized = normalizeAction(label);

    if (normalized.includes("print")) {
      pushActivity("Prepared the current workspace for printing.");
      window.print();
      return;
    }

    if (normalized.includes("export")) {
      const blob = new Blob(
        [
          JSON.stringify(
            {
              workspace: "Isabella Bella Dream Center",
              exportedAt: new Date().toISOString(),
              page: activeItem.title,
              action: label,
            },
            null,
            2,
          ),
        ],
        { type: "application/json" },
      );
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "isabella-bella-workspace-export.json";
      link.click();
      URL.revokeObjectURL(url);
      pushActivity("Downloaded a workspace JSON export.");
      return;
    }

    const route = actionRoutes[normalized];

    if (route && route !== pathname) {
      pushActivity(`Opened ${label}.`);
      router.push(route);
      return;
    }

    if (normalized.includes("quick capture") || normalized.includes("create") || normalized.includes("add")) {
      setCaptureOpen(true);
      pushActivity(`${label} opened the quick capture tray.`);
      return;
    }

    pushActivity(`${label} is ready for review in this local workspace.`);
  }

  useEffect(() => {
    function handleWorkspaceAction(event: Event) {
      const detail = (event as CustomEvent<{ label?: string }>).detail;
      runWorkspaceAction(detail?.label ?? "Workspace action");
    }

    window.addEventListener("ibdc:workspace-action", handleWorkspaceAction);
    return () => window.removeEventListener("ibdc:workspace-action", handleWorkspaceAction);
  });

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timeout = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  function saveCapture() {
    const text = captureText.trim();

    if (!text) {
      pushActivity("Type a quick note before saving the capture.");
      return;
    }

    pushActivity(`Saved quick capture: ${text}`);
    setCaptureText("");
    setCaptureOpen(false);
  }

  function submitSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (searchResults[0]) {
      router.push(searchResults[0].href);
      pushActivity(`Search opened ${searchResults[0].title}.`);
      setSearchTerm("");
      return;
    }

    if (searchTerm.trim()) {
      pushActivity(`No page match found for “${searchTerm.trim()}”.`);
    }
  }

  return (
    <div className="min-h-screen cream-gradient lg:flex">
      <aside className="sidebar-gradient sticky top-0 z-30 flex h-auto flex-col border-r border-white/10 px-4 py-4 text-white lg:h-screen lg:w-72 lg:py-5">
        <div className="mb-4 flex items-center gap-3 px-2 lg:mb-7">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/10 font-serif text-xl font-bold shadow-lg">IB</div>
          <div>
            <p className="font-serif text-xl font-bold tracking-tight">Isabella Bella</p>
            <p className="text-xs uppercase tracking-[0.24em] text-white/48">Dream Center</p>
          </div>
        </div>

        <nav className="flex gap-1 overflow-x-auto pb-1 lg:grid lg:flex-1 lg:overflow-visible lg:pb-0" aria-label="Primary workspace navigation">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex shrink-0 items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold text-white/68 transition hover:bg-white/10 hover:text-white",
                  isActive && "bg-white/14 text-white shadow-inner",
                )}
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-white/10 text-[10px] font-bold text-[#d7a279]">{item.icon}</span>
                <span className="whitespace-nowrap">{item.title}</span>
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
              <h1 className="font-serif text-2xl font-bold tracking-tight md:text-3xl">{activeItem.title}</h1>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <form className="relative min-w-0 sm:w-80" onSubmit={submitSearch}>
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">⌕</span>
                <input
                  className="h-10 w-full rounded-full border border-border bg-card pl-9 pr-4 text-sm outline-none transition focus:ring-2 focus:ring-ring"
                  placeholder="Search workspace sections…"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  aria-label="Search workspace sections"
                />
                {searchResults.length > 0 ? (
                  <div className="absolute right-0 top-12 z-40 w-full overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
                    {searchResults.map((result) => (
                      <button
                        key={result.href}
                        className="block w-full px-4 py-3 text-left text-sm font-semibold hover:bg-muted"
                        type="button"
                        onClick={() => {
                          router.push(result.href);
                          setSearchTerm("");
                          pushActivity(`Search opened ${result.title}.`);
                        }}
                      >
                        {result.title}
                      </button>
                    ))}
                  </div>
                ) : null}
              </form>
              <Button variant="accent" className="gap-2" onClick={() => setCaptureOpen((open) => !open)}><span>＋</span>Quick Capture</Button>
              <Button variant="outline" size="md" aria-label="Notifications" onClick={() => setAlertsOpen((open) => !open)}>Alerts</Button>
              <div className="flex items-center gap-3 rounded-full border border-border bg-card py-1.5 pl-2 pr-4 shadow-sm">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">IB</div>
                <div className="leading-tight">
                  <p className="text-sm font-bold">Isabella</p>
                  <p className="text-xs text-muted-foreground">Founder</p>
                </div>
              </div>
            </div>
          </div>

          {captureOpen ? (
            <div className="mt-4 rounded-3xl border border-border bg-card p-4 shadow-soft">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
                <label className="min-w-0 flex-1 text-sm font-bold text-foreground">
                  Quick capture note
                  <textarea
                    className="mt-2 min-h-20 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm font-normal outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Add an idea, production note, order reminder, or launch task…"
                    value={captureText}
                    onChange={(event) => setCaptureText(event.target.value)}
                  />
                </label>
                <div className="flex gap-2">
                  <Button type="button" onClick={saveCapture}>Save Note</Button>
                  <Button type="button" variant="outline" onClick={() => setCaptureOpen(false)}>Close</Button>
                </div>
              </div>
              {activityLog.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {activityLog.map((item) => <Badge key={item} variant="premium">{item}</Badge>)}
                </div>
              ) : null}
            </div>
          ) : null}

          {alertsOpen ? (
            <div className="mt-4 grid gap-2 rounded-3xl border border-border bg-card p-4 shadow-soft md:grid-cols-3">
              {alerts.map((alert) => (
                <div key={alert} className="rounded-2xl bg-muted/55 p-3 text-sm font-semibold text-foreground">{alert}</div>
              ))}
            </div>
          ) : null}
        </header>
        <main className="px-4 py-6 md:px-8 lg:py-8">{children}</main>
      </div>

      {toast ? (
        <div className="fixed bottom-5 right-5 z-50 max-w-sm rounded-2xl border border-[#d8b08c] bg-[#332017] px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_60px_rgba(47,31,23,0.28)]">
          {toast}
        </div>
      ) : null}
    </div>
  );
}
