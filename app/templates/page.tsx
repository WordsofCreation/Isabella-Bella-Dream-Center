import { AppShell } from "@/components/layout/app-shell";
import { SectionPlaceholder } from "@/components/shared/section-placeholder";

export default function TemplatesPage() {
  return (
    <AppShell>
      <SectionPlaceholder
        eyebrow="Templates"
        title="Reusable operating templates"
        description="A future library for standard R&D, production, costing, launch, and marketing checklists."
        focusItems={["Create repeatable workflows", "Standardize team handoffs", "Keep founder operations consistent"]}
      />
    </AppShell>
  );
}
