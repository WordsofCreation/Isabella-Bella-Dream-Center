import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { calendarBlocks } from "@/lib/data/mock-data";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const typeVariant: Record<string, "premium" | "success" | "warning" | "neutral" | "dark"> = { Production: "premium", "Test Batch": "warning", Packaging: "success", "Pickup/Delivery": "neutral", Marketing: "dark", Prep: "neutral" };
const prepTasks = ["Dough production", "Dough chilling", "Baking", "Cooling", "Packaging", "Labeling", "Pickup prep", "Delivery prep"];

export default function ProductionCalendarPage() {
  return <AppShell><PageHeader eyebrow="Production calendar" title="Weekly bakery operating plan" description="A weekly view for production blocks, test batches, packaging, pickup/delivery, marketing content, and prep tasks." actions={<><Button>Plan Production Day</Button><Button variant="outline">Add Calendar Block</Button></>} /><div className="grid gap-4 xl:grid-cols-5">{days.map((day) => <Card key={day} className="min-h-96"><h3 className="mb-4 font-serif text-2xl font-bold">{day}</h3><div className="space-y-3">{calendarBlocks.filter((block) => block.day === day).map((block) => <div key={block.id} className="rounded-2xl border border-border bg-background/65 p-3"><div className="flex items-center justify-between gap-2"><p className="font-bold">{block.time}</p><Badge variant={typeVariant[block.type]}>{block.type}</Badge></div><p className="mt-2 font-semibold">{block.title}</p><p className="mt-1 text-sm text-muted-foreground">{block.notes}</p></div>)}</div></Card>)}</div><Card className="mt-5"><h3 className="font-serif text-2xl font-bold">Prep task library</h3><div className="mt-4 flex flex-wrap gap-2">{prepTasks.map((task) => <Badge key={task} variant="premium">{task}</Badge>)}</div></Card></AppShell>;
}
