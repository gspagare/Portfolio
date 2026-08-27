import profile from "@/data/profile.json";
import ScrollReveal from "@/components/ScrollReveal";

export default function Hero() {
  return (
    <section
      id="front"
      className="min-h-screen flex items-center justify-center px-6"
    >
      <div className="max-w-4xl text-center overflow-visible">
        <ScrollReveal>
          <p className="text-lg font-outfit text-[var(--accent-primary)] mb-4">
            {profile.tagline}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={100} className="overflow-visible">
          <h1 className="text-5xl md:text-7xl font-pacifico mb-4 pb-5 gradient-text overflow-visible leading-[1.2]">
            {profile.name}.
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-secondary)] mb-6 leading-snug">
            {profile.description}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={300}>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {profile.chips.map((chip) => (
              <span
                key={chip}
                className="px-4 py-1.5 text-xs font-medium rounded-full border border-[var(--border-light)] text-[var(--text-muted)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-colors"
              >
                {chip}
              </span>
            ))}
          </div>
        </ScrollReveal>
        <ScrollReveal delay={400}>
          <div className="flex justify-center gap-4">
            <a
              href="#contact"
              className="px-6 py-3 rounded-lg font-semibold text-sm text-white hover:shadow-lg hover:shadow-blue-500/25 transition-all hover:-translate-y-0.5"
              style={{ background: "var(--gradient-primary)" }}
            >
              Get In Touch
            </a>
            <a
              href="#projects"
              className="px-6 py-3 rounded-lg font-semibold text-sm border border-[var(--border-light)] text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] hover:border-[var(--accent-primary)] transition-all hover:-translate-y-0.5"
            >
              View My Work
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
