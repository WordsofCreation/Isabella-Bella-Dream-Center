import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { templates } from "@/lib/data/mock-data";

export default function TemplatesPage() {
  return <AppShell><PageHeader eyebrow="Templates" title="Starter operating templates" description="Reusable Isabella Bella workflows for R&D, weekly production, launches, costing, holiday drops, markets, wholesale, social planning, flavor calendars, and packaging prep." actions={<Button>Create Template</Button>} /><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{templates.map((template) => <Card key={template.id}><Badge variant="premium">{template.category}</Badge><h3 className="mt-4 font-serif text-2xl font-bold">{template.name}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{template.description}</p><Button className="mt-5" size="sm" variant="outline">Use Template</Button></Card>)}</div></AppShell>;
}
