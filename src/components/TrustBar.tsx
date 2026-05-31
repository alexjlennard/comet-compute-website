import Image from "next/image";

export default function TrustBar() {
  return (
    <section className="relative border-y border-white/5 bg-[#0a0907] py-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-center gap-4 text-center sm:flex-row sm:gap-5">
          <Image
            src="/assets/nvidia-inception.png"
            alt="NVIDIA Inception Program member"
            width={150}
            height={60}
            className="h-12 w-auto rounded-md bg-white/95 px-3 py-2"
          />
          <p className="text-sm text-[#9a9384]">
            Proud member of the{" "}
            <span className="font-medium text-[#cfc8b8]">NVIDIA Inception Program</span>
          </p>
        </div>
      </div>
    </section>
  );
}
