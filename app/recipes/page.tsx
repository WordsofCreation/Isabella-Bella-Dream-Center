"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import {
  finalizedRecipes,
  productionSpecs,
  recipeReadiness,
} from "@/lib/data/mock-data";
import type { CookieRecipe, RecipeStatus } from "@/lib/types/domain";
import { cn } from "@/lib/utils";

const filters = [
  "All",
  "Ready for Production",
  "Needs Costing",
  "Seasonal",
  "Archived",
] as const;
type Filter = (typeof filters)[number];

const summaryCards = [
  {
    label: "Finalized Recipes",
    value: finalizedRecipes.length,
    detail: "Approved production cards in the recipe library",
    accentClass: "bg-[#8b5436]",
  },
  {
    label: "Ready for Production",
    value: finalizedRecipes.filter(
      (recipe) => recipe.status === "Ready for Production",
    ).length,
    detail: "Costed, documented, and available for scheduling",
    accentClass: "bg-emerald-600",
  },
  {
    label: "Needs Costing",
    value: finalizedRecipes.filter((recipe) => recipe.status === "Needs Costing")
      .length,
    detail: "Waiting on ingredient pricing or margin review",
    accentClass: "bg-amber-500",
  },
  {
    label: "Seasonal Recipes",
    value: finalizedRecipes.filter((recipe) => recipe.status === "Seasonal")
      .length,
    detail: "Approved formulas reserved for seasonal menus",
    accentClass: "bg-[#d69b76]",
  },
] as const;

const statusTone: Record<RecipeStatus, string> = {
  "Ready for Production": "border-emerald-200 bg-emerald-50 text-emerald-700",
  "Needs Costing": "border-amber-200 bg-amber-50 text-amber-800",
  Seasonal: "border-[#d8b08c] bg-[#fff4e8] text-[#7d4a2f]",
  Archived: "border-stone-200 bg-stone-100 text-stone-600",
};

const costingVariant: Record<
  CookieRecipe["costingStatus"],
  "neutral" | "success" | "warning"
> = {
  Costed: "success",
  "Needs Costing": "warning",
  "Refresh Pricing": "warning",
  Archived: "neutral",
};

