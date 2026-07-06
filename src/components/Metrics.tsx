import Reveal from "./Reveal";

export default function Metrics() {
  const metrics = [
    { value: "9,552", label: "GPUs deployed", sub: "estimated by end of 2026" },
    { value: "84 PB", label: "NVMe storage deployed", sub: "DDN EXAScaler · Lustre" },
    { value: "800G", label: "Per-GPU fabric", sub: "non-blocking Quantum-3 XDR" },
    { value: "50k+", label: "Healthcare endpoints", sub: "clinics and offices reached" },
  ];

  return (
    <section id="numbers" className="relative overflow-hidden bg-paper px-6 py-28 text-paper-ink lg:px-10 lg:py-36">
      <div className="mx-auto max-w-[88rem]">
        <div className="flex items-baseline gap-4 border-b border-paper-ink/15 pb-4">
          <span className="mono text-sm" style={{ color: "#9a6a14" }}>
            05
          </span>
          <span className="label text-paper-ink/55">By the numbers</span>
        </div>

        <Reveal className="mt-10">
          <h2 className="serif max-w-3xl text-5xl leading-[0.95] text-paper-ink sm:text-7xl">
            Proof, <span className="serif-italic" style={{ color: "#9a6a14" }}>not</span> promises.
          </h2>
        </Reveal>

        {/* Big serif figures on a baseline, ruled like a financial table */}
        <div className="mt-20 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <Reveal
              key={m.label}
              delay={i * 70}
              className="border-t-2 border-paper-ink/80 pt-5"
            >
              <div className="serif text-[4.5rem] leading-none text-paper-ink sm:text-[5.5rem]">
                {m.value}
              </div>
              <div className="mt-6 text-sm font-semibold text-paper-ink">{m.label}</div>
              <div className="mono mt-1 text-xs" style={{ color: "#6b6044" }}>
                {m.sub}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
