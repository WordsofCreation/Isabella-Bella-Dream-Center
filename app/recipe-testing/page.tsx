"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { DataTable } from "@/components/ui/table";
import { activeRecipeTests } from "@/lib/data/mock-data";
import { cn } from "@/lib/utils";

type TestStatus = "Needs Work" | "Retest" | "Approved";

interface RecipeTestCard {
  id: string;
  cookieName: string;
  version: string;
  status: TestStatus;
  score: number;
  nextAction: string;
  objective: string;
  doughChange: string;
  bakeWindow: string;
  sensoryNotes: string[];
  owner: string;
}

const testBacklog: RecipeTestCard[] = activeRecipeTests.map((test, index) => ({
  ...test,
  objective: [
    "Lock espresso intensity, salt finish, and toffee distribution before costing.",
    "Balance floral aroma with roasted pistachio so the cookie tastes elegant, not perfumed.",
    "Confirm launch-ready method notes and final photography requirements.",
  ][index],
  doughChange: ["-15% smoked salt", "+12% pistachio paste", "Final method notes"][index],
  bakeWindow: ["9–11 min at 350°F", "10–12 min at 340°F", "11–12 min at 345°F"][index],
  sensoryNotes: [
    ["Stronger espresso bloom", "Cleaner salt finish", "Watch toffee spread"],
    ["Reduce rose extract", "Boost nutty center", "Keep white chocolate below 18%"],
    ["Approved crumb", "Photo-ready edges", "Write final cooling rule"],
  ][index],
  owner: ["Isabella", "Kitchen test bench", "Launch prep"][index],
}));

const filters = ["All", "Needs Work", "Retest", "Approved"] as const;
type Filter = (typeof filters)[number];

const statusVariant: Record<TestStatus, "success" | "warning" | "danger"> = {
  Approved: "success",
  Retest: "warning",
  "Needs Work": "danger",
};

export default function RecipeTestingPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [draftName, setDraftName] = useState("");
  const [draftObjective, setDraftObjective] = useState("");
  const [localTests, setLocalTests] = useState<RecipeTestCard[]>([]);

  const tests = useMemo(() => [...localTests, ...testBacklog], [localTests]);
  const filteredTests = activeFilter === "All" ? tests : tests.filter((test) => test.status === activeFilter);
  const averageScore = tests.length ? tests.reduce((sum, test) => sum + test.score, 0) / tests.length : 0;

  function addTest() {
    const name = draftName.trim();
    const objective = draftObjective.trim();

    if (!name || !objective) {
      return;
    }

    setLocalTests((current) => [
      {
        id: `local-test-${Date.now()}`,
        cookieName: name,
        version: "v1",
        status: "Needs Work",
        score: 0,
        nextAction: "Run first bench batch and score texture, flavor, appearance, and packaging readiness.",
        objective,
        doughChange: "New formula baseline",
        bakeWindow: "Set during first test",
        sensoryNotes: ["Texture TBD", "Flavor TBD", "Appearance TBD"],
        owner: "Isabella",
      },
      ...current,
    ]);
    setDraftName("");
    setDraftObjective("");
    setActiveFilter("All");
  }

  const rows = filteredTests.map((test) => [
    <div key="name" className="min-w-[220px]">
      <p className="font-serif text-lg font-bold text-foreground">{test.cookieName}</p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{test.version} · {test.owner}</p>
    </div>,
    <Badge key="status" variant={statusVariant[test.status]}>{test.status}</Badge>,
    <span key="score" className="font-bold text-[#6f422c]">{test.score ? `${test.score}/10` : "Not scored"}</span>,
    <span key="change" className="font-semibold text-foreground">{test.doughChange}</span>,
    <span key="bake" className="text-muted-foreground">{test.bakeWindow}</span>,
    <p key="next" className="min-w-[280px] text-sm leading-6 text-muted-foreground">{test.nextAction}</p>,
  ]);

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          eyebrow="Test bench"
          title="Recipe Testing"
          description="Run active bench trials, capture test objectives, compare results, and move cookies toward an approved production recipe."
          actions={
            <>
              <Button type="button">Create Cookie Test</Button>
              <Button type="button" variant="outline">Export Test Notes</Button>
            </>
          }
        />

        <section className="grid gap-4 md:grid-cols-4">
          <MetricCard label="Active tests" value={tests.length.toString()} detail="Bench trials currently tracked" />
          <MetricCard label="Average score" value={averageScore.toFixed(1)} detail="Across scored active tests" />
          <MetricCard label="Retests" value={tests.filter((test) => test.status === "Retest").length.toString()} detail="Need one more controlled batch" />
          <MetricCard label="Approved" value={tests.filter((test) => test.status === "Approved").length.toString()} detail="Ready for recipe card handoff" />
        </section>

        <Card className="border-[#d8b08c]/60 bg-[#fffaf2]">
          <CardHeader title="Start a test batch" eyebrow="Quick intake" />
          <form
            className="grid gap-3 lg:grid-cols-[0.8fr_1.2fr_auto] lg:items-end"
            onSubmit={(event) => {
              event.preventDefault();
              addTest();
            }}
          >
            <label className="text-sm font-bold text-foreground">
              Cookie name
              <input
                className="mt-2 h-11 w-full rounded-full border border-border bg-card px-4 text-sm font-normal outline-none focus:ring-2 focus:ring-ring"
                placeholder="e.g. Strawberry Basil Sugar Cookie"
                value={draftName}
                onChange={(event) => setDraftName(event.target.value)}
              />
            </label>
            <label className="text-sm font-bold text-foreground">
              Test objective
              <input
                className="mt-2 h-11 w-full rounded-full border border-border bg-card px-4 text-sm font-normal outline-none focus:ring-2 focus:ring-ring"
                placeholder="What should this batch prove?"
                value={draftObjective}
                onChange={(event) => setDraftObjective(event.target.value)}
              />
            </label>
            <Button type="submit" variant="accent">Add Test</Button>
          </form>
        </Card>

        <section className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
          <Card>
            <CardHeader title="Test filters" eyebrow="Pipeline" />
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-bold transition",
                    activeFilter === filter
                      ? "border-[#8b5436] bg-[#8b5436] text-white"
                      : "border-border bg-white/70 text-muted-foreground hover:bg-muted",
                  )}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
            <div className="mt-5 space-y-3">
              {filteredTests.map((test) => (
                <div key={test.id} className="rounded-2xl border border-border bg-white/65 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-foreground">{test.cookieName}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{test.objective}</p>
                    </div>
                    <StatusBadge value={test.status} />
                  </div>
                  <div className="mt-4 grid gap-2 sm:grid-cols-3">
                    {test.sensoryNotes.map((note) => (
                      <span key={note} className="rounded-2xl bg-muted/55 px-3 py-2 text-xs font-bold text-muted-foreground">{note}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader title="Structured test table" eyebrow="Batch decisions" />
            <DataTable headers={["Cookie", "Status", "Score", "Change", "Bake", "Next action"]} rows={rows} />
          </Card>
        </section>
      </div>
    </AppShell>
  );
}

function MetricCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <Card className="bg-white/75">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
      <p className="mt-3 font-serif text-4xl font-bold tracking-tight">{value}</p>
      <p className="mt-2 text-sm text-muted-foreground">{detail}</p>
    </Card>
  );
}
