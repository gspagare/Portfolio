import education from "@/data/education.json";
import ScrollReveal from "@/components/ScrollReveal";

export default function Education() {
  return (
    <section id="education" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl font-bold mb-8">Education</h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <div className="rounded-xl border border-[var(--border-light)] bg-[var(--bg-secondary)] p-6">
            <h3 className="text-xl font-bold">{education.degree}</h3>
            <p className="text-[var(--accent-primary)] font-medium">
              {education.school}
            </p>
            <p className="text-sm text-[var(--text-muted)]">
              {education.location} · {education.startDate} –{" "}
              {education.endDate} · CGPA: {education.cgpa}
            </p>
            {education.research && (
              <p className="mt-4 text-sm text-[var(--text-secondary)] leading-relaxed">
                <span className="font-semibold text-[var(--text-primary)]">
                  Undergraduate research:
                </span>{" "}
                {education.research}
              </p>
            )}
            {education.publications.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-sm font-semibold text-[var(--text-primary)]">
                  Publications
                </p>
                {education.publications.map((pub, i) => (
                  <p
                    key={i}
                    className="text-sm text-[var(--text-secondary)]"
                  >
                    &ldquo;{pub.title}&rdquo; — {pub.journal}, {pub.date}
                  </p>
                ))}
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
