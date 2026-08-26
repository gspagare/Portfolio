import about from "@/data/about.json";
import profile from "@/data/profile.json";
import ScrollReveal from "@/components/ScrollReveal";

const badgeColors: Record<string, string> = {
  blue: "border-blue-500/30 text-blue-400 bg-blue-500/10",
  emerald: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
  violet: "border-violet-500/30 text-violet-400 bg-violet-500/10",
  amber: "border-amber-500/30 text-amber-400 bg-amber-500/10",
};

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl font-bold mb-8">About Me</h2>
        </ScrollReveal>
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
        <ScrollReveal delay={300}>
          <a
            href={profile.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 rounded-lg font-semibold text-sm text-white hover:shadow-lg hover:shadow-blue-500/25 transition-all hover:-translate-y-0.5"
            style={{ background: "var(--gradient-primary)" }}
          >
            Download CV
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
