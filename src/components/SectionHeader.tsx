import Reveal from "./Reveal";

interface SectionHeaderProps {
  index: string; // e.g. "01"
  kicker: string; // e.g. "Infrastructure"
  title: React.ReactNode;
  lede?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

/**
 * Editorial section header: mono index kicker + display headline.
 * Left-aligned by default to break the "everything centered" AI look.
 */
export default function SectionHeader({
  index,
  kicker,
  title,
  lede,
  align = "left",
  light = false,
  className = "",
}: SectionHeaderProps) {
  const isCenter = align === "center";
  return (
    <Reveal
      className={`flex flex-col ${isCenter ? "items-center text-center" : "items-start"} ${className}`}
    >
      <div className="flex items-center gap-3">
        <span className="kicker" style={light ? { color: "#9a6a14" } : undefined}>
          {index}
        </span>
        <span
          className="h-px w-8"
          style={{ background: light ? "rgba(20,17,10,0.25)" : "rgba(232,177,76,0.5)" }}
        />
        <span className="kicker" style={light ? { color: "#7a6f56" } : { color: "var(--text-muted)" }}>
          {kicker}
        </span>
      </div>
      <h2
        className={`display-lg mt-5 max-w-3xl text-4xl sm:text-5xl ${
          light ? "text-[#14110a]" : "text-[#f5f3ee]"
        }`}
      >
        {title}
      </h2>
      {lede && (
        <p
          className={`mt-5 max-w-xl text-lg leading-relaxed ${
            light ? "text-[#5c5340]" : "text-[#9a9384]"
          }`}
        >
          {lede}
        </p>
      )}
    </Reveal>
  );
}
