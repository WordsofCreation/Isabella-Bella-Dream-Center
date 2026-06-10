import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { cookieLaunches } from "@/lib/data/mock-data";
import { cn, currency } from "@/lib/utils";
import type { CookieLaunch, LaunchStatus } from "@/lib/types/domain";

const statusStyles: Record<
  LaunchStatus,
  {
    badge: "neutral" | "success" | "warning" | "danger" | "premium" | "dark";
    dot: string;
    panel: string;
  }
> = {
  Planning: {
    badge: "warning",
    dot: "bg-amber-500",
    panel: "border-amber-100 bg-amber-50/60",
  },
  Ready: {
    badge: "success",
    dot: "bg-emerald-600",
    panel: "border-emerald-100 bg-emerald-50/60",
  },
  Live: {
    badge: "dark",
    dot: "bg-[#3f2a21]",
    panel: "border-[#3f2a21]/10 bg-[#3f2a21]/[0.06]",
  },
  Complete: {
    badge: "neutral",
    dot: "bg-stone-500",
    panel: "border-stone-200 bg-stone-50/70",
  },
  Delayed: {
    badge: "danger",
    dot: "bg-rose-500",
    panel: "border-rose-100 bg-rose-50/60",
  },
};

const readinessColumns = [
  "Planning",
  "Waiting on Costing",
  "Waiting on Photos",
  "Ready",
  "Live",
] as const;

const timelineSteps = [
  "Recipe Approved",
  "Costing Complete",
  "Photos Complete",
  "Marketing Scheduled",
  "Production Scheduled",
  "Launch Live",
  "Post-Launch Review",
] as const;

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}

function getSummaryCards() {
  const currentMonth = "2026-06";

  return [
    {
      label: "Upcoming Launches",
      value: cookieLaunches.filter((launch) => launch.status !== "Complete").length,
      detail: "Active drops moving through launch planning",
      accentClass: "bg-[#8b5436]",
    },
    {
      label: "Launches Ready",
      value: cookieLaunches.filter((launch) => launch.status === "Ready").length,
      detail: "Fully prepared for release or preorder",
      accentClass: "bg-emerald-600",
    },
    {
      label: "Needs Costing",
      value: cookieLaunches.filter(
        (launch) => !launch.checklist.find((item) => item.label === "Costing complete")?.complete,
      ).length,
      detail: "Menu price and margin still need review",
      accentClass: "bg-amber-500",
    },
    {
      label: "Needs Photos",
      value: cookieLaunches.filter(
        (launch) => !launch.checklist.find((item) => item.label === "Product photos complete")?.complete,
      ).length,
      detail: "Visual assets required before promotion",
      accentClass: "bg-rose-500",
    },
    {
      label: "Launches This Month",
      value: cookieLaunches.filter((launch) => launch.launchDate.startsWith(currentMonth)).length,
      detail: "June 2026 launch activity in mock data",
      accentClass: "bg-[#d69b76]",
    },
  ] as const;
}

