import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/table";
import { orders } from "@/lib/data/mock-data";

export default function OrdersPage() {
  return <AppShell><PageHeader eyebrow="Orders" title="Customer orders" description="Mock customer order queue with quantities, pickup and delivery dates, payment status, fulfillment status, notes, allergens, and prep actions." actions={<Button>New Order</Button>} /><DataTable headers={["Customer", "Items", "Qty", "Pickup / delivery", "Payment", "Fulfillment", "Notes", "Allergens", "Actions"]} rows={orders.map((o) => [<strong key="c">{o.customerName}</strong>, <ul key="items" className="list-disc pl-4">{o.orderItems.map((item) => <li key={item}>{item}</li>)}</ul>, o.quantity, o.pickupDeliveryDate, <StatusBadge key="p" value={o.paymentStatus} />, <StatusBadge key="f" value={o.fulfillmentStatus} />, o.specialNotes, <div key="a" className="flex flex-wrap gap-1">{o.allergensFlagged.map((a) => <Badge key={a} variant="warning">{a}</Badge>)}</div>, <div key="b" className="flex flex-wrap gap-2"><Button size="sm">Mark Paid</Button><Button size="sm" variant="outline">Mark Fulfilled</Button><Button size="sm" variant="outline">Print Prep List</Button><Button size="sm" variant="ghost">View Order</Button></div>])} /></AppShell>;
}
