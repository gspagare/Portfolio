import experience from "@/data/experience.json";
import ScrollReveal from "@/components/ScrollReveal";
import CardGlow from "@/components/CardGlow";
import TiltCard from "@/components/TiltCard";

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl font-bold mb-8">Experience</h2>
        </ScrollReveal>
        <div className="space-y-8">
          {experience.map((job, idx) => (
            <ScrollReveal key={job.id} delay={idx * 100}>
              <TiltCard>
                <CardGlow className="rounded-xl border border-[var(--border-light)] bg-[var(--bg-primary)] p-6 card-hover">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-bold">{job.role}</h3>
                    <p className="text-[var(--accent-primary)] font-medium">
                      {job.company}
                    </p>
                  </div>
                  <p className="text-sm text-[var(--text-muted)] mt-1 sm:mt-0">
                    {job.startDate} – {job.endDate || "Present"} ·{" "}
                    {job.location}
                  </p>
                </div>
                {job.summary && (
                  <p className="text-sm text-[var(--text-muted)] italic mb-4">
                    {job.summary}
                  </p>
                )}
                <ul className="space-y-2 mb-4">
                  {job.bullets.map((b, i) => (
                    <li
                      key={i}
                      className="text-sm text-[var(--text-secondary)] leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-[var(--accent-primary)]"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {job.tech.map((t) => (
                    <span
                      key={t}
                      className="chip-sweep px-2 py-0.5 text-xs rounded text-[var(--text-muted)]"
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
