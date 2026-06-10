import { Badge } from "@/components/ui/badge";

export function StatusBadge({ value }: { value: string }) {
  const variant = value.includes("Approved") || value.includes("Ready") || value.includes("Paid") || value.includes("Complete") || value.includes("Fulfilled") ? "success" : value.includes("High") || value.includes("Needs") || value.includes("Unpaid") ? "danger" : value.includes("Planning") || value.includes("Retest") || value.includes("Deposit") ? "warning" : "premium";
  return <Badge variant={variant}>{value}</Badge>;
}