function LaunchPlanCard({ launch }: { launch: CookieLaunch }) {
  const styles = statusStyles[launch.status];
  const completedCount = launch.checklist.filter((item) => item.complete).length;

  return (
    <Card className="overflow-hidden bg-white/78 p-0">
      <div className="border-b border-border bg-gradient-to-r from-[#fffaf2] to-white px-5 py-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={styles.badge}>{launch.status}</Badge>
              <Badge variant="premium">{launch.targetChannel}</Badge>
            </div>
            <h3 className="mt-3 font-serif text-2xl font-bold tracking-tight text-foreground">
              {launch.cookieName}
            </h3>
            <p className="mt-1 text-sm font-semibold text-[#7d4a2f]">
              {launch.launchName}
            </p>
          </div>
          <div className={cn("rounded-2xl border px-4 py-3 text-sm", styles.panel)}>
            <p className="font-bold text-foreground">Next action</p>
            <p className="mt-1 max-w-md leading-6 text-muted-foreground">{launch.nextAction}</p>
          </div>
        </div>
      </div>

      <div className="space-y-5 p-5">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <LaunchDetail label="Launch date" value={formatDate(launch.launchDate)} />
          <LaunchDetail label="Production date" value={formatDate(launch.productionDate)} />
          <LaunchDetail label="Expected batch" value={`${launch.expectedBatchQuantity} cookies`} />
          <LaunchDetail label="Menu price" value={currency(launch.menuPrice)} />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <p className="text-sm font-bold text-foreground">Checklist progress</p>
            <p className="text-sm font-bold text-[#6f422c]">
              {launch.checklistProgress}% · {completedCount}/{launch.checklist.length}
            </p>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#8b5436] to-[#d69b76]"
              style={{ width: `${launch.checklistProgress}%` }}
            />
          </div>
        </div>

        <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-5">
          {launch.checklist.map((item) => (
            <div
              key={item.id}
              className={cn(
                "flex items-start gap-2 rounded-2xl border px-3 py-2.5 text-sm",
                item.complete
                  ? "border-emerald-100 bg-emerald-50/70 text-emerald-900"
                  : "border-border bg-white/70 text-muted-foreground",
              )}
            >
              <span
                className={cn(
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold",
                  item.complete ? "bg-emerald-600 text-white" : "bg-muted text-muted-foreground",
                )}
              >
                {item.complete ? "✓" : "·"}
              </span>
              <span className="leading-5">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 border-t border-border pt-4">
          <Button type="button" size="sm">Edit Launch</Button>
          <Button type="button" size="sm" variant="outline">Schedule Production</Button>
          <Button type="button" size="sm" variant="outline">Create Marketing Tasks</Button>
          <Button type="button" size="sm" variant="secondary">Mark Ready</Button>
        </div>
      </div>
    </Card>
  );
}

function LaunchDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-white/70 px-4 py-3">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-bold text-foreground">{value}</p>
    </div>
  );
}

function EmptyLaunchState() {
  return (
    <Card className="border-dashed bg-white/60 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">No upcoming launches</p>
      <h3 className="mt-2 font-serif text-2xl font-bold tracking-tight">Build your next cookie drop plan</h3>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
        When Isabella Bella has no upcoming launches, this space can prompt her to create a launch plan from an approved recipe and schedule production, marketing, and release milestones.
      </p>
      <Button type="button" className="mt-4">Create Launch Plan</Button>
    </Card>
  );
}

export default function LaunchPlannerPage() {
  const summaryCards = getSummaryCards();

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          eyebrow="Launch planner"
          title="Launch Planner"
          description="Plan cookie drops from recipe approval through production, marketing, and release."
          actions={
            <>
              <Button type="button">Create Launch Plan</Button>
              <Button type="button" variant="outline">View Launch Calendar</Button>
            </>
          }
        />

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {summaryCards.map((card) => (
            <Card key={card.label} className="bg-white/75">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-serif text-4xl font-bold tracking-tight">{card.value}</p>
                  <p className="mt-1 text-sm font-semibold text-foreground">{card.label}</p>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">{card.detail}</p>
                </div>
                <span className={`mt-1 h-10 w-2 rounded-full ${card.accentClass}`} />
              </div>
            </Card>
          ))}
        </section>

        {cookieLaunches.length > 0 ? (
          <section className="grid gap-5 xl:grid-cols-2">
            {cookieLaunches.map((launch) => (
              <LaunchPlanCard key={launch.id} launch={launch} />
            ))}
          </section>
        ) : (
          <EmptyLaunchState />
        )}

        <section className="grid gap-6 2xl:grid-cols-[1fr_0.62fr]">
          <Card className="bg-white/72">
            <CardHeader title="Launch Readiness Board" eyebrow="Operational queue" />
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
              {readinessColumns.map((column) => {
                const launches = cookieLaunches.filter((launch) => launch.readinessColumn === column);

                return (
                  <div key={column} className="rounded-2xl border border-border bg-[#fffaf2]/70 p-3">
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <h3 className="text-sm font-bold text-foreground">{column}</h3>
                      <span className="rounded-full bg-white px-2 py-0.5 text-xs font-bold text-muted-foreground">
                        {launches.length}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {launches.map((launch) => (
                        <div key={launch.id} className="rounded-xl border border-border bg-white/80 p-3 shadow-sm">
                          <div className="flex items-center gap-2">
                            <span className={cn("h-2.5 w-2.5 rounded-full", statusStyles[launch.status].dot)} />
                            <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                              {launch.launchName}
                            </p>
                          </div>
                          <p className="mt-1 text-sm font-bold leading-5 text-foreground">{launch.cookieName}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className="border-[#d8b08c]/60 bg-[#fffaf2]">
            <CardHeader title="Launch Timeline" eyebrow="Ideal flow" />
            <ol className="space-y-3">
              {timelineSteps.map((step, index) => (
                <li key={step} className="flex gap-3 rounded-2xl border border-[#ead1ba] bg-white/70 p-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#8b5436] text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-foreground">{step}</p>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      {index === 0
                        ? "Start only after the recipe card is approved for customer-facing production."
                        : "Confirm this milestone before moving the drop into the next launch phase."}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}
