import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";

export const metadata: Metadata = {
  title: "AuraScent | Inspired Luxury Fragrances",
  description: "Discover high-quality inspired perfumes that mirror your favorite luxury designer scents at an accessible price.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-ivory text-noir font-sans">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <CartDrawer />
      </body>
    </html>
  );
}

