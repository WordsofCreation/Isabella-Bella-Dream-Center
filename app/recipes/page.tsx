import { AppShell } from "@/components/layout/app-shell";
import { SectionPlaceholder } from "@/components/shared/section-placeholder";

export default function RecipesPage() {
  return (
    <AppShell>
      <SectionPlaceholder
        eyebrow="Recipes"
        title="Recipe library"
        description="A future source of truth for approved formulas, bake instructions, storage notes, and allergens."
        focusItems={["Store approved recipe formulas", "Document production notes", "Flag allergen and shelf-life guidance"]}
      />
    </AppShell>
  );
}
