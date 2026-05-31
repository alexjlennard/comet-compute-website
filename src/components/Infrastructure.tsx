import Image from "next/image";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

export default function Infrastructure() {
  const featured = {
    name: "NVIDIA GB300 NVL72",
    tag: "Flagship · Blackwell Ultra",
    description:
      "Our flagship rack-scale system for the largest training and inference workloads. 72 Blackwell Ultra GPUs unified over NVLink 5 into a single, coherent accelerator.",
    image: "/assets/cluster-nvl72.png",
    specs: [
      { k: "GPUs", v: "72 × Blackwell Ultra" },
      { k: "Memory", v: "Up to 21TB" },
      { k: "Interconnect", v: "NVLink 5" },
      { k: "Performance", v: "1.5× GB200" },
    ],
  };

  const lineup = [
    { name: "NVIDIA GB200 NVL72", arch: "Grace Blackwell", memory: "Up to 13.5TB", fabric: "NVLink 5", perf: "1.4 EFLOPS" },
    { name: "NVIDIA HGX B300", arch: "Blackwell Ultra", memory: "2.3TB HBM3e", fabric: "NVLink", perf: "8-GPU node" },
    { name: "NVIDIA HGX B200", arch: "Blackwell", memory: "1.4TB HBM3e", fabric: "NVLink", perf: "8-GPU node" },
    { name: "NVIDIA H200", arch: "Hopper", memory: "141GB HBM3e", fabric: "NVLink", perf: "989 TFLOPS" },
    { name: "NVIDIA H100", arch: "Hopper", memory: "80GB HBM3", fabric: "NVLink", perf: "989 TFLOPS" },
  ];

  return (
    <section id="infrastructure" className="relative px-6 py-28 lg:py-36">
      <div className="relative mx-auto max-w-7xl">
        <SectionHeader
          index="03"
          kicker="Infrastructure"
          title={
            <>
              The latest NVIDIA silicon,
              <br />
              ready to reserve.
            </>
          }
          lede="From Blackwell Ultra rack-scale systems to proven Hopper nodes — deployed in purpose-built facilities with enterprise networking."
        />

        {/* Featured flagship */}
        <Reveal className="glass edge-top mt-14 grid overflow-hidden rounded-3xl lg:grid-cols-2">
          <div className="relative min-h-[280px] overflow-hidden bg-black">
            <Image
              src={featured.image}
              alt={featured.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0c0a07] lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#0c0a07]" />
            <span className="absolute left-5 top-5 rounded-full border border-amber-400/30 bg-[#060504]/70 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-amber-300 backdrop-blur-sm">
              {featured.tag}
            </span>
          </div>
          <div className="flex flex-col justify-center p-8 lg:p-12">
            <h3 className="display-lg text-3xl sm:text-4xl">{featured.name}</h3>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#9a9384]">
              {featured.description}
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5">
              {featured.specs.map((s) => (
                <div key={s.k} className="border-t border-white/10 pt-3">
                  <dt className="kicker text-[#7a7464]">{s.k}</dt>
                  <dd className="mt-1.5 font-mono text-sm text-amber-100">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>

        {/* Spec table for the rest of the lineup */}
        <Reveal className="mt-4 overflow-hidden rounded-2xl border border-white/5">
          {/* header row — hidden on mobile */}
          <div className="hidden grid-cols-12 gap-4 border-b border-white/5 bg-white/[0.02] px-6 py-3.5 md:grid">
            <div className="col-span-4 kicker text-[#7a7464]">Model</div>
            <div className="col-span-3 kicker text-[#7a7464]">Architecture</div>
            <div className="col-span-2 kicker text-[#7a7464]">Memory</div>
            <div className="col-span-2 kicker text-[#7a7464]">Fabric</div>
            <div className="col-span-1 kicker text-right text-[#7a7464]">Perf</div>
          </div>
          {lineup.map((g) => (
            <div
              key={g.name}
              className="grid grid-cols-2 items-center gap-x-4 gap-y-1 border-b border-white/5 px-6 py-4 transition-colors last:border-0 hover:bg-amber-400/[0.03] md:grid-cols-12"
            >
              <div className="col-span-2 font-display text-base font-semibold md:col-span-4">
                {g.name}
              </div>
              <div className="kicker text-[#7a7464] md:hidden">Arch</div>
              <div className="col-span-3 text-right text-sm text-[#cfc8b8] md:text-left">{g.arch}</div>
              <div className="kicker text-[#7a7464] md:hidden">Memory</div>
              <div className="col-span-2 text-right font-mono text-sm text-amber-100 md:text-left">{g.memory}</div>
              <div className="kicker text-[#7a7464] md:hidden">Fabric</div>
              <div className="col-span-2 text-right text-sm text-[#cfc8b8] md:text-left">{g.fabric}</div>
              <div className="kicker text-[#7a7464] md:hidden">Perf</div>
              <div className="col-span-1 text-right font-mono text-sm text-[#cfc8b8]">{g.perf}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
