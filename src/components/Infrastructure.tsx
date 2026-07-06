import Image from "next/image";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

export default function Infrastructure() {
  const featured = {
    name: "GB300 NVL72",
    tag: "FLAGSHIP · BLACKWELL ULTRA",
    description:
      "Rack-scale system for the largest training and inference runs. 72 Blackwell Ultra GPUs unified over NVLink 5 into a single coherent accelerator — we commission them up to 64 racks at a time.",
    image: "/assets/cluster-nvl72.png",
    specs: [
      { k: "GPUs", v: "72 × Blackwell Ultra" },
      { k: "Memory", v: "up to 21 TB" },
      { k: "Fabric", v: "NVLink 5 + XDR IB" },
      { k: "vs GB200", v: "1.5× throughput" },
    ],
  };

  const lineup = [
    { name: "Vera Rubin NVL144", arch: "Rubin", memory: "288 GB HBM4", fabric: "NVLink 6", perf: "reserving" },
    { name: "GB200 NVL72", arch: "Grace Blackwell", memory: "up to 13.5 TB", fabric: "NVLink 5", perf: "1.4 EFLOPS" },
    { name: "HGX B300", arch: "Blackwell Ultra", memory: "2.3 TB HBM3e", fabric: "NVLink", perf: "8-GPU node" },
    { name: "HGX B200", arch: "Blackwell", memory: "1.4 TB HBM3e", fabric: "NVLink", perf: "8-GPU node" },
    { name: "H200", arch: "Hopper", memory: "141 GB HBM3e", fabric: "NVLink", perf: "989 TFLOPS" },
    { name: "H100", arch: "Hopper", memory: "80 GB HBM3", fabric: "NVLink", perf: "989 TFLOPS" },
  ];

  return (
    <section id="infrastructure" className="relative border-t border-[color:var(--rule)] px-6 py-28 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-[88rem]">
        <SectionHeader
          index="04"
          kicker="Hardware"
          title={
            <>
              The latest silicon,
              <br />
              ready to <span className="serif-italic text-gold">reserve.</span>
            </>
          }
          lede="Blackwell Ultra rack-scale systems and proven Hopper nodes, pre-validated to NVIDIA's NCP reference architecture — with Vera Rubin deployments already in flight."
        />

        {/* Flagship — asymmetric split, image bleeds left */}
        <Reveal className="mt-20 grid border border-[color:var(--rule-strong)] lg:grid-cols-5">
          <div className="relative min-h-[320px] overflow-hidden bg-black lg:col-span-3">
            <Image
              src={featured.image}
              alt={featured.name}
              fill
              className="object-cover opacity-90"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-ink/70 lg:to-ink" />
            <span className="mono absolute left-5 top-5 border border-gold/40 px-2.5 py-1 text-[10px] tracking-[0.16em] text-gold">
              {featured.tag}
            </span>
          </div>
          <div className="flex flex-col justify-center p-8 lg:col-span-2 lg:p-12">
            <span className="label">NVIDIA</span>
            <h3 className="serif mt-2 text-4xl text-fg sm:text-5xl">{featured.name}</h3>
            <p className="mt-5 text-[15px] leading-relaxed text-fg-dim">
              {featured.description}
            </p>
            <dl className="mt-10 grid grid-cols-2 gap-px bg-[color:var(--rule)]">
              {featured.specs.map((s) => (
                <div key={s.k} className="bg-ink p-4">
                  <dt className="label">{s.k}</dt>
                  <dd className="mono mt-2 text-sm text-gold">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>

        {/* Lineup table */}
        <Reveal className="mt-px border-x border-b border-[color:var(--rule-strong)]">
          <div className="hidden grid-cols-12 gap-4 border-b border-[color:var(--rule)] px-6 py-3 md:grid">
            <div className="label col-span-4">Model</div>
            <div className="label col-span-3">Architecture</div>
            <div className="label col-span-2">Memory</div>
            <div className="label col-span-2">Fabric</div>
            <div className="label col-span-1 text-right">Perf</div>
          </div>
          {lineup.map((g) => (
            <div
              key={g.name}
              className="grid grid-cols-2 items-center gap-x-4 gap-y-1 border-b border-[color:var(--rule)] px-6 py-4 transition-colors last:border-0 hover:bg-ink-raised md:grid-cols-12"
            >
              <div className="serif col-span-2 text-xl text-fg md:col-span-4">{g.name}</div>
              <div className="label md:hidden">Arch</div>
              <div className="col-span-3 text-right text-sm text-fg-dim md:text-left">{g.arch}</div>
              <div className="label md:hidden">Memory</div>
              <div className="mono col-span-2 text-right text-sm text-gold md:text-left">{g.memory}</div>
              <div className="label md:hidden">Fabric</div>
              <div className="col-span-2 text-right text-sm text-fg-dim md:text-left">{g.fabric}</div>
              <div className="label md:hidden">Perf</div>
              <div className="mono col-span-1 text-right text-sm text-fg-dim">{g.perf}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
