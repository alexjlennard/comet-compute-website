import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

export default function Testimonials() {
  const quotes = [
    {
      quote:
        "Comet got us a dedicated GB300 cluster while we were still sitting on a hyperscaler waitlist. Multi-node training just worked, from the first run.",
      name: "VP, ML Infrastructure",
      title: "Healthcare AI company",
    },
    {
      quote:
        "Single-tenant hardware means our runs are perfectly reproducible. No noisy neighbors, no surprise throttling. The fixed monthly cost made budgeting trivial.",
      name: "Co-founder & CTO",
      title: "AI startup",
    },
    {
      quote:
        "Their team understands HIPAA at a depth no cloud provider matched. The BAA was signed before we finished scoping. That's why our clinical workloads moved over.",
      name: "Head of Engineering",
      title: "Clinical diagnostics company",
    },
  ];

  return (
    <section className="relative border-t border-[color:var(--rule)] px-6 py-28 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-[88rem]">
        <SectionHeader
          index="07"
          kicker="In the field"
          title={
            <>
              What teams say
              <br />
              once they&apos;ve <span className="serif-italic text-gold">moved.</span>
            </>
          }
        />

        <div className="mt-20 grid gap-px border-t border-[color:var(--rule)] lg:grid-cols-3">
          {quotes.map((q, i) => (
            <Reveal
              key={q.name}
              delay={i * 90}
              className={`flex flex-col justify-between p-8 lg:p-10 ${
                i !== 0 ? "border-t border-[color:var(--rule)] lg:border-l lg:border-t-0" : ""
              }`}
            >
              <blockquote className="serif text-2xl leading-snug text-fg lg:text-[1.6rem]">
                {q.quote}
              </blockquote>
              <figcaption className="mt-10 border-t border-[color:var(--rule)] pt-5">
                <div className="text-sm text-fg">{q.name}</div>
                <div className="mono mt-1 text-xs text-fg-faint">{q.title}</div>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
