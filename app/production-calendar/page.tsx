import { AppShell } from "@/components/layout/app-shell";
import { SectionPlaceholder } from "@/components/shared/section-placeholder";

export default function ProductionCalendarPage() {
  return (
    <AppShell>
      <SectionPlaceholder
        eyebrow="Production calendar"
        title="Production schedule"
        description="A future calendar for dough prep, bake windows, packaging, pickup, delivery, and marketing blocks."
        focusItems={["Block prep and bake time", "Coordinate packaging windows", "Reserve pickup and delivery periods"]}
      />
    </AppShell>
  );
}
