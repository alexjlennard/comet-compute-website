import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

const features = [
  {
    n: "01",
    title: "Single-tenant by default",
    body: "Your workloads run on hardware allocated to you alone. No shared GPUs, no contention, no surprise throttling from a neighbor's training run. Deterministic performance, every run.",
    wide: true,
  },
  {
    n: "02",
    title: "Fixed monthly price",
    body: "One number, agreed up front. No metered billing, no egress fees, no line-item archaeology at the end of the month.",
  },
  {
    n: "03",
    title: "400G interconnect",
    body: "InfiniBand and NVLink fabric for multi-node training at full throughput — gradients move at line rate.",
  },
  {
    n: "04",
    title: "Yours in days, not quarters",
    body: "We handle provisioning, networking, and bring-up. Skip the procurement cycle entirely — you train this month, not next year.",
  },
  {
    n: "05",
    title: "A human who knows your stack",
    body: "A named solutions engineer who's seen your workload. Direct line, not a ticket queue and a four-hour SLA.",
  },
  {
    n: "06",
    title: "Isolation that survives an audit",
    body: "SOC 2 controls, private networking, encryption at rest and in transit. Your silicon is never shared with another org.",
  },
];

export default function Platform() {
  return (
    <section id="platform" className="relative px-6 py-28 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-[88rem]">
        <SectionHeader
          index="01"
          kicker="The platform"
          title={
            <>
              Infrastructure that
              <br />
              doesn&apos;t <span className="serif-italic text-gold">compromise.</span>
            </>
          }
          lede="Purpose-built GPU clusters for AI training and inference. Every layer engineered, not assembled from whatever the hyperscaler had spare."
        />

        {/* Ledger grid — rules instead of cards, asymmetric first row */}
        <div className="mt-20 grid grid-cols-1 border-t border-[color:var(--rule)] md:grid-cols-3">
          {features.map((f, i) => (
            <Reveal
              key={f.n}
              delay={(i % 3) * 70}
              className={`group relative border-b border-[color:var(--rule)] p-8 transition-colors hover:bg-ink-raised/50 md:border-r lg:p-10 ${
                f.wide ? "md:col-span-1" : ""
              } ${i % 3 !== 2 ? "" : "md:border-r-0"}`}
            >
              <span className="mono text-xs text-gold">{f.n}</span>
              <h3 className="serif mt-6 text-2xl text-fg lg:text-[1.75rem]">{f.title}</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-fg-dim">{f.body}</p>
              {/* hover rule that grows under the heading */}
              <span className="absolute bottom-0 left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
