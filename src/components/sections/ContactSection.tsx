import profile from "@/data/profile.json";
import ContactForm from "@/components/ContactForm";
import ScrollReveal from "@/components/ScrollReveal";
import SectionTitle from "@/components/SectionTitle";
import LocalTime from "@/components/LocalTime";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="px-6 py-12 md:py-16 min-h-[calc(100dvh_-_var(--nav-h)_-_var(--footer-h))]"
    >
      <div className="max-w-4xl mx-auto w-full">
        <SectionTitle index="06" title="Contact" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <ScrollReveal delay={100}>
            <ContactForm />
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="lg:pt-1">
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3">
                Get in touch
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed max-w-sm">
                Have a question or want to work together?
              </p>
              <p className="mt-1 text-[var(--text-primary)] font-medium max-w-sm">
                Drop a message — or reach me directly.
              </p>
              <div className="rounded-xl border border-[var(--border-light)] bg-[var(--bg-primary)] p-5 space-y-4 mt-6">
                <div className="flex items-baseline gap-4">
                  <span className="text-sm w-20 shrink-0 text-[var(--text-muted)]">
                    Email
                  </span>
                  <a
                    href={profile.socials.email}
                    className="text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors"
                  >
                    {profile.email}
                  </a>
                </div>
                <div className="flex items-baseline gap-4">
                  <span className="text-sm w-20 shrink-0 text-[var(--text-muted)]">
                    Phone
                  </span>
                  <span className="text-[var(--text-primary)]">
                    {profile.phone}
                  </span>
                </div>
                <div className="flex items-baseline gap-4">
                  <span className="text-sm w-20 shrink-0 text-[var(--text-muted)]">
                    Location
                  </span>
                  <span className="text-[var(--text-primary)]">
                    {profile.location}
                  </span>
                </div>
              </div>
              <div className="mt-6">
                <span className="block h-px w-10 bg-gradient-to-r from-[var(--accent-primary)] to-transparent mb-4" />
                <LocalTime />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}