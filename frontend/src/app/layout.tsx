import type { Metadata } from "next";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}

