export type Priority = "Low" | "Medium" | "High";
export type CookieIdeaStatus = "Idea" | "Testing" | "Approved" | "Archived";
export type RecipeTestResult = "Needs Work" | "Retest" | "Approved";
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
  yield: string;
  portionSize: string;
  bakeTemperature: string;
  bakeTime: string;
  storageNotes: string;
  allergenNotes: string[];
}

export interface Ingredient {
  id: string;
  name: string;
  vendor: string;
  purchaseUnit: string;
  purchasePrice: number;
  costPerOunce: number;
  allergenTag: string;
  lastPriceUpdate: string;
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
