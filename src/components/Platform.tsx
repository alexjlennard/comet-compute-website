import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

const iconCls = "h-6 w-6";

export default function Platform() {
  return (
    <section id="platform" className="relative px-6 py-28 lg:py-36">
      <div className="relative mx-auto max-w-7xl">
        <SectionHeader
          index="01"
          kicker="Platform"
          title={
            <>
              Infrastructure that
              <br />
              doesn&apos;t compromise.
            </>
          }
          lede="Purpose-built GPU clusters for modern AI training and inference — every layer engineered, not assembled."
        />

        {/* Bento grid: asymmetric, varied cell sizes */}
        <div className="mt-14 grid auto-rows-[minmax(0,1fr)] grid-cols-1 gap-4 md:grid-cols-6">
          {/* Hero cell — dedicated hardware, spans wide + tall */}
          <Reveal className="glass glass-hover dot-grid edge-top group relative flex flex-col justify-between overflow-hidden rounded-2xl p-8 md:col-span-4 md:row-span-2 md:min-h-[340px]">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl transition-opacity group-hover:opacity-150" />
            <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400">
              <svg viewBox="0 0 24 24" className={iconCls} fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3" />
              </svg>
            </div>
            <div className="relative mt-8">
              <h3 className="display-lg text-2xl sm:text-3xl">Single-tenant by default</h3>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[#9a9384]">
                Your workloads run on hardware allocated exclusively to you. No
                shared GPUs, no contention, no surprise throttling from a neighbor&apos;s
                training run. Just deterministic performance, every time.
              </p>
            </div>
          </Reveal>

          {/* Predictable pricing — tall narrow */}
          <Reveal
            delay={80}
            className="glass glass-hover group relative flex flex-col justify-between overflow-hidden rounded-2xl p-7 md:col-span-2 md:row-span-2"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400">
              <svg viewBox="0 0 24 24" className={iconCls} fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
              </svg>
            </div>
            <div className="mt-8">
              <div className="font-mono text-4xl font-semibold text-amber-400">$/mo</div>
              <h3 className="mt-4 text-lg font-semibold">Predictable pricing</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#9a9384]">
                Fixed monthly cost. No metered surprises, no egress fees.
              </p>
            </div>
          </Reveal>

          {/* Interconnect — wide short */}
          <Reveal
            delay={120}
            className="glass glass-hover group relative flex items-center gap-5 overflow-hidden rounded-2xl p-7 md:col-span-3"
          >
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400">
              <svg viewBox="0 0 24 24" className={iconCls} fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-semibold">400Gb/s interconnect</h3>
              <p className="mt-1 text-sm leading-snug text-[#9a9384]">
                InfiniBand + NVLink fabric for multi-node training at full throughput.
              </p>
            </div>
          </Reveal>

          {/* Security — wide short */}
          <Reveal
            delay={160}
            className="glass glass-hover group relative flex items-center gap-5 overflow-hidden rounded-2xl p-7 md:col-span-3"
          >
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400">
              <svg viewBox="0 0 24 24" className={iconCls} fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-semibold">Enterprise security</h3>
              <p className="mt-1 text-sm leading-snug text-[#9a9384]">
                SOC 2 controls, private networking, encryption at rest and in transit.
              </p>
            </div>
          </Reveal>

          {/* Onboarding — medium */}
          <Reveal
            delay={120}
            className="glass glass-hover group relative overflow-hidden rounded-2xl p-7 md:col-span-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400">
              <svg viewBox="0 0 24 24" className={iconCls} fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            </div>
            <h3 className="mt-5 text-base font-semibold">Streamlined onboarding</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#9a9384]">
              We handle provisioning, networking, and setup — skip the months-long
              procurement cycle entirely.
            </p>
          </Reveal>

          {/* Support — medium */}
          <Reveal
            delay={160}
            className="glass glass-hover group relative overflow-hidden rounded-2xl p-7 md:col-span-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400">
              <svg viewBox="0 0 24 24" className={iconCls} fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="mt-5 text-base font-semibold">White-glove support</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#9a9384]">
              A dedicated solutions engineer who knows your workloads. Direct access,
              not a ticket queue.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
