import profile from "@/data/profile.json";
import ContactForm from "@/components/ContactForm";
import ScrollReveal from "@/components/ScrollReveal";

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 px-6">
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
  );
}
