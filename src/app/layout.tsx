import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Antipas-ai",
    template: "%s · Antipas-ai",
  },
  description:
    "Web-based AI producer platform for vocal enhancement, mix balance, performance coaching, and mastering.",
  applicationName: "Antipas-ai",
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL("http://localhost:3000"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-[#070B1A] text-slate-100 antialiased">
        {/* App background glow */}
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute bottom-[-240px] right-[-120px] h-[520px] w-[520px] rounded-full bg-purple-500/10 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070B1A] via-[#070B1A] to-[#050816]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.10),transparent_55%)]" />
        </div>

        {/* App frame */}
        <div className="min-h-screen">
          <header className="sticky top-0 z-40 border-b border-white/10 bg-[#070B1A]/70 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10">
                  <span className="text-sm font-semibold tracking-wide text-cyan-200">
                    A
                  </span>
                </div>
                <div>
                  <div className="text-sm font-semibold leading-4">
                    Antipas-ai
                  </div>
                  <div className="text-xs text-slate-400 leading-4">
                    Your personal AI producer
                  </div>
                </div>
              </div>

              <nav className="flex items-center gap-3">
                <a
                  href="#"
                  className="rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white"
                >
                  Projects
                </a>
                <a
                  href="#"
                  className="rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white"
                >
                  Help
                </a>
                <button className="rounded-lg bg-cyan-500/90 px-4 py-2 text-sm font-semibold text-[#070B1A] hover:bg-cyan-400">
                  Start Session
                </button>
              </nav>
            </div>
          </header>

          <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>

          <footer className="border-t border-white/10 py-10">
            <div className="mx-auto max-w-6xl px-4 text-xs text-slate-500">
              © {new Date().getFullYear()} Antipas-ai. Built for creators.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}