import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { integrationPlaceholders } from "@/lib/integrations";

const settingsCards = [
  { title: "Company Profile", status: "Configurable", description: "Business name, founder details, kitchen address, brand contact, and operating notes." },
  { title: "Brand Settings", status: "Configurable", description: "Tone, menu language, packaging defaults, brand colors, and product naming conventions." },
  { title: "Vendors", status: "Configurable", description: "Ingredient vendors, packaging suppliers, preferred contacts, order minimums, and price-review cadence." },
  { title: "Allergens", status: "Configurable", description: "Standard allergen library, production warnings, label review reminders, and kitchen handling notes." },
  { title: "Production Settings", status: "Configurable", description: "Default batch sizes, bake windows, cooling rules, packaging lead times, and pickup-day guardrails." },
  { title: "Integrations", status: "Later", description: "A holding area for future tools. No live third-party connections are active in this MVP." },
  { title: "Billing Later", status: "Later", description: "Subscription, invoicing, payment method, and receipt management can be added after product direction is clear." },
] as const;

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          eyebrow="Settings"
          title="Workspace Settings"
          description="Manage Isabella Bella business preferences, vendors, allergens, production rules, and future integration readiness from one settings workspace."
          actions={
            <>
              <Button type="button">Save Mock Changes</Button>
              <Button type="button" variant="outline">Reset Preview</Button>
            </>
          }
        />

        <Card className="border-[#d8b08c]/60 bg-[#fffaf2]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">Preview guardrail</p>
              <h3 className="mt-1 font-serif text-2xl font-bold tracking-tight">Local settings workspace</h3>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
                Use these local configuration cards to review business defaults and operating rules. Third-party systems remain clearly labeled until they are connected.
              </p>
            </div>
            <Badge variant="premium">Local preview</Badge>
          </div>
        </Card>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {settingsCards.map((card) => (
            <Card key={card.title} className="bg-white/76">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-serif text-2xl font-bold leading-tight text-foreground">{card.title}</h3>
                <Badge variant={card.status === "Later" ? "neutral" : "success"}>{card.status}</Badge>
              </div>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{card.description}</p>
              <div className="mt-5 rounded-2xl border border-dashed border-border bg-muted/35 p-4 text-sm text-muted-foreground">
                Open this configuration area from the action buttons, save local notes, or reset the preview state while reviewing workflow needs.
              </div>
            </Card>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <Card>
            <CardHeader title="Founder Defaults" eyebrow="Business profile preview" />
            <div className="space-y-3 text-sm">
              {[
                ["Workspace", "Isabella Bella Dream Center"],
                ["Primary use", "Cookie R&D, launch planning, production, costing, and orders"],
                ["Design tone", "Warm, premium, operational, and founder-focused"],
                ["Data status", "Mock local MVP data"],
              ].map(([label, value]) => (
                <div key={label} className="flex flex-col gap-1 rounded-2xl border border-border bg-white/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                  <span className="font-bold text-muted-foreground">{label}</span>
                  <span className="font-semibold text-foreground">{value}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader title="Future Integrations" eyebrow="Not connected yet" />
            <div className="grid gap-2 sm:grid-cols-2">
              {integrationPlaceholders.map((integration) => (
                <div key={integration} className="rounded-2xl border border-border bg-white/60 px-4 py-3 text-sm font-semibold text-foreground">
                  {integration}
                </div>
              ))}
            </div>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}
