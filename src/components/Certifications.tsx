import Reveal from "./Reveal";

export default function Certifications() {
  const certs = [
    { label: "SOC 2 Type II", desc: "Audited security controls" },
    { label: "HIPAA", desc: "Healthcare-ready, BAA available" },
    { label: "ISO 27001", desc: "Information security management" },
    { label: "99.9% SLA", desc: "Contractual uptime guarantee" },
  ];

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <Reveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {certs.map((c) => (
            <div
              key={c.label}
              className="flex items-center gap-3 rounded-xl border border-white/5 bg-[#0c0a07] px-5 py-4"
            >
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-amber-400/10 text-amber-400">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </span>
              <div>
                <div className="text-sm font-semibold text-white">{c.label}</div>
                <div className="text-xs text-[#9a9384]">{c.desc}</div>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
