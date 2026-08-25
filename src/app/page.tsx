import profile from "@/data/profile.json";
import about from "@/data/about.json";
import experience from "@/data/experience.json";
import projects from "@/data/projects.json";
import skills from "@/data/skills.json";
import education from "@/data/education.json";
import ScrollReveal from "@/components/ScrollReveal";
import ContactForm from "@/components/ContactForm";

const badgeColors: Record<string, string> = {
  blue: "border-blue-500/30 text-blue-400 bg-blue-500/10",
  emerald: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
  violet: "border-violet-500/30 text-violet-400 bg-violet-500/10",
  amber: "border-amber-500/30 text-amber-400 bg-amber-500/10",
};

export default function Home() {
  return (
    <>
      {/* ===== Hero ===== */}
      <section
        id="front"
        className="min-h-screen flex items-center justify-center px-6"
      >
        <div className="max-w-4xl text-center">
          <ScrollReveal>
            <p className="text-sm font-mono text-[var(--accent-primary)] mb-4">
              {profile.tagline}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 gradient-text">
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

      {/* ===== About ===== */}
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

      {/* ===== Experience ===== */}
      <section id="experience" className="py-24 px-6 bg-[var(--bg-secondary)]">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl font-bold mb-8">Experience</h2>
          </ScrollReveal>
          <div className="space-y-8">
            {experience.map((job, idx) => (
              <ScrollReveal key={job.id} delay={idx * 100}>
                <div className="rounded-xl border border-[var(--border-light)] bg-[var(--bg-primary)] p-6 card-hover">
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
                        className="px-2 py-0.5 text-xs rounded bg-[var(--bg-secondary)] text-[var(--text-muted)] border border-[var(--border-light)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Skills ===== */}
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

      {/* ===== Projects ===== */}
      <section id="projects" className="py-24 px-6 bg-[var(--bg-secondary)]">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl font-bold mb-8">Projects</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((proj, idx) => (
              <ScrollReveal key={proj.id} delay={idx * 100}>
                <div
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
                        className="px-2 py-0.5 text-xs rounded bg-[var(--bg-secondary)] text-[var(--text-muted)] border border-[var(--border-light)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Education ===== */}
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

      {/* ===== Contact ===== */}
      <section id="contact" className="py-24 px-6 bg-[var(--bg-secondary)]">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-bold mb-4">Contact</h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="text-[var(--text-muted)] mb-8">
              Have a question or want to work together? Drop me a message.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <ContactForm />
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
              <a
                href={profile.socials.email}
                className="px-6 py-3 rounded-lg font-semibold text-sm border border-[var(--border-light)] text-[var(--text-primary)] hover:bg-[var(--bg-primary)] hover:border-[var(--accent-primary)] transition-all hover:-translate-y-0.5"
              >
                Email Me
              </a>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg font-semibold text-sm border border-[var(--border-light)] text-[var(--text-primary)] hover:bg-[var(--bg-primary)] hover:border-[var(--accent-primary)] transition-all hover:-translate-y-0.5"
              >
                LinkedIn
              </a>
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg font-semibold text-sm border border-[var(--border-light)] text-[var(--text-primary)] hover:bg-[var(--bg-primary)] hover:border-[var(--accent-primary)] transition-all hover:-translate-y-0.5"
              >
                GitHub
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
