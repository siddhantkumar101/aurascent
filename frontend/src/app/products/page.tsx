"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getProducts, Product } from "@/lib/api";
import { useStore } from "@/lib/store";

const families = [
  "All",
  "Warm Amber Floral",
  "Woody Oriental",
  "Woody Spicy",
  "Citrus Fresh",
  "Floral Sweet",
  "Amber Gourmand",
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedFamily, setSelectedFamily] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const addToCart = useStore((state) => state.addToCart);

  useEffect(() => {
    const fetchProducts = async () => {
      const familyParam = selectedFamily === "All" ? undefined : selectedFamily;
      const data = await getProducts({ family: familyParam, search: searchQuery });
      setProducts(data);
    };

    fetchProducts();
  }, [selectedFamily, searchQuery]);

  return (
    <div className="min-h-screen bg-ivory font-sans text-noir">
      {/* Navigation */}
      <header className="sticky top-0 z-40 bg-ivory/80 backdrop-blur-md border-b border-light/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-serif text-3xl font-bold tracking-wider">AURASCENT</span>
            <span className="h-2 w-2 rounded-full bg-gold"></span>
          </Link>
          <nav className="flex items-center gap-8 text-sm font-medium tracking-wide">
            <Link href="/" className="text-slate hover:text-gold transition-colors">Home</Link>
            <Link href="/products" className="text-gold font-bold">Catalogue</Link>
            <Link href="/quiz" className="text-slate hover:text-gold transition-colors">Scent Finder</Link>
            <Link href="/admin" className="text-slate hover:text-gold transition-colors">Admin Area</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-left mb-12">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight mb-4">The AuraScent Catalogue</h1>
          <p className="text-slate text-sm">Explore our curated collection of long-lasting luxury inspired scents.</p>
        </div>

        {/* Filters & Search Grid */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          {/* Scent Family Filters */}
          <div className="flex flex-wrap gap-2 lg:flex-col lg:w-64 shrink-0 text-left">
            <span className="font-bold text-xs uppercase tracking-wider text-slate mb-2 hidden lg:block">Scent Families</span>
            {families.map((fam) => (
              <button
                key={fam}
                onClick={() => setSelectedFamily(fam)}
                className={`px-4 py-2 rounded text-xs font-semibold tracking-wide text-left transition-colors ${
                  selectedFamily === fam
                    ? "bg-gold text-noir"
                    : "bg-white border border-light/80 text-slate hover:border-gold"
                }`}
              >
                {fam}
              </button>
            ))}
          </div>

          {/* Search and Products Grid */}
          <div className="flex-1">
            {/* Search Input */}
            <div className="mb-8">
              <input
                type="text"
                placeholder="Search by name, notes (e.g. Cardamom, Oud, Rose) or inspired designer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-light rounded-md text-sm text-noir placeholder-slate focus:outline-none focus:border-gold shadow-sm"
              />
            </div>

            {/* Products Grid */}
            {products.length === 0 ? (
              <div className="bg-white rounded-lg p-16 text-center border border-light/60">
                <span className="font-serif text-lg text-slate block mb-2">No fragrances found</span>
                <span className="text-xs text-slate/60">Try adjusting your filters or search query.</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                  <div key={product.id} className="group flex flex-col bg-white rounded-lg border border-light/60 overflow-hidden shadow-sm hover:shadow-md transition-all">
                    {/* Visual Bottle Representation */}
                    <Link href={`/products/${product.id}`} className="relative h-64 bg-gradient-to-b from-light/40 to-light flex items-center justify-center p-8">
                      <div className="w-20 h-32 flex flex-col items-center justify-end relative">
                        <div className="w-8 h-5 bg-noir rounded-t group-hover:bg-gold transition-colors duration-300"></div>
                        <div className="w-5 h-2 bg-accent/80"></div>
                        <div className="w-16 h-22 bg-white/90 border border-noir/10 rounded backdrop-blur-sm shadow-inner flex items-center justify-center p-2">
                          <span className="font-serif text-[8px] tracking-wider uppercase font-bold text-center text-noir">{product.name}</span>
                        </div>
                      </div>
                    </Link>

                    {/* Description Details */}
                    <div className="p-6 flex flex-col flex-1 text-left">
                      <span className="text-[10px] uppercase tracking-widest font-semibold text-gold mb-1">{product.family}</span>
                      <Link href={`/products/${product.id}`}>
                        <h3 className="font-serif text-xl font-bold text-noir group-hover:text-gold transition-colors mb-1">{product.name}</h3>
                      </Link>
                      <p className="text-xs text-slate italic mb-4">{product.inspiredBy}</p>

                      <div className="text-xs border-t border-light/60 pt-4 mb-6">
                        <span className="font-bold text-noir block mb-1">Top Notes:</span>
                        <span className="text-slate">{product.notes.top.join(", ")}</span>
                      </div>

                      <div className="mt-auto flex items-center justify-between">
                        <span className="text-2xl font-serif font-bold text-noir">${product.price}</span>
                        <button
                          onClick={() => addToCart(product, "50ml")}
                          className="px-4 py-2 bg-noir text-white text-xs font-semibold tracking-wide rounded uppercase hover:bg-gold transition-colors"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
