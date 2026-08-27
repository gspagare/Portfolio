import projects from "@/data/projects.json";
import ScrollReveal from "@/components/ScrollReveal";
import CardGlow from "@/components/CardGlow";
import TiltCard from "@/components/TiltCard";

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl font-bold mb-8">Projects</h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((proj, idx) => (
            <ScrollReveal key={proj.id} delay={idx * 100}>
              <TiltCard className="h-full">
                <CardGlow
                className={`rounded-xl border p-6 card-hover h-full ${
                  proj.level === "featured"
                    ? "border-[var(--accent-primary)] bg-[var(--bg-primary)]"
                    : "border-[var(--border-light)] bg-[var(--bg-primary)]"
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  {proj.level === "featured" && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-[var(--accent-primary)]/20 text-[var(--accent-primary)]">
                      FEATURED
                    </span>
                  )}
                  {proj.commits && (
                    <span className="text-xs px-2 py-0.5 rounded bg-[var(--text-muted)]/10 text-[var(--text-muted)]">
                      {proj.commits} commits
                    </span>
                  )}
                  {proj.private && (
                    <span className="text-xs px-2 py-0.5 rounded bg-[var(--text-muted)]/10 text-[var(--text-muted)]">
                      Private
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold mb-2">{proj.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                  {proj.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {proj.tech.map((t) => (
                    <span
                      key={t}
                      className="chip-sheen px-2 py-0.5 text-xs rounded bg-[var(--bg-secondary)] border border-[var(--border-light)] text-[var(--text-muted)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </CardGlow>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
