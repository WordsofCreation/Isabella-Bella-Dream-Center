import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { launches, marketingTasks, orders, productionTasks, recipeTests } from "@/lib/data/mock-data";
import { currency } from "@/lib/utils";

const priorities = ["Approve miso caramel launch copy", "Retest pistachio rose texture", "Confirm gift box packaging lead time"];

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="mb-8 grid gap-5 xl:grid-cols-[1.3fr_0.7fr]">
        <Card className="relative overflow-hidden p-7">
          <div className="absolute right-0 top-0 h-48 w-48 rounded-bl-[5rem] bg-accent/15" />
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-muted-foreground">Founder dashboard</p>
          <h2 className="mt-2 max-w-3xl font-serif text-4xl font-bold tracking-tight md:text-5xl">Capture every Isabella Bella cookie idea and move it toward a polished launch.</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">A serious operating hub for testing recipes, tracking true food cost, scheduling production, and launching boutique cookie drops with confidence.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button>Plan Production Day</Button>
            <Button variant="outline">Create New Cookie Test</Button>
          </div>
        </Card>
        <Card>
          <CardHeader title="Quick capture" eyebrow="Idea, task, or note" />
          <textarea className="min-h-36 w-full rounded-2xl border border-border bg-background/70 p-4 text-sm outline-none focus:ring-2 focus:ring-ring" placeholder="Add a cookie idea, task, or note…" />
          <Button className="mt-4 w-full" variant="accent">Save to Dream Center</Button>
        </Card>
      </div>

      <div className="grid gap-5 xl:grid-cols-4">
        <Metric title="Today’s production tasks" value="4" icon="PD" detail="2 high priority" />
        <Metric title="Active cookie tests" value="3" icon="RT" detail="1 approved" />
        <Metric title="Upcoming launches" value="3" icon="LP" detail="Next: Jun 21" />
        <Metric title="Food cost snapshot" value="29.3%" icon="$" detail={`${currency(1.79)} avg. cost/cookie`} />
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader title="Today’s production tasks" eyebrow="Command list" />
          <div className="space-y-3">
            {productionTasks.map((task) => <div key={task.id} className="flex flex-col gap-3 rounded-2xl border border-border bg-background/60 p-4 md:flex-row md:items-center md:justify-between"><div><p className="font-bold">{task.title}</p><p className="text-sm text-muted-foreground">{task.dueTime} · {task.cookieName ?? "Operations"} · Owner: {task.owner}</p></div><div className="flex gap-2"><Badge variant={task.priority === "High" ? "danger" : "warning"}>{task.priority}</Badge><Badge>{task.status}</Badge></div></div>)}
          </div>
        </Card>
        <Card>
          <CardHeader title="Top 3 priorities" eyebrow="Founder focus" />
          <ol className="space-y-3">
            {priorities.map((priority, index) => <li key={priority} className="flex gap-3 rounded-2xl bg-muted/60 p-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{index + 1}</span><span className="text-sm font-semibold">{priority}</span></li>)}
          </ol>
        </Card>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <Card><CardHeader title="Open recipe tests" eyebrow="R&D bench" />{recipeTests.map((test) => <Row key={test.id} icon="RT" title={`${test.cookieName} ${test.version}`} detail={`${test.testDate} · Rating ${test.overallRating}/10`} badge={test.result} />)}</Card>
        <Card><CardHeader title="Upcoming launches" eyebrow="Launch planner" />{launches.map((launch) => <Row key={launch.id} icon="LC" title={launch.cookieName} detail={`Launch date ${launch.launchDate}`} badge={launch.status} />)}</Card>
        <Card><CardHeader title="Recent orders" eyebrow="Customer commitments" />{orders.map((order) => <Row key={order.id} icon="OR" title={order.customerName} detail={`${order.quantity} items · ${order.pickupDeliveryDate}`} badge={order.fulfillmentStatus} />)}</Card>
        <Card><CardHeader title="Marketing tasks due this week" eyebrow="Content calendar" />{marketingTasks.slice(0, 4).map((task) => <Row key={task.id} icon="MK" title={task.title} detail={`${task.dueDate} · ${task.channel}`} badge={task.contentType} />)}</Card>
      </div>
    </AppShell>
  );
}

function Metric({ title, value, detail, icon }: { title: string; value: string; detail: string; icon: string }) {
  return <Card><div className="flex items-center justify-between"><div><p className="text-sm font-semibold text-muted-foreground">{title}</p><p className="mt-2 text-3xl font-bold">{value}</p><p className="mt-1 text-xs text-muted-foreground">{detail}</p></div><div className="rounded-2xl bg-accent/15 p-3 text-sm font-bold text-primary">{icon}</div></div></Card>;
}

function Row({ icon, title, detail, badge }: { icon: string; title: string; detail: string; badge: string }) {
  return <div className="mb-3 flex items-center justify-between gap-3 rounded-2xl border border-border bg-background/60 p-3 last:mb-0"><div className="flex items-center gap-3"><div className="rounded-xl bg-muted p-2 text-xs font-bold text-primary">{icon}</div><div><p className="font-bold">{title}</p><p className="text-sm text-muted-foreground">{detail}</p></div></div><Badge variant="premium">{badge}</Badge></div>;
}
