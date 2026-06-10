import type { Allergen, CalendarBlock, CookieIdea, CookieLaunch, CookieRecipe, CostingResult, CustomerOrder, Ingredient, MarketingTask, ProductionTask, RecipeTest, Template, User, Vendor } from "@/lib/types/domain";

export const currentUser: User = {
  id: "user-founder",
  name: "Isabella Bella",
  role: "Founder & Head Baker",
  email: "founder@isabellabella.example",
};

export const cookieIdeas: CookieIdea[] = [
  { id: "idea-1", name: "Brown Butter Sea Salt Chocolate Chip", flavorConcept: "Deep nutty butter, dark chocolate pools, crisp edges, restrained sea salt finish.", inspirationNotes: "Signature flagship cookie for premium assorted boxes.", targetCustomer: "Gift buyers and chocolate chip purists", seasonOrOccasion: "Year-round signature", status: "Approved", priority: "High" },
  { id: "idea-2", name: "Pistachio Rose White Chocolate", flavorConcept: "Roasted pistachio, rose water, vanilla, and white chocolate shards.", inspirationNotes: "Boutique floral profile inspired by elegant tea service.", targetCustomer: "Bridal showers and luxury gifting", seasonOrOccasion: "Spring occasions", status: "Testing", priority: "High" },
  { id: "idea-3", name: "Espresso Toffee", flavorConcept: "Espresso dough with butter toffee, dark chocolate, and smoked salt.", inspirationNotes: "Coffee-shop collaboration candidate.", targetCustomer: "Coffee lovers and corporate clients", seasonOrOccasion: "Fall launch", status: "Testing", priority: "Medium" },
  { id: "idea-4", name: "Lemon Lavender Shortbread", flavorConcept: "Tender shortbread with lemon zest, culinary lavender, and vanilla glaze.", inspirationNotes: "Refined afternoon cookie for hospitality trays.", targetCustomer: "Tea service, hotels, event planners", seasonOrOccasion: "Mother's Day", status: "Idea", priority: "Medium" },
  { id: "idea-5", name: "Miso Caramel Chocolate Chunk", flavorConcept: "Savory white miso caramel folded through chocolate chunk dough.", inspirationNotes: "Elevated umami profile for limited drops.", targetCustomer: "Food-forward cookie fans", seasonOrOccasion: "Limited edition", status: "Testing", priority: "High" },
  { id: "idea-6", name: "Oatmeal Brown Butter Raisin", flavorConcept: "Brown butter oat dough, plump raisins, cinnamon, and molasses warmth.", inspirationNotes: "Classic comfort cookie with Isabella Bella polish.", targetCustomer: "Traditional bakery customers", seasonOrOccasion: "Autumn menu", status: "Idea", priority: "Low" },
  { id: "idea-7", name: "Black Sesame Tahini", flavorConcept: "Nutty tahini base with black sesame crunch and bittersweet chocolate.", inspirationNotes: "Modern sesame cookie with sophisticated contrast.", targetCustomer: "Specialty food customers", seasonOrOccasion: "Winter drop", status: "Idea", priority: "Medium" },
  { id: "idea-8", name: "Orange Cardamom Sugar Cookie", flavorConcept: "Soft sugar cookie scented with orange zest and green cardamom.", inspirationNotes: "Holiday box accent with bright citrus aroma.", targetCustomer: "Holiday gift buyers", seasonOrOccasion: "Holiday", status: "Idea", priority: "Medium" },
  { id: "idea-9", name: "Salted Honey Cornmeal", flavorConcept: "Cornmeal texture, local honey, butter, and flaky salt.", inspirationNotes: "Farmers market-friendly rustic premium cookie.", targetCustomer: "Market shoppers", seasonOrOccasion: "Summer markets", status: "Archived", priority: "Low" },
  { id: "idea-10", name: "Dark Chocolate Cherry Almond", flavorConcept: "Cocoa dough with dried cherries, almond flour, and toasted almonds.", inspirationNotes: "Rich jewel-toned cookie for winter boxes.", targetCustomer: "Chocolate lovers and wine pairing events", seasonOrOccasion: "Winter gifting", status: "Approved", priority: "High" },
  { id: "idea-11", name: "Maple Pecan Bourbon", flavorConcept: "Maple dough, toasted pecans, bourbon vanilla glaze.", inspirationNotes: "Southern-inspired premium seasonal cookie.", targetCustomer: "Thanksgiving hosts", seasonOrOccasion: "Thanksgiving", status: "Idea", priority: "Medium" },
  { id: "idea-12", name: "Raspberry Linzer Shortbread", flavorConcept: "Almond shortbread sandwich with raspberry jam and powdered sugar finish.", inspirationNotes: "Elegant holiday tin cookie.", targetCustomer: "Holiday tins and catering", seasonOrOccasion: "Holiday", status: "Testing", priority: "High" },
];

