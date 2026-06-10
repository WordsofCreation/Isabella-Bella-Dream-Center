"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { cookieIdeas as mockCookieIdeas } from "@/lib/data/mock-data";
import type { CookieIdea, CookieIdeaStatus, Priority } from "@/lib/types/domain";
import { cn } from "@/lib/utils";

const filters = ["All", "Idea", "Testing", "Approved", "Archived"] as const;
type Filter = (typeof filters)[number];

const priorityVariant: Record<Priority, "neutral" | "warning" | "danger"> = {
  Low: "neutral",
  Medium: "warning",
  High: "danger",
};

const statusTone: Record<CookieIdeaStatus, string> = {
  Idea: "border-[#d8b08c] bg-[#fff4e8] text-[#7d4a2f]",
  Testing: "border-amber-200 bg-amber-50 text-amber-800",
  Approved: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Archived: "border-stone-200 bg-stone-100 text-stone-600",
};

export default function CookieIdeasPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [captureText, setCaptureText] = useState("");
  const [capturedIdeas, setCapturedIdeas] = useState<CookieIdea[]>([]);

  const ideas = useMemo(() => [...capturedIdeas, ...mockCookieIdeas], [capturedIdeas]);
  const filteredIdeas = activeFilter === "All" ? ideas : ideas.filter((idea) => idea.status === activeFilter);

  const pipelineCounts = useMemo(
    () => ({
      "New Ideas": ideas.filter((idea) => idea.status === "Idea").length,
      "In Testing": ideas.filter((idea) => idea.status === "Testing").length,
      Approved: ideas.filter((idea) => idea.status === "Approved").length,
      Archived: ideas.filter((idea) => idea.status === "Archived").length,
    }),
    [ideas],
  );

  function captureIdea() {
    const trimmedIdea = captureText.trim();

    if (!trimmedIdea) {
      return;
    }

    setCapturedIdeas((currentIdeas) => [
      {
        id: `local-idea-${Date.now()}`,
        name: trimmedIdea,
        flavorConcept: "New founder note captured for future flavor development.",
        inspirationNotes: "Captured from the quick idea intake card. Add refinement notes before scheduling a test batch.",
        targetCustomer: "To be defined",
        seasonOrOccasion: "To be planned",
        priority: "Medium",
        status: "Idea",
        createdDate: new Date().toISOString().slice(0, 10),
        nextAction: "Clarify flavor direction, target customer, and first test objective.",
      },
      ...currentIdeas,
    ]);
    setCaptureText("");
    setActiveFilter("All");
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          eyebrow="Flavor development"
          title="Cookie Ideas"
          description="Capture, organize, and prioritize new Isabella Bella cookie concepts."
          actions={<Button>Add Cookie Idea</Button>}
        />

        <Card className="overflow-hidden border-[#d8b08c]/50 bg-[#fffaf2] p-0">
          <div className="grid gap-5 p-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">Quick capture</p>
              <h3 className="mt-1 font-serif text-2xl font-bold tracking-tight">Add a concept before the detail is lost</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Keep the intake lightweight for now: a flavor note, customer request, seasonal cue, or competitive inspiration.
              </p>
            </div>
            <form
              className="flex min-w-0 flex-col gap-3 sm:flex-row lg:w-[560px]"
              onSubmit={(event) => {
                event.preventDefault();
                captureIdea();
              }}
            >
              <input
                className="h-11 min-w-0 flex-1 rounded-full border border-border bg-card px-4 text-sm outline-none transition placeholder:text-muted-foreground/70 focus:ring-2 focus:ring-ring"
                placeholder="Add a new cookie idea, flavor note, or inspiration…"
                value={captureText}
                onChange={(event) => setCaptureText(event.target.value)}
              />
              <Button type="submit" variant="accent" className="shrink-0">
                Capture Idea
              </Button>
            </form>
          </div>
        </Card>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Object.entries(pipelineCounts).map(([label, value]) => (
            <Card key={label} className="bg-white/70">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Idea Pipeline</p>
              <div className="mt-3 flex items-end justify-between gap-3">
                <div>
                  <p className="font-serif text-4xl font-bold tracking-tight">{value}</p>
                  <p className="mt-1 text-sm font-semibold text-muted-foreground">{label}</p>
                </div>
                <span className="h-10 w-1 rounded-full bg-[#8b5436]/70" />
              </div>
            </Card>
          ))}
        </section>

        <Card>
          <CardHeader title="Review Queue" eyebrow="Prioritize concepts" />
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => {
              const isActive = filter === activeFilter;
              const count = filter === "All" ? ideas.length : ideas.filter((idea) => idea.status === filter).length;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-bold transition",
                    isActive ? "border-primary bg-primary text-primary-foreground shadow-sm" : "border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {filter} <span className="ml-1 opacity-70">{count}</span>
                </button>
              );
            })}
          </div>
        </Card>

        {filteredIdeas.length > 0 ? (
          <section className="grid gap-5 xl:grid-cols-2">
            {filteredIdeas.map((idea) => (
              <CookieIdeaCard key={idea.id} idea={idea} />
            ))}
          </section>
        ) : (
          <EmptyIdeasState filter={activeFilter} />
        )}
      </div>
    </AppShell>
  );
}

function CookieIdeaCard({ idea }: { idea: CookieIdea }) {
  return (
    <Card className="flex h-full flex-col bg-white/75">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">Created {formatDate(idea.createdDate)}</p>
          <h3 className="mt-2 font-serif text-2xl font-bold tracking-tight">{idea.name}</h3>
        </div>
        <div className="flex flex-wrap gap-2 md:justify-end">
          <Badge variant={priorityVariant[idea.priority]}>{idea.priority} Priority</Badge>
          <span className={cn("inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold", statusTone[idea.status])}>{idea.status}</span>
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-muted-foreground">{idea.flavorConcept}</p>

      <dl className="mt-5 grid gap-3 text-sm md:grid-cols-2">
        <Info label="Inspiration notes" value={idea.inspirationNotes} />
        <Info label="Target customer" value={idea.targetCustomer} />
        <Info label="Season / occasion" value={idea.seasonOrOccasion} />
        <div>
          <dt className="font-bold text-foreground">Status</dt>
          <dd className="mt-1">
            <StatusBadge value={idea.status} />
          </dd>
        </div>
      </dl>

      <div className="mt-5 rounded-2xl border border-border bg-muted/45 p-4 text-sm">
        <span className="font-bold text-foreground">Next action: </span>
        <span className="text-muted-foreground">{idea.nextAction}</span>
      </div>

      <div className="mt-auto flex flex-wrap gap-2 pt-5">
        <Button type="button" size="sm">Start Test Batch</Button>
        <Button type="button" variant="outline" size="sm">Schedule Test</Button>
        <Button type="button" variant="ghost" size="sm">Archive</Button>
      </div>
    </Card>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-bold text-foreground">{label}</dt>
      <dd className="mt-1 leading-6 text-muted-foreground">{value}</dd>
    </div>
  );
}

function EmptyIdeasState({ filter }: { filter: Filter }) {
  return (
    <Card className="border-dashed bg-white/60 py-12 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">No concepts found</p>
      <h3 className="mt-2 font-serif text-3xl font-bold">No {filter === "All" ? "cookie ideas" : filter.toLowerCase()} ideas yet</h3>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
        Capture a new flavor note above or switch filters to continue reviewing the Isabella Bella idea pipeline.
      </p>
    </Card>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(value));
}
