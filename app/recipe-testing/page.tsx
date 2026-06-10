import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { recipeTests } from "@/lib/data/mock-data";

export default function RecipeTestingPage() {
  return <AppShell><PageHeader eyebrow="Recipe testing" title="Test batch lab" description="Track versions, tasting notes, production behavior, and approval decisions before a cookie becomes a final recipe." actions={<Button>Create New Cookie Test</Button>} /><div className="grid gap-5 xl:grid-cols-3">{recipeTests.map((test) => <Card key={test.id}><div className="flex items-start justify-between gap-3"><div><h3 className="font-serif text-2xl font-bold">{test.cookieName}</h3><p className="text-sm font-semibold text-muted-foreground">{test.version} · {test.testDate}</p></div><StatusBadge value={test.result} /></div><div className="mt-4 grid grid-cols-2 gap-3 text-sm"><Metric label="Batch size" value={test.batchSize} /><Metric label="Portion size" value={test.portionSize} /><Metric label="Spread" value={`${test.spreadScore}/10`} /><Metric label="Chew" value={`${test.chewScore}/10`} /><Metric label="Sweetness" value={`${test.sweetnessScore}/10`} /><Metric label="Overall" value={`${test.overallRating}/10`} /></div><div className="mt-4 space-y-3 text-sm"><Note label="Texture" value={test.textureNotes} /><Note label="Flavor" value={test.flavorNotes} /><Note label="Appearance" value={test.appearanceNotes} /></div><div className="mt-5 flex flex-wrap gap-2"><Button size="sm">Mark Approved</Button><Button size="sm" variant="outline">Create New Version</Button><Button size="sm" variant="outline">Convert to Final Recipe</Button></div></Card>)}</div></AppShell>;
}
function Metric({ label, value }: { label: string; value: string }) { return <div className="rounded-2xl bg-muted/60 p-3"><p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{label}</p><p className="mt-1 font-bold">{value}</p></div>; }
function Note({ label, value }: { label: string; value: string }) { return <p><span className="font-bold">{label}: </span><span className="text-muted-foreground">{value}</span></p>; }
