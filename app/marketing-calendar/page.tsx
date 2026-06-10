import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { DataTable } from "@/components/ui/table";
import { marketingTasks } from "@/lib/data/mock-data";
import type { MarketingTask } from "@/lib/types/domain";
import { cn } from "@/lib/utils";

const statusVariant: Record<MarketingTask["campaignStatus"], "neutral" | "warning" | "success" | "premium"> = {
  Draft: "neutral",
  Scheduled: "warning",
  Ready: "premium",
  Published: "success",
};

const contentTone: Record<MarketingTask["contentType"], string> = {
  Photo: "bg-[#f6e1cf] text-[#7d4a2f]",
  Reel: "bg-[#efe4d5] text-[#6f422c]",
  Story: "bg-[#eaded0] text-[#6b4c3a]",
  Email: "bg-[#f8ead8] text-[#7a5237]",
  Website: "bg-[#e8dccb] text-[#5f4638]",
  "Menu Update": "bg-[#f3dfc9] text-[#795236]",
};

const weekPlan = [
  { day: "Monday", focus: "Founder story + signature flavor tease", deliverable: "Caption draft and kitchen detail shot", status: "Draft" },
  { day: "Tuesday", focus: "Product photo batch list", deliverable: "Shot list for Brown Butter Sea Salt", status: "Scheduled" },
  { day: "Wednesday", focus: "Launch education", deliverable: "Story frames on ingredients and texture", status: "Ready" },
  { day: "Thursday", focus: "Email/newsletter prep", deliverable: "Subscriber launch note and preorder reminder", status: "Draft" },
  { day: "Friday", focus: "Launch announcement", deliverable: "Instagram post, website banner, and menu update", status: "Ready" },
] as const;

const instagramIdeas = [
  "Close-up carousel: crisp edge, melted chocolate, finishing salt",
  "Behind-the-scenes reel: brown butter pour, dough rest, tray pull",
  "Founder note: why the signature cookie anchors the first menu",
  "Customer prompt: ask followers which gift box occasion they are planning",
];

const photoTasks = [
  "Shoot hero image on warm neutral linen with gift box in frame",
  "Capture overhead 6-count box layout for menu and preorder pages",
  "Take ingredient detail shots: chocolate, browned butter, finishing salt",
  "Export square, vertical story, and website banner crops",
];

const launchTasks = [
  "Confirm launch date language across Instagram, website, and email",
  "Prepare preorder opening announcement and final reminder",
  "Draft pickup-window expectations and limited quantity note",
  "Review allergen statement before publishing menu copy",
];

const emailIdeas = [
  "Founder letter introducing Isabella Bella and the first signature drop",
  "VIP early-access note for friends, family, and first customers",
  "Production day reminder with pickup window and freshness guidance",
  "Post-launch thank-you note with review request and next flavor teaser",
];

const taskRows = marketingTasks.map((task) => [
  <div key="title" className="min-w-[220px]">
    <p className="font-bold text-foreground">{task.title}</p>
    <p className="mt-1 text-xs font-semibold text-muted-foreground">{task.channel}</p>
  </div>,
  <span key="date" className="font-semibold text-foreground">{task.dueDate}</span>,
  <span key="type" className={cn("rounded-full px-2.5 py-1 text-xs font-bold", contentTone[task.contentType])}>{task.contentType}</span>,
  <Badge key="status" variant={statusVariant[task.campaignStatus]}>{task.campaignStatus}</Badge>,
  <p key="notes" className="min-w-[280px] text-sm leading-6 text-muted-foreground">{task.notes}</p>,
]);

