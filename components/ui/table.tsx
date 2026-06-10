import { cn } from "@/lib/utils";

export function DataTable({ headers, rows, className }: { headers: string[]; rows: React.ReactNode[][]; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-2xl border border-border bg-card shadow-soft", className)}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-muted/70 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>{headers.map((header) => <th key={header} className="px-4 py-3 font-bold">{header}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((row, index) => (
              <tr key={index} className="hover:bg-muted/35">{row.map((cell, cellIndex) => <td key={cellIndex} className="px-4 py-4 align-top">{cell}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