export const recipeTests: RecipeTest[] = [
  { id: "test-1", cookieName: "Pistachio Rose White Chocolate", version: "v2", testDate: "2026-06-08", batchSize: "24 cookies", portionSize: "75 g", textureNotes: "Tender center, slightly crisp shell; pistachios need finer chop.", flavorNotes: "Rose is balanced at 0.35%; white chocolate reads premium.", appearanceNotes: "Elegant pale green crumb with clean chocolate streaks.", spreadScore: 8, chewScore: 8, sweetnessScore: 7, overallRating: 8.4, result: "Retest" },
  { id: "test-2", cookieName: "Miso Caramel Chocolate Chunk", version: "v3", testDate: "2026-06-06", batchSize: "18 cookies", portionSize: "90 g", textureNotes: "Strong chew with glossy caramel pockets.", flavorNotes: "Miso depth is excellent; reduce salt garnish by 10%.", appearanceNotes: "Dramatic chocolate pools, premium bakery look.", spreadScore: 9, chewScore: 9, sweetnessScore: 8, overallRating: 9.1, result: "Approved" },
  { id: "test-3", cookieName: "Raspberry Linzer Shortbread", version: "v1", testDate: "2026-06-04", batchSize: "36 sandwich cookies", portionSize: "42 g", textureNotes: "Too fragile for shipping; increase flour slightly.", flavorNotes: "Jam acidity works, almond note could be stronger.", appearanceNotes: "Beautiful finish but powdered sugar absorbs overnight.", spreadScore: 6, chewScore: 5, sweetnessScore: 8, overallRating: 6.7, result: "Needs Work" },
];

export const recipes: CookieRecipe[] = [
  { id: "recipe-1", cookieName: "Brown Butter Sea Salt Chocolate Chip", yield: "30 cookies", batchSize: "2.7 kg dough", portionSize: "90 g", doughWeightPerCookie: "90 g", bakeTemperature: "350°F convection", bakeTime: "12–14 min", coolingTime: "22 min", shelfLife: "5 days ambient", storageNotes: "Store airtight with parchment between layers.", productionNotes: "Brown butter one day ahead; chill dough minimum 12 hours.", allergenNotes: ["Milk", "Wheat", "Egg", "Soy"] },
  { id: "recipe-2", cookieName: "Dark Chocolate Cherry Almond", yield: "28 cookies", batchSize: "2.38 kg dough", portionSize: "85 g", doughWeightPerCookie: "85 g", bakeTemperature: "345°F convection", bakeTime: "11–13 min", coolingTime: "25 min", shelfLife: "4 days ambient", storageNotes: "Keep away from strong aromas; cherries soften over time.", productionNotes: "Hydrate cherries with vanilla extract before mixing.", allergenNotes: ["Tree Nuts", "Wheat", "Egg", "Milk"] },
  { id: "recipe-3", cookieName: "Miso Caramel Chocolate Chunk", yield: "24 cookies", batchSize: "2.16 kg dough", portionSize: "90 g", doughWeightPerCookie: "90 g", bakeTemperature: "350°F convection", bakeTime: "12 min", coolingTime: "30 min", shelfLife: "4 days ambient", storageNotes: "Separate layers to protect caramel sheen.", productionNotes: "Pipe chilled miso caramel into dough pockets after portioning.", allergenNotes: ["Soy", "Wheat", "Milk", "Egg"] },
];

