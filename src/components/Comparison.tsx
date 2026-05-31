import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

export default function Comparison() {
  const rows = [
    { feature: "Hardware Isolation", comet: "Fully dedicated", others: "Shared / multi-tenant" },
    { feature: "Orchestration", comet: "Managed K8s & Slurm", others: "DIY on bare metal" },
    { feature: "Pricing Model", comet: "Fixed monthly", others: "Complex metered billing" },
    { feature: "GPU Availability", comet: "Guaranteed capacity", others: "Waitlists & spot interruptions" },
    { feature: "Support", comet: "Dedicated engineer", others: "Ticket-based support" },
    { feature: "Network Egress", comet: "Included", others: "Per-GB charges" },
  ];

  return (
    <section className="relative py-28 px-6 lg:py-36">
      <div className="relative mx-auto max-w-5xl">
        <SectionHeader
          index="06"
          kicker="Why Comet"
          title="Not another hyperscaler."
          lede="Teams building AI deserve better than fighting for shared resources on legacy cloud platforms."
        />

        <Reveal className="glass mt-14 overflow-hidden rounded-2xl">
          <div className="grid grid-cols-3 border-b border-white/5 px-6 py-4 text-sm font-medium">
            <div className="text-[#9a9384]">Feature</div>
            <div className="text-center text-amber-400">Comet Compute</div>
            <div className="text-center text-[#9a9384]">Hyperscalers</div>
          </div>
          {rows.map((row, i) => (
            <div
              key={row.feature}
              className={`grid grid-cols-3 px-6 py-4 text-sm transition-colors hover:bg-amber-400/[0.03] ${
                i < rows.length - 1 ? "border-b border-white/5" : ""
              }`}
            >
              <div className="font-medium">{row.feature}</div>
              <div className="flex items-center justify-center gap-1.5 text-center text-white">
                <svg className="h-4 w-4 flex-shrink-0 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                {row.comet}
              </div>
              <div className="text-center text-[#9a9384]">{row.others}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
