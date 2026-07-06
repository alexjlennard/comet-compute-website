import Link from "next/link";
import ClusterDiagram from "./ClusterDiagram";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* masked blueprint grid - structural, not a glow */}
      <div
        className="blueprint pointer-events-none absolute inset-0 opacity-40"
        style={{
          maskImage:
            "radial-gradient(120% 90% at 75% 15%, #000 0%, transparent 65%)",
          WebkitMaskImage:
            "radial-gradient(120% 90% at 75% 15%, #000 0%, transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-[88rem] px-6 lg:px-10">
        <div className="grid min-h-screen grid-cols-1 items-center gap-x-10 gap-y-16 pt-32 pb-20 lg:grid-cols-12">
          {/* Left - editorial copy, 7 cols, deliberately wider than the diagram */}
          <div className="lg:col-span-7">
            <div className="reveal is-visible flex items-center gap-4">
              <span className="label text-gold">Comet Compute</span>
              <span className="h-px w-12 bg-[color:var(--rule-strong)]" />
              <span className="label">Private GPU cloud</span>
            </div>

            <h1 className="serif mt-10 text-[3.5rem] leading-[0.9] tracking-[-0.02em] sm:text-[5.5rem] lg:text-[7rem]">
              Your GPUs.
              <br />
              Nobody else
              <br />
              <span className="serif-italic text-gold">on them.</span>
            </h1>

            <p className="measure mt-10 text-xl leading-relaxed text-fg-dim text-pretty">
              Single-tenant NVIDIA clusters, delivered as a managed Kubernetes
              and Slurm platform, or straight bare metal with root. No shared
              silicon. No metered surprises. No procurement theater.
            </p>

            <div className="mt-12 flex flex-col gap-x-8 gap-y-5 sm:flex-row sm:items-center">
              <Link
                href="#contact"
                className="group inline-flex items-center justify-center gap-2.5 bg-gold px-7 py-4 text-sm font-semibold tracking-tight text-[#0a0805] transition-colors hover:bg-gold-bright"
              >
                Spec your cluster
                <span className="mono transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                href="#hardware"
                className="link-grow inline-flex items-center gap-2 self-start text-sm text-fg-dim transition-colors hover:text-fg sm:self-auto"
              >
                <span className="mono text-gold">$</span> see the hardware
              </Link>
            </div>
          </div>

          {/* Right - the topology drawing, 5 cols, on a raised slab offset down */}
          <div className="lg:col-span-5 lg:translate-y-6">
            <figure className="relative border border-[color:var(--rule)] bg-ink-raised/60 p-6 sm:p-8">
              {/* corner registration ticks - like a technical print */}
              <Corner className="left-0 top-0" />
              <Corner className="right-0 top-0 rotate-90" />
              <Corner className="bottom-0 left-0 -rotate-90" />
              <Corner className="bottom-0 right-0 rotate-180" />
              <ClusterDiagram />
            </figure>
          </div>
        </div>
      </div>

      {/* Stat ledger - a single ruled row, not a 4-card grid */}
      <div className="relative border-y border-[color:var(--rule)]">
        <div className="mx-auto grid max-w-[88rem] grid-cols-2 px-6 lg:grid-cols-4 lg:px-10">
          {[
            { k: "Tenancy", v: "100%", note: "dedicated hardware" },
            { k: "Fabric", v: "800G", note: "XDR InfiniBand · NVLink" },
            { k: "Spares", v: "N+1", note: "hot standby nodes" },
            { k: "Support", v: "1:1", note: "named engineer" },
          ].map((s, i) => (
            <div
              key={s.k}
              className={`flex flex-col gap-1 py-8 ${
                i !== 0 ? "lg:border-l lg:border-[color:var(--rule)] lg:pl-8" : ""
              } ${i % 2 !== 0 ? "border-l border-[color:var(--rule)] pl-8 lg:pl-8" : ""}`}
            >
              <span className="label">{s.k}</span>
              <span className="serif text-4xl text-fg sm:text-5xl">{s.v}</span>
              <span className="mono text-xs text-fg-faint">{s.note}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Corner({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`absolute h-3 w-3 border-l border-t border-gold/50 ${className}`}
    />
  );
}
