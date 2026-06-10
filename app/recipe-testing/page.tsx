import { AppShell } from "@/components/layout/app-shell";
import { SectionPlaceholder } from "@/components/shared/section-placeholder";

export default function RecipeTestingPage() {
  return (
    <AppShell>
      <SectionPlaceholder
        eyebrow="Recipe testing"
        title="Test batch bench"
        description="A future home for batch notes, sensory scores, version decisions, and retest reminders."
        focusItems={["Capture test date and version", "Track texture, flavor, and appearance notes", "Decide whether to retest or approve"]}
      />
    </AppShell>
  );
}
