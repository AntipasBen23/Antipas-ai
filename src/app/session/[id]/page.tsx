"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type StageKey = "raw" | "mix" | "coach" | "master";

const STAGES: { key: StageKey; label: string; desc: string }[] = [
  { key: "raw", label: "1. Raw Enhancement", desc: "Clean + normalize + light correction." },
  { key: "mix", label: "2. Mix Balance", desc: "Vocal placement + tone + space." },
  { key: "coach", label: "3. Performance Coaching", desc: "Pitch/timing/energy notes." },
  { key: "master", label: "4. Mastering", desc: "Platform loudness + final polish." },
];

export default function SessionPage({ params }: { params: { id: string } }) {
  const projectId = params.id;

  // MVP: mock project state (replace later with API fetch)
  const project = useMemo(
    () => ({
      id: projectId,
      title: `Project ${projectId}`,
      genre: "Afrobeat",
      platform: "Spotify",
      style: "Punchy",
    }),
    [projectId]
  );

  const [stage, setStage] = useState<StageKey>("raw");
  const [variant, setVariant] = useState<"A" | "B">("A");
  const [mode, setMode] = useState<"minimal" | "full">("full");

  // MVP: placeholder audio URLs (wire these up when backend exists)
  const audioMap: Record<StageKey, { A?: string; B?: string; labelA: string; labelB: string }> = {
    raw: { A: undefined, B: undefined, labelA: "Raw", labelB: "Enhanced" },
    mix: { A: undefined, B: undefined, labelA: "Mix A", labelB: "Mix B" },
    coach: { A: undefined, B: undefined, labelA: "Current", labelB: "Corrected" },
    master: { A: undefined, B: undefined, labelA: "Master A", labelB: "Master B" },
  };

  const current = audioMap[stage];
  const currentSrc = variant === "A" ? current.A : current.B;

  const questions: Record<StageKey, { prompt: string; options: string[] }> = {
    raw: {
      prompt: "Does the vocal feel clear enough?",
      options: ["Brighter", "Warmer", "More natural", "Stronger correction"],
    },
    mix: {
      prompt: "How does the vocal sit in the mix?",
      options: ["Too forward", "Too buried", "Too sharp", "Too soft"],
    },
    coach: {
      prompt: "Coaching mode",
      options: ["Keep as is", "Light correction", "Strong correction", "Re-record"],
    },
    master: {
      prompt: "Pick export target",
      options: ["Spotify", "YouTube", "TikTok", "Apple Music"],
    },
  };

  const notes: Record<StageKey, string[]> = {
    raw: ["Noise reduction applied", "De-essing tuned for clarity", "Level normalized"],
    mix: ["Vocal placement adjusted", "Reverb matched to genre", "Masking check passed"],
    coach: [
      "Verse 2 has slight pitch drift",
      "Chorus energy dips slightly",
      "Try holding the last word longer for lift",
    ],
    master: ["Loudness target set for platform", "True-peak limiting applied", "Stereo width optimized"],
  };

  return (
    <div className="space-y-8">
      {/* Top bar */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs text-slate-400">
            <Link href="/dashboard" className="hover:text-white">
              Dashboard
            </Link>{" "}
            <span className="text-slate-600">/</span> Session {project.id}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">{project.title}</h1>
          <div className="text-sm text-slate-400">
            {project.genre} · {project.platform} · {project.style}
          </div>
        </div>

        <button className="rounded-lg bg-cyan-500 px-5 py-2 font-semibold text-[#070B1A] hover:bg-cyan-400 transition">
          Export
        </button>
      </div>

      {/* Stage tabs */}
      <div className="grid md:grid-cols-4 gap-3">
        {STAGES.map((s) => (
          <button
            key={s.key}
            onClick={() => {
              setStage(s.key);
              setVariant("A");
            }}
            className={`rounded-xl border p-4 text-left transition ${
              stage === s.key
                ? "border-cyan-400/40 bg-cyan-500/10"
                : "border-white/10 bg-white/5 hover:bg-white/10"
            }`}
          >
            <div className="font-semibold">{s.label}</div>
            <div className="text-xs text-slate-400 mt-1">{s.desc}</div>
          </button>
        ))}
      </div>

      {/* Workspace */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Player + A/B */}
        <div className="lg:col-span-2 rounded-xl border border-white/10 bg-white/5 p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">Playback</div>
              <div className="text-xs text-slate-400">
                A/B compare: {current.labelA} vs {current.labelB}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setVariant("A")}
                className={`rounded-lg px-3 py-2 text-sm border transition ${
                  variant === "A"
                    ? "bg-cyan-500 text-[#070B1A] border-cyan-300"
                    : "border-white/10 bg-[#0B1225] hover:bg-white/10"
                }`}
              >
                {current.labelA}
              </button>
              <button
                onClick={() => setVariant("B")}
                className={`rounded-lg px-3 py-2 text-sm border transition ${
                  variant === "B"
                    ? "bg-purple-500 text-white border-purple-400"
                    : "border-white/10 bg-[#0B1225] hover:bg-white/10"
                }`}
              >
                {current.labelB}
              </button>
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-[#0B1225] p-4">
            <audio className="w-full" controls src={currentSrc} />
            {!currentSrc && (
              <p className="mt-2 text-xs text-amber-300/90">
                No processed audio connected yet. Once backend jobs run, A/B will play real versions here.
              </p>
            )}
          </div>

          <div className="rounded-lg border border-white/10 bg-[#0B1225] p-4">
            <div className="text-sm font-semibold mb-2">What changed</div>
            <ul className="space-y-1 text-sm text-slate-300">
              {notes[stage].map((n) => (
                <li key={n} className="flex gap-2">
                  <span className="text-cyan-400">•</span>
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* AI Producer panel */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 space-y-5">
          <div>
            <div className="font-semibold">Antipas-ai Producer</div>
            <div className="text-xs text-slate-400">Guided refinement (non-technical).</div>
          </div>

          {stage === "coach" && (
            <div className="flex gap-2">
              <button
                onClick={() => setMode("minimal")}
                className={`rounded-lg px-3 py-2 text-xs border transition ${
                  mode === "minimal"
                    ? "bg-cyan-500 text-[#070B1A] border-cyan-300"
                    : "border-white/10 bg-[#0B1225] hover:bg-white/10"
                }`}
              >
                Minimal interruption
              </button>
              <button
                onClick={() => setMode("full")}
                className={`rounded-lg px-3 py-2 text-xs border transition ${
                  mode === "full"
                    ? "bg-purple-500 text-white border-purple-400"
                    : "border-white/10 bg-[#0B1225] hover:bg-white/10"
                }`}
              >
                Full coaching
              </button>
            </div>
          )}

          <div className="rounded-lg border border-white/10 bg-[#0B1225] p-4 space-y-3">
            <div className="text-sm font-semibold">{questions[stage].prompt}</div>
            <div className="flex flex-wrap gap-2">
              {questions[stage].options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => alert(`Selected: ${opt} (hook backend later)`)}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200 hover:bg-white/10 transition"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <button className="w-full rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-[#070B1A] hover:bg-cyan-400 transition">
            Refine this stage
          </button>

          <div className="text-xs text-slate-500">
            MVP note: this panel will later stream job status, version history, and conversational context.
          </div>
        </div>
      </div>
    </div>
  );
}