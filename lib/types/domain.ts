export type Priority = "Low" | "Medium" | "High";
export type CookieIdeaStatus = "Idea" | "Testing" | "Approved" | "Archived";
export type RecipeTestResult = "Needs Work" | "Retest" | "Approved";
export type RecipeStatus = "Ready for Production" | "Needs Costing" | "Seasonal" | "Archived";
export type CostingStatus = "Costed" | "Needs Costing" | "Refresh Pricing" | "Archived";
export type IngredientWarning = "High cost ingredient" | "Price needs update" | "Allergen" | "Needs vendor confirmation";
export type LaunchStatus = "Planning" | "Ready" | "Live" | "Complete";
export type PaymentStatus = "Unpaid" | "Deposit Paid" | "Paid";
export type FulfillmentStatus = "Queued" | "In Production" | "Ready" | "Fulfilled";
export type ContentType = "Photo" | "Reel" | "Story" | "Email" | "Website" | "Menu Update";

export interface CookieIdea {
  id: string;
  name: string;
  flavorConcept: string;
  inspirationNotes: string;
  targetCustomer: string;
  seasonOrOccasion: string;
  status: CookieIdeaStatus;
  priority: Priority;
  createdDate: string;
  nextAction: string;
}

export interface RecipeTest {
  id: string;
  cookieName: string;
  version: `v${number}`;
  testDate: string;
  batchSize: string;
  textureNotes: string;
  flavorNotes: string;
  appearanceNotes: string;
  overallRating: number;
  result: RecipeTestResult;
}

export interface CookieRecipe {
  id: string;
  cookieName: string;
  status: RecipeStatus;
  yield: string;
  batchSize: string;
  portionSize: string;
  doughWeightPerCookie: string;
  bakeTemperature: string;
  bakeTime: string;
  coolingTime: string;
  shelfLife: string;
  storageNotes: string;
  productionNotes: string;
  allergenNotes: string;
  costingStatus: CostingStatus;
  lastUpdatedDate: string;
}

export interface ProductionSpec {
  id: string;
  label: string;
  value: string;
  detail: string;
}

export interface RecipeReadinessItem {
  id: string;
  label: string;
  count: number;
  detail: string;
}

export interface Ingredient {
  id: string;
  name: string;
  vendor: string;
  purchaseUnit: string;
  purchasePrice: number;
  purchaseUnitWeightOz: number;
  yieldPercentage: number;
  allergenTag: string;
  lastPriceUpdate: string;
  warningFlags: IngredientWarning[];
}

export interface RecipeCostSnapshot {
  id: string;
  recipeName: string;
  totalRecipeCost: number;
  recipeYield: number;
  suggestedMenuPrice: number;
  costingStatus: CostingStatus;
}

export interface CustomerOrder {
  id: string;
  customerName: string;
  orderItems: string[];
  quantity: number;
  pickupDeliveryDate: string;
  paymentStatus: PaymentStatus;
  fulfillmentStatus: FulfillmentStatus;
  specialNotes: string;
  allergensFlagged: string[];
}

export interface CalendarBlock {
  id: string;
  day: string;
  time: string;
  title: string;
  type: "Production" | "Test Batch" | "Packaging" | "Pickup/Delivery" | "Marketing" | "Prep";
  notes: string;
}

export interface CookieLaunch {
  id: string;
  cookieName: string;
  launchDate: string;
  status: LaunchStatus;
  checklist: string[];
}

export interface MarketingTask {
  id: string;
  title: string;
  dueDate: string;
  contentType: ContentType;
  campaignStatus: "Draft" | "Scheduled" | "Ready" | "Published";
  channel: string;
  notes: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
}
