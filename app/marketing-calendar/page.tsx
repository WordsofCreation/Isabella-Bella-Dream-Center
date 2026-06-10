import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { marketingTasks } from "@/lib/data/mock-data";

const categories = ["Product photo tasks", "Instagram post ideas", "Launch announcements", "Behind-the-scenes content", "Email newsletter ideas", "Seasonal campaign planning"];

export default function MarketingCalendarPage() {
  return <AppShell><PageHeader eyebrow="Marketing calendar" title="Weekly content schedule" description="Plan refined launch communications across photo, reel, story, email, website, menu update, and seasonal campaign content." actions={<Button>Schedule Content</Button>} /><div className="mb-5 flex flex-wrap gap-2">{categories.map((category) => <Badge key={category} variant="premium">{category}</Badge>)}</div><div className="grid gap-5 xl:grid-cols-3">{marketingTasks.map((task) => <Card key={task.id}><div className="flex items-start justify-between gap-3"><div><Badge variant="neutral">{task.contentType}</Badge><h3 className="mt-3 font-serif text-2xl font-bold">{task.title}</h3><p className="text-sm text-muted-foreground">Due {task.dueDate} · {task.channel}</p></div><StatusBadge value={task.campaignStatus} /></div><p className="mt-4 text-sm leading-6 text-muted-foreground">{task.notes}</p><Button className="mt-5" size="sm" variant="outline">Open Content Brief</Button></Card>)}</div></AppShell>;
}