export const ingredients: Ingredient[] = [
  { id: "ing-1", name: "Unsalted butter", vendor: "Vermont Creamery", purchaseUnit: "10 lb case", purchasePrice: 43.5, purchaseUnitWeightOz: 160, yieldPercentage: 100, costPerOunce: 0.27, recipeUsage: "Base doughs, buttercream, shortbread", allergenTag: "Milk", lastPriceUpdate: "2026-06-01" },
  { id: "ing-2", name: "Brown butter", vendor: "In-house prep", purchaseUnit: "10 lb butter case", purchasePrice: 43.5, purchaseUnitWeightOz: 128, yieldPercentage: 80, costPerOunce: 0.34, recipeUsage: "Signature chocolate chip, oatmeal", allergenTag: "Milk", lastPriceUpdate: "2026-06-01" },
  { id: "ing-3", name: "Granulated sugar", vendor: "Domino Foods", purchaseUnit: "25 lb bag", purchasePrice: 22, purchaseUnitWeightOz: 400, yieldPercentage: 100, costPerOunce: 0.06, recipeUsage: "All cookie doughs", allergenTag: "None", lastPriceUpdate: "2026-05-29" },
  { id: "ing-4", name: "Brown sugar", vendor: "Domino Foods", purchaseUnit: "25 lb bag", purchasePrice: 28.25, purchaseUnitWeightOz: 400, yieldPercentage: 100, costPerOunce: 0.07, recipeUsage: "Chewy doughs", allergenTag: "None", lastPriceUpdate: "2026-05-29" },
  { id: "ing-5", name: "AP flour", vendor: "King Arthur Baking", purchaseUnit: "50 lb bag", purchasePrice: 36, purchaseUnitWeightOz: 800, yieldPercentage: 100, costPerOunce: 0.05, recipeUsage: "Primary flour", allergenTag: "Wheat", lastPriceUpdate: "2026-05-30" },
  { id: "ing-6", name: "Bread flour", vendor: "King Arthur Baking", purchaseUnit: "50 lb bag", purchasePrice: 39.5, purchaseUnitWeightOz: 800, yieldPercentage: 100, costPerOunce: 0.05, recipeUsage: "Chewy premium cookies", allergenTag: "Wheat", lastPriceUpdate: "2026-05-30" },
  { id: "ing-7", name: "Cake flour", vendor: "King Arthur Baking", purchaseUnit: "25 lb bag", purchasePrice: 24.75, purchaseUnitWeightOz: 400, yieldPercentage: 100, costPerOunce: 0.06, recipeUsage: "Shortbread and tender doughs", allergenTag: "Wheat", lastPriceUpdate: "2026-05-30" },
  { id: "ing-8", name: "Eggs", vendor: "Local Farm Co-op", purchaseUnit: "15 dozen case", purchasePrice: 62, purchaseUnitWeightOz: 360, yieldPercentage: 88, costPerOunce: 0.2, recipeUsage: "Binding and enrichment", allergenTag: "Egg", lastPriceUpdate: "2026-06-03" },
  { id: "ing-9", name: "Vanilla extract", vendor: "Nielsen-Massey", purchaseUnit: "32 oz bottle", purchasePrice: 82, purchaseUnitWeightOz: 32, yieldPercentage: 100, costPerOunce: 2.56, recipeUsage: "Signature aroma", allergenTag: "None", lastPriceUpdate: "2026-05-22" },
  { id: "ing-10", name: "Chocolate chunks", vendor: "Valrhona", purchaseUnit: "6.6 lb bag", purchasePrice: 78, purchaseUnitWeightOz: 105.6, yieldPercentage: 100, costPerOunce: 0.74, recipeUsage: "Chocolate chip and chunk cookies", allergenTag: "Soy, Milk", lastPriceUpdate: "2026-06-02" },
  { id: "ing-11", name: "White chocolate", vendor: "Callebaut", purchaseUnit: "5.5 lb bag", purchasePrice: 52, purchaseUnitWeightOz: 88, yieldPercentage: 100, costPerOunce: 0.59, recipeUsage: "Pistachio rose", allergenTag: "Milk, Soy", lastPriceUpdate: "2026-06-02" },
  { id: "ing-12", name: "Pistachios", vendor: "Nuts.com Wholesale", purchaseUnit: "5 lb bag", purchasePrice: 69, purchaseUnitWeightOz: 80, yieldPercentage: 96, costPerOunce: 0.9, recipeUsage: "Pistachio rose garnish and dough", allergenTag: "Tree Nuts", lastPriceUpdate: "2026-05-27" },
  { id: "ing-13", name: "Almond flour", vendor: "Blue Diamond", purchaseUnit: "25 lb box", purchasePrice: 122, purchaseUnitWeightOz: 400, yieldPercentage: 100, costPerOunce: 0.31, recipeUsage: "Linzer, almond cookies", allergenTag: "Tree Nuts", lastPriceUpdate: "2026-05-25" },
  { id: "ing-14", name: "Rolled oats", vendor: "Bob's Red Mill", purchaseUnit: "25 lb bag", purchasePrice: 31, purchaseUnitWeightOz: 400, yieldPercentage: 100, costPerOunce: 0.08, recipeUsage: "Oatmeal cookies", allergenTag: "None", lastPriceUpdate: "2026-05-25" },
  { id: "ing-15", name: "Espresso powder", vendor: "King Arthur Baking", purchaseUnit: "1 lb tin", purchasePrice: 24, purchaseUnitWeightOz: 16, yieldPercentage: 100, costPerOunce: 1.5, recipeUsage: "Espresso toffee", allergenTag: "None", lastPriceUpdate: "2026-05-20" },
  { id: "ing-16", name: "Toffee pieces", vendor: "Baking Supply Direct", purchaseUnit: "10 lb case", purchasePrice: 58, purchaseUnitWeightOz: 160, yieldPercentage: 100, costPerOunce: 0.36, recipeUsage: "Espresso toffee", allergenTag: "Milk", lastPriceUpdate: "2026-05-20" },
  { id: "ing-17", name: "Sea salt", vendor: "Maldon", purchaseUnit: "3 lb tub", purchasePrice: 28, purchaseUnitWeightOz: 48, yieldPercentage: 100, costPerOunce: 0.58, recipeUsage: "Finishing salt", allergenTag: "None", lastPriceUpdate: "2026-05-18" },
  { id: "ing-18", name: "Miso", vendor: "Miso Master", purchaseUnit: "5 lb tub", purchasePrice: 36, purchaseUnitWeightOz: 80, yieldPercentage: 100, costPerOunce: 0.45, recipeUsage: "Miso caramel", allergenTag: "Soy", lastPriceUpdate: "2026-05-18" },
  { id: "ing-19", name: "Tahini", vendor: "Soom Foods", purchaseUnit: "11 lb pail", purchasePrice: 64, purchaseUnitWeightOz: 176, yieldPercentage: 98, costPerOunce: 0.37, recipeUsage: "Black sesame tahini", allergenTag: "Sesame", lastPriceUpdate: "2026-05-18" },
  { id: "ing-20", name: "Dried cherries", vendor: "Cherry Central", purchaseUnit: "10 lb case", purchasePrice: 74, purchaseUnitWeightOz: 160, yieldPercentage: 100, costPerOunce: 0.46, recipeUsage: "Dark chocolate cherry almond", allergenTag: "None", lastPriceUpdate: "2026-05-16" },
  { id: "ing-21", name: "Lemon zest", vendor: "In-house prep", purchaseUnit: "40 lemons", purchasePrice: 28, purchaseUnitWeightOz: 11, yieldPercentage: 35, costPerOunce: 7.27, recipeUsage: "Lemon lavender", allergenTag: "None", lastPriceUpdate: "2026-06-04" },
  { id: "ing-22", name: "Lavender", vendor: "Culinary Herb Co.", purchaseUnit: "8 oz bag", purchasePrice: 19, purchaseUnitWeightOz: 8, yieldPercentage: 100, costPerOunce: 2.38, recipeUsage: "Lemon lavender", allergenTag: "None", lastPriceUpdate: "2026-05-14" },
];

