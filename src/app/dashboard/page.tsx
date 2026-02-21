"use client";

import Link from "next/link";

const mockProjects = [
  {
    id: "1",
    title: "Sunday Worship Cover",
    genre: "Gospel",
    updated: "2 hours ago",
    stage: "Mix Balance",
  },
  {
    id: "2",
    title: "Afrobeat Demo",
    genre: "Afrobeat",
    updated: "Yesterday",
    stage: "Mastering",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Your Projects</h1>
          <p className="text-slate-400 text-sm">
            Continue refining sessions with Antipas-ai.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/session/new"
            className="rounded-lg bg-cyan-500 px-5 py-2 font-semibold text-[#070B1A] hover:bg-cyan-400 transition"
          >
            + New Session
          </Link>
        </div>
      </div>

      {/* Projects Grid */}
      {mockProjects.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-10 text-center">
          <p className="text-slate-400 mb-4">No projects yet.</p>
          <Link
            href="/session/new"
            className="rounded-lg bg-cyan-500 px-6 py-2 font-semibold text-[#070B1A] hover:bg-cyan-400 transition"
          >
            Create Project
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {mockProjects.map((project) => (
            <Link
              key={project.id}
              href={`/session/${project.id}`}
              className="rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold text-lg">{project.title}</h3>
                <span className="text-xs text-cyan-300 bg-cyan-500/10 px-2 py-1 rounded-full border border-cyan-400/20">
                  {project.stage}
                </span>
              </div>

              <div className="mt-3 text-sm text-slate-400 space-y-1">
                <p>Genre: {project.genre}</p>
                <p>Last updated: {project.updated}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}