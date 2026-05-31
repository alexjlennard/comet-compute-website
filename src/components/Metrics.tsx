import Reveal from "./Reveal";
import CountUp from "./CountUp";

export default function Metrics() {
  const metrics = [
    { value: <CountUp end={12} suffix="k+" />, label: "GPUs under management", sub: "Across owned and partner facilities" },
    { value: <CountUp end={99.9} decimals={1} suffix="%" />, label: "Measured uptime", sub: "Trailing 12-month average" },
    { value: <CountUp end={50} suffix="k+" />, label: "Healthcare endpoints", sub: "Clinics and medical offices in network" },
    { value: <CountUp end={400} suffix="Gb/s" />, label: "Node interconnect", sub: "InfiniBand and NVLink fabric" },
  ];

  return (
    <section className="relative py-24 px-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/[0.06] blur-[120px]" />
      </div>
      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-px overflow-hidden rounded-3xl border border-amber-400/10 bg-amber-400/5 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <Reveal
              key={i}
              delay={i * 80}
              className="bg-[#0c0a07] p-8 text-center"
            >
              <div className="gradient-text text-4xl font-bold sm:text-5xl">{m.value}</div>
              <div className="mt-3 text-sm font-medium text-white">{m.label}</div>
              <div className="mt-1 text-xs text-[#9a9384]">{m.sub}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
