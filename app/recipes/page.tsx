import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { recipes } from "@/lib/data/mock-data";

export default function RecipesPage() {
  return <AppShell><PageHeader eyebrow="Recipes" title="Finalized recipe library" description="Production-ready cookie specs with yield, bake settings, shelf life, storage, allergens, and next operating actions." actions={<Button>Add Final Recipe</Button>} /><div className="grid gap-5 xl:grid-cols-3">{recipes.map((recipe) => <Card key={recipe.id}><h3 className="font-serif text-2xl font-bold">{recipe.cookieName}</h3><div className="mt-4 grid grid-cols-2 gap-3 text-sm"><Spec label="Yield" value={recipe.yield} /><Spec label="Batch size" value={recipe.batchSize} /><Spec label="Portion" value={recipe.portionSize} /><Spec label="Dough weight" value={recipe.doughWeightPerCookie} /><Spec label="Bake temp" value={recipe.bakeTemperature} /><Spec label="Bake time" value={recipe.bakeTime} /><Spec label="Cooling" value={recipe.coolingTime} /><Spec label="Shelf life" value={recipe.shelfLife} /></div><p className="mt-4 text-sm"><span className="font-bold">Storage: </span><span className="text-muted-foreground">{recipe.storageNotes}</span></p><p className="mt-2 text-sm"><span className="font-bold">Production: </span><span className="text-muted-foreground">{recipe.productionNotes}</span></p><div className="mt-4 flex flex-wrap gap-2">{recipe.allergenNotes.map((allergen) => <Badge key={allergen} variant="warning">{allergen}</Badge>)}</div><div className="mt-5 flex flex-wrap gap-2"><Button size="sm">View Recipe</Button><Button size="sm" variant="outline">Cost Recipe</Button><Button size="sm" variant="outline">Schedule Production</Button></div></Card>)}</div></AppShell>;
}
function Spec({ label, value }: { label: string; value: string }) { return <div className="rounded-2xl bg-muted/60 p-3"><p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{label}</p><p className="mt-1 font-bold">{value}</p></div>; }