export const costingResults: CostingResult[] = [
  { id: "cost-1", recipeId: "recipe-1", purchasePrice: 78, purchaseUnitWeightOz: 105.6, yieldPercentage: 100, usableCostPerOunce: 0.74, recipeQuantityUsedOz: 36, totalRecipeCost: 49.8, costPerCookie: 1.66, suggestedMenuPrice: 5.75, foodCostPercentage: 28.9 },
  { id: "cost-2", recipeId: "recipe-3", purchasePrice: 36, purchaseUnitWeightOz: 80, yieldPercentage: 100, usableCostPerOunce: 0.45, recipeQuantityUsedOz: 7, totalRecipeCost: 46.2, costPerCookie: 1.93, suggestedMenuPrice: 6.5, foodCostPercentage: 29.7 },
];

export const productionTasks: ProductionTask[] = [
  { id: "task-1", title: "Brown butter for signature dough", cookieName: "Brown Butter Sea Salt Chocolate Chip", dueTime: "8:00 AM", owner: "Isabella", status: "In Progress", priority: "High" },
  { id: "task-2", title: "Portion pistachio rose v3 test", cookieName: "Pistachio Rose White Chocolate", dueTime: "10:30 AM", owner: "Isabella", status: "Queued", priority: "High" },
  { id: "task-3", title: "Label assorted gift box sleeves", dueTime: "1:00 PM", owner: "Team", status: "Queued", priority: "Medium" },
  { id: "task-4", title: "Pack Friday pickup orders", dueTime: "3:30 PM", owner: "Team", status: "Queued", priority: "High" },
];

