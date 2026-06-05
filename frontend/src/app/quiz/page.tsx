"use client";

import React, { useState } from "react";
import Link from "next/link";
import { getRecommendations, Product } from "@/lib/api";

interface Question {
  id: number;
  text: string;
  options: {
    label: string;
    value: string;
    familyValue: string;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "How would you describe your ideal vibe?",
    options: [
      { label: "Fresh, energetic, and clean", value: "fresh", familyValue: "Citrus Fresh" },
      { label: "Sophisticated, bold, and mysterious", value: "bold", familyValue: "Woody Oriental" },
      { label: "Elegant, sweet, and romantic", value: "sweet", familyValue: "Floral Sweet" },
      { label: "Warm, creamy, and sensual", value: "warm", familyValue: "Warm Amber Floral" },
    ],
  },
  {
    id: 2,
    text: "When are you planning to wear this fragrance the most?",
    options: [
      { label: "Everyday wear (Office, casual out)", value: "daily", familyValue: "Woody Spicy" },
      { label: "Special dates & elegant evening events", value: "dates", familyValue: "Warm Amber Floral" },
      { label: "Gym, travel & active outdoors", value: "active", familyValue: "Citrus Fresh" },
      { label: "Night out, parties, & festivals", value: "parties", familyValue: "Amber Gourmand" },
    ],
  },
  {
    id: 3,
    text: "What scent notes appeal to you the most?",
    options: [
      { label: "Orange, Bergamot, Lemongrass", value: "citrus", familyValue: "Citrus Fresh" },
      { label: "Cedar, Sandalwood, Leather", value: "woody", familyValue: "Woody Spicy" },
      { label: "Turkish Rose, Jasmine, Peony", value: "floral", familyValue: "Floral Sweet" },
      { label: "Sweet Cherry, Tonka Bean, Vanilla", value: "gourmand", familyValue: "Amber Gourmand" },
    ],
  },
];

export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleAnswer = (familyValue: string) => {
    const nextAnswers = [...answers, familyValue];
    setAnswers(nextAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate matches
      // Simple logic: we take the family value from the last answer or count the most selected family
      const selectedFamily = familyValue; // use final answer for immediate direct matching
      const matches = getRecommendations({ family: selectedFamily, intensity: "high" });
      setRecommendations(matches);
      setQuizFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setRecommendations([]);
    setQuizFinished(false);
  };

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
            <Link href="/products" className="text-slate hover:text-gold transition-colors">Catalogue</Link>
            <Link href="/quiz" className="text-gold font-bold">Scent Finder</Link>
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-3xl mx-auto px-4 py-16 text-center">
        {!quizFinished ? (
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-gold mb-3 block">Scent Profiler</span>
            <h1 className="font-serif text-4xl font-bold mb-4">Find Your Signature Note</h1>
            <p className="text-slate text-sm mb-12">Answer 3 quick questions and discover fragrances tailored exactly for you.</p>

            {/* Quiz Card */}
            <div className="bg-white rounded-lg border border-light/60 p-8 shadow-sm text-left">
              <div className="flex items-center justify-between border-b border-light/40 pb-4 mb-8">
                <span className="text-xs text-gold font-bold uppercase tracking-wider">
                  Question {currentStep + 1} of {questions.length}
                </span>
                <div className="flex gap-1">
                  {questions.map((_, idx) => (
                    <span
                      key={idx}
                      className={`h-1.5 w-8 rounded-full transition-colors ${
                        idx <= currentStep ? "bg-gold" : "bg-light"
                      }`}
                    ></span>
                  ))}
                </div>
              </div>

              <h2 className="font-serif text-2xl font-bold text-noir mb-8">
                {questions[currentStep].text}
              </h2>

              <div className="space-y-4">
                {questions[currentStep].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(opt.familyValue)}
                    className="w-full flex items-center justify-between p-4 rounded-lg bg-white border border-light/80 text-left hover:border-gold hover:bg-light/10 transition-all group"
                  >
                    <span className="text-sm font-medium text-slate group-hover:text-noir">{opt.label}</span>
                    <span className="h-4 w-4 rounded-full border border-light/80 flex items-center justify-center shrink-0 group-hover:border-gold"></span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-gold mb-3 block">Scent Profiler Match</span>
            <h1 className="font-serif text-4xl font-bold mb-4">Your Signature Matches</h1>
            <p className="text-slate text-sm mb-12">Based on your choices, we recommend these inspired fragrances:</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
              {recommendations.map((product) => (
                <div key={product.id} className="group flex flex-col bg-white rounded-lg border border-light/60 overflow-hidden shadow-sm text-left">
                  <div className="relative h-48 bg-gradient-to-b from-light/40 to-light flex items-center justify-center p-6">
                    <div className="w-14 h-24 flex flex-col items-center justify-end relative">
                      <div className="w-6 h-4 bg-noir rounded-t"></div>
                      <div className="w-4 h-2 bg-accent/80"></div>
                      <div className="w-12 h-18 bg-white/95 border border-noir/10 rounded backdrop-blur-sm shadow-inner flex items-center justify-center p-1">
                        <span className="font-serif text-[6px] tracking-wider uppercase font-bold text-center text-noir">{product.name}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <span className="text-[10px] uppercase tracking-widest font-semibold text-gold mb-1 block">{product.family}</span>
                    <h3 className="font-serif text-lg font-bold text-noir mb-1">{product.name}</h3>
                    <p className="text-xs text-slate italic mb-4">{product.inspiredBy}</p>

                    <div className="flex items-center justify-between mt-6">
                      <span className="text-xl font-serif font-bold text-noir">${product.price}</span>
                      <Link
                        href={`/products/${product.id}`}
                        className="px-4 py-2 bg-noir text-white text-xs font-semibold tracking-wide rounded uppercase hover:bg-gold transition-colors"
                      >
                        View Product
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleReset}
              className="px-8 py-3 border border-gold text-gold font-semibold text-xs tracking-wide uppercase rounded hover:bg-gold hover:text-noir transition-colors"
            >
              Retake Quiz
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
