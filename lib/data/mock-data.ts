import type { CookieIdea } from "@/lib/types/domain";

export const cookieIdeas: CookieIdea[] = [
  {
    id: "idea-1",
    name: "Brown Butter Sea Salt Chocolate Chip",
    flavorConcept: "Deep nutty brown butter, dark chocolate pools, crisp edges, and a restrained sea salt finish.",
    inspirationNotes: "A polished signature cookie for premium gift boxes and first-time customers.",
    targetCustomer: "Gift buyers and chocolate chip purists",
    seasonOrOccasion: "Year-round signature",
    status: "Approved",
    priority: "High",
  },
  {
    id: "idea-2",
    name: "Pistachio Rose White Chocolate",
    flavorConcept: "Roasted pistachio, subtle rose, vanilla, and white chocolate for an elegant floral profile.",
    inspirationNotes: "Inspired by refined tea service, bridal showers, and luxury gifting moments.",
    targetCustomer: "Event hosts and boutique gifting customers",
    seasonOrOccasion: "Spring occasions",
    status: "Testing",
    priority: "High",
  },
  {
    id: "idea-3",
    name: "Espresso Toffee",
    flavorConcept: "Espresso dough with butter toffee, dark chocolate, and a smoked salt finish.",
    inspirationNotes: "A coffee-shop collaboration candidate with a bold, grown-up flavor profile.",
    targetCustomer: "Coffee lovers and corporate clients",
    seasonOrOccasion: "Fall launch",
    status: "Idea",
    priority: "Medium",
  },
];

export const dashboardMetrics = [
  {
    label: "Active Cookie Tests",
    value: "6",
    detail: "3 ready for sensory review",
    icon: "CT",
  },
  {
    label: "Approved Recipes",
    value: "14",
    detail: "Signature menu plus seasonal vault",
    icon: "AR",
  },
  {
    label: "Orders This Week",
    value: "48",
    detail: "312 cookies scheduled",
    icon: "OW",
  },
  {
    label: "Average Food Cost %",
    value: "26.8%",
    detail: "Within premium margin target",
    icon: "FC",
  },
  {
    label: "Upcoming Launches",
    value: "3",
    detail: "Next launch in 9 days",
    icon: "UL",
  },
] as const;

export const productionTasks = [
  {
    id: "production-1",
    name: "Brown Butter Sea Salt dough production",
    timeBlock: "8:00 AM – 10:30 AM",
    status: "In Production",
    priority: "High",
  },
  {
    id: "production-2",
    name: "Espresso Toffee test bake",
    timeBlock: "10:45 AM – 12:00 PM",
    status: "Retest",
    priority: "High",
  },
  {
    id: "production-3",
    name: "Packaging prep for weekend orders",
    timeBlock: "1:00 PM – 2:30 PM",
    status: "Queued",
    priority: "Medium",
  },
  {
    id: "production-4",
    name: "Ingredient count review",
    timeBlock: "3:00 PM – 3:45 PM",
    status: "Planning",
    priority: "Medium",
  },
] as const;

export const topPriorities = [
  {
    id: "priority-1",
    title: "Finalize Brown Butter Sea Salt recipe",
    note: "Lock bake time, finish salt level decision, and move the signature recipe into approved status.",
  },
  {
    id: "priority-2",
    title: "Cost Espresso Toffee batch",
    note: "Confirm espresso, toffee, chocolate, and packaging assumptions before pricing the test launch.",
  },
  {
    id: "priority-3",
    title: "Schedule photos for Pistachio Rose launch",
    note: "Book the styling window and shot list for product, box, and lifestyle images.",
  },
] as const;

export const activeRecipeTests = [
  {
    id: "test-1",
    cookieName: "Espresso Toffee",
    version: "v3",
    status: "Retest",
    score: 8.4,
    nextAction: "Reduce smoked salt by 15% and compare against v2 control batch.",
  },
  {
    id: "test-2",
    cookieName: "Pistachio Rose White Chocolate",
    version: "v4",
    status: "Needs Work",
    score: 7.6,
    nextAction: "Increase roasted pistachio paste and soften rose extract finish.",
  },
  {
    id: "test-3",
    cookieName: "Lemon Mascarpone Crumb",
    version: "v2",
    status: "Approved",
    score: 9.1,
    nextAction: "Write final method notes and add launch photography to the calendar.",
  },
] as const;

export const upcomingLaunches = [
  {
    id: "launch-1",
    cookieName: "Pistachio Rose White Chocolate",
    launchDate: "June 19, 2026",
    status: "Planning",
    checklistProgress: 58,
  },
  {
    id: "launch-2",
    cookieName: "Lemon Mascarpone Crumb",
    launchDate: "July 3, 2026",
    status: "Ready",
    checklistProgress: 86,
  },
  {
    id: "launch-3",
    cookieName: "Espresso Toffee",
    launchDate: "September 12, 2026",
    status: "Planning",
    checklistProgress: 34,
  },
] as const;

export const foodCostSnapshots = [
  {
    id: "food-cost-1",
    recipeName: "Brown Butter Sea Salt",
    costPerCookie: "$1.18",
    suggestedPrice: "$4.75",
    foodCostPercentage: 24.8,
    grossProfitPerCookie: "$3.57",
  },
  {
    id: "food-cost-2",
    recipeName: "Espresso Toffee",
    costPerCookie: "$1.34",
    suggestedPrice: "$5.00",
    foodCostPercentage: 26.8,
    grossProfitPerCookie: "$3.66",
  },
  {
    id: "food-cost-3",
    recipeName: "Pistachio Rose White Chocolate",
    costPerCookie: "$1.62",
    suggestedPrice: "$5.50",
    foodCostPercentage: 29.5,
    grossProfitPerCookie: "$3.88",
  },
  {
    id: "food-cost-4",
    recipeName: "Lemon Mascarpone Crumb",
    costPerCookie: "$1.27",
    suggestedPrice: "$5.00",
    foodCostPercentage: 25.4,
    grossProfitPerCookie: "$3.73",
  },
] as const;
