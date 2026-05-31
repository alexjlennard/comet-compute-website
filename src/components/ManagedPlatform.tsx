import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

export default function ManagedPlatform() {
  const features = [
    {
      title: "Managed Kubernetes",
      description:
        "Production-grade Kubernetes with the GPU operator, drivers, and networking pre-configured. Deploy workloads with kubectl on day one.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
        </svg>
      ),
    },
    {
      title: "Managed Slurm",
      description:
        "A fully managed Slurm scheduler for HPC-style training jobs — queue, prioritize, and scale multi-node runs without standing up your own cluster.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
        </svg>
      ),
    },
    {
      title: "Pre-tuned ML stack",
      description:
        "CUDA, NCCL, drivers, and popular frameworks (PyTorch, vLLM, TensorRT-LLM) come installed and tuned for the interconnect — no environment setup.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
        </svg>
      ),
    },
    {
      title: "Observability built in",
      description:
        "GPU utilization, job metrics, and node health dashboards from the first login. See exactly what your training run is doing.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      ),
    },
  ];

  // Visual "stack" — what we manage so you don't have to.
  const stack = [
    { label: "Your training & inference workloads", managed: false },
    { label: "Managed Kubernetes & Slurm orchestration", managed: true },
    { label: "Pre-tuned CUDA, NCCL, drivers & frameworks", managed: true },
    { label: "High-speed InfiniBand / NVLink fabric", managed: true },
    { label: "Dedicated NVIDIA GPU servers", managed: true },
  ];

  return (
    <section id="managed" className="relative px-6 py-28 lg:py-36">
      <div className="mesh pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Copy + features */}
          <div>
            <SectionHeader
              index="04"
              kicker="Managed Platform"
              title={
                <>
                  Plug in and train
                  <br />
                  on day one.
                </>
              }
              lede="Anyone can hand you bare metal. We hand you a running platform — managed Kubernetes and Slurm, a pre-tuned ML stack, and observability, all ready before you log in."
            />

            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {features.map((feature, i) => (
                <Reveal key={feature.title} delay={(i % 2) * 90}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-400/10 text-amber-400">
                    {feature.icon}
                  </div>
                  <h3 className="font-display mt-4 text-base font-semibold">{feature.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#9a9384]">
                    {feature.description}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Stack visual */}
          <Reveal delay={120}>
            <div className="glass rounded-3xl p-6 sm:p-8">
              <div className="mb-5 flex items-center justify-between">
                <span className="kicker text-[#9a9384]">The full stack</span>
                <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-amber-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse-glow" />
                  Managed by Comet
                </span>
              </div>
              <div className="space-y-3">
                {stack.map((layer) => (
                  <div
                    key={layer.label}
                    className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 text-sm transition-colors ${
                      layer.managed
                        ? "border-amber-400/20 bg-amber-400/[0.06] text-amber-100"
                        : "border-dashed border-white/15 bg-white/[0.02] text-[#cfc8b8]"
                    }`}
                  >
                    {layer.managed ? (
                      <svg className="h-4 w-4 flex-shrink-0 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4 flex-shrink-0 text-[#9a9384]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    )}
                    <span>{layer.label}</span>
                    {!layer.managed && (
                      <span className="ml-auto text-xs text-[#9a9384]">You own this</span>
                    )}
                  </div>
                ))}
              </div>
              <p className="mt-5 text-xs leading-relaxed text-[#9a9384]">
                You bring the workload. We manage every layer beneath it — or hand you root
                access to the bare metal if you&apos;d rather run your own stack.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
