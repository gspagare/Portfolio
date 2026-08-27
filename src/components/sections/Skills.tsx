import skills from "@/data/skills.json";
import ScrollReveal from "@/components/ScrollReveal";
import CardGlow from "@/components/CardGlow";
import SliderPill from "@/components/SliderPill";
import TiltCard from "@/components/TiltCard";

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
              <TiltCard className="h-full">
                <CardGlow className="rounded-xl border border-[var(--border-light)] bg-[var(--bg-primary)] p-6 card-hover h-full">
                  <h3 className="text-lg font-bold mb-4 text-[var(--text-primary)]">
                  {cat.name}
                </h3>
                <SliderPill className="flex flex-wrap gap-2">
                  {cat.skills.map((s) => (
                    <span
                      key={s}
                      data-slide
                      className="relative px-3 py-1 text-xs rounded-full text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors"
                    >
                      {s}
                    </span>
                  ))}
                </SliderPill>
              </CardGlow>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
