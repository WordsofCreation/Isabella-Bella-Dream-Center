import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { DataTable } from "@/components/ui/table";
import {
  formatCurrency,
  formatDate,
  getCostPerCookie,
  getFoodCostPercentage,
  getGrossProfitPerCookie,
  getUsableCostPerOunce,
} from "@/lib/costing";
import { ingredientMaster, recipeCostSnapshots } from "@/lib/data/mock-data";
import type { CostingStatus, IngredientWarning } from "@/lib/types/domain";

const warningBadgeVariant: Record<
  IngredientWarning,
  "danger" | "warning" | "premium"
> = {
  "High cost ingredient": "danger",
  "Price needs update": "warning",
  Allergen: "premium",
  "Needs vendor confirmation": "warning",
};

const costingStatusVariant: Record<
  CostingStatus,
  "neutral" | "success" | "warning"
> = {
  Costed: "success",
  "Needs Costing": "warning",
  "Refresh Pricing": "warning",
  Archived: "neutral",
};

const formulas = [
  "Usable cost per ounce = purchase price / usable ounces",
  "Total recipe cost = sum of ingredient extended costs",
  "Cost per cookie = total recipe cost / recipe yield",
  "Food cost percentage = cost per cookie / menu price",
  "Gross profit per cookie = menu price - cost per cookie",
] as const;

const averageFoodCostPercentage =
  recipeCostSnapshots.reduce(
    (total, snapshot) => total + getFoodCostPercentage(snapshot),
    0,
  ) / recipeCostSnapshots.length;

const recipesNeedingCosting = recipeCostSnapshots.filter(
  (snapshot) => snapshot.costingStatus !== "Costed",
).length;

const lastPriceUpdate = ingredientMaster.reduce(
  (latest, ingredient) =>
    ingredient.lastPriceUpdate > latest ? ingredient.lastPriceUpdate : latest,
  ingredientMaster[0]?.lastPriceUpdate ?? "2026-06-01",
);

const summaryCards = [
  {
    label: "Total Ingredients",
    value: ingredientMaster.length.toString(),
    detail: "Tracked purchase units with usable yield assumptions",
    accentClass: "bg-[#8b5436]",
  },
  {
    label: "Average Food Cost %",
    value: `${averageFoodCostPercentage.toFixed(1)}%`,
    detail: "Across active mocked costing snapshots",
    accentClass: "bg-emerald-600",
  },
  {
    label: "Recipes Needing Costing",
    value: recipesNeedingCosting.toString(),
    detail: "Pricing refresh or full costing review required",
    accentClass: "bg-amber-500",
  },
  {
    label: "Last Price Update",
    value: formatDate(lastPriceUpdate),
    detail: "Most recent vendor price captured in mock data",
    accentClass: "bg-[#d69b76]",
  },
] as const;

