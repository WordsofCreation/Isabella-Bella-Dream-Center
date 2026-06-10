import { AppShell } from "@/components/layout/app-shell";
import { SectionPlaceholder } from "@/components/shared/section-placeholder";

export default function SettingsPage() {
  return (
    <AppShell>
      <SectionPlaceholder
        eyebrow="Settings"
        title="Workspace settings"
        description="A future home for business preferences, team roles, notification defaults, and integration setup."
        focusItems={["Keep authentication out of this step", "Add integrations later", "Define workspace preferences after MVP review"]}
      />
    </AppShell>
  );
}
