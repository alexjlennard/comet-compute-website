import Reveal from "./Reveal";

export default function Testimonials() {
  const quotes = [
    {
      quote:
        "Comet got us a dedicated GB300 cluster while we'd been stuck on a hyperscaler waitlist for months. The performance difference on multi-node training was night and day.",
      name: "Dr. Sarah Chen",
      title: "VP of ML Infrastructure",
      company: "Frontier Health AI",
      initials: "SC",
    },
    {
      quote:
        "Single-tenant hardware means our training runs are perfectly reproducible. No noisy neighbors, no surprise throttling. The predictable monthly cost made budgeting trivial.",
      name: "Marcus Webb",
      title: "Co-founder & CTO",
      company: "Vellum Labs",
      initials: "MW",
    },
    {
      quote:
        "Their team understands HIPAA at a depth we hadn't seen from any cloud provider. The BAA was signed before we even finished scoping. That's why we moved our clinical workloads over.",
      name: "Priya Nair",
      title: "Head of Engineering",
      company: "Oncos Diagnostics",
      initials: "PN",
    },
  ];

  return (
    <section className="relative py-32 px-6">
      <div className="relative mx-auto max-w-7xl">
        <Reveal className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-amber-400">Customers</p>
          <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            Trusted by teams shipping AI
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#9a9384]">
            From clinical AI to frontier model training, teams choose Comet when performance and predictability matter.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {quotes.map((q, i) => (
            <Reveal
              key={q.name}
              delay={i * 100}
              className="flex flex-col rounded-2xl border border-white/5 bg-[#100e0a] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/20"
            >
              <svg className="h-8 w-8 text-amber-400/40" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
              </svg>
              <p className="mt-5 flex-1 text-[15px] leading-relaxed text-[#cfc8b8]">
                &ldquo;{q.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-white/5 pt-6">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400/20 to-rose-400/10 text-sm font-semibold text-amber-200">
                  {q.initials}
                </div>
                <div>
                  <div className="text-sm font-medium text-white">{q.name}</div>
                  <div className="text-xs text-[#9a9384]">
                    {q.title}, {q.company}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
