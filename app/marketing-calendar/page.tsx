import { AppShell } from "@/components/layout/app-shell";
import { SectionPlaceholder } from "@/components/shared/section-placeholder";

export default function MarketingCalendarPage() {
  return (
    <AppShell>
      <SectionPlaceholder
        eyebrow="Marketing calendar"
        title="Content and campaign calendar"
        description="A future view for launch posts, product photography, emails, menu updates, and campaign tasks."
        focusItems={["Plan launch content", "Schedule channel-specific tasks", "Track draft, ready, and published states"]}
      />
    </AppShell>
  );
}