export default function IngredientCostingPage() {
  const ingredientRows = ingredientMaster.map((ingredient) => [
    <div key="name" className="min-w-[180px]">
      <p className="font-bold text-foreground">{ingredient.name}</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {ingredient.warningFlags.slice(0, 2).map((warning) => (
          <Badge key={warning} variant={warningBadgeVariant[warning]}>
            {warning}
          </Badge>
        ))}
      </div>
    </div>,
    <span key="vendor" className="text-muted-foreground">
      {ingredient.vendor}
    </span>,
    <span key="unit" className="font-semibold text-foreground">
      {ingredient.purchaseUnit}
    </span>,
    <span key="price" className="font-semibold text-foreground">
      {formatCurrency(ingredient.purchasePrice)}
    </span>,
    <span key="ounces" className="text-muted-foreground">
      {ingredient.purchaseUnitWeightOz.toLocaleString()} oz
    </span>,
    <span key="yield" className="text-muted-foreground">
      {ingredient.yieldPercentage}%
    </span>,
    <span key="cost" className="font-bold text-[#6f422c]">
      {formatCurrency(getUsableCostPerOunce(ingredient), 3)} / oz
    </span>,
    <Badge
      key="allergen"
      variant={ingredient.allergenTag === "None declared" ? "neutral" : "premium"}
    >
      {ingredient.allergenTag}
    </Badge>,
    <span key="updated" className="text-muted-foreground">
      {formatDate(ingredient.lastPriceUpdate)}
    </span>,
  ]);

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          eyebrow="Ingredient costing"
          title="Ingredient Costing"
          description="Track ingredient prices, yields, allergens, and recipe cost targets."
          actions={
            <>
              <Button type="button">Add Ingredient</Button>
              <Button type="button" variant="outline">
                Calculate Recipe Cost
              </Button>
            </>
          }
        />

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((card) => (
            <Card key={card.label} className="bg-white/75">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-serif text-4xl font-bold tracking-tight">
                    {card.value}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-foreground">
                    {card.label}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    {card.detail}
                  </p>
                </div>
                <span
                  className={`h-11 w-1.5 rounded-full ${card.accentClass}`}
                />
              </div>
            </Card>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1fr_0.52fr]">
          <Card className="border-[#d8b08c]/60 bg-[#fffaf2]">
            <CardHeader title="Cost Control Queue" eyebrow="Operations focus" />
            <div className="grid gap-3 md:grid-cols-2">
              <ActionPanel
                title="Vendor price review"
                detail="Refresh stale ingredient prices before new menu pricing or wholesale quotes."
                action="Update Vendor Price"
              />
              <ActionPanel
                title="Recipe usage audit"
                detail="Review ingredient usage assumptions by batch, yield, and final cookie size."
                action="View Usage"
              />
              <ActionPanel
                title="Ingredient record"
                detail="Adjust mocked vendor, allergen, purchase unit, and yield details."
                action="Edit Ingredient"
              />
              <ActionPanel
                title="Recipe margin check"
                detail="Run a local costing flow against target food-cost ranges."
                action="Cost Recipe"
              />
            </div>
          </Card>

          <Card>
            <CardHeader title="Costing Formula Helper" eyebrow="Reference" />
            <ul className="space-y-3">
              {formulas.map((formula) => (
                <li
                  key={formula}
                  className="rounded-2xl border border-border bg-white/65 px-4 py-3 text-sm font-semibold leading-6 text-foreground"
                >
                  {formula}
                </li>
              ))}
            </ul>
          </Card>
        </section>

        <section>
          <CardHeader
            title="Ingredient Master Table"
            eyebrow="Purchase costs and usable yield"
            action={
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">
                {ingredientMaster.length} ingredients
              </span>
            }
          />
          {ingredientMaster.length > 0 ? (
            <DataTable
              headers={[
                "Ingredient",
                "Vendor",
                "Purchase unit",
                "Purchase price",
                "Unit weight",
                "Yield",
                "Usable cost / oz",
                "Allergen",
                "Last updated",
              ]}
              rows={ingredientRows}
              className="bg-white/80"
            />
          ) : (
            <EmptyCostingState
              title="No ingredients yet"
              description="Add the first mocked ingredient to begin tracking purchase prices, usable yield, and allergens."
            />
          )}
        </section>

        <section>
          <CardHeader
            title="Recipe Cost Snapshot"
            eyebrow="Mocked recipe results"
            action={
              <Button type="button" size="sm">
                Cost Recipe
              </Button>
            }
          />
          {recipeCostSnapshots.length > 0 ? (
            <div className="grid gap-5 xl:grid-cols-2">
              {recipeCostSnapshots.map((snapshot) => {
                const costPerCookie = getCostPerCookie(snapshot);
                const foodCostPercentage = getFoodCostPercentage(snapshot);
                const grossProfit = getGrossProfitPerCookie(snapshot);

                return (
                  <Card key={snapshot.id} className="bg-white/75">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">
                          Recipe costing
                        </p>
                        <h3 className="mt-2 font-serif text-2xl font-bold tracking-tight">
                          {snapshot.recipeName}
                        </h3>
                      </div>
                      <Badge
                        variant={costingStatusVariant[snapshot.costingStatus]}
                      >
                        {snapshot.costingStatus}
                      </Badge>
                    </div>

                    <dl className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      <Metric
                        label="Total recipe cost"
                        value={formatCurrency(snapshot.totalRecipeCost)}
                      />
                      <Metric
                        label="Recipe yield"
                        value={`${snapshot.recipeYield} cookies`}
                      />
                      <Metric
                        label="Cost per cookie"
                        value={formatCurrency(costPerCookie)}
                        emphasized
                      />
                      <Metric
                        label="Suggested menu price"
                        value={formatCurrency(snapshot.suggestedMenuPrice)}
                      />
                      <Metric
                        label="Food cost percentage"
                        value={`${foodCostPercentage.toFixed(1)}%`}
                        emphasized
                      />
                      <Metric
                        label="Gross profit per cookie"
                        value={formatCurrency(grossProfit)}
                        emphasized
                      />
                    </dl>
                  </Card>
                );
              })}
            </div>
          ) : (
            <EmptyCostingState
              title="No costing results yet"
              description="Use Cost Recipe to create a mocked recipe snapshot once ingredients and yield assumptions are ready."
            />
          )}
        </section>
      </div>
    </AppShell>
  );
}

function ActionPanel({
  title,
  detail,
  action,
}: {
  title: string;
  detail: string;
  action: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-white/65 p-4">
      <p className="font-bold text-foreground">{title}</p>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{detail}</p>
      <Button type="button" variant="ghost" size="sm" className="mt-4">
        {action}
      </Button>
    </div>
  );
}

function Metric({
  label,
  value,
  emphasized = false,
}: {
  label: string;
  value: string;
  emphasized?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-border bg-muted/35 p-4">
      <dt className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </dt>
      <dd
        className={
          emphasized
            ? "mt-2 font-serif text-3xl font-bold tracking-tight text-[#6f422c]"
            : "mt-2 text-lg font-bold text-foreground"
        }
      >
        {value}
      </dd>
    </div>
  );
}

function EmptyCostingState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Card className="border-dashed bg-white/60 py-12 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">
        Empty state
      </p>
      <h3 className="mt-2 font-serif text-3xl font-bold">{title}</h3>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </Card>
  );
}
