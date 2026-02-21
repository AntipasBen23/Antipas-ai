export default function SessionLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-6 w-48 rounded bg-white/10" />
      <div className="h-4 w-72 rounded bg-white/10" />

      <div className="grid md:grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-20 rounded-xl bg-white/5 border border-white/10"
          />
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-64 rounded-xl bg-white/5 border border-white/10" />
        <div className="h-64 rounded-xl bg-white/5 border border-white/10" />
      </div>
    </div>
  );
}