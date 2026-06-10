"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { DataTable } from "@/components/ui/table";
import { customerOrders } from "@/lib/data/mock-data";
import type { CustomerOrder, FulfillmentStatus, PaymentStatus } from "@/lib/types/domain";
import { cn } from "@/lib/utils";

const filters = [
  "All",
  "New",
  "Paid",
  "In Production",
  "Ready",
  "Fulfilled",
  "Unpaid",
] as const;
type Filter = (typeof filters)[number];

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const paymentBadgeVariant: Record<PaymentStatus, "neutral" | "success" | "warning" | "danger" | "premium"> = {
  Paid: "success",
  Unpaid: "danger",
  "Deposit Paid": "warning",
  Refunded: "neutral",
};

const fulfillmentBadgeVariant: Record<FulfillmentStatus, "neutral" | "success" | "warning" | "danger" | "premium"> = {
  New: "premium",
  Queued: "neutral",
  "In Production": "warning",
  Ready: "success",
  Fulfilled: "neutral",
  Delayed: "danger",
};

function formatDate(date: string) {
  return dateFormatter.format(new Date(`${date}T12:00:00`));
}

function formatCurrency(value: number) {
  return currencyFormatter.format(value);
}

function getFilteredOrders(filter: Filter) {
  if (filter === "All") {
    return customerOrders;
  }

  if (filter === "Paid" || filter === "Unpaid") {
    return customerOrders.filter((order) => order.paymentStatus === filter);
  }

  return customerOrders.filter((order) => order.fulfillmentStatus === filter);
}

const ordersToFulfill = customerOrders.filter(
  (order) => !["Fulfilled", "Delayed"].includes(order.fulfillmentStatus),
);

const pickupDeliveryWindows = new Set(
  customerOrders.map(
    (order) => `${order.pickupDeliveryDate}-${order.pickupDeliveryWindow}`,
  ),
).size;

const summaryCards = [
  {
    label: "Orders This Week",
    value: customerOrders.length.toString(),
    detail: "Mock customer commitments across pickup and delivery",
    accentClass: "bg-[#8b5436]",
  },
  {
    label: "Paid Orders",
    value: customerOrders.filter((order) => order.paymentStatus === "Paid").length.toString(),
    detail: "Paid in full and cleared for fulfillment",
    accentClass: "bg-emerald-600",
  },
  {
    label: "Unpaid Orders",
    value: customerOrders.filter((order) => order.paymentStatus === "Unpaid").length.toString(),
    detail: "Require payment follow-up before release",
    accentClass: "bg-rose-500",
  },
  {
    label: "Orders to Fulfill",
    value: ordersToFulfill.length.toString(),
    detail: "New, active, or ready orders still on the board",
    accentClass: "bg-amber-500",
  },
  {
    label: "Pickup/Delivery Windows",
    value: pickupDeliveryWindows.toString(),
    detail: "Scheduled handoffs and local route windows",
    accentClass: "bg-teal-600",
  },
] as const;

const productionNeeds = customerOrders.reduce(
  (acc, order) => {
    order.orderItems.forEach((item) => {
      acc.cookiesByFlavor[item.flavor] = (acc.cookiesByFlavor[item.flavor] ?? 0) + item.quantity;
    });

    acc.totalBoxes += order.boxesNeeded;
    order.packagingNeeds.forEach((need) => acc.packagingNeeds.add(need));

    if (!acc.earliestDeadline || order.pickupDeliveryDate < acc.earliestDeadline.pickupDeliveryDate) {
      acc.earliestDeadline = order;
    }

    if (order.allergensFlagged.some((allergen) => ["Tree nuts", "Sesame", "Peanut"].includes(allergen))) {
      acc.allergenSensitiveOrders.push(order);
    }

    return acc;
  },
  {
    cookiesByFlavor: {} as Record<string, number>,
    totalBoxes: 0,
    packagingNeeds: new Set<string>(),
    earliestDeadline: undefined as CustomerOrder | undefined,
    allergenSensitiveOrders: [] as CustomerOrder[],
  },
);

