import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Isabella Bella Dream Center",
  description: "A premium command center for Isabella Bella cookie ideas, recipes, costing, launches, production, and orders.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}
