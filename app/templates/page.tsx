import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { templates } from "@/lib/data/mock-data";

const templateMeta: Record<string, { cadence: string; status: "Ready" | "Draft"; detail: string }> = {
  "New Cookie R&D Template": { cadence: "Use per concept", status: "Ready", detail: "Idea brief, target customer, test objective, and decision notes." },
  "Weekly Production Plan": { cadence: "Weekly", status: "Ready", detail: "Batch counts, bake windows, cooling, packaging, and pickup handoffs." },
  "Cookie Launch Checklist": { cadence: "Per launch", status: "Ready", detail: "Costing, label review, photos, content, order form, and production timing." },
  "Ingredient Costing Sheet": { cadence: "As prices change", status: "Ready", detail: "Vendor price, usable yield, allergen tags, and margin review prompts." },
  "Holiday Cookie Drop Plan": { cadence: "Seasonal", status: "Draft", detail: "Limited-time flavor mix, packaging quantities, preorder windows, and reminders." },
  "Farmers Market Prep Plan": { cadence: "Event-based", status: "Draft", detail: "Market menu, display supplies, packaging, change bank, and end-of-day notes." },
  "Wholesale Inquiry Tracker": { cadence: "As needed", status: "Draft", detail: "Lead source, business type, sample status, pricing notes, and follow-up date." },
  "Social Media Launch Plan": { cadence: "Per launch", status: "Ready", detail: "Instagram, story, email, website, and photo task checklist." },
  "Monthly Flavor Calendar": { cadence: "Monthly", status: "Draft", detail: "Seasonal moments, testing windows, launch dates, and production guardrails." },
  "Packaging Prep Checklist": { cadence: "Before production", status: "Ready", detail: "Boxes, labels, inserts, allergen stickers, ribbon, sleeves, and staging bins." },
};

export default function TemplatesPage() {
  const readyCount = templates.filter((template) => templateMeta[template.name]?.status === "Ready").length;

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          eyebrow="Templates"
          title="Reusable Operating Templates"
          description="A polished starter library for Isabella Bella R&D, production, costing, launch, market, wholesale, and marketing workflows."
          actions={
            <>
              <Button type="button">Use Template</Button>
              <Button type="button" variant="outline">Create Later</Button>
            </>
          }
        />

        <section className="grid gap-4 md:grid-cols-3">
          <Card className="bg-white/75">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Template library</p>
            <p className="mt-3 font-serif text-4xl font-bold tracking-tight">{templates.length}</p>
            <p className="mt-2 text-sm text-muted-foreground">Mock templates available for MVP review.</p>
          </Card>
          <Card className="bg-white/75">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Preview ready</p>
            <p className="mt-3 font-serif text-4xl font-bold tracking-tight">{readyCount}</p>
            <p className="mt-2 text-sm text-muted-foreground">Cards structured enough to evaluate the workflow library.</p>
          </Card>
          <Card className="border-[#d8b08c]/60 bg-[#fffaf2]">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">MVP note</p>
            <p className="mt-3 text-lg font-bold tracking-tight">No document generation yet</p>
            <p className="mt-2 text-sm text-muted-foreground">Buttons are placeholders until real storage and workflow creation are added.</p>
          </Card>
        </section>

        {templates.length > 0 ? (
          <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {templates.map((template) => {
              const meta = templateMeta[template.name];

              return (
                <Card key={template.id} className="flex min-h-[240px] flex-col bg-white/76 transition hover:-translate-y-0.5 hover:border-[#d8b08c] hover:shadow-[0_22px_50px_rgba(71,43,31,0.12)]">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">{template.category}</p>
                      <h3 className="mt-2 font-serif text-2xl font-bold leading-tight text-foreground">{template.name}</h3>
                    </div>
                    <Badge variant={meta?.status === "Ready" ? "premium" : "neutral"}>{meta?.status ?? "Draft"}</Badge>
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-6 text-muted-foreground">{template.description}</p>
                  <div className="mt-5 rounded-2xl border border-border bg-[#fffaf2] p-3">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">{meta?.cadence ?? "As needed"}</p>
                    <p className="mt-2 text-sm leading-6 text-foreground">{meta?.detail}</p>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <Button type="button" size="sm">Preview</Button>
                    <Button type="button" size="sm" variant="outline">Duplicate Later</Button>
                  </div>
                </Card>
              );
            })}
          </section>
        ) : (
          <Card>
            <CardHeader title="No templates yet" eyebrow="Empty state" />
            <div className="rounded-2xl border border-dashed border-border bg-muted/40 p-8 text-center text-sm text-muted-foreground">
              Add reusable R&D, production, costing, and launch templates once the workflow foundation is approved.
            </div>
          </Card>
        )}
      </div>
    </AppShell>
  );
}
