import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

export default function ManagedPlatform() {
  // What we manage, bottom-up. The top layer is yours.
  const stack = [
    { label: "Your training & inference workloads", owner: "you" },
    { label: "Managed Kubernetes & Slurm orchestration", owner: "comet" },
    { label: "Pre-tuned CUDA · NCCL · drivers · frameworks", owner: "comet" },
    { label: "InfiniBand / NVLink fabric", owner: "comet" },
    { label: "Dedicated NVIDIA GPU servers", owner: "comet" },
  ];

  return (
    <section id="managed" className="relative border-t border-[color:var(--rule)] px-6 py-28 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-[88rem]">
        <div className="grid items-start gap-x-16 gap-y-14 lg:grid-cols-2">
          {/* Copy */}
          <div>
            <SectionHeader
              index="02"
              kicker="Managed platform"
              title={
                <>
                  Plug in and train
                  <br />
                  on <span className="serif-italic text-gold">day one.</span>
                </>
              }
              lede="Anyone can drop-ship you bare metal. We hand you a running platform — managed Kubernetes and Slurm, a pre-tuned ML stack, observability — live before you log in."
            />

            {/* Terminal — what day one actually looks like */}
            <Reveal delay={80} className="mt-12 border border-[color:var(--rule-strong)] bg-[#070609]">
              <div className="flex items-center justify-between border-b border-[color:var(--rule)] px-4 py-2.5">
                <span className="mono text-xs text-fg-faint">you@cluster-01 ~</span>
                <span className="mono text-xs text-gold">bash</span>
              </div>
              <pre className="overflow-x-auto p-5 text-[13px] leading-relaxed">
                <code className="mono">
                  <span className="text-fg-faint">$ </span>
                  <span className="text-fg">kubectl get nodes</span>
                  {"\n"}
                  <span className="text-fg-dim">NAME        STATUS   GPU            </span>
                  {"\n"}
                  <span className="text-fg-dim">gpu-001     </span>
                  <span className="text-gold">Ready</span>
                  <span className="text-fg-dim">    8× B200</span>
                  {"\n"}
                  <span className="text-fg-dim">gpu-002     </span>
                  <span className="text-gold">Ready</span>
                  <span className="text-fg-dim">    8× B200</span>
                  {"\n\n"}
                  <span className="text-fg-faint">$ </span>
                  <span className="text-fg">srun --gpus=16 python train.py</span>
                  {"\n"}
                  <span className="text-fg-dim">nccl: all-reduce @ 392 Gb/s · 0 driver setup</span>
                  <span className="caret align-text-bottom" />
                </code>
              </pre>
            </Reveal>
          </div>

          {/* Ownership stack */}
          <Reveal delay={120} className="lg:pt-24">
            <div className="border border-[color:var(--rule-strong)] bg-ink-raised/50">
              <div className="flex items-center justify-between border-b border-[color:var(--rule)] px-5 py-3">
                <span className="label">The full stack</span>
                <span className="mono text-xs text-gold">managed by comet ↓</span>
              </div>
              <ul>
                {stack.map((layer, i) => {
                  const mine = layer.owner === "you";
                  return (
                    <li
                      key={layer.label}
                      className={`flex items-center gap-4 px-5 py-4 ${
                        i !== stack.length - 1 ? "border-b border-[color:var(--rule)]" : ""
                      } ${mine ? "" : "bg-gold/[0.03]"}`}
                    >
                      <span
                        className={`mono text-xs ${mine ? "text-fg-faint" : "text-gold"}`}
                      >
                        {mine ? "○" : "●"}
                      </span>
                      <span className={`text-sm ${mine ? "text-fg" : "text-fg-dim"}`}>
                        {layer.label}
                      </span>
                      <span
                        className={`mono ml-auto text-[10px] uppercase tracking-[0.14em] ${
                          mine ? "text-fg" : "text-fg-faint"
                        }`}
                      >
                        {mine ? "you" : "comet"}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-fg-dim">
              You bring the workload. We run every layer beneath it — or hand you
              root on the bare metal if you&apos;d rather run your own stack. Your
              call, not ours.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
