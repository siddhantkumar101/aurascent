"use client";

import React from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";

export default function CartDrawer() {
  const isCartOpen = useStore((state) => state.isCartOpen);
  const setCartOpen = useStore((state) => state.setCartOpen);
  const cart = useStore((state) => state.cart);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const updateQuantity = useStore((state) => state.updateQuantity);

  const subtotal = cart.reduce((sum, item) => {
    const itemPrice = item.selectedSize === "100ml" ? item.product.price + 15 : item.product.price;
    return sum + itemPrice * item.quantity;
  }, 0);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => setCartOpen(false)}
        className="absolute inset-0 bg-noir/40 backdrop-blur-sm transition-opacity"
      ></div>

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-light flex flex-col shadow-2xl text-left">
          
          <div className="px-6 py-6 border-b border-light flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-noir">Your Shopping Cart</h2>
            <button 
              onClick={() => setCartOpen(false)}
              className="p-1 hover:text-gold transition-colors text-slate hover:text-noir"
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
                  onClick={() => setCartOpen(false)}
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
                onClick={() => setCartOpen(false)}
                className="w-full flex items-center justify-center py-4 bg-gold hover:bg-accent text-noir font-bold tracking-wide rounded uppercase transition-colors text-center"
              >
                Proceed to Checkout
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
