import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cookieIdeas } from "@/lib/data/mock-data";

export default function CookieIdeasPage() {
  return (
    <AppShell>
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-muted-foreground">Cookie ideas</p>
        <h2 className="mt-2 font-serif text-4xl font-bold tracking-tight">Idea pipeline</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
          Three mock concepts to prove the MVP shell can display structured cookie idea data.
        </p>
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        {cookieIdeas.map((idea) => (
          <Card key={idea.id} className="flex flex-col">
            <div className="mb-3 flex items-start justify-between gap-3">
              <h3 className="font-serif text-2xl font-bold">{idea.name}</h3>
              <Badge variant={idea.priority === "High" ? "danger" : "warning"}>{idea.priority}</Badge>
            </div>
            <p className="text-sm leading-6 text-muted-foreground">{idea.flavorConcept}</p>
            <dl className="mt-5 grid gap-3 text-sm">
              <Info label="Inspiration" value={idea.inspirationNotes} />
              <Info label="Target customer" value={idea.targetCustomer} />
              <Info label="Season / occasion" value={idea.seasonOrOccasion} />
              <Info label="Status" value={idea.status} />
            </dl>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-bold text-foreground">{label}</dt>
      <dd className="text-muted-foreground">{value}</dd>
    </div>
  );
}
