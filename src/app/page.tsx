"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-4 py-1 text-xs font-medium text-cyan-300 ring-1 ring-cyan-400/20">
          Antipas-ai
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
          Your Personal <span className="text-cyan-400">AI Producer</span>
        </h1>

        <p className="mx-auto max-w-2xl text-slate-400 text-lg">
          Record or upload your vocals. Get studio-quality enhancement,
          intelligent mix refinement, performance coaching, and mastering —
          all guided step-by-step.
        </p>

        <div className="flex justify-center gap-4 pt-4">
          <Link
            href="/signup"
            className="rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-[#070B1A] hover:bg-cyan-400 transition"
          >
            Start Session
          </Link>

          <Link
            href="/login"
            className="rounded-lg border border-white/10 px-6 py-3 text-slate-300 hover:bg-white/5 transition"
          >
            Login
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="grid md:grid-cols-4 gap-8">
        {[
          {
            title: "1. Upload / Record",
            desc: "Upload vocals or record directly in your browser.",
          },
          {
            title: "2. Enhance & Mix",
            desc: "AI cleans, balances, and refines your track with A/B comparison.",
          },
          {
            title: "3. Performance Coaching",
            desc: "Get intelligent feedback on pitch, timing, and energy.",
          },
          {
            title: "4. Master & Export",
            desc: "Platform-ready loudness and final studio polish.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur"
          >
            <h3 className="font-semibold text-white mb-2">{item.title}</h3>
            <p className="text-sm text-slate-400">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Final CTA */}
      <section className="text-center space-y-6">
        <h2 className="text-2xl md:text-3xl font-semibold">
          Create studio-ready music without studio friction.
        </h2>

        <Link
          href="/signup"
          className="inline-block rounded-lg bg-purple-500 px-8 py-3 font-semibold text-white hover:bg-purple-400 transition"
        >
          Create Free Account
        </Link>
      </section>
    </div>
  );
}