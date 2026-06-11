import { Card, CardHeader } from "@/components/ui/card";

interface SectionPlaceholderProps {
  title: string;
  eyebrow: string;
  description: string;
  focusItems: string[];
}

export function SectionPlaceholder({ title, eyebrow, description, focusItems }: SectionPlaceholderProps) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-muted-foreground">{eyebrow}</p>
        <h2 className="mt-2 font-serif text-4xl font-bold tracking-tight">{title}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">{description}</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader title={`${title} workspace`} eyebrow="Workspace" />
          <div className="rounded-2xl border border-dashed border-border bg-background/60 p-6">
            <p className="text-sm leading-6 text-muted-foreground">
              This section provides a structured workspace for operating notes, review tasks, data tables, and integration-ready next steps.
            </p>
          </div>
        </Card>

        <Card>
          <CardHeader title="Foundation checklist" eyebrow="Next up" />
          <ul className="space-y-3">
            {focusItems.map((item) => (
              <li key={item} className="flex gap-3 rounded-2xl bg-muted/60 p-3 text-sm">
                <span className="mt-1 h-2 w-2 rounded-full bg-accent" />
                <span className="font-medium text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
