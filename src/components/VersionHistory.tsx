"use client";

import { useState } from "react";

type Version = {
  id: string;
  label: string;
  stage: string;
  createdAt: string;
};

type Props = {
  versions: Version[];
  onSelect: (id: string) => void;
};

export default function VersionHistory({
  versions,
  onSelect,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg border border-white/10 px-3 py-2 text-sm hover:bg-white/10 transition"
      >
        Version History
      </button>

      {/* Drawer */}
      {open && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50"
            onClick={() => setOpen(false)}
          />

          <div className="w-80 bg-[#0B1225] border-l border-white/10 p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Version History</h3>
              <button
                onClick={() => setOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              {versions.length === 0 ? (
                <p className="text-sm text-slate-400">
                  No versions yet.
                </p>
              ) : (
                versions.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => {
                      onSelect(v.id);
                      setOpen(false);
                    }}
                    className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-left hover:bg-white/10 transition"
                  >
                    <div className="text-sm font-medium">
                      {v.label}
                    </div>
                    <div className="text-xs text-slate-400">
                      {v.stage} · {v.createdAt}
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}