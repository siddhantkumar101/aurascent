"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useStore } from "@/lib/store";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  
  const login = useStore((state) => state.login);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    // Special credentials check for Admin
    if (email.toLowerCase().trim() === "admin@aurascent.com") {
      if (password !== "admin123") {
        alert("Invalid admin password. Try admin123");
        return;
      }
      login(email);
      router.push("/admin");
      return;
    }

    login(email, name || "Customer");
    router.push(redirect);
  };

  return (
    <div className="min-h-screen bg-ivory font-sans text-noir flex flex-col justify-between">
      {/* Header logo only */}
      <header className="h-20 flex items-center px-8 border-b border-light/60 bg-white/40">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-serif text-3xl font-bold tracking-wider">AURASCENT</span>
          <span className="h-2 w-2 rounded-full bg-gold"></span>
        </Link>
      </header>

      {/* Main card */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white border border-light/60 rounded-lg p-8 shadow-sm text-left">
          
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-widest font-bold text-gold mb-1 block">AuraScent Club</span>
            <h1 className="font-serif text-3xl font-bold text-noir">
              {isSignUp ? "Create An Account" : "Welcome Back"}
            </h1>
            <p className="text-xs text-slate mt-2">
              {isSignUp ? "Sign up to track orders and save your wishlist." : "Log in to proceed with checkout securely."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-xs font-semibold text-slate mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-light rounded text-sm text-noir focus:outline-none focus:border-gold"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-light rounded text-sm text-noir focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate mb-1">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-light rounded text-sm text-noir focus:outline-none focus:border-gold"
              />
            </div>

             {/* Test credentials tips */}
            <div className="bg-light/30 border border-light/60 p-3 rounded text-[10px] text-slate space-y-1">
              <span className="font-bold text-noir block uppercase tracking-wide">Test Credentials:</span>
              <span className="block">• **Customer**: Enter any email and password</span>
              <span className="block">• **Admin**: `admin@aurascent.com` / `admin123`</span>
              
              <button
                type="button"
                onClick={() => {
                  setEmail("admin@aurascent.com");
                  setPassword("admin123");
                }}
                className="w-full mt-2 py-1 border border-dashed border-gold hover:bg-gold/15 text-gold text-[10px] font-bold uppercase rounded cursor-pointer transition-colors"
              >
                Quick-Fill Admin Credentials
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gold hover:bg-accent text-noir font-bold text-xs uppercase tracking-wider rounded transition-colors"
            >
              {isSignUp ? "Create Account" : "Sign In"}
            </button>
          </form>

          {/* Toggle */}
          <div className="border-t border-light/60 mt-6 pt-4 text-center space-y-2">
            <div>
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-xs font-semibold text-gold hover:text-accent transition-colors"
              >
                {isSignUp ? "Already have an account? Sign In" : "New to AuraScent? Create Account"}
              </button>
            </div>
            <div>
              <Link
                href="/admin"
                className="text-xs text-slate hover:text-noir underline transition-colors"
              >
                Access Admin Portal directly
              </Link>
            </div>
          </div>

        </div>
      </main>

      {/* Mini footer */}
      <footer className="py-6 text-center text-xs text-slate border-t border-light/40">
        <span>© 2025 AuraScent. All Rights Reserved.</span>
      </footer>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-ivory flex items-center justify-center font-sans">
        <span className="font-serif text-lg text-slate animate-pulse">Loading auth gate...</span>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
