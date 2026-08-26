import skills from "@/data/skills.json";
import ScrollReveal from "@/components/ScrollReveal";

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl font-bold mb-8">Skills</h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((cat, idx) => (
            <ScrollReveal key={cat.name} delay={idx * 80}>
              <div className="rounded-xl border border-[var(--border-light)] bg-[var(--bg-secondary)] p-6 card-hover h-full">
                <h3 className="text-lg font-bold mb-4 text-[var(--text-primary)]">
                  {cat.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1 text-xs rounded-full border border-[var(--border-light)] text-[var(--text-muted)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-colors"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
