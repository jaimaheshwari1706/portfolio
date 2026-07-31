import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectFeature } from "@/components/ui/ProjectFeature";
import { projects } from "@/data/projects";

export function SelectedWork() {
  return (
    <section id="work" className="scroll-mt-20 py-24 md:py-32 border-t border-ink/10">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHeader
          code="01"
          title="Selected Work"
          description="Three full-stack systems, each built to hold up under real questions: how is this tested, what happens when it fails, and why is it built this way."
        />

        <div>
          {projects.map((project) => (
            <ProjectFeature key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
