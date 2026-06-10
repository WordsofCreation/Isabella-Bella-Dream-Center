import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cookieIdeas } from "@/lib/data/mock-data";

export default function CookieIdeasPage() {
  return <AppShell><PageHeader eyebrow="Cookie ideas" title="Idea pipeline" description="Capture flavor concepts, customer fit, seasonality, and the next production decision for each Isabella Bella cookie." actions={<><Button>New Cookie Idea</Button><Button variant="outline">Review Pipeline</Button></>} /><div className="grid gap-5 xl:grid-cols-3">{cookieIdeas.map((idea) => <Card key={idea.id} className="flex flex-col"><div className="mb-3 flex items-start justify-between gap-3"><h3 className="font-serif text-2xl font-bold">{idea.name}</h3><StatusBadge value={idea.status} /></div><p className="text-sm leading-6 text-muted-foreground">{idea.flavorConcept}</p><dl className="mt-4 grid gap-3 text-sm"><Info label="Inspiration" value={idea.inspirationNotes} /><Info label="Target customer" value={idea.targetCustomer} /><Info label="Season / occasion" value={idea.seasonOrOccasion} /></dl><div className="mt-4"><Badge variant={idea.priority === "High" ? "danger" : idea.priority === "Medium" ? "warning" : "neutral"}>{idea.priority} priority</Badge></div><div className="mt-auto grid gap-2 pt-5 sm:grid-cols-2"><Button size="sm">Start Test Batch</Button><Button size="sm" variant="outline">Convert to Recipe</Button><Button size="sm" variant="outline">Schedule Test</Button><Button size="sm" variant="ghost">Archive</Button></div></Card>)}</div></AppShell>;
}
function Info({ label, value }: { label: string; value: string }) { return <div><dt className="font-bold text-foreground">{label}</dt><dd className="text-muted-foreground">{value}</dd></div>; }
