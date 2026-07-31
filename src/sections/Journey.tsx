import { SectionHeader } from "@/components/ui/SectionHeader";
import { Timeline } from "@/components/ui/Timeline";
import { journey } from "@/data/journey";

export function Journey() {
  return (
    <section id="journey" className="scroll-mt-20 py-24 md:py-32 border-t border-ink/10 bg-paper-dark/40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHeader
          code="03"
          title="Engineering Journey"
          description="Three registers of the same craft — each stage changed what I understood about building systems that hold up."
        />
        <Timeline stages={journey} />
      </div>
    </section>
  );
}
