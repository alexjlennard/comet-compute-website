import Link from "next/link";
import CometField from "./CometField";
import CountUp from "./CountUp";
import PingPongVideo from "./PingPongVideo";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Atmosphere */}
      <CometField />
      <div className="mesh pointer-events-none absolute inset-0" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(rgba(245,205,122,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(245,205,122,0.4) 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse 90% 70% at 30% 30%, #000 20%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 70% at 30% 30%, #000 20%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-28 pb-12 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left: editorial copy */}
          <div className="lg:col-span-7">
            <div className="animate-fade-in-up flex items-center gap-3">
              <span className="kicker">Comet Compute</span>
              <span className="h-px w-10 bg-amber-400/50" />
              <span className="kicker text-[#9a9384]">Neocloud for AI</span>
            </div>

            <h1 className="animate-fade-in-up delay-100 display-xl mt-7 text-[3.25rem] sm:text-7xl lg:text-[5.5rem]">
              Dedicated GPUs.
              <br />
              <span className="text-amber-400">Zero</span> noisy
              <br />
              neighbors.
            </h1>

            <p className="animate-fade-in-up delay-200 mt-8 max-w-xl text-lg leading-relaxed text-[#b8b1a0]">
              Single-tenant NVIDIA clusters with managed Kubernetes, predictable
              pricing, and a stack that&apos;s tuned before you log in. Plug in and
              train on day one.
            </p>

            <div className="animate-fade-in-up delay-300 mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="#contact"
                className="group flex items-center justify-center gap-2 rounded-full bg-amber-400 px-7 py-3.5 text-sm font-semibold text-[#1a1206] transition-all hover:bg-amber-300 hover:shadow-[0_0_50px_-12px_rgba(232,177,76,0.8)]"
              >
                Deploy your cluster
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="#platform"
                className="flex items-center justify-center rounded-full border border-white/15 px-7 py-3.5 text-sm font-medium text-[#f5f3ee] transition-all hover:border-amber-400/40 hover:bg-white/5"
              >
                Explore the platform
              </Link>
            </div>
          </div>

          {/* Right: framed live video panel */}
          <div className="animate-fade-in-up delay-300 lg:col-span-5">
            <div className="glass relative overflow-hidden rounded-2xl">
              <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse-glow" />
                  <span className="kicker text-[#9a9384]">cluster · live</span>
                </div>
                <span className="font-mono text-[11px] text-[#6f6857]">GB300 NVL72</span>
              </div>
              <div className="relative aspect-[4/5]">
                <PingPongVideo
                  className="h-full w-full object-cover"
                  src="/assets/hero-loop.mp4"
                  poster="/assets/rack-tall.png"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#100e0a] via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-3 font-mono text-[11px] text-[#cfc8b8]">
                  <span>72 GPU · NVLink 5</span>
                  <span className="text-amber-400">● online</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width stat bar */}
        <div className="animate-fade-in-up delay-500 mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/5 bg-white/[0.04] sm:grid-cols-4">
          {[
            { node: <CountUp end={99.9} decimals={1} suffix="%" />, label: "Uptime SLA" },
            { node: <>100%</>, label: "Dedicated hardware" },
            { node: <CountUp end={400} suffix="Gb/s" />, label: "Interconnect" },
            { node: <>24/7</>, label: "Expert support" },
          ].map((stat, i) => (
            <div key={i} className="bg-[#0b0a07] px-6 py-7">
              <div className="display-lg text-3xl text-white sm:text-4xl">{stat.node}</div>
              <div className="kicker mt-2 text-[#7a7464]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
