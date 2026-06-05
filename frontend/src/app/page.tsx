"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getProducts, Product } from "@/lib/api";
import { useStore } from "@/lib/store";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const addToCart = useStore((state) => state.addToCart);

  useEffect(() => {
    const fetch = async () => {
      const data = await getProducts();
      setProducts(data.slice(0, 3)); // show first 3 bestsellers
    };
    fetch();
  }, []);

  return (
    <div className="min-h-screen bg-ivory font-sans text-noir">
      
      {/* 2. Hero Section */}
      <section className="relative bg-noir text-white py-16 sm:py-24 md:py-32 overflow-hidden px-4">
        {/* Background Decorative Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold/20 via-noir to-noir"></div>

        <div className="relative max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold/30 bg-gold/10 text-accent text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-6">
            Luxury Fragrance, Reimagined
          </div>
          
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl leading-tight mb-6 sm:mb-8">
            Inspired Scents, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-accent to-gold">
              Accessible Prices.
            </span>
          </h1>
          
          <p className="text-light/80 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed mb-8 sm:mb-12">
            AuraScent creates premium, fragrance alternatives that mirror your favorite designer perfumes at 10-20% of the cost. Completely vegan, cruelty-free, and long-lasting.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4">
            <Link href="/products" className="inline-flex items-center justify-center px-6 py-3.5 sm:px-8 sm:py-4 bg-gold hover:bg-accent text-noir font-bold tracking-wide rounded transition-all shadow-lg transform hover:-translate-y-0.5 text-sm">
              Explore Collection
            </Link>
            <Link href="/quiz" className="inline-flex items-center justify-center px-6 py-3.5 sm:px-8 sm:py-4 border border-light/30 hover:border-light bg-noir/40 hover:bg-noir/60 text-white font-medium tracking-wide rounded transition-all text-sm">
              Take Scent Finder Quiz
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Brand Trust Indicators */}
      <section id="about" className="bg-light/40 py-12 border-b border-light/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start sm:items-center gap-4 text-left">
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-xs sm:text-sm tracking-wide uppercase text-noir">Premium Quality</h3>
              <p className="text-[10px] sm:text-xs text-slate mt-0.5">Extrait de Parfum concentration (20-30% oil) for all-day duration.</p>
            </div>
          </div>

          <div className="flex items-start sm:items-center gap-4 text-left">
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-xs sm:text-sm tracking-wide uppercase text-noir">Clean & Sustainable</h3>
              <p className="text-[10px] sm:text-xs text-slate mt-0.5">Cruelty-free, vegan-certified, and free from toxic phthalates.</p>
            </div>
          </div>

          <div className="flex items-start sm:items-center gap-4 text-left">
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124l-.09-1.343a1.5 1.5 0 0 0-1.496-1.4l-1.31-.031m-16 5.644h15.75M9 10.5h.008v.008H9V10.5Zm3 0h.008v.008H12V10.5Zm3 0h.008v.008H15V10.5Z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-xs sm:text-sm tracking-wide uppercase text-noir">Risk-Free Shopping</h3>
              <p className="text-[10px] sm:text-xs text-slate mt-0.5">Free 5ml sample included with every bottle. Return if you don't love it.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Products Showcase */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-xl text-left">
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-noir mb-3 sm:mb-4">Our Bestselling Fragrances</h2>
            <p className="text-slate text-xs sm:text-sm">Crafted with the finest French perfume oils, optimized for lasting performance.</p>
          </div>
          <Link href="/products" className="inline-flex items-center gap-1.5 text-gold hover:text-accent text-sm font-semibold tracking-wide border-b border-gold/40 hover:border-accent pb-0.5 transition-colors shrink-0">
            View All Perfumes
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group flex flex-col bg-white rounded-lg border border-light/60 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-60 sm:h-72 bg-gradient-to-b from-light/40 to-light flex items-center justify-center p-8">
                <span className="absolute top-4 left-4 bg-noir text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded">
                  Bestseller
                </span>
                <span className="absolute top-4 right-4 text-xs font-semibold text-gold bg-white/80 px-2 py-0.5 rounded backdrop-blur-sm">
                  {product.size}
                </span>

                <div className="w-20 h-36 sm:w-24 sm:h-40 flex flex-col items-center justify-end relative">
                  <div className="w-8 h-5 sm:w-10 sm:h-6 bg-noir rounded-t group-hover:bg-gold transition-colors duration-300"></div>
                  <div className="w-5 h-2 sm:w-6 sm:h-3 bg-accent/80"></div>
                  <div className="w-16 h-24 sm:w-20 sm:h-28 bg-white/80 border border-noir/10 rounded-md backdrop-blur-sm shadow-inner flex flex-col items-center justify-center p-2 relative overflow-hidden">
                    <span className="font-serif text-[8px] sm:text-[10px] tracking-wider uppercase font-bold text-center z-10 text-noir">{product.name}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1 text-left">
                <span className="text-[10px] uppercase tracking-widest font-semibold text-gold mb-1">{product.family}</span>
                <Link href={`/products/${product.id}`}>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-noir group-hover:text-gold transition-colors mb-1">{product.name}</h3>
                </Link>
                <p className="text-xs text-slate italic mb-4">{product.inspiredBy}</p>

                <div className="text-xs border-t border-light/60 pt-4 mb-6">
                  <span className="font-bold text-noir block mb-1">Key Notes:</span>
                  <span className="text-slate">{product.notes.top.slice(0, 3).join(", ")}...</span>
                </div>

                <div className="mt-auto flex items-center justify-between">
                  <span className="text-xl sm:text-2xl font-serif font-bold text-noir">${product.price}</span>
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
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-light/60">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate">
          <p>© 2025 AuraScent. All Rights Reserved.</p>
        </div>
      </footer>

    </div>
  );
}
