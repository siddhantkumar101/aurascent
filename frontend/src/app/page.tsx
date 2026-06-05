"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getProducts, Product } from "@/lib/api";
import { useStore } from "@/lib/store";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Zustand State hooks
  const cart = useStore((state) => state.cart);
  const addToCart = useStore((state) => state.addToCart);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const updateQuantity = useStore((state) => state.updateQuantity);

  useEffect(() => {
    const fetch = async () => {
      const data = await getProducts();
      setProducts(data.slice(0, 3)); // show first 3 bestsellers
    };
    fetch();
  }, []);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  const subtotal = cart.reduce((sum, item) => {
    const itemPrice = item.selectedSize === "100ml" ? item.product.price + 15 : item.product.price;
    return sum + itemPrice * item.quantity;
  }, 0);

  const handleAddToCart = (product: Product, size: string) => {
    addToCart(product, size);
    setIsCartOpen(true); // Auto-open cart drawer on add
  };

  return (
    <div className="min-h-screen bg-ivory font-sans text-noir relative">
      
      {/* 1. Header/Navigation */}
      <header className="sticky top-0 z-40 bg-ivory/80 backdrop-blur-md border-b border-light/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-serif text-3xl font-bold tracking-wider text-noir">AURASCENT</span>
            <span className="h-2 w-2 rounded-full bg-gold"></span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            <Link href="/products" className="text-slate hover:text-gold transition-colors">Catalogue</Link>
            <Link href="/quiz" className="text-slate hover:text-gold transition-colors">Scent Finder Quiz</Link>
            <a href="#about" className="text-slate hover:text-gold transition-colors">Our Promise</a>
            <Link href="/admin" className="text-slate hover:text-gold transition-colors">Admin Area</Link>
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-slate hover:text-noir transition-colors relative"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
              {totalCartCount > 0 && (
                <span className="absolute top-1 right-1 h-4 w-4 bg-gold rounded-full text-[10px] text-white flex items-center justify-center font-bold">
                  {totalCartCount}
                </span>
              )}
            </button>
            <Link href="/admin" className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 bg-noir text-white text-sm font-medium tracking-wide rounded-md hover:bg-slate transition-colors shadow-sm">
              Admin Area
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative bg-noir text-white py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold/20 via-noir to-noir"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold/30 bg-gold/10 text-accent text-xs font-semibold uppercase tracking-wider mb-6">
            Luxury Fragrance, Reimagined
          </div>
          
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl leading-tight mb-8">
            Inspired Scents, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-accent to-gold">
              Accessible Prices.
            </span>
          </h1>
          
          <p className="text-light/80 text-lg max-w-2xl leading-relaxed mb-12">
            AuraScent creates premium, high-quality fragrance alternatives that match your favorite designer perfumes at 10-20% of the cost. Completely vegan, cruelty-free, and long-lasting.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/products" className="inline-flex items-center justify-center px-8 py-4 bg-gold hover:bg-accent text-noir font-bold tracking-wide rounded-md transition-all shadow-lg transform hover:-translate-y-0.5">
              Explore Collection
            </Link>
            <Link href="/quiz" className="inline-flex items-center justify-center px-8 py-4 border border-light/30 hover:border-light bg-noir/40 hover:bg-noir/60 text-white font-medium tracking-wide rounded-md transition-all">
              Take Scent Finder Quiz
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Brand Trust Indicators */}
      <section id="about" className="bg-light/40 py-10 border-b border-light/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center gap-4 text-left">
            <div className="h-12 w-12 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-wide uppercase text-noir">Premium Quality</h3>
              <p className="text-xs text-slate mt-0.5">Extrait de Parfum concentration (20-30% oil) for all-day duration.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-left">
            <div className="h-12 w-12 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-wide uppercase text-noir">Clean & Sustainable</h3>
              <p className="text-xs text-slate mt-0.5">Cruelty-free, vegan-certified, and free from toxic phthalates.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-left">
            <div className="h-12 w-12 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124l-.09-1.343a1.5 1.5 0 0 0-1.496-1.4l-1.31-.031m-16 5.644h15.75M9 10.5h.008v.008H9V10.5Zm3 0h.008v.008H12V10.5Zm3 0h.008v.008H15V10.5Z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-wide uppercase text-noir">Risk-Free Shopping</h3>
              <p className="text-xs text-slate mt-0.5">Free 5ml sample included with every bottle. Return if you don't love it.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Products Showcase */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-end justify-between mb-16">
          <div className="max-w-xl text-left">
            <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-noir mb-4">Our Bestselling Fragrances</h2>
            <p className="text-slate text-sm">Crafted with the finest French perfume oils, optimized for lasting performance.</p>
          </div>
          <Link href="/products" className="inline-flex items-center gap-1.5 text-gold hover:text-accent text-sm font-semibold tracking-wide border-b border-gold/40 hover:border-accent pb-0.5 transition-colors shrink-0">
            View All Perfumes
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group flex flex-col bg-white rounded-lg border border-light/60 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-72 bg-gradient-to-b from-light/40 to-light flex items-center justify-center p-8">
                <span className="absolute top-4 left-4 bg-noir text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded">
                  Bestseller
                </span>
                <span className="absolute top-4 right-4 text-xs font-semibold text-gold bg-white/80 px-2 py-0.5 rounded backdrop-blur-sm">
                  {product.size}
                </span>

                <div className="w-24 h-40 flex flex-col items-center justify-end relative">
                  <div className="w-10 h-6 bg-noir rounded-t group-hover:bg-gold transition-colors duration-300"></div>
                  <div className="w-6 h-3 bg-accent/80"></div>
                  <div className="w-20 h-28 bg-white/80 border border-noir/10 rounded-md backdrop-blur-sm shadow-inner flex flex-col items-center justify-center p-2 relative overflow-hidden">
                    <span className="font-serif text-[10px] tracking-wider uppercase font-bold text-center z-10 text-noir">{product.name}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1 text-left">
                <span className="text-[10px] uppercase tracking-widest font-semibold text-gold mb-1">{product.family}</span>
                <Link href={`/products/${product.id}`}>
                  <h3 className="font-serif text-xl font-bold text-noir group-hover:text-gold transition-colors mb-1">{product.name}</h3>
                </Link>
                <p className="text-xs text-slate italic mb-4">{product.inspiredBy}</p>

                <div className="text-xs border-t border-light/60 pt-4 mb-6">
                  <span className="font-bold text-noir block mb-1">Key Notes:</span>
                  <span className="text-slate">{product.notes.top.slice(0, 3).join(", ")}...</span>
                </div>

                <div className="mt-auto flex items-center justify-between">
                  <span className="text-2xl font-serif font-bold text-noir">${product.price}</span>
                  <button 
                    onClick={() => handleAddToCart(product, "50ml")}
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

      {/* 5. Cart Sliding Drawer Overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div 
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-noir/40 backdrop-blur-sm transition-opacity"
          ></div>

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white border-l border-light flex flex-col shadow-2xl text-left">
              
              <div className="px-6 py-6 border-b border-light flex items-center justify-between">
                <h2 className="font-serif text-2xl font-bold text-noir">Your Shopping Cart</h2>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 hover:text-gold transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <span className="font-serif text-lg text-slate mb-2">Cart is empty</span>
                    <Link 
                      href="/products" 
                      onClick={() => setIsCartOpen(false)}
                      className="text-xs font-bold text-gold underline uppercase tracking-wider"
                    >
                      Browse Catalogue
                    </Link>
                  </div>
                ) : (
                  cart.map((item, index) => {
                    const itemPrice = item.selectedSize === "100ml" ? item.product.price + 15 : item.product.price;
                    return (
                      <div key={index} className="flex gap-4 border-b border-light/40 pb-6">
                        <div className="w-16 h-20 bg-light/30 rounded flex items-center justify-center shrink-0">
                          <span className="font-serif text-[8px] font-bold text-center text-noir">{item.product.name}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-serif font-bold text-sm text-noir">{item.product.name}</h4>
                          <span className="text-[10px] text-slate block mb-2">{item.selectedSize}</span>
                          
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                              className="px-2 py-0.5 border border-light text-xs font-semibold rounded hover:bg-light"
                            >
                              -
                            </button>
                            <span className="text-xs font-bold text-noir px-2">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                              className="px-2 py-0.5 border border-light text-xs font-semibold rounded hover:bg-light"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="text-right flex flex-col justify-between items-end">
                          <span className="font-serif font-bold text-sm">${itemPrice * item.quantity}</span>
                          <button 
                            onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                            className="text-[10px] text-red-600 hover:underline font-semibold"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Subtotal & Checkout */}
              {cart.length > 0 && (
                <div className="border-t border-light p-6 bg-light/10 space-y-4">
                  <div className="flex justify-between text-base font-bold text-noir font-serif">
                    <span>Subtotal</span>
                    <span>${subtotal}</span>
                  </div>
                  <p className="text-[10px] text-slate">Shipping calculated at secure checkout page.</p>
                  
                  <Link
                    href="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full flex items-center justify-center py-4 bg-gold hover:bg-accent text-noir font-bold tracking-wide rounded uppercase transition-colors"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-light/60">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate">
          <p>© 2025 AuraScent. All Rights Reserved.</p>
        </div>
      </footer>

    </div>
  );
}
