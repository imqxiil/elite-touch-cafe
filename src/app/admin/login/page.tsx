"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("Invalid email or password. Please try again.");
      setLoading(false);
      return;
    }

    router.push("/admin/dashboard");
    router.refresh();
  };

  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden font-body text-on-surface bg-surface-variant/20 animate-fade-in">
      {/* Subtle blurred background layer for depth */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-20 mix-blend-multiply filter blur-3xl scale-110 pointer-events-none" 
        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC-0lC1CKx4siLw-WKShRLQR_nXZtkFGq5hY5kwT2blHLmprJbH__AmZs6Wgel1qZbVl--EcgshcWjb0jN8P0zZrz4QYG3YPdqRFOlrRMlEWsEa3_D4-f0hpiwNek226AnqVrohEFigPr6gObIQ7iNBJ4cb5fyY-yNMVZoI_jTsWAksQ6RNeKGdVtlfa-Chxlr4BokvKGTzLqmfN4OfnVehCZSx7GROTMwhUbLH84qZXQyA7pi7f4UEZXJm3SP-h34nQaqdKkGW4gMG')" }}
      ></div>

      {/* Main Content Canvas */}
      <div className="relative z-10 w-full max-w-[448px] px-6 md:px-0">
        {/* Login Card */}
        <div className="bg-surface border border-outline-variant rounded-lg p-8 md:p-10 flex flex-col gap-6 shadow-[0_8px_30px_rgb(0,6,102,0.04)] backdrop-blur-sm">
          {/* Brand Header */}
          <div className="flex flex-col items-center gap-2 text-center">
            <span className="text-4xl text-primary font-display italic">Et</span>
            <h1 className="text-2xl text-on-surface mt-2 font-medium font-display">Elite Touch Cafe</h1>
            <p className="text-xs text-on-surface-variant uppercase tracking-[0.2em] mt-1 font-semibold">Admin Portal</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Form Container */}
          <form className="flex flex-col gap-6 mt-2" onSubmit={handleLogin}>
            {/* Email Field */}
            <div className="flex flex-col gap-2 group">
              <label 
                className="text-xs text-on-surface-variant group-focus-within:text-primary transition-colors duration-200 uppercase tracking-widest font-semibold" 
                htmlFor="email"
              >
                Email Address
              </label>
              <input 
                className="w-full bg-transparent border-b border-outline-variant focus:border-primary text-on-surface py-2 px-0 outline-none transition-colors duration-200 placeholder:text-outline-variant/50" 
                id="email" 
                placeholder="admin@elitetouch.cafe" 
                required 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-2 group">
              <label 
                className="text-xs text-on-surface-variant group-focus-within:text-primary transition-colors duration-200 uppercase tracking-widest font-semibold" 
                htmlFor="password"
              >
                Password
              </label>
              <input 
                className="w-full bg-transparent border-b border-outline-variant focus:border-primary text-on-surface py-2 px-0 outline-none transition-colors duration-200" 
                id="password" 
                required 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Submit Action */}
            <button 
              className="mt-4 w-full bg-primary text-on-primary rounded py-4 px-8 text-xs font-semibold uppercase tracking-widest hover:opacity-90 hover:shadow-[0_4px_20px_rgb(0,6,102,0.15)] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer" 
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
              {!loading && <span className="material-symbols-outlined text-[18px]">arrow_forward</span>}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
