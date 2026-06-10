import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { DataTable } from "@/components/ui/table";
import { costingResults, ingredients } from "@/lib/data/mock-data";
import { currency, percentage } from "@/lib/utils";

export default function IngredientCostingPage() {
  return <AppShell><PageHeader eyebrow="Ingredient costing" title="Ingredient master and recipe cost model" description="Mocked costing logic shows purchase price, unit weight, yield, usable ounce cost, recipe quantity, food cost percentage, and suggested menu price." actions={<><Button>Add Ingredient</Button><Button variant="outline">Update Vendor Price</Button><Button variant="outline">Calculate Recipe Cost</Button></>} /><div className="mb-5 grid gap-5 xl:grid-cols-2">{costingResults.map((cost) => <Card key={cost.id}><CardHeader title="Costing logic preview" eyebrow={cost.recipeId} /><div className="grid grid-cols-2 gap-3 text-sm md:grid-cols-3"><Metric label="Purchase price" value={currency(cost.purchasePrice)} /><Metric label="Unit weight" value={`${cost.purchaseUnitWeightOz} oz`} /><Metric label="Yield" value={percentage(cost.yieldPercentage)} /><Metric label="Usable cost / oz" value={currency(cost.usableCostPerOunce)} /><Metric label="Recipe qty used" value={`${cost.recipeQuantityUsedOz} oz`} /><Metric label="Total recipe cost" value={currency(cost.totalRecipeCost)} /><Metric label="Cost / cookie" value={currency(cost.costPerCookie)} /><Metric label="Suggested price" value={currency(cost.suggestedMenuPrice)} /><Metric label="Food cost %" value={percentage(cost.foodCostPercentage)} /></div></Card>)}</div><DataTable headers={["Ingredient", "Vendor", "Purchase unit", "Purchase price", "Yield", "Cost / oz", "Recipe usage", "Allergen", "Last update"]} rows={ingredients.map((i) => [<strong key="n">{i.name}</strong>, i.vendor, i.purchaseUnit, currency(i.purchasePrice), percentage(i.yieldPercentage), currency(i.costPerOunce), i.recipeUsage, <StatusBadge key="a" value={i.allergenTag} />, i.lastPriceUpdate])} /></AppShell>;
}
function Metric({ label, value }: { label: string; value: string }) { return <div className="rounded-2xl bg-muted/60 p-3"><p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{label}</p><p className="mt-1 font-bold">{value}</p></div>; }
