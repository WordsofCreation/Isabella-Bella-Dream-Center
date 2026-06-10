import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Isabella Bella Dream Center",
  description: "A premium command center for Isabella Bella cookie ideas, recipes, costing, launches, production, and orders.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={cn(inter.variable, playfair.variable, "min-h-screen font-sans")}>{children}</body>
    </html>
  );
}
