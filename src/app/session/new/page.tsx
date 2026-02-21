"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Recorder from "@/components/Recorder";
import { useSessionStore } from "@/lib/sessionStore";

const genres = [
  "Gospel",
  "Afrobeat",
  "Pop",
  "Hip-Hop",
  "R&B",
  "Jazz",
  "Country",
  "Rock",
  "EDM",
  "Alternative",
  "Worship",
  "Other",
];

const platforms = ["Spotify", "YouTube", "TikTok", "Apple Music"];
const styles = ["Clean", "Warm", "Punchy", "Spacious"];

export default function NewSessionPage() {
  const router = useRouter();

  const resetSession = useSessionStore((s) => s.resetSession);
  const setMeta = useSessionStore((s) => s.setMeta);

  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

  const [fileName, setFileName] = useState<string | null>(null);
  const [sourceType, setSourceType] = useState<"upload" | "record" | null>(null);

  const canStart = Boolean(
    selectedGenre && selectedPlatform && selectedStyle && fileName && sourceType
  );

  const generatedId = useMemo(() => {
    // simple client-side id for now; backend will return real ID later
    return `local-${Date.now().toString(36)}-${Math.random().toString(16).slice(2)}`;
  }, []);

  const startProduction = () => {
    if (!canStart) return;

    // Reset store to clean slate for the new session
    resetSession();

    setMeta({
      id: generatedId,
      title: "Untitled Session",
      genre: selectedGenre!,
      platform: selectedPlatform!,
      style: selectedStyle!,
    });

    router.push(`/session/${generatedId}`);
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Start New Session</h1>
        <p className="text-slate-400 text-sm">
          Upload or record your vocals and let Antipas-ai begin production.
        </p>
      </div>

      {/* Upload + Record */}
      <div className="space-y-6">
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-semibold">Add Audio</h2>
            {fileName && (
              <span className="text-xs text-cyan-300 bg-cyan-500/10 px-2 py-1 rounded-full border border-cyan-400/20">
                {sourceType === "upload" ? "Uploaded" : "Recorded"}
              </span>
            )}
          </div>

          <input
            type="file"
            accept=".wav,.mp3,.aiff"
            onChange={(e) => {
              const name = e.target.files?.[0]?.name || null;
              setFileName(name);
              if (name) setSourceType("upload");
            }}
            className="block w-full text-sm text-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-cyan-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#070B1A] hover:file:bg-cyan-400"
          />

          {fileName && (
            <p className="text-sm text-cyan-400">Selected: {fileName}</p>
          )}

          <p className="text-xs text-slate-500">
            Tip: For best results, upload vocals and beat separately (vocal + instrumental).
          </p>
        </div>

        <Recorder
          onRecordingComplete={() => {
            setFileName("Recorded Vocal");
            setSourceType("record");
          }}
        />
      </div>

      {/* Genre Selection */}
      <div className="space-y-3">
        <h2 className="font-semibold">Select Genre *</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`rounded-lg border px-4 py-2 text-sm transition ${
                selectedGenre === genre
                  ? "bg-cyan-500 text-[#070B1A] border-cyan-300"
                  : "border-white/10 bg-white/5 hover:bg-white/10"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Platform Selection */}
      <div className="space-y-3">
        <h2 className="font-semibold">Target Platform *</h2>
        <div className="flex flex-wrap gap-3">
          {platforms.map((platform) => (
            <button
              key={platform}
              onClick={() => setSelectedPlatform(platform)}
              className={`rounded-lg border px-4 py-2 text-sm transition ${
                selectedPlatform === platform
                  ? "bg-purple-500 text-white border-purple-400"
                  : "border-white/10 bg-white/5 hover:bg-white/10"
              }`}
            >
              {platform}
            </button>
          ))}
        </div>
      </div>

      {/* Style Selection */}
      <div className="space-y-3">
        <h2 className="font-semibold">Sonic Style *</h2>
        <div className="flex flex-wrap gap-3">
          {styles.map((style) => (
            <button
              key={style}
              onClick={() => setSelectedStyle(style)}
              className={`rounded-lg border px-4 py-2 text-sm transition ${
                selectedStyle === style
                  ? "bg-cyan-400 text-[#070B1A] border-cyan-300"
                  : "border-white/10 bg-white/5 hover:bg-white/10"
              }`}
            >
              {style}
            </button>
          ))}
        </div>
      </div>

      {/* Start Button */}
      <div className="space-y-2">
        <button
          onClick={startProduction}
          disabled={!canStart}
          className="rounded-lg bg-cyan-500 px-8 py-3 font-semibold text-[#070B1A] hover:bg-cyan-400 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Start Production
        </button>

        {!canStart && (
          <p className="text-xs text-slate-500">
            Select genre, platform, style, and upload/record audio to continue.
          </p>
        )}
      </div>
    </div>
  );
}