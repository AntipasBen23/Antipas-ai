"use client";

import { useState } from "react";
import Recorder from "@/components/Recorder";

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
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const canStart =
    selectedGenre && selectedPlatform && selectedStyle && fileName;

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Start New Session</h1>
        <p className="text-slate-400 text-sm">
          Upload or record your vocals and let Antipas-ai begin production.
        </p>
      </div>

{/* Upload Section */}
<div className="space-y-6">
  <div className="rounded-xl border border-white/10 bg-white/5 p-6 space-y-4">
    <h2 className="font-semibold">Upload File</h2>

    <input
      type="file"
      accept=".wav,.mp3,.aiff"
      onChange={(e) =>
        setFileName(e.target.files?.[0]?.name || null)
      }
      className="block w-full text-sm text-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-cyan-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#070B1A] hover:file:bg-cyan-400"
    />

    {fileName && (
      <p className="text-sm text-cyan-400">
        Selected: {fileName}
      </p>
    )}
  </div>

  <Recorder
    onRecordingComplete={(blob) => {
      setFileName("Recorded Vocal");
      console.log("Recorded blob:", blob);
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
                  ? "bg-cyan-500 text-[#070B1A] border-cyan-400"
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
      <div>
        <button
          disabled={!canStart}
          className="rounded-lg bg-cyan-500 px-8 py-3 font-semibold text-[#070B1A] hover:bg-cyan-400 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Start Production
        </button>
      </div>
    </div>
  );
}