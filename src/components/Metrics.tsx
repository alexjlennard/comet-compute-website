import Reveal from "./Reveal";
import CountUp from "./CountUp";

export default function Metrics() {
  const metrics = [
    { value: <CountUp end={12} suffix="k+" />, label: "GPUs under management", sub: "Across owned and partner facilities" },
    { value: <CountUp end={99.9} decimals={1} suffix="%" />, label: "Measured uptime", sub: "Trailing 12-month average" },
    { value: <CountUp end={50} suffix="k+" />, label: "Healthcare endpoints", sub: "Clinics and medical offices reached" },
    { value: <CountUp end={400} suffix="Gb/s" />, label: "Node interconnect", sub: "InfiniBand and NVLink fabric" },
  ];

  return (
    <section className="relative overflow-hidden bg-[var(--bone)] px-6 py-28 text-[var(--bone-ink)] lg:py-32">
      {/* subtle warm texture on the light section */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(60% 60% at 80% 0%, rgba(232,177,76,0.18), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl">
        <Reveal className="flex items-center gap-3">
          <span className="kicker" style={{ color: "#9a6a14" }}>02</span>
          <span className="h-px w-8" style={{ background: "rgba(20,17,10,0.25)" }} />
          <span className="kicker" style={{ color: "#7a6f56" }}>By the numbers</span>
        </Reveal>

        <Reveal className="mt-5 max-w-3xl">
          <h2 className="display-lg text-4xl text-[var(--bone-ink)] sm:text-5xl">
            Proof, not promises.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <Reveal key={i} delay={i * 90} className="border-t border-[var(--bone-ink)]/15 pt-6">
              <div className="display-xl text-6xl text-[var(--bone-ink)] sm:text-7xl">
                {m.value}
              </div>
              <div className="mt-5 text-sm font-semibold text-[var(--bone-ink)]">{m.label}</div>
              <div className="mt-1 text-sm text-[#6b6044]">{m.sub}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
