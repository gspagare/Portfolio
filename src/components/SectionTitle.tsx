import ScrollReveal from "@/components/ScrollReveal";

export default function SectionTitle({
  index,
  title,
  subtitle,
}: {
  index: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <ScrollReveal>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3 justify-center lg:justify-start">
          <span className="font-mono text-sm text-[var(--accent-primary)]">
            {index}
          </span>
          <span className="h-px w-16 bg-gradient-to-r from-[var(--accent-primary)] to-transparent" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] section-title text-center lg:text-left">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 text-[var(--text-secondary)] max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
            {subtitle}
          </p>
        )}
      </div>
    </ScrollReveal>
  );
}