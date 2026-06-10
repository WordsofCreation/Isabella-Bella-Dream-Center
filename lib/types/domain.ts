export type Priority = "Low" | "Medium" | "High";
export type CookieIdeaStatus = "Idea" | "Testing" | "Approved" | "Archived";
export type RecipeTestResult = "Needs Work" | "Retest" | "Approved";
export type LaunchStatus = "Planning" | "Ready" | "Live" | "Complete";
export type PaymentStatus = "Unpaid" | "Deposit Paid" | "Paid";
export type FulfillmentStatus = "Queued" | "In Production" | "Ready" | "Fulfilled";
export type ContentType = "Photo" | "Reel" | "Story" | "Email" | "Website" | "Menu Update";

export interface User {
  id: string;
  name: string;
  role: string;
  email: string;
}

export interface CookieIdea {
  id: string;
  name: string;
  flavorConcept: string;
  inspirationNotes: string;
  targetCustomer: string;
  seasonOrOccasion: string;
  status: CookieIdeaStatus;
  priority: Priority;
}

export interface RecipeTest {
  id: string;
  cookieName: string;
  version: `v${number}`;
  testDate: string;
  batchSize: string;
  portionSize: string;
  textureNotes: string;
  flavorNotes: string;
  appearanceNotes: string;
  spreadScore: number;
  chewScore: number;
  sweetnessScore: number;
  overallRating: number;
  result: RecipeTestResult;
}

export interface CookieRecipe {
  id: string;
  cookieName: string;
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
  allergenNotes: string[];
}

export interface Ingredient {
  id: string;
  name: string;
  vendor: string;
  purchaseUnit: string;
  purchasePrice: number;
  purchaseUnitWeightOz: number;
  yieldPercentage: number;
  costPerOunce: number;
  recipeUsage: string;
  allergenTag: string;
  lastPriceUpdate: string;
}

export interface RecipeIngredient {
  id: string;
  recipeId: string;
  ingredientId: string;
  quantityOz: number;
}

export interface CostingResult {
  id: string;
  recipeId: string;
  purchasePrice: number;
  purchaseUnitWeightOz: number;
  yieldPercentage: number;
  usableCostPerOunce: number;
  recipeQuantityUsedOz: number;
  totalRecipeCost: number;
  costPerCookie: number;
  suggestedMenuPrice: number;
  foodCostPercentage: number;
}

export interface ProductionTask {
  id: string;
  title: string;
  cookieName?: string;
  dueTime: string;
  owner: string;
  status: "Queued" | "In Progress" | "Done";
  priority: Priority;
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
  checklist: {
    recipeFinalized: boolean;
    costingComplete: boolean;
    packagingSelected: boolean;
    photosComplete: boolean;
    menuDescriptionWritten: boolean;
    socialPostsScheduled: boolean;
    orderFormReady: boolean;
    productionDateScheduled: boolean;
    launchDateConfirmed: boolean;
  };
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

export interface Vendor {
  id: string;
  name: string;
  contactName: string;
  email: string;
  defaultCategory: string;
}

export interface Allergen {
  id: string;
  name: string;
  severity: "Standard" | "High";
  notes: string;
}
