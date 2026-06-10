import { AppShell } from "@/components/layout/app-shell";
import { SectionPlaceholder } from "@/components/shared/section-placeholder";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { cookieIdeas } from "@/lib/data/mock-data";

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="mb-6 grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="relative overflow-hidden p-7">
          <div className="absolute right-0 top-0 h-48 w-48 rounded-bl-[5rem] bg-accent/15" />
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-muted-foreground">Founder dashboard</p>
          <h2 className="mt-2 max-w-3xl font-serif text-4xl font-bold tracking-tight md:text-5xl">
            A calm command center for the Isabella Bella cookie operation.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            This MVP shell establishes the layout, navigation, route structure, and warm premium workspace before real workflows or integrations are added.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button>Quick Capture</Button>
            <Button variant="outline">Review Cookie Ideas</Button>
          </div>
        </Card>

        <Card>
          <CardHeader title="MVP status" eyebrow="Foundation" />
          <div className="grid gap-3 text-sm">
            <Status label="Navigation" value="Clickable" />
            <Status label="Data" value="Mock only" />
            <Status label="Auth" value="Not added" />
            <Status label="APIs" value="Not added" />
          </div>
        </Card>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {cookieIdeas.map((idea) => (
          <Card key={idea.id}>
            <div className="mb-3 flex items-start justify-between gap-3">
              <h3 className="font-serif text-2xl font-bold">{idea.name}</h3>
              <Badge variant={idea.priority === "High" ? "danger" : "warning"}>{idea.priority}</Badge>
            </div>
            <p className="text-sm leading-6 text-muted-foreground">{idea.flavorConcept}</p>
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">{idea.status} · {idea.seasonOrOccasion}</p>
          </Card>
        ))}
      </div>

      <div className="mt-6">
        <SectionPlaceholder
          eyebrow="Shell preview"
          title="Operational sections are ready for workflows"
          description="Use the sidebar to confirm each section routes correctly and keeps the workspace consistent."
          focusItems={["Add real forms after the shell is approved", "Connect persistence in a later step", "Keep this first milestone intentionally lightweight"]}
        />
      </div>
    </AppShell>
  );
}

function Status({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-muted/60 p-3">
      <span className="font-semibold text-muted-foreground">{label}</span>
      <span className="font-bold text-foreground">{value}</span>
    </div>
  );
}
