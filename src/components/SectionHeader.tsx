import Reveal from "./Reveal";

interface SectionHeaderProps {
  index: string; // "01"
  kicker: string; // "INFRASTRUCTURE"
  title: React.ReactNode;
  lede?: string;
  light?: boolean;
  className?: string;
}

/**
 * Editorial section header. Mono index + kicker on one rule line, then a
 * large serif headline. Deliberately left-aligned and asymmetric — the
 * lede sits in a narrow measure offset from the headline, not centered.
 */
export default function SectionHeader({
  index,
  kicker,
  title,
  lede,
  light = false,
  className = "",
}: SectionHeaderProps) {
  const dim = light ? "text-paper-ink/55" : "text-fg-faint";
  return (
    <Reveal className={className}>
      <div
        className={`flex items-baseline gap-4 border-b pb-4 ${
          light ? "border-paper-ink/15" : "border-[color:var(--rule)]"
        }`}
      >
        <span className="mono text-sm text-gold">{index}</span>
        <span className={`label ${dim}`}>{kicker}</span>
      </div>
      <h2
        className={`serif mt-8 text-[2.75rem] leading-[0.95] sm:text-6xl lg:text-[4.25rem] ${
          light ? "text-paper-ink" : "text-fg"
        }`}
      >
        {title}
      </h2>
      {lede && (
        <p
          className={`measure mt-6 text-lg leading-relaxed ${
            light ? "text-paper-ink/70" : "text-fg-dim"
          }`}
        >
          {lede}
        </p>
      )}
    </Reveal>
  );
}
