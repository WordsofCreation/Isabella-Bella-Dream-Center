import { AppShell } from "@/components/layout/app-shell";
import { SectionPlaceholder } from "@/components/shared/section-placeholder";

export default function IngredientCostingPage() {
  return (
    <AppShell>
      <SectionPlaceholder
        eyebrow="Ingredient costing"
        title="Costing workspace"
        description="A future place to model ingredient prices, usable yield, recipe cost, and target menu pricing."
        focusItems={["Maintain ingredient purchase details", "Calculate cost per ounce", "Estimate food cost percentage"]}
      />
    </AppShell>
  );
}
