import { AppShell } from "@/components/layout/app-shell";
import { SectionPlaceholder } from "@/components/shared/section-placeholder";

export default function OrdersPage() {
  return (
    <AppShell>
      <SectionPlaceholder
        eyebrow="Orders"
        title="Customer order queue"
        description="A future queue for customer commitments, quantities, pickup dates, payment status, and allergen flags."
        focusItems={["Track customer and item details", "Monitor fulfillment status", "Keep special notes visible"]}
      />
    </AppShell>
  );
}
