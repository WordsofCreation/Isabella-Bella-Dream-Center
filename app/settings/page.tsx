import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { allergens, currentUser, vendors } from "@/lib/data/mock-data";
import { integrationPlaceholders } from "@/lib/integrations";

const sections = [
  { title: "Company profile", description: "Business name, production address, pickup policy, brand contact, and operating notes." },
  { title: "Brand settings", description: "Voice, menu language, packaging preferences, color palette, and customer experience standards." },
  { title: "User profile", description: `${currentUser.name} · ${currentUser.role} · ${currentUser.email}` },
  { title: "Production settings", description: "Default batch sizes, portion standards, chill windows, bake capacity, and prep lead times." },
  { title: "Billing later", description: "Placeholder for future subscription plan, invoices, payment method, and billing contacts." },
];

export default function SettingsPage() {
  return <AppShell><PageHeader eyebrow="Settings" title="Workspace settings" description="Placeholder configuration areas for the Isabella Bella operating system. Authentication and real integrations are intentionally deferred for the MVP shell." actions={<Button variant="outline">Save Draft Settings</Button>} /><div className="grid gap-5 xl:grid-cols-3">{sections.map((section) => <Card key={section.title}><h3 className="font-serif text-2xl font-bold">{section.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{section.description}</p></Card>)}<Card><h3 className="font-serif text-2xl font-bold">Vendors</h3><div className="mt-4 space-y-3">{vendors.map((vendor) => <div key={vendor.id} className="rounded-2xl bg-muted/60 p-3"><p className="font-bold">{vendor.name}</p><p className="text-sm text-muted-foreground">{vendor.defaultCategory} · {vendor.contactName}</p></div>)}</div></Card><Card><h3 className="font-serif text-2xl font-bold">Allergens</h3><div className="mt-4 flex flex-wrap gap-2">{allergens.map((allergen) => <Badge key={allergen.id} variant={allergen.severity === "High" ? "danger" : "warning"}>{allergen.name}</Badge>)}</div></Card><Card className="xl:col-span-3"><h3 className="font-serif text-2xl font-bold">Integrations</h3><p className="mt-2 text-sm text-muted-foreground">Future connection points are documented in code and intentionally mocked for now.</p><div className="mt-4 flex flex-wrap gap-2">{integrationPlaceholders.map((integration) => <Badge key={integration} variant="premium">{integration}</Badge>)}</div></Card></div></AppShell>;
}