const productionFlavorTotals = Object.entries(productionNeeds.cookiesByFlavor).sort((a, b) => b[1] - a[1]);
const packagingNeedsList = Array.from(productionNeeds.packagingNeeds).sort();
const upcomingSchedule = [...customerOrders].sort((a, b) => {
  const dateComparison = a.pickupDeliveryDate.localeCompare(b.pickupDeliveryDate);
  return dateComparison || a.pickupDeliveryWindow.localeCompare(b.pickupDeliveryWindow);
});

export default function OrdersPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const filteredOrders = useMemo(() => getFilteredOrders(activeFilter), [activeFilter]);

  const orderRows = filteredOrders.map((order) => [
    <div key="order" className="min-w-[110px]">
      <p className="font-bold text-foreground">{order.orderNumber}</p>
      <p className="mt-1 text-xs font-semibold text-muted-foreground">{order.pickupDeliveryType}</p>
    </div>,
    <span key="customer" className="font-semibold text-foreground">{order.customerName}</span>,
    <div key="items" className="min-w-[220px] space-y-1.5">
      {order.orderItems.map((item) => (
        <p key={`${order.id}-${item.flavor}`} className="text-sm leading-5 text-foreground">
          <span className="font-bold">{item.quantity}</span> {item.flavor}
        </p>
      ))}
    </div>,
    <span key="quantity" className="font-bold text-[#6f422c]">{order.totalQuantity}</span>,
    <span key="date" className="text-muted-foreground">{formatDate(order.pickupDeliveryDate)}</span>,
    <span key="window" className="min-w-[120px] font-semibold text-foreground">{order.pickupDeliveryWindow}</span>,
    <Badge key="payment" variant={paymentBadgeVariant[order.paymentStatus]}>{order.paymentStatus}</Badge>,
    <Badge key="fulfillment" variant={fulfillmentBadgeVariant[order.fulfillmentStatus]}>{order.fulfillmentStatus}</Badge>,
    <span key="price" className="font-bold text-foreground">{formatCurrency(order.totalPrice)}</span>,
    <div key="allergens" className="flex min-w-[170px] flex-wrap gap-1.5">
      {order.allergensFlagged.map((allergen) => (
        <Badge key={`${order.id}-${allergen}`} variant={allergen === "Tree nuts" ? "danger" : "neutral"}>
          {allergen}
        </Badge>
      ))}
    </div>,
    <p key="notes" className="min-w-[240px] text-sm leading-6 text-muted-foreground">{order.specialNotes}</p>,
  ]);

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          eyebrow="Order management"
          title="Orders"
          description="Track customer orders, fulfillment status, pickup windows, and production needs."
          actions={
            <>
              <Button type="button">Add Order</Button>
              <Button type="button" variant="outline">Print Prep List</Button>
            </>
          }
        />

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {summaryCards.map((card) => (
            <Card key={card.label} className="bg-white/75">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-serif text-4xl font-bold tracking-tight">{card.value}</p>
                  <p className="mt-1 text-sm font-semibold text-foreground">{card.label}</p>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">{card.detail}</p>
                </div>
                <span className={cn("h-11 w-1.5 rounded-full", card.accentClass)} />
              </div>
            </Card>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <Card className="border-[#d8b08c]/60 bg-[#fffaf2]">
            <CardHeader title="Order Action Center" eyebrow="Placeholder workflows" />
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {["Mark Paid", "Mark In Production", "Mark Ready", "Mark Fulfilled", "View Order", "Print Prep List"].map((action) => (
                <Button key={action} type="button" variant={action === "Print Prep List" ? "default" : "outline"} className="justify-center">
                  {action}
                </Button>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader title="Founder Notes" eyebrow="Operating guardrails" />
            <ul className="space-y-3 text-sm leading-6 text-muted-foreground">
              <li className="rounded-2xl border border-border bg-white/65 px-4 py-3">Confirm payment status before releasing unpaid pickup orders.</li>
              <li className="rounded-2xl border border-border bg-white/65 px-4 py-3">Stage allergen-sensitive orders separately with visible labels.</li>
              <li className="rounded-2xl border border-border bg-white/65 px-4 py-3">Use the production needs summary as the prep-list source of truth.</li>
            </ul>
          </Card>
        </section>

        <section>
          <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <CardHeader title="Order Table" eyebrow="Customer commitments" />
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={cn(
                    "rounded-full border px-3.5 py-2 text-sm font-bold transition",
                    activeFilter === filter
                      ? "border-[#8b5436] bg-[#8b5436] text-white shadow-sm"
                      : "border-border bg-card text-muted-foreground hover:bg-muted",
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {filteredOrders.length > 0 ? (
            <DataTable
              headers={[
                "Order #",
                "Customer",
                "Order Items",
                "Qty",
                "Date",
                "Window",
                "Payment",
                "Fulfillment",
                "Total",
                "Allergens",
                "Special Notes",
              ]}
              rows={orderRows}
              className="bg-white/80"
            />
          ) : (
            <EmptyOrdersState filter={activeFilter} />
          )}
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <Card className="border-[#d8b08c]/60 bg-[#fffaf2]">
            <CardHeader title="Production Needs From Orders" eyebrow="Prep list rollup" action={<Badge variant="premium">Live mock totals</Badge>} />
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-[#ead1ba] bg-white/70 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Cookies needed by flavor</p>
                <div className="mt-3 space-y-2">
                  {productionFlavorTotals.map(([flavor, quantity]) => (
                    <div key={flavor} className="flex items-start justify-between gap-3 rounded-xl bg-[#fff7ed] px-3 py-2">
                      <span className="text-sm font-semibold text-foreground">{flavor}</span>
                      <span className="font-serif text-xl font-bold text-[#6f422c]">{quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-border bg-white/70 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Total boxes needed</p>
                  <p className="mt-2 font-serif text-4xl font-bold tracking-tight text-[#6f422c]">{productionNeeds.totalBoxes}</p>
                </div>
                <div className="rounded-2xl border border-border bg-white/70 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Earliest fulfillment deadline</p>
                  <p className="mt-2 text-sm font-bold text-foreground">
                    {productionNeeds.earliestDeadline ? `${formatDate(productionNeeds.earliestDeadline.pickupDeliveryDate)} · ${productionNeeds.earliestDeadline.pickupDeliveryWindow}` : "No active deadlines"}
                  </p>
                  {productionNeeds.earliestDeadline ? <p className="mt-1 text-xs text-muted-foreground">{productionNeeds.earliestDeadline.customerName} · {productionNeeds.earliestDeadline.orderNumber}</p> : null}
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-border bg-white/70 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Packaging needs</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {packagingNeedsList.map((need) => <Badge key={need} variant="premium">{need}</Badge>)}
                </div>
              </div>
              <div className="rounded-2xl border border-rose-100 bg-rose-50/60 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-rose-700">Allergen-sensitive orders</p>
                <div className="mt-3 space-y-2">
                  {productionNeeds.allergenSensitiveOrders.map((order) => (
                    <div key={order.id} className="flex items-start justify-between gap-3 rounded-xl bg-white/75 px-3 py-2">
                      <div>
                        <p className="text-sm font-bold text-foreground">{order.customerName}</p>
                        <p className="text-xs text-muted-foreground">{order.orderNumber} · {order.allergensFlagged.join(", ")}</p>
                      </div>
                      <Badge variant="danger">Separate</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader title="Pickup / Delivery Schedule" eyebrow="Upcoming handoffs" />
            <div className="space-y-3">
              {upcomingSchedule.map((order) => (
                <article key={order.id} className="rounded-2xl border border-border bg-white/70 p-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-sm font-bold text-foreground">{order.customerName} <span className="text-muted-foreground">· {order.orderNumber}</span></p>
                      <p className="mt-1 text-sm font-semibold text-[#6f422c]">{formatDate(order.pickupDeliveryDate)} · {order.pickupDeliveryWindow}</p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{order.specialNotes}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 md:justify-end">
                      <Badge variant="premium">{order.pickupDeliveryType}</Badge>
                      <Badge variant={fulfillmentBadgeVariant[order.fulfillmentStatus]}>{order.fulfillmentStatus}</Badge>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}

function EmptyOrdersState({ filter }: { filter: Filter }) {
  return (
    <Card className="border-dashed bg-white/65 text-center">
      <div className="mx-auto max-w-xl py-10">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">No matching orders</p>
        <h3 className="mt-2 font-serif text-2xl font-bold tracking-tight text-foreground">No {filter.toLowerCase()} orders are currently in the queue.</h3>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">When a filter has matching customer commitments, they will appear here with payment, fulfillment, allergen, and production details.</p>
      </div>
    </Card>
  );
}