export const calendarBlocks: CalendarBlock[] = [
  { id: "cal-1", day: "Monday", time: "8:00", title: "Dough production", type: "Production", notes: "Chocolate chip and espresso toffee base doughs." },
  { id: "cal-2", day: "Monday", time: "13:00", title: "Dough chilling", type: "Prep", notes: "Transfer portioned dough to covered trays." },
  { id: "cal-3", day: "Tuesday", time: "9:00", title: "Pistachio rose v3", type: "Test Batch", notes: "Rose percentage and pistachio texture retest." },
  { id: "cal-4", day: "Tuesday", time: "14:00", title: "Product photos", type: "Marketing", notes: "Shoot launch stills and BTS footage." },
  { id: "cal-5", day: "Wednesday", time: "8:30", title: "Baking", type: "Production", notes: "Bake customer pickup orders." },
  { id: "cal-6", day: "Wednesday", time: "11:00", title: "Cooling", type: "Prep", notes: "Rack cooling and quality check." },
  { id: "cal-7", day: "Thursday", time: "9:30", title: "Packaging", type: "Packaging", notes: "Gift boxes, labels, allergen cards." },
  { id: "cal-8", day: "Thursday", time: "13:30", title: "Labeling", type: "Packaging", notes: "Batch codes and ingredient stickers." },
  { id: "cal-9", day: "Friday", time: "10:00", title: "Pickup prep", type: "Pickup/Delivery", notes: "Sort orders by pickup window." },
  { id: "cal-10", day: "Friday", time: "14:00", title: "Delivery prep", type: "Pickup/Delivery", notes: "Insulated carriers and route notes." },
];

export const launches: CookieLaunch[] = [
  { id: "launch-1", cookieName: "Miso Caramel Chocolate Chunk", launchDate: "2026-06-21", status: "Ready", checklist: { recipeFinalized: true, costingComplete: true, packagingSelected: true, photosComplete: true, menuDescriptionWritten: true, socialPostsScheduled: true, orderFormReady: true, productionDateScheduled: true, launchDateConfirmed: true } },
  { id: "launch-2", cookieName: "Pistachio Rose White Chocolate", launchDate: "2026-07-05", status: "Planning", checklist: { recipeFinalized: false, costingComplete: false, packagingSelected: true, photosComplete: false, menuDescriptionWritten: true, socialPostsScheduled: false, orderFormReady: false, productionDateScheduled: false, launchDateConfirmed: true } },
  { id: "launch-3", cookieName: "Dark Chocolate Cherry Almond", launchDate: "2026-11-10", status: "Planning", checklist: { recipeFinalized: true, costingComplete: true, packagingSelected: false, photosComplete: false, menuDescriptionWritten: false, socialPostsScheduled: false, orderFormReady: false, productionDateScheduled: false, launchDateConfirmed: false } },
];

export const orders: CustomerOrder[] = [
  { id: "order-1", customerName: "Maribel Grant", orderItems: ["12 Brown Butter Sea Salt", "6 Dark Chocolate Cherry Almond"], quantity: 18, pickupDeliveryDate: "2026-06-12", paymentStatus: "Paid", fulfillmentStatus: "In Production", specialNotes: "Gift wrap with ivory ribbon.", allergensFlagged: ["Milk", "Wheat", "Egg", "Tree Nuts"] },
  { id: "order-2", customerName: "Evergreen Studio", orderItems: ["48 assorted corporate boxes"], quantity: 48, pickupDeliveryDate: "2026-06-14", paymentStatus: "Deposit Paid", fulfillmentStatus: "Queued", specialNotes: "Include branded thank-you card.", allergensFlagged: ["Milk", "Wheat", "Egg", "Soy"] },
  { id: "order-3", customerName: "Sofia Patel", orderItems: ["24 Miso Caramel Chocolate Chunk"], quantity: 24, pickupDeliveryDate: "2026-06-21", paymentStatus: "Unpaid", fulfillmentStatus: "Queued", specialNotes: "Launch day pickup at 10 AM.", allergensFlagged: ["Soy", "Milk", "Wheat", "Egg"] },
];

