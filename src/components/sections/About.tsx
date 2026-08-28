import about from "@/data/about.json";
import profile from "@/data/profile.json";
import ScrollReveal from "@/components/ScrollReveal";
import SectionTitle from "@/components/SectionTitle";
import StatCounter from "@/components/StatCounter";

const badgeColors: Record<string, string> = {
  blue: "border-blue-500/30 text-blue-400 bg-blue-500/10",
  emerald: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
  violet: "border-violet-500/30 text-violet-400 bg-violet-500/10",
  amber: "border-amber-500/30 text-amber-400 bg-amber-500/10",
};

export default function About() {
  return (
    <section id="about" className="py-12 md:py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionTitle index="01" title="About Me" />
        <ScrollReveal delay={100}>
          <div className="space-y-4 mb-8">
            {about.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-[var(--text-secondary)] leading-relaxed"
              >
                {p}
              </p>
            ))}
          </div>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <div className="flex flex-wrap gap-3 mb-8">
            {about.badges.map((b) => (
              <span
                key={b.label}
                className={`px-4 py-1.5 text-xs font-medium rounded-full border ${badgeColors[b.color] || badgeColors.blue}`}
              >
                {b.label}
              </span>
            ))}
          </div>
        </ScrollReveal>
        <ScrollReveal delay={260}>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4 mb-8">
            {about.stats.map((s, i) => (
              <div key={s.label} className="flex items-center gap-6">
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    className="h-6 w-px bg-gradient-to-b from-transparent via-[var(--border-light)] to-transparent"
                  />
                )}
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl md:text-3xl font-outfit font-bold gradient-text">
                    <StatCounter value={s.value} suffix={s.suffix} />
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                    {s.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
        <ScrollReveal delay={300}>
          <a
            href={profile.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 rounded-lg font-semibold text-sm btn-gradient"
          >
            Download CV
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
