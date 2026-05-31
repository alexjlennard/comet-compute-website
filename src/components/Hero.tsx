import Link from "next/link";
import CometField from "./CometField";
import CountUp from "./CountUp";
import PingPongVideo from "./PingPongVideo";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20">
      {/* Background video */}
      <div className="pointer-events-none absolute inset-0">
        <PingPongVideo
          className="h-full w-full object-cover opacity-[0.35]"
          src="/assets/hero-loop.mp4"
          poster="/assets/rack-tall.png"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060504]/70 via-[#060504]/40 to-[#060504]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060504] via-transparent to-[#060504]" />
      </div>

      {/* Comet starfield */}
      <CometField />

      {/* Glow + grid */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(245,205,122,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(245,205,122,0.5) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 75%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <div className="animate-fade-in-up mb-6 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/5 px-4 py-1.5 text-sm text-amber-200/80 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse-glow" />
          Now deploying NVIDIA GB300 &amp; GB200 NVL72 clusters
        </div>

        <h1 className="animate-fade-in-up delay-100 text-balance text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
          Dedicated GPU Infrastructure
          <br />
          <span className="gradient-text">Built for AI at Scale</span>
        </h1>

        <p className="animate-fade-in-up delay-200 mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#b8b1a0] sm:text-xl">
          Single-tenant NVIDIA GPU servers with private deployments, predictable
          pricing, and zero noisy neighbors. Your AI workloads deserve infrastructure
          that performs.
        </p>

        <div className="animate-fade-in-up delay-300 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="#contact"
            className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-8 py-3.5 text-sm font-semibold text-[#1a1206] transition-all hover:from-amber-300 hover:to-amber-400 hover:shadow-lg hover:shadow-amber-500/25"
          >
            Deploy Your Cluster
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href="#platform"
            className="rounded-xl border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-medium backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10"
          >
            Explore Platform
          </Link>
        </div>

        {/* Stats */}
        <div className="animate-fade-in-up delay-500 mx-auto mt-20 grid max-w-3xl grid-cols-2 gap-8 border-t border-white/5 pt-10 sm:grid-cols-4">
          {[
            { node: <CountUp end={99.9} decimals={1} suffix="%" />, label: "Uptime SLA" },
            { node: <>100%</>, label: "Dedicated Hardware" },
            { node: <CountUp end={400} suffix="Gb/s" />, label: "Interconnect" },
            { node: <>24/7</>, label: "Expert Support" },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-2xl font-bold text-white sm:text-3xl">{stat.node}</div>
              <div className="mt-1 text-sm text-[#9a9384]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float text-amber-400/40">
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
