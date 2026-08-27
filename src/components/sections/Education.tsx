import education from "@/data/education.json";
import ScrollReveal from "@/components/ScrollReveal";
import SectionTitle from "@/components/SectionTitle";
import CardGlow from "@/components/CardGlow";
import TiltCard from "@/components/TiltCard";

export default function Education() {
  return (
    <section id="education" className="pt-12 md:pt-16 pb-20 md:pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionTitle index="05" title="Education" />
        <div className="relative">
          <span
            aria-hidden="true"
            className="absolute -left-4 lg:-left-10 xl:-left-16 top-2 bottom-2 w-px bg-gradient-to-b from-[var(--accent-primary)] via-[var(--accent-primary)]/30 to-transparent"
          />
          {education.entries.map((e, i) => (
            <ScrollReveal key={e.degree} delay={i * 100} className="mb-6 last:mb-0">
              <div className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-4 lg:-left-10 xl:-left-16 -translate-x-1/2 top-7 w-3.5 h-3.5 rounded-full bg-[var(--accent-primary)] ring-4 ring-[var(--accent-primary)]/20"
                />
                <TiltCard>
                  <CardGlow className="rounded-xl border border-[var(--border-light)] bg-[var(--bg-primary)] p-6 card-hover">
                    <p className="text-xs font-mono text-[var(--accent-primary)]">
                      {e.startDate} – {e.endDate}
                    </p>
                    <h3 className="text-xl font-bold mt-1">
                      {e.degree}
                    </h3>
                    <p className="text-[var(--accent-primary)] font-medium">
                      {e.school}, {e.location}
                    </p>
                    <p className="text-sm text-[var(--text-muted)]">
                      {e.score}
                    </p>
                    {e.research && (
                      <p className="mt-4 text-sm text-[var(--text-secondary)] leading-relaxed">
                        <span className="font-semibold text-[var(--text-primary)]">
                          Undergraduate research:
                        </span>{" "}
                        {e.research}
                      </p>
                    )}
                    {e.publications && e.publications.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <p className="text-sm font-semibold text-[var(--text-primary)]">
                          Publications
                        </p>
                        {e.publications.map((pub, idx) => (
                          <p
                            key={idx}
                            className="text-sm text-[var(--text-secondary)]"
                          >
                            &ldquo;{pub.title}&rdquo; — {pub.journal},{" "}
                            {pub.date}
                          </p>
                        ))}
                      </div>
                    )}
                  </CardGlow>
                </TiltCard>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}