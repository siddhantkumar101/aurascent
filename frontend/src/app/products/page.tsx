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
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="text-left mb-8 sm:mb-12">
          <span className="text-[10px] uppercase tracking-widest font-bold text-gold mb-1 block">AuraScent Catalogue</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-noir mb-3">Scent Collection</h1>
          <p className="text-slate text-xs sm:text-sm">Explore our curated collection of long-lasting luxury inspired scents.</p>
        </div>

        {/* Filters & Search Grid */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          
          {/* Scent Family Filters (Mobile Scrollable Tabs / Desktop Sidebar) */}
          <div className="flex overflow-x-auto lg:overflow-x-visible lg:flex-col gap-2 lg:w-64 shrink-0 pb-3 lg:pb-0 scrollbar-thin scrollbar-thumb-light scrollbar-track-transparent snap-x">
            <span className="font-bold text-xs uppercase tracking-wider text-slate mb-2 hidden lg:block">Scent Families</span>
            {families.map((fam) => (
              <button
                key={fam}
                onClick={() => setSelectedFamily(fam)}
                className={`snap-start px-4 py-2 sm:py-2.5 rounded text-[10px] sm:text-xs font-semibold tracking-wide text-left transition-colors shrink-0 ${
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
          <div className="flex-1 w-full">
            
            {/* Search Input */}
            <div className="mb-6 sm:mb-8">
              <input
                type="text"
                placeholder="Search by name, notes (e.g. Cardamom, Oud, Rose) or inspired designer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-light rounded-md text-xs sm:text-sm text-noir placeholder-slate focus:outline-none focus:border-gold shadow-sm"
              />
            </div>

            {/* Products Grid */}
            {products.length === 0 ? (
              <div className="bg-white rounded-lg p-16 text-center border border-light/60">
                <span className="font-serif text-lg text-slate block mb-2">No fragrances found</span>
                <span className="text-xs text-slate/60">Try adjusting your filters or search query.</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {products.map((product) => (
                  <div key={product.id} className="group flex flex-col bg-white rounded-lg border border-light/60 overflow-hidden shadow-sm hover:shadow-md transition-all">
                    {/* Visual Bottle Representation */}
                    <Link href={`/products/${product.id}`} className="relative h-56 sm:h-64 bg-gradient-to-b from-light/40 to-light flex items-center justify-center p-8">
                      <div className="w-16 h-28 sm:w-20 sm:h-32 flex flex-col items-center justify-end relative">
                        <div className="w-6 h-4 sm:w-8 sm:h-5 bg-noir rounded-t group-hover:bg-gold transition-colors duration-300"></div>
                        <div className="w-4 h-2 sm:w-5 sm:h-2 bg-accent/80"></div>
                        <div className="w-12 h-18 sm:w-16 sm:h-22 bg-white/90 border border-noir/10 rounded backdrop-blur-sm shadow-inner flex items-center justify-center p-2">
                          <span className="font-serif text-[7px] sm:text-[8px] tracking-wider uppercase font-bold text-center text-noir">{product.name}</span>
                        </div>
                      </div>
                    </Link>

                    {/* Description Details */}
                    <div className="p-5 sm:p-6 flex flex-col flex-1 text-left">
                      <span className="text-[9px] sm:text-[10px] uppercase tracking-widest font-semibold text-gold mb-1">{product.family}</span>
                      <Link href={`/products/${product.id}`}>
                        <h3 className="font-serif text-lg sm:text-xl font-bold text-noir group-hover:text-gold transition-colors mb-1">{product.name}</h3>
                      </Link>
                      <p className="text-[10px] sm:text-xs text-slate italic mb-4">{product.inspiredBy}</p>

                      <div className="text-[11px] sm:text-xs border-t border-light/60 pt-4 mb-6">
                        <span className="font-bold text-noir block mb-1">Top Notes:</span>
                        <span className="text-slate">{product.notes.top.slice(0, 3).join(", ")}...</span>
                      </div>

                      <div className="mt-auto flex items-center justify-between">
                        <span className="text-xl sm:text-2xl font-serif font-bold text-noir">${product.price}</span>
                        <button
                          onClick={() => addToCart(product, "50ml")}
                          className="px-4 py-2 bg-noir text-white text-[10px] sm:text-xs font-semibold tracking-wide rounded uppercase hover:bg-gold transition-colors"
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
