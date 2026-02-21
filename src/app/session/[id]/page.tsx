"use client";

import Link from "next/link";
import { useEffect, useMemo } from "react";
import VersionHistory from "@/components/VersionHistory";
import {
  StageKey,
  useSessionStore,
} from "@/lib/sessionStore";

const STAGES: { key: StageKey; label: string; desc: string }[] = [
  { key: "raw", label: "1. Raw Enhancement", desc: "Clean + normalize + light correction." },
  { key: "mix", label: "2. Mix Balance", desc: "Vocal placement + tone + space." },
  { key: "coach", label: "3. Performance Coaching", desc: "Pitch/timing/energy notes." },
  { key: "master", label: "4. Mastering", desc: "Platform loudness + final polish." },
];

const stageLabel: Record<StageKey, string> = {
  raw: "Raw Enhancement",
  mix: "Mix Balance",
  coach: "Performance Coaching",
  master: "Mastering",
};

export default function SessionPage({ params }: { params: { id: string } }) {
  const projectId = params.id;

  const meta = useSessionStore((s) => s.meta);
  const stage = useSessionStore((s) => s.stage);
  const activeVariant = useSessionStore((s) => s.activeVariant);

  const jobStatus = useSessionStore((s) => s.jobStatusByStage[stage]);
  const stageError = useSessionStore((s) => s.errorByStage[stage]);

  const versions = useSessionStore((s) => s.versions);
  const activeVersionId = useSessionStore((s) => s.activeVersionIdByStage[stage]);

  const setMeta = useSessionStore((s) => s.setMeta);
  const setStage = useSessionStore((s) => s.setStage);
  const setVariant = useSessionStore((s) => s.setVariant);
  const setJobStatus = useSessionStore((s) => s.setJobStatus);
  const setStageError = useSessionStore((s) => s.setStageError);
  const addVersion = useSessionStore((s) => s.addVersion);
  const setActiveVersion = useSessionStore((s) => s.setActiveVersion);
  const addMessage = useSessionStore((s) => s.addMessage);

  // Initialize meta once (replace later with API fetch)
  useEffect(() => {
    if (!meta) {
      setMeta({
        id: projectId,
        title: `Project ${projectId}`,
        genre: "Afrobeat",
        platform: "Spotify",
        style: "Punchy",
      });
    }
  }, [meta, projectId, setMeta]);

  // Find the currently selected version audio for this stage (optional until backend)
  const currentAudioUrl = useMemo(() => {
    if (!activeVersionId) return undefined;
    const v = versions.find((x) => x.id === activeVersionId);
    return v?.audioUrl;
  }, [activeVersionId, versions]);

  // For VersionHistory component (expects stage as a human string)
  const historyProps = useMemo(
    () =>
      versions.map((v) => ({
        id: v.id,
        label: v.label,
        stage: stageLabel[v.stage],
        createdAt: v.createdAt,
      })),
    [versions]
  );

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
      prompt: "Coaching actions",
      options: ["Keep as is", "Light correction", "Strong correction", "Re-record"],
    },
    master: {
      prompt: "Pick export target",
      options: ["Spotify", "YouTube", "TikTok", "Apple Music"],
    },
  };

  const refineStage = async () => {
    // Simulate backend job (queue -> processing -> done)
    setStageError(stage, undefined);
    setJobStatus(stage, "queued");

    addMessage({
      role: "assistant",
      stage,
      text: `Got it. I’m refining **${stageLabel[stage]}** now.`,
    });

    setTimeout(() => setJobStatus(stage, "processing"), 350);

    setTimeout(() => {
      // If you want to simulate failure sometimes, uncomment:
      // if (Math.random() < 0.15) { setStageError(stage, "Processing failed. Please retry."); return; }

      const id = `${stage}-${Date.now()}`;
      addVersion({
        id,
        stage,
        label: `${stageLabel[stage]} v${versions.filter((v) => v.stage === stage).length + 1}`,
        createdAt: "just now",
        // audioUrl will come from backend later
      });
      setJobStatus(stage, "done");
    }, 1400);
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
            <span className="text-slate-600">/</span> Session {projectId}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">{meta?.title ?? "Session"}</h1>
          <div className="text-sm text-slate-400">
            {meta ? `${meta.genre} · ${meta.platform} · ${meta.style}` : "Loading..."}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <VersionHistory
            versions={historyProps}
            onSelect={(id) => setActiveVersion(stage, id)}
          />
          <button className="rounded-lg bg-cyan-500 px-5 py-2 font-semibold text-[#070B1A] hover:bg-cyan-400 transition">
            Export
          </button>
        </div>
      </div>

      {/* Stage tabs */}
      <div className="grid md:grid-cols-4 gap-3">
        {STAGES.map((s) => (
          <button
            key={s.key}
            onClick={() => setStage(s.key)}
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
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="font-semibold">Playback</div>
              <div className="text-xs text-slate-400">
                Job:{" "}
                <span className="text-slate-200">
                  {jobStatus}
                  {stageError ? " (failed)" : ""}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setVariant("A")}
                className={`rounded-lg px-3 py-2 text-sm border transition ${
                  activeVariant === "A"
                    ? "bg-cyan-500 text-[#070B1A] border-cyan-300"
                    : "border-white/10 bg-[#0B1225] hover:bg-white/10"
                }`}
              >
                A
              </button>
              <button
                onClick={() => setVariant("B")}
                className={`rounded-lg px-3 py-2 text-sm border transition ${
                  activeVariant === "B"
                    ? "bg-purple-500 text-white border-purple-400"
                    : "border-white/10 bg-[#0B1225] hover:bg-white/10"
                }`}
              >
                B
              </button>
            </div>
          </div>

          {stageError && (
            <div className="rounded-lg border border-red-400/20 bg-red-500/10 p-3 text-sm text-red-200">
              {stageError}
            </div>
          )}

          <div className="rounded-lg border border-white/10 bg-[#0B1225] p-4">
            <audio className="w-full" controls src={currentAudioUrl} />
            {!currentAudioUrl && (
              <p className="mt-2 text-xs text-amber-300/90">
                No audio connected yet. When backend jobs return audio URLs, the active version will play here.
              </p>
            )}
          </div>

          <div className="rounded-lg border border-white/10 bg-[#0B1225] p-4">
            <div className="text-sm font-semibold mb-2">Active version</div>
            <div className="text-sm text-slate-300">
              {activeVersionId ? activeVersionId : "None (generate a version by refining)."}
            </div>
          </div>
        </div>

        {/* AI Producer panel */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 space-y-5">
          <div>
            <div className="font-semibold">Antipas-ai Producer</div>
            <div className="text-xs text-slate-400">Perceptual refinement, not engineering knobs.</div>
          </div>

          <div className="rounded-lg border border-white/10 bg-[#0B1225] p-4 space-y-3">
            <div className="text-sm font-semibold">{questions[stage].prompt}</div>
            <div className="flex flex-wrap gap-2">
              {questions[stage].options.map((opt) => (
                <button
                  key={opt}
                  onClick={() =>
                    addMessage({ role: "user", stage, text: opt })
                  }
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200 hover:bg-white/10 transition"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={refineStage}
            disabled={jobStatus === "queued" || jobStatus === "processing"}
            className="w-full rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-[#070B1A] hover:bg-cyan-400 transition disabled:opacity-50"
          >
            {jobStatus === "processing" || jobStatus === "queued"
              ? "Processing..."
              : "Refine this stage"}
          </button>

          <div className="text-xs text-slate-500">
            Backend integration later will replace the simulated timeouts with real job IDs + polling/streaming.
          </div>
        </div>
      </div>
    </div>
  );
}