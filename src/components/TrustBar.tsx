import Image from "next/image";

export default function TrustBar() {
  return (
    <section className="relative border-b border-[color:var(--rule)] py-6">
      <div className="mx-auto flex max-w-[88rem] flex-col items-center justify-center gap-4 px-6 sm:flex-row lg:px-10">
        <Image
          src="/assets/nvidia-inception.png"
          alt="NVIDIA Inception Program"
          width={130}
          height={52}
          className="h-10 w-auto rounded-sm bg-white/95 px-2.5 py-1.5"
        />
        <p className="mono text-xs uppercase tracking-[0.14em] text-fg-faint">
          Member · NVIDIA Inception Program
        </p>
      </div>
    </section>
  );
}
