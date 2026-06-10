import { AppShell } from "@/components/layout/app-shell";
import { SectionPlaceholder } from "@/components/shared/section-placeholder";

export default function LaunchPlannerPage() {
  return (
    <AppShell>
      <SectionPlaceholder
        eyebrow="Launch planner"
        title="Cookie launch checklist"
        description="A future planning board for taking a cookie from approved recipe to polished market launch."
        focusItems={["Confirm recipe and costing", "Prepare packaging and photos", "Schedule menu copy and order form"]}
      />
    </AppShell>
  );
}
