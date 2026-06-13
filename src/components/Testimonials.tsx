import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

export default function Testimonials() {
  const quotes = [
    {
      quote:
        "Comet got us a dedicated GB300 cluster while we'd been stuck on a hyperscaler waitlist for months. The difference on multi-node training was night and day.",
      name: "Dr. Sarah Chen",
      title: "VP, ML Infrastructure",
      company: "Frontier Health AI",
    },
    {
      quote:
        "Single-tenant hardware means our runs are perfectly reproducible. No noisy neighbors, no surprise throttling. The fixed monthly cost made budgeting trivial.",
      name: "Marcus Webb",
      title: "Co-founder & CTO",
      company: "Vellum Labs",
    },
    {
      quote:
        "Their team understands HIPAA at a depth no cloud provider matched. The BAA was signed before we finished scoping. That's why our clinical workloads moved over.",
      name: "Priya Nair",
      title: "Head of Engineering",
      company: "Oncos Diagnostics",
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
                <div className="mono mt-1 text-xs text-fg-faint">
                  {q.title} · {q.company}
                </div>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
