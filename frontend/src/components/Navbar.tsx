"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";

export default function Navbar() {
  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logout);
  const cart = useStore((state) => state.cart);
  const setCartOpen = useStore((state) => state.setCartOpen);
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-ivory/90 backdrop-blur-md border-b border-light/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-serif text-3xl font-bold tracking-wider text-noir">AURASCENT</span>
          <span className="h-2 w-2 rounded-full bg-gold"></span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
          <Link href="/products" className="text-slate hover:text-gold transition-colors">Catalogue</Link>
          <Link href="/quiz" className="text-slate hover:text-gold transition-colors">Scent Finder</Link>
          {user?.role === "admin" ? (
            <Link href="/admin" className="text-gold font-bold hover:text-accent transition-colors">Admin Panel</Link>
          ) : (
            <Link href="/admin" className="text-slate hover:text-gold transition-colors">Admin Portal</Link>
          )}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          
          {/* Cart Icon */}
          <button 
            onClick={() => setCartOpen(true)}
            className="p-2 text-slate hover:text-noir transition-colors relative"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 h-4 w-4 bg-gold rounded-full text-[10px] text-white flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>

          {/* Desktop User Session Actions */}
          <div className="hidden sm:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3 text-xs">
                <span className="text-slate font-medium">Hello, <strong className="text-noir">{user.name}</strong></span>
                <button 
                  onClick={logout}
                  className="px-3 py-1.5 border border-light rounded hover:bg-light transition-colors text-slate hover:text-noir font-semibold"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                href="/login"
                className="px-5 py-2 bg-noir text-white text-xs font-semibold uppercase tracking-wider rounded hover:bg-gold hover:text-noir transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button Hamburger */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-slate hover:text-noir md:hidden transition-colors"
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>

        </div>
      </div>

      {/* Mobile Drawer Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-light/60 bg-white px-4 py-4 space-y-3 flex flex-col text-left">
          <Link 
            href="/products" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-sm font-semibold text-slate hover:text-gold py-1"
          >
            Catalogue
          </Link>
          <Link 
            href="/quiz" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-sm font-semibold text-slate hover:text-gold py-1"
          >
            Scent Finder Quiz
          </Link>
          {user?.role === "admin" ? (
            <Link 
              href="/admin" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-bold text-gold hover:text-accent py-1"
            >
              Admin Panel
            </Link>
          ) : (
            <Link 
              href="/admin" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-semibold text-slate hover:text-gold py-1"
            >
              Admin Portal
            </Link>
          )}

          {/* Mobile User session details */}
          <div className="border-t border-light/40 pt-3 mt-2">
            {user ? (
              <div className="flex flex-col gap-2">
                <span className="text-xs text-slate">Logged in as <strong className="text-noir">{user.name}</strong></span>
                <button 
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-2 border border-light rounded text-xs font-bold text-slate"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                href="/login" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full block text-center py-2 bg-noir text-white text-xs font-bold uppercase tracking-widest rounded"
              >
                Sign In / Register
              </Link>
            )}
          </div>
        </div>
      )}

    </header>
  );
}
