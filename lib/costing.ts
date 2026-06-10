import type { Ingredient, RecipeCostSnapshot } from "@/lib/types/domain";

export function getUsableOunces(ingredient: Ingredient) {
  return ingredient.purchaseUnitWeightOz * (ingredient.yieldPercentage / 100);
}

export function getUsableCostPerOunce(ingredient: Ingredient) {
  return ingredient.purchasePrice / getUsableOunces(ingredient);
}

export function getCostPerCookie(snapshot: RecipeCostSnapshot) {
  return snapshot.totalRecipeCost / snapshot.recipeYield;
}

export function getFoodCostPercentage(snapshot: RecipeCostSnapshot) {
  return (getCostPerCookie(snapshot) / snapshot.suggestedMenuPrice) * 100;
}

export function getGrossProfitPerCookie(snapshot: RecipeCostSnapshot) {
  return snapshot.suggestedMenuPrice - getCostPerCookie(snapshot);
}

export function formatCurrency(value: number, maximumFractionDigits = 2) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits,
  }).format(value);
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}