export default function RecipesPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const filteredRecipes = useMemo(
    () =>
      activeFilter === "All"
        ? finalizedRecipes
        : finalizedRecipes.filter((recipe) => recipe.status === activeFilter),
    [activeFilter],
  );

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          eyebrow="Recipe library"
          title="Recipes"
          description="Manage finalized Isabella Bella recipes, production specs, and costing readiness."
          actions={<Button>Add Final Recipe</Button>}
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
                  className={cn("h-11 w-1.5 rounded-full", card.accentClass)}
                />
              </div>
            </Card>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
          <Card>
            <CardHeader
              title="Finalized Recipe Cards"
              eyebrow="Approved formulas"
              action={
                <span className="rounded-full bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">
                  {filteredRecipes.length} shown
                </span>
              }
            />
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => {
                const isActive = filter === activeFilter;
                const count =
                  filter === "All"
                    ? finalizedRecipes.length
                    : finalizedRecipes.filter((recipe) => recipe.status === filter)
                        .length;

                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm font-bold transition",
                      isActive
                        ? "border-primary bg-primary text-primary-foreground shadow-sm"
                        : "border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    {filter} <span className="ml-1 opacity-70">{count}</span>
                  </button>
                );
              })}
            </div>
          </Card>

          <Card className="border-[#d8b08c]/60 bg-[#fffaf2]">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">
              Costing readiness
            </p>
            <h2 className="mt-1 font-serif text-2xl font-bold tracking-tight">
              Production-ready review queue
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Use these recipe cards as the operating source of truth before a
              formula moves into a paid order, launch box, or seasonal tin.
            </p>
          </Card>
        </section>

        {filteredRecipes.length > 0 ? (
          <section className="grid gap-5 xl:grid-cols-2">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </section>
        ) : (
          <EmptyRecipesState filter={activeFilter} />
        )}

        <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <Card>
            <CardHeader
              title="Production Specs"
              eyebrow="Quick reference"
            />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {productionSpecs.map((spec) => (
                <div
                  key={spec.id}
                  className="rounded-2xl border border-border bg-white/65 p-4"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    {spec.label}
                  </p>
                  <p className="mt-2 font-serif text-2xl font-bold tracking-tight text-[#6f422c]">
                    {spec.value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {spec.detail}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader title="Recipe Readiness" eyebrow="Launch blockers" />
            <div className="space-y-3">
              {recipeReadiness.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-2xl border border-border bg-white/65 p-4"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#332017] font-serif text-xl font-bold text-white">
                    {item.count}
                  </span>
                  <div>
                    <p className="font-bold text-foreground">{item.label}</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}

function RecipeCard({ recipe }: { recipe: CookieRecipe }) {
  return (
    <Card className="flex h-full flex-col bg-white/75">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">
            Updated {formatDate(recipe.lastUpdatedDate)}
          </p>
          <h3 className="mt-2 font-serif text-2xl font-bold tracking-tight">
            {recipe.cookieName}
          </h3>
        </div>
        <div className="flex flex-wrap gap-2 md:justify-end">
          <RecipeStatusBadge status={recipe.status} />
          <Badge variant={costingVariant[recipe.costingStatus]}>
            {recipe.costingStatus}
          </Badge>
        </div>
      </div>

      <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2 xl:grid-cols-3">
        <Spec label="Yield" value={recipe.yield} />
        <Spec label="Batch size" value={recipe.batchSize} />
        <Spec label="Portion size" value={recipe.portionSize} />
        <Spec label="Dough weight" value={recipe.doughWeightPerCookie} />
        <Spec label="Bake temperature" value={recipe.bakeTemperature} />
        <Spec label="Bake time" value={recipe.bakeTime} />
        <Spec label="Cooling time" value={recipe.coolingTime} />
        <Spec label="Shelf life" value={recipe.shelfLife} />
        <div>
          <dt className="font-bold text-foreground">Recipe status</dt>
          <dd className="mt-1">
            <StatusBadge value={recipe.status} />
          </dd>
        </div>
      </dl>

      <div className="mt-5 grid gap-3 text-sm">
        <Note label="Storage notes" value={recipe.storageNotes} />
        <Note label="Production notes" value={recipe.productionNotes} />
        <Note label="Allergen notes" value={recipe.allergenNotes} />
      </div>

      <div className="mt-auto flex flex-wrap gap-2 pt-5">
        <Button type="button" size="sm">
          View Recipe
        </Button>
        <Button type="button" variant="outline" size="sm">
          Cost Recipe
        </Button>
        <Button type="button" variant="ghost" size="sm">
          Schedule Production
        </Button>
      </div>
    </Card>
  );
}

function RecipeStatusBadge({ status }: { status: RecipeStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold",
        statusTone[status],
      )}
    >
      {status}
    </span>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-bold text-foreground">{label}</dt>
      <dd className="mt-1 leading-6 text-muted-foreground">{value}</dd>
    </div>
  );
}

function Note({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-muted/45 p-4">
      <p className="font-bold text-foreground">{label}</p>
      <p className="mt-1 leading-6 text-muted-foreground">{value}</p>
    </div>
  );
}

function EmptyRecipesState({ filter }: { filter: Filter }) {
  return (
    <Card className="border-dashed bg-white/60 py-12 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">
        No recipes found
      </p>
      <h3 className="mt-2 font-serif text-3xl font-bold">
        {filter === "All"
          ? "No finalized recipes"
          : `No ${filter.toLowerCase()} recipes`}
      </h3>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
        Switch filters or add a finalized Isabella Bella recipe when the next
        approved formula is ready for production review.
      </p>
    </Card>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}
