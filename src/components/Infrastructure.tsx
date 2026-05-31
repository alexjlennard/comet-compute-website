import Image from "next/image";
import Reveal from "./Reveal";

export default function Infrastructure() {
  const gpus = [
    {
      name: "NVIDIA GB300 NVL72",
      description: "Blackwell Ultra rack-scale system — our flagship for the largest training and inference workloads",
      specs: { memory: "Up to 21TB", interconnect: "NVLink 5", perf: "1.5× GB200" },
      badge: "Latest",
      image: "/assets/cluster-nvl72.png",
    },
    {
      name: "NVIDIA GB200 NVL72",
      description: "Grace Blackwell rack-scale architecture for the most demanding distributed training",
      specs: { memory: "Up to 13.5TB", interconnect: "NVLink 5", perf: "1.4 ExaFLOPS" },
      badge: null,
      image: "/assets/rack-tall.png",
    },
    {
      name: "NVIDIA HGX B300",
      description: "Blackwell Ultra 8-GPU systems optimized for large-scale inference and training",
      specs: { memory: "2.3TB HBM3e", interconnect: "NVLink", perf: "Blackwell Ultra" },
      badge: "Popular",
      image: "/assets/server-dgx.png",
    },
    {
      name: "NVIDIA HGX B200",
      description: "High-performance Blackwell GPUs for large-scale training and inference",
      specs: { memory: "1.4TB HBM3e", interconnect: "NVLink", perf: "Blackwell" },
      badge: null,
      image: "/assets/chip-blackwell.png",
    },
    {
      name: "NVIDIA H200",
      description: "Proven Hopper architecture with expanded memory for large model inference",
      specs: { memory: "141GB HBM3e", interconnect: "NVLink", perf: "989 TFLOPS" },
      badge: null,
      image: "/assets/server-dgx.png",
    },
    {
      name: "NVIDIA H100",
      description: "Industry-standard GPU for training and inference at scale",
      specs: { memory: "80GB HBM3", interconnect: "NVLink", perf: "989 TFLOPS" },
      badge: null,
      image: "/assets/chip-blackwell.png",
    },
  ];

  return (
    <section id="infrastructure" className="relative py-32 px-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/3 bottom-0 h-[400px] w-[600px] -translate-y-1/4 rounded-full bg-amber-500/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <Reveal className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-amber-400">Infrastructure</p>
          <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            The latest NVIDIA silicon
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#9a9384]">
            Access the most powerful GPU hardware available, deployed in purpose-built facilities with enterprise-grade networking.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {gpus.map((gpu, i) => (
            <Reveal
              key={gpu.name}
              delay={(i % 2) * 100}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#100e0a] transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/20"
            >
              {/* Image */}
              <div className="relative h-48 w-full overflow-hidden bg-black">
                <Image
                  src={gpu.image}
                  alt={gpu.name}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#100e0a] via-transparent to-transparent" />
                {gpu.badge && (
                  <span className="absolute right-4 top-4 rounded-full border border-amber-400/20 bg-[#060504]/70 px-3 py-1 text-xs font-medium text-amber-300 backdrop-blur-sm">
                    {gpu.badge}
                  </span>
                )}
              </div>

              <div className="p-8 pt-6">
                <h3 className="text-xl font-semibold">{gpu.name}</h3>
                <p className="mt-2 text-sm text-[#9a9384]">{gpu.description}</p>
                <div className="mt-6 grid grid-cols-3 gap-4 border-t border-white/5 pt-6">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-[#9a9384]">Memory</p>
                    <p className="mt-1 text-sm font-medium text-amber-100">{gpu.specs.memory}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-[#9a9384]">Interconnect</p>
                    <p className="mt-1 text-sm font-medium text-amber-100">{gpu.specs.interconnect}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-[#9a9384]">Performance</p>
                    <p className="mt-1 text-sm font-medium text-amber-100">{gpu.specs.perf}</p>
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
