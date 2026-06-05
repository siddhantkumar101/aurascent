"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getProductById, Product } from "@/lib/api";
import { useStore } from "@/lib/store";

interface Review {
  name: string;
  rating: number;
  text: string;
  date: string;
}

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("50ml");
  const [reviews, setReviews] = useState<Review[]>([]);
  
  // Review form state
  const [reviewerName, setReviewerName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");

  const addToCart = useStore((state) => state.addToCart);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      const data = await getProductById(id);
      setProduct(data);
      setLoading(false);
      
      if (data) {
        setReviews([
          {
            name: "Alexander M.",
            rating: 5,
            text: `Absolutely spot on. Smells identical to the original and the longevity is actually better! I get solid 8 hours of performance.`,
            date: "May 20, 2026",
          },
          {
            name: "Sophia K.",
            rating: 4,
            text: `Great scent pyramid separation. The top notes are a bit sharp at first spray, but it drys down into an incredibly rich and smooth trail.`,
            date: "June 1, 2026",
          }
        ]);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName || !reviewText) return;
    
    const newReview: Review = {
      name: reviewerName,
      rating: reviewRating,
      text: reviewText,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };

    setReviews([newReview, ...reviews]);
    setReviewerName("");
    setReviewText("");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center font-sans">
        <span className="font-serif text-lg text-slate animate-pulse">Loading Scent Details...</span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-ivory flex flex-col items-center justify-center font-sans text-center">
        <h1 className="font-serif text-3xl font-bold mb-4">Fragrance Not Found</h1>
        <Link href="/products" className="text-gold font-bold underline">Back to Catalogue</Link>
      </div>
    );
  }

  const currentPrice = selectedSize === "100ml" ? product.price + 15 : product.price;

  return (
    <div className="min-h-screen bg-ivory font-sans text-noir">
      
      {/* Product Information */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          
          {/* Left: Perfume Bottle Representation (Mobile Responsive Height) */}
          <div className="bg-gradient-to-b from-light/40 to-light rounded-xl border border-light/60 p-8 sm:p-16 flex items-center justify-center h-72 sm:h-[450px] lg:h-[500px]">
            <div className="w-24 h-40 sm:w-36 sm:h-60 flex flex-col items-center justify-end relative">
              <div className="w-10 h-5 sm:w-16 sm:h-8 bg-noir rounded-t"></div>
              <div className="w-5 h-2 sm:w-8 sm:h-3 bg-accent/80"></div>
              <div className="w-20 h-28 sm:w-28 sm:h-44 bg-white/95 border border-noir/10 rounded-lg shadow-xl backdrop-blur-sm flex flex-col items-center justify-center p-3">
                <span className="font-serif text-[10px] sm:text-sm tracking-wider uppercase font-bold text-center text-noir">{product.name}</span>
                <span className="text-[6px] sm:text-[8px] tracking-widest uppercase font-semibold text-gold mt-2">Inspired By</span>
                <span className="text-[6px] sm:text-[8px] italic text-slate text-center mt-0.5">{product.inspiredBy}</span>
              </div>
            </div>
          </div>

          {/* Right: Scent details */}
          <div className="text-left">
            <span className="text-[10px] uppercase tracking-widest font-semibold text-gold mb-2 block">{product.family}</span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-noir mb-2">{product.name}</h1>
            <p className="text-xs sm:text-sm text-slate italic mb-6">{product.inspiredBy}</p>
            
            <p className="text-sm sm:text-base text-slate leading-relaxed mb-6 sm:mb-8">{product.description}</p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-8">
              <span className="text-2xl sm:text-3xl font-serif font-bold text-noir">${currentPrice}</span>
              <span className="text-[10px] sm:text-xs text-slate">Free 5ml sample included with every bottle.</span>
            </div>

            {/* Size Selector */}
            <div className="mb-8">
              <span className="font-bold text-xs uppercase tracking-wider text-slate block mb-3">Select Bottle Size</span>
              <div className="flex gap-4">
                {["50ml", "100ml"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-2.5 sm:px-6 sm:py-3 border text-[10px] sm:text-xs font-semibold tracking-wider rounded transition-all uppercase ${
                      selectedSize === size
                        ? "bg-noir border-noir text-white"
                        : "bg-white border-light hover:border-gold text-slate"
                    }`}
                  >
                    {size} {size === "100ml" && "(+$15)"}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={() => addToCart(product, selectedSize)}
              className="w-full sm:w-auto px-12 py-4 bg-gold hover:bg-accent text-noir font-bold text-xs sm:text-sm tracking-wide rounded transition-all shadow-md mb-12 uppercase"
            >
              Add to Shopping Cart
            </button>

            {/* Scent Pyramid Display */}
            <div className="border-t border-light/60 pt-8">
              <h3 className="font-serif text-2xl font-bold text-noir mb-6">The Scent Pyramid</h3>
              <div className="space-y-6">
                
                {/* Top notes */}
                <div className="flex items-start gap-4">
                  <div className="h-8 w-24 rounded bg-gold/10 text-gold flex items-center justify-center font-bold text-[9px] sm:text-[10px] uppercase tracking-wider shrink-0 mt-0.5">
                    Top Notes
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-xs text-slate font-semibold block mb-0.5">Lasts 15 - 30 minutes</span>
                    <span className="text-xs sm:text-sm text-noir">{product.notes.top.join(", ")}</span>
                  </div>
                </div>

                {/* Heart notes */}
                <div className="flex items-start gap-4">
                  <div className="h-8 w-24 rounded bg-gold/15 text-gold flex items-center justify-center font-bold text-[9px] sm:text-[10px] uppercase tracking-wider shrink-0 mt-0.5">
                    Heart Notes
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-xs text-slate font-semibold block mb-0.5">Lasts 2 - 4 hours</span>
                    <span className="text-xs sm:text-sm text-noir">{product.notes.middle.join(", ")}</span>
                  </div>
                </div>

                {/* Base notes */}
                <div className="flex items-start gap-4">
                  <div className="h-8 w-24 rounded bg-gold/20 text-gold flex items-center justify-center font-bold text-[9px] sm:text-[10px] uppercase tracking-wider shrink-0 mt-0.5">
                    Base Notes
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-xs text-slate font-semibold block mb-0.5">Lasts 6 - 8+ hours (longevity base)</span>
                    <span className="text-xs sm:text-sm text-noir">{product.notes.base.join(", ")}</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Reviews Section */}
        <div className="border-t border-light/60 mt-16 sm:mt-20 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 sm:gap-16">
            
            {/* Reviews list */}
            <div className="lg:col-span-2 text-left">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-noir mb-8">Customer Reviews</h3>
              {reviews.length === 0 ? (
                <p className="text-slate text-sm italic">No reviews yet. Be the first to share your experience!</p>
              ) : (
                <div className="space-y-6 sm:space-y-8">
                  {reviews.map((rev, index) => (
                    <div key={index} className="border-b border-light/40 pb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-xs sm:text-sm text-noir">{rev.name}</span>
                        <span className="text-[10px] sm:text-xs text-slate">{rev.date}</span>
                      </div>
                      <div className="flex gap-1 text-gold mb-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className="text-xs sm:text-sm">{i < rev.rating ? "★" : "☆"}</span>
                        ))}
                      </div>
                      <p className="text-xs sm:text-sm text-slate leading-relaxed">{rev.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Leave a review form */}
            <div className="bg-white rounded-lg border border-light/60 p-6 text-left w-full">
              <h4 className="font-serif text-lg sm:text-xl font-bold text-noir mb-4">Share Your Thoughts</h4>
              <form onSubmit={handleAddReview} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    className="w-full px-3 py-2 border border-light rounded text-xs sm:text-sm text-noir focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate mb-1">Rating</label>
                  <select
                    value={reviewRating}
                    onChange={(e) => setReviewRating(parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-light rounded text-xs sm:text-sm text-noir focus:outline-none focus:border-gold"
                  >
                    {[5, 4, 3, 2, 1].map((r) => (
                      <option key={r} value={r}>{r} Stars</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate mb-1">Your Review</label>
                  <textarea
                    required
                    rows={4}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="w-full px-3 py-2 border border-light rounded text-xs sm:text-sm text-noir focus:outline-none focus:border-gold resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-noir text-white text-xs font-semibold uppercase tracking-wider rounded hover:bg-gold transition-colors"
                >
                  Submit Review
                </button>
              </form>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
