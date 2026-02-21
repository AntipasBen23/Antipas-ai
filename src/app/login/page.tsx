"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // TODO: Connect to backend login endpoint
    setTimeout(() => {
      setLoading(false);
      alert("Login logic not connected yet.");
    }, 1000);
  };

  return (
    <div className="mx-auto max-w-md space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Welcome Back</h1>
        <p className="text-slate-400 text-sm">
          Continue your session with Antipas-ai.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur"
      >
        <div className="space-y-2">
          <label className="text-sm text-slate-300">Email</label>
          <input
            type="email"
            required
            className="w-full rounded-lg border border-white/10 bg-[#0B1225] px-4 py-2 text-sm outline-none focus:border-cyan-400"
            placeholder="you@example.com"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-slate-300">Password</label>
          <input
            type="password"
            required
            className="w-full rounded-lg border border-white/10 bg-[#0B1225] px-4 py-2 text-sm outline-none focus:border-cyan-400"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-cyan-500 py-2 font-semibold text-[#070B1A] hover:bg-cyan-400 transition disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Login"}
        </button>

        <div className="text-center text-sm text-slate-400">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-cyan-400 hover:underline">
            Create one
          </Link>
        </div>
      </form>
    </div>
  );
}