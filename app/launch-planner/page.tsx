import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { launches } from "@/lib/data/mock-data";

const checklistLabels: Record<string, string> = { recipeFinalized: "Recipe finalized", costingComplete: "Costing complete", packagingSelected: "Packaging selected", photosComplete: "Photos complete", menuDescriptionWritten: "Menu description written", socialPostsScheduled: "Social posts scheduled", orderFormReady: "Order form ready", productionDateScheduled: "Production date scheduled", launchDateConfirmed: "Launch date confirmed" };

export default function LaunchPlannerPage() {
  return <AppShell><PageHeader eyebrow="Launch planner" title="Upcoming cookie launches" description="Coordinate every launch milestone from finalized recipe and costing through photos, copy, production scheduling, order readiness, and live status." actions={<Button>New Launch Plan</Button>} /><div className="grid gap-5 xl:grid-cols-3">{launches.map((launch) => <Card key={launch.id}><div className="flex items-start justify-between gap-3"><div><h3 className="font-serif text-2xl font-bold">{launch.cookieName}</h3><p className="text-sm text-muted-foreground">Launch date: {launch.launchDate}</p></div><StatusBadge value={launch.status} /></div><div className="mt-5 space-y-3">{Object.entries(launch.checklist).map(([key, complete]) => <div key={key} className="flex items-center gap-3 rounded-2xl bg-muted/55 p-3 text-sm"><span className={complete ? "text-emerald-600" : "text-muted-foreground"}>{complete ? "✓" : "○"}</span><span className="font-semibold">{checklistLabels[key]}</span></div>)}</div><Button className="mt-5 w-full" variant="outline">Open Launch Checklist</Button></Card>)}</div></AppShell>;
}
