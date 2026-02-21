"use client";

export default function SessionError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 text-center py-20">
      <h2 className="text-2xl font-bold text-red-400">
        Something went wrong
      </h2>

      <p className="text-slate-400 max-w-md">
        Antipas-ai couldn't load this session. It may have been deleted
        or the server is unavailable.
      </p>

      <button
        onClick={() => reset()}
        className="rounded-lg bg-cyan-500 px-6 py-2 font-semibold text-[#070B1A] hover:bg-cyan-400 transition"
      >
        Try Again
      </button>
    </div>
  );
}