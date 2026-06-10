import { AppShell } from "@/components/layout/app-shell";
import { StatusBadge } from "@/components/shared/status";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import {
  activeRecipeTests,
  dashboardMetrics,
  foodCostSnapshots,
  productionTasks,
  topPriorities,
  upcomingLaunches,
} from "@/lib/data/mock-data";

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <Card className="relative overflow-hidden border-[#dfc5ad] bg-[#fffaf3] p-6 shadow-[0_24px_80px_rgba(64,38,24,0.10)] md:p-8">
          <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-28 w-1/2 bg-gradient-to-l from-[#f2d7be]/50 to-transparent" />
          <div className="relative flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#9c6f52]">Founder command center</p>
              <h2 className="mt-3 font-serif text-4xl font-bold tracking-tight text-[#2f1f17] md:text-5xl">
                Isabella Bella Dream Center
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
                Today’s production, testing, launches, and priorities.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="shadow-sm">Plan Production Day</Button>
              <Button size="lg" variant="outline" className="bg-white/70">Create Cookie Test</Button>
            </div>
          </div>
        </Card>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {dashboardMetrics.map((metric) => (
            <Card key={metric.label} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">{metric.label}</p>
                  <p className="mt-3 text-3xl font-bold tracking-tight text-foreground">{metric.value}</p>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#f5e6d6] text-xs font-bold text-[#8b5436]">
                  {metric.icon}
                </span>
              </div>
              <p className="mt-3 text-sm leading-5 text-muted-foreground">{metric.detail}</p>
            </Card>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
          <Card>
            <CardHeader title="Today’s Production" eyebrow="Kitchen schedule" />
            <div className="space-y-3">
              {productionTasks.map((task) => (
                <div key={task.id} className="rounded-2xl border border-border bg-white/55 p-4 transition hover:border-[#d9b392] hover:bg-white/80">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-foreground">{task.name}</h3>
                      <p className="mt-1 text-sm font-semibold text-muted-foreground">{task.timeBlock}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <StatusBadge value={task.status} />
                      <Badge variant={priorityVariant[task.priority]}>{task.priority} Priority</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-[#332017] text-white">
            <div className="mb-4">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/45">Founder focus</p>
              <h2 className="mt-1 text-lg font-bold text-white">Top Priorities</h2>
            </div>
            <div className="space-y-4">
              {topPriorities.map((priority, index) => (
                <div key={priority.id} className="rounded-2xl border border-white/10 bg-white/[0.07] p-4">
                  <div className="flex gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f0c69f] text-sm font-bold text-[#2f1f17]">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold text-white">{priority.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-white/62">{priority.note}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <Card>
            <CardHeader title="Active Recipe Tests" eyebrow="Test bench" />
            <div className="space-y-4">
              {activeRecipeTests.map((test) => (
                <div key={test.id} className="rounded-2xl border border-border bg-white/55 p-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="font-serif text-xl font-bold">{test.cookieName}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{test.version} · Score {test.score}/10</p>
                    </div>
                    <StatusBadge value={test.status} />
                  </div>
                  <div className="mt-4 rounded-xl bg-muted/55 p-3 text-sm">
                    <span className="font-bold text-foreground">Next action: </span>
                    <span className="text-muted-foreground">{test.nextAction}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader title="Upcoming Launches" eyebrow="Launch calendar" />
            <div className="space-y-4">
              {upcomingLaunches.map((launch) => (
                <div key={launch.id} className="rounded-2xl border border-border bg-white/55 p-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="font-serif text-xl font-bold">{launch.cookieName}</p>
                      <p className="mt-1 text-sm font-semibold text-muted-foreground">{launch.launchDate}</p>
                    </div>
                    <StatusBadge value={launch.status} />
                  </div>
                  <div className="mt-4">
                    <div className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                      <span>Checklist</span>
                      <span>{launch.checklistProgress}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-[#8b5436]" style={{ width: `${launch.checklistProgress}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <Card>
          <CardHeader title="Food Cost Snapshot" eyebrow="Margins" />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead className="border-y border-border bg-muted/50 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-bold">Recipe</th>
                  <th className="px-4 py-3 font-bold">Cost per cookie</th>
                  <th className="px-4 py-3 font-bold">Suggested price</th>
                  <th className="px-4 py-3 font-bold">Food cost %</th>
                  <th className="px-4 py-3 font-bold">Gross profit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {foodCostSnapshots.map((recipe) => (
                  <tr key={recipe.id} className="hover:bg-muted/30">
                    <td className="px-4 py-4 font-serif text-lg font-bold">{recipe.recipeName}</td>
                    <td className="px-4 py-4 font-semibold">{recipe.costPerCookie}</td>
                    <td className="px-4 py-4 font-semibold">{recipe.suggestedPrice}</td>
                    <td className="px-4 py-4"><Badge variant={recipe.foodCostPercentage <= 27 ? "success" : "warning"}>{recipe.foodCostPercentage}%</Badge></td>
                    <td className="px-4 py-4 font-bold text-[#6f422c]">{recipe.grossProfitPerCookie}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}

const priorityVariant = {
  High: "danger",
  Medium: "warning",
  Low: "neutral",
} as const;
