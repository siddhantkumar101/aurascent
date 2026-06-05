"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";

export default function CheckoutPage() {
  const cart = useStore((state) => state.cart);
  const clearCart = useStore((state) => state.clearCart);

  // Form states
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("United States");
  const [couponCode, setCouponCode] = useState("");
  
  // Checkout status
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [orderId, setOrderId] = useState("");

  const subtotal = cart.reduce((sum, item) => {
    const itemPrice = item.selectedSize === "100ml" ? item.product.price + 15 : item.product.price;
    return sum + itemPrice * item.quantity;
  }, 0);

  const discountAmount = parseFloat(((subtotal * discountPercent) / 100).toFixed(2));
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 5.99;
  const total = parseFloat((subtotal - discountAmount + shipping).toFixed(2));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === "WELCOME15") {
      setDiscountPercent(15);
      setCouponApplied(true);
    } else {
      alert("Invalid coupon code. Try WELCOME15");
    }
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsProcessing(true);

    // Mock network request delay
    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
      setOrderId("ASC-" + Math.floor(100000 + Math.random() * 900000));
      clearCart();
    }, 2000);
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-ivory flex flex-col items-center justify-center font-sans text-center p-4">
        <div className="h-16 w-16 bg-gold/10 text-gold rounded-full flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </div>
        
        <span className="text-xs uppercase tracking-widest font-bold text-gold mb-2 block">Order Confirmed</span>
        <h1 className="font-serif text-4xl font-bold mb-4">Thank You For Your Order!</h1>
        <p className="text-slate text-sm max-w-md mb-8">
          Your order <strong>{orderId}</strong> has been successfully placed. We have sent a confirmation email to <strong>{email}</strong>.
        </p>

        <Link
          href="/products"
          className="px-8 py-3.5 bg-noir text-white text-xs font-semibold uppercase tracking-wider rounded hover:bg-gold hover:text-noir transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory font-sans text-noir">
      {/* Navigation */}
      <header className="sticky top-0 z-40 bg-ivory/80 backdrop-blur-md border-b border-light/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-serif text-3xl font-bold tracking-wider">AURASCENT</span>
            <span className="h-2 w-2 rounded-full bg-gold"></span>
          </Link>
          <span className="text-xs font-semibold uppercase tracking-widest text-slate">Secure Checkout</span>
        </div>
      </header>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left: Shipping & Payment Details */}
          <div className="text-left bg-white rounded-lg border border-light/60 p-8 shadow-sm">
            <h2 className="font-serif text-2xl font-bold text-noir mb-6">Shipping Details</h2>
            
            <form onSubmit={handleCheckout} className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-slate mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-light rounded text-sm text-noir focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-light rounded text-sm text-noir focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full px-3 py-2 border border-light rounded text-sm text-noir focus:outline-none focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 border border-light rounded text-sm text-noir focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate mb-1">Zip Code</label>
                  <input
                    type="text"
                    required
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    className="w-full px-3 py-2 border border-light rounded text-sm text-noir focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              {/* Payment Details Mockup */}
              <div className="border-t border-light/60 pt-6">
                <h3 className="font-serif text-xl font-bold text-noir mb-4">Payment Method</h3>
                <div className="bg-light/30 rounded p-4 border border-light/60 mb-4 text-xs text-slate">
                  Stripe Test Integration Enabled. Enter any dummy details below.
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate mb-1">Card Number</label>
                    <input
                      type="text"
                      placeholder="4242 4242 4242 4242"
                      required
                      className="w-full px-3 py-2 border border-light rounded text-sm text-noir focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate mb-1">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        required
                        className="w-full px-3 py-2 border border-light rounded text-sm text-noir focus:outline-none focus:border-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate mb-1">CVC</label>
                      <input
                        type="text"
                        placeholder="123"
                        required
                        className="w-full px-3 py-2 border border-light rounded text-sm text-noir focus:outline-none focus:border-gold"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing || cart.length === 0}
                className="w-full py-4 bg-gold hover:bg-accent disabled:bg-slate text-noir font-bold tracking-wide rounded uppercase transition-colors"
              >
                {isProcessing ? "Processing Payment..." : `Pay $${total}`}
              </button>
            </form>
          </div>

          {/* Right: Order Summary */}
          <div className="text-left bg-white rounded-lg border border-light/60 p-8 shadow-sm">
            <h2 className="font-serif text-2xl font-bold text-noir mb-6">Order Summary</h2>

            {cart.length === 0 ? (
              <p className="text-slate text-sm italic">Your shopping cart is empty.</p>
            ) : (
              <div className="space-y-4 mb-6">
                {cart.map((item, index) => {
                  const itemPrice = item.selectedSize === "100ml" ? item.product.price + 15 : item.product.price;
                  return (
                    <div key={index} className="flex justify-between items-center border-b border-light/40 pb-4">
                      <div>
                        <span className="font-bold text-sm text-noir">{item.product.name}</span>
                        <span className="text-[10px] text-slate block">{item.selectedSize} | Qty: {item.quantity}</span>
                      </div>
                      <span className="font-serif text-sm font-bold text-noir">${itemPrice * item.quantity}</span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2 mb-6">
              <input
                type="text"
                placeholder="Discount Code (e.g. WELCOME15)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 px-3 py-2 border border-light rounded text-xs text-noir focus:outline-none focus:border-gold"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-noir text-white text-xs font-semibold uppercase rounded hover:bg-gold transition-colors"
              >
                Apply
              </button>
            </form>

            {/* Cost Breakdown */}
            <div className="space-y-3 border-t border-light/60 pt-6 text-sm text-slate">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-noir">${subtotal}</span>
              </div>
              
              {couponApplied && (
                <div className="flex justify-between text-gold">
                  <span>15% Discount Applied</span>
                  <span>-${discountAmount}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? "FREE" : `$${shipping}`}</span>
              </div>

              <div className="flex justify-between text-lg font-bold text-noir border-t border-light/60 pt-4 font-serif">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
