import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { productionCalendarBlocks } from "@/lib/data/mock-data";
import type {
  CalendarBlock,
  ProductionCalendarBlockType,
  ProductionCalendarPeriod,
} from "@/lib/types/domain";

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;
const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
const periods: ProductionCalendarPeriod[] = ["Morning", "Midday", "Afternoon", "Evening"];

const typeStyles: Record<
  ProductionCalendarBlockType,
  {
    badge: "neutral" | "success" | "warning" | "danger" | "premium" | "dark";
    card: string;
    dot: string;
  }
> = {
  Production: {
    badge: "premium",
    card: "border-[#d8b08c] bg-[#fff7ed]",
    dot: "bg-[#a6623f]",
  },
  Chilling: {
    badge: "neutral",
    card: "border-sky-100 bg-sky-50/75",
    dot: "bg-sky-500",
  },
  Baking: {
    badge: "danger",
    card: "border-rose-100 bg-rose-50/70",
    dot: "bg-rose-500",
  },
  Cooling: {
    badge: "success",
    card: "border-emerald-100 bg-emerald-50/70",
    dot: "bg-emerald-500",
  },
  "Test Batch": {
    badge: "warning",
    card: "border-amber-100 bg-amber-50/75",
    dot: "bg-amber-500",
  },
  Packaging: {
    badge: "premium",
    card: "border-[#ead1ba] bg-[#fffaf3]",
    dot: "bg-[#d69b76]",
  },
  "Pickup/Delivery": {
    badge: "success",
    card: "border-teal-100 bg-teal-50/75",
    dot: "bg-teal-500",
  },
  Marketing: {
    badge: "dark",
    card: "border-[#3f2a21]/10 bg-[#3f2a21]/[0.07]",
    dot: "bg-[#3f2a21]",
  },
  Prep: {
    badge: "neutral",
    card: "border-stone-200 bg-stone-50/80",
    dot: "bg-stone-500",
  },
};

const summaryCards = [
  {
    label: "Production Blocks This Week",
    value: productionCalendarBlocks.filter((block) =>
      ["Production", "Chilling", "Baking", "Cooling", "Prep"].includes(block.type),
    ).length,
    detail: "Dough, chill, bake, cool, and planning windows",
    accentClass: "bg-[#8b5436]",
  },
  {
    label: "Test Batches Scheduled",
    value: productionCalendarBlocks.filter((block) => block.type === "Test Batch").length,
    detail: "Active bench tests with sensory follow-up",
    accentClass: "bg-amber-500",
  },
  {
    label: "Orders to Fulfill",
    value: "38",
    detail: "Mocked pickup, delivery, and gift box commitments",
    accentClass: "bg-emerald-600",
  },
  {
    label: "Packaging Blocks",
    value: productionCalendarBlocks.filter((block) => block.type === "Packaging").length,
    detail: "Boxing, labels, ribbons, and care cards",
    accentClass: "bg-[#d69b76]",
  },
  {
    label: "Pickup/Delivery Windows",
    value: productionCalendarBlocks.filter((block) => block.type === "Pickup/Delivery").length,
    detail: "Customer handoffs and local delivery routes",
    accentClass: "bg-teal-600",
  },
] as const;

const focusNotes = [
  "Bake chilled dough before packaging windows to protect texture.",
  "Keep test batches separated from paid customer orders.",
  "Stage pickup orders by customer name before the handoff window opens.",
] as const;

function getBlocksForDayAndPeriod(day: string, period: ProductionCalendarPeriod) {
  return productionCalendarBlocks.filter(
    (block) => block.day === day && block.period === period,
  );
}

function CalendarBlockCard({ block }: { block: CalendarBlock }) {
  const styles = typeStyles[block.type];

  return (
    <article className={`rounded-2xl border p-3 shadow-sm ${styles.card}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${styles.dot}`} />
            <p className="text-xs font-bold text-muted-foreground">{block.time}</p>
          </div>
          <h4 className="mt-2 text-sm font-bold leading-5 text-foreground">{block.title}</h4>
        </div>
        <Badge variant={styles.badge} className="shrink-0">
          {block.type}
        </Badge>
      </div>
      <p className="mt-2 text-xs leading-5 text-muted-foreground">{block.notes}</p>
    </article>
  );
}

export default function ProductionCalendarPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          eyebrow="Weekly operations"
          title="Production Calendar"
          description="Plan weekly production, testing, packaging, pickups, deliveries, and launch prep."
          actions={
            <>
              <Button type="button">Add Production Block</Button>
              <Button type="button" variant="outline">
                Plan Production Day
              </Button>
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

        <section className="grid gap-6 2xl:grid-cols-[minmax(0,1fr)_320px]">
          <Card className="overflow-hidden bg-white/70 p-0">
            <div className="border-b border-border bg-[#fffaf3] p-5">
              <CardHeader
                title="Weekly Production Schedule"
                eyebrow="Monday through Sunday"
                action={
                  <Badge variant="premium">
                    {productionCalendarBlocks.length} blocks
                  </Badge>
                }
              />
              <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
                A mocked week-by-week view that keeps dough production, chilling, bakes, cooling, packaging,
                handoffs, and marketing prep in one founder-friendly workspace.
              </p>
            </div>

            <div className="overflow-x-auto p-4">
              <div className="grid min-w-[1320px] grid-cols-7 gap-3">
                {weekDays.map((day, index) => (
                  <div key={day} className="rounded-3xl border border-border bg-white/80 p-3">
                    <div className="mb-3 rounded-2xl bg-[#3f2a21] p-3 text-white shadow-sm">
                      <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/55">{dayLabels[index]}</p>
                      <h3 className="mt-1 font-serif text-xl font-bold">{day}</h3>
                    </div>

                    <div className="space-y-3">
                      {periods.map((period) => {
                        const blocks = getBlocksForDayAndPeriod(day, period);

                        return (
                          <section key={period} className="rounded-2xl border border-border/80 bg-muted/25 p-2.5">
                            <div className="mb-2 flex items-center justify-between gap-2">
                              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{period}</p>
                              <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
                                {blocks.length || "Open"}
                              </span>
                            </div>

                            {blocks.length > 0 ? (
                              <div className="space-y-2">
                                {blocks.map((block) => (
                                  <CalendarBlockCard key={block.id} block={block} />
                                ))}
                              </div>
                            ) : (
                              <div className="rounded-2xl border border-dashed border-border bg-white/45 p-3 text-xs leading-5 text-muted-foreground">
                                Open buffer for cleanup, ingredient checks, or rest.
                              </div>
                            )}
                          </section>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <div className="space-y-6">
            <Card className="bg-[#2f1f17] text-white">
              <CardHeader title="Founder Production Notes" eyebrow="This week" />
              <div className="space-y-3">
                {focusNotes.map((note, index) => (
                  <div key={note} className="rounded-2xl border border-white/10 bg-white/[0.07] p-4">
                    <div className="flex gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f0c69f] text-sm font-bold text-[#2f1f17]">
                        {index + 1}
                      </span>
                      <p className="text-sm leading-6 text-white/72">{note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="bg-white/75">
              <CardHeader title="Block Legend" eyebrow="Calendar colors" />
              <div className="grid gap-2 sm:grid-cols-2 2xl:grid-cols-1">
                {Object.entries(typeStyles).map(([type, styles]) => (
                  <div key={type} className="flex items-center justify-between rounded-2xl border border-border bg-white/65 px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className={`h-3 w-3 rounded-full ${styles.dot}`} />
                      <span className="text-sm font-semibold">{type}</span>
                    </div>
                    <Badge variant={styles.badge}>{type}</Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