export default function MarketingCalendarPage() {
  const publishedCount = marketingTasks.filter((task) => task.campaignStatus === "Published").length;
  const readyCount = marketingTasks.filter((task) => task.campaignStatus === "Ready").length;
  const scheduledCount = marketingTasks.filter((task) => task.campaignStatus === "Scheduled").length;

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          eyebrow="Marketing calendar"
          title="Content and Campaign Calendar"
          description="Plan Isabella Bella launch messaging, product photography, email ideas, and campaign tasks in one review-ready workspace."
          actions={
            <>
              <Button type="button">Add Campaign Task</Button>
              <Button type="button" variant="outline">Review This Week</Button>
            </>
          }
        />

        <section className="grid gap-4 md:grid-cols-3">
          <Card className="bg-white/75">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Ready assets</p>
            <p className="mt-3 font-serif text-4xl font-bold tracking-tight">{readyCount}</p>
            <p className="mt-2 text-sm text-muted-foreground">Approved or nearly approved items for the next launch.</p>
          </Card>
          <Card className="bg-white/75">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Scheduled tasks</p>
            <p className="mt-3 font-serif text-4xl font-bold tracking-tight">{scheduledCount}</p>
            <p className="mt-2 text-sm text-muted-foreground">Calendar holds for content, photo, and announcement work.</p>
          </Card>
          <Card className="bg-white/75">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Published</p>
            <p className="mt-3 font-serif text-4xl font-bold tracking-tight">{publishedCount}</p>
            <p className="mt-2 text-sm text-muted-foreground">Completed posts or updates in the mocked MVP plan.</p>
          </Card>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <Card>
            <CardHeader title="Weekly Content Calendar" eyebrow="Launch week rhythm" />
            <div className="space-y-3">
              {weekPlan.map((item) => (
                <div key={item.day} className="grid gap-3 rounded-2xl border border-border bg-white/60 p-4 md:grid-cols-[120px_1fr_auto] md:items-center">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">{item.day}</p>
                    <Badge className="mt-2" variant={statusVariant[item.status]}>{item.status}</Badge>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-foreground">{item.focus}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.deliverable}</p>
                  </div>
                  <Button type="button" variant="outline" size="sm">Open</Button>
                </div>
              ))}
            </div>
          </Card>

          <Card className="border-[#d8b08c]/60 bg-[#fffaf2]">
            <CardHeader title="Campaign Status" eyebrow="Current drop" />
            <div className="space-y-4">
              {["Launch announcement", "Product photos", "Email newsletter", "Menu update"].map((label, index) => (
                <div key={label}>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="text-sm font-bold text-foreground">{label}</span>
                    <Badge variant={index < 2 ? "premium" : "warning"}>{index < 2 ? "Ready" : "Draft"}</Badge>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-[#8b5436]" style={{ width: `${index < 2 ? 86 : 52}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
          <IdeaList title="Mock Instagram Post Ideas" eyebrow="Social" items={instagramIdeas} />
          <IdeaList title="Product Photo Tasks" eyebrow="Photography" items={photoTasks} />
          <IdeaList title="Launch Announcement Tasks" eyebrow="Release" items={launchTasks} />
          <IdeaList title="Email / Newsletter Ideas" eyebrow="Retention" items={emailIdeas} />
        </section>

        <Card>
          <CardHeader title="Campaign Task Table" eyebrow="Mock operating plan" />
          {marketingTasks.length > 0 ? (
            <DataTable headers={["Task", "Due", "Type", "Status", "Notes"]} rows={taskRows} />
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-muted/40 p-8 text-center text-sm text-muted-foreground">
              No campaign tasks yet. Add launch posts, photo work, and email reminders when a cookie drop is ready.
            </div>
          )}
        </Card>
      </div>
    </AppShell>
  );
}

function IdeaList({ title, eyebrow, items }: { title: string; eyebrow: string; items: string[] }) {
  return (
    <Card className="bg-white/72">
      <CardHeader title={title} eyebrow={eyebrow} />
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="rounded-2xl border border-border bg-[#fffaf2] px-4 py-3 text-sm leading-6 text-muted-foreground">
            {item}
          </li>
        ))}
      </ul>
    </Card>
  );
}