export const marketingTasks: MarketingTask[] = [
  { id: "mkt-1", title: "Miso caramel hero photo", dueDate: "2026-06-11", contentType: "Photo", campaignStatus: "Ready", channel: "Website + Instagram", notes: "Use linen backdrop and cut-open caramel detail." },
  { id: "mkt-2", title: "Behind-the-scenes brown butter reel", dueDate: "2026-06-12", contentType: "Reel", campaignStatus: "Draft", channel: "Instagram", notes: "Show nutty milk solids and founder note." },
  { id: "mkt-3", title: "Pistachio rose teaser story", dueDate: "2026-06-13", contentType: "Story", campaignStatus: "Scheduled", channel: "Instagram", notes: "Poll audience on floral flavors." },
  { id: "mkt-4", title: "June cookie drop email", dueDate: "2026-06-15", contentType: "Email", campaignStatus: "Draft", channel: "Newsletter", notes: "Feature launch announcement and pickup windows." },
  { id: "mkt-5", title: "Seasonal menu update", dueDate: "2026-06-16", contentType: "Menu Update", campaignStatus: "Ready", channel: "Website", notes: "Add suggested pairing notes." },
];

export const templates: Template[] = [
  { id: "tmpl-1", name: "New Cookie R&D Template", description: "Capture concept, test variables, sensory notes, scoring, and next action.", category: "R&D" },
  { id: "tmpl-2", name: "Weekly Production Plan", description: "Plan dough, bake, cooling, packaging, labeling, pickup, and delivery blocks.", category: "Production" },
  { id: "tmpl-3", name: "Cookie Launch Checklist", description: "Track recipe, costing, packaging, photos, copy, order form, and launch date.", category: "Launch" },
  { id: "tmpl-4", name: "Ingredient Costing Sheet", description: "Standardize vendor pricing, yield, unit conversion, and recipe cost rollups.", category: "Costing" },
  { id: "tmpl-5", name: "Holiday Cookie Drop Plan", description: "Coordinate limited menu, order windows, production days, and gifting packaging.", category: "Seasonal" },
  { id: "tmpl-6", name: "Farmers Market Prep Plan", description: "Plan market quantities, display inventory, sampling, and sell-through tracking.", category: "Market" },
  { id: "tmpl-7", name: "Wholesale Inquiry Tracker", description: "Track partner fit, pricing, sample status, and follow-up dates.", category: "Wholesale" },
  { id: "tmpl-8", name: "Social Media Launch Plan", description: "Schedule teasers, photos, reels, stories, launch posts, and reminders.", category: "Marketing" },
  { id: "tmpl-9", name: "Monthly Flavor Calendar", description: "Map seasonal ideas, test windows, launches, and production capacity.", category: "Planning" },
  { id: "tmpl-10", name: "Packaging Prep Checklist", description: "Track boxes, labels, ribbons, allergen cards, inserts, and batch codes.", category: "Packaging" },
];

export const vendors: Vendor[] = [
  { id: "vendor-1", name: "King Arthur Baking", contactName: "Wholesale Desk", email: "wholesale@kingarthur.example", defaultCategory: "Flour" },
  { id: "vendor-2", name: "Valrhona", contactName: "Specialty Chocolate Rep", email: "orders@valrhona.example", defaultCategory: "Chocolate" },
  { id: "vendor-3", name: "Local Farm Co-op", contactName: "Mara Lane", email: "mara@localfarm.example", defaultCategory: "Dairy & Eggs" },
];

export const allergens: Allergen[] = [
  { id: "allergen-1", name: "Milk", severity: "Standard", notes: "Present in butter, chocolate, toffee, and white chocolate." },
  { id: "allergen-2", name: "Wheat", severity: "Standard", notes: "Present in flour-based cookies." },
  { id: "allergen-3", name: "Egg", severity: "Standard", notes: "Present in most doughs unless specifically reformulated." },
  { id: "allergen-4", name: "Tree Nuts", severity: "High", notes: "Pistachios, almonds, pecans, and almond flour require clear flagging." },
  { id: "allergen-5", name: "Soy", severity: "Standard", notes: "Miso and some chocolates contain soy." },
  { id: "allergen-6", name: "Sesame", severity: "High", notes: "Tahini and black sesame require dedicated warning." },
];
