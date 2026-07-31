import { Hero } from "@/sections/Hero";
import { SelectedWork } from "@/sections/SelectedWork";
import { EngineeringProof } from "@/sections/EngineeringProof";
import { Journey } from "@/sections/Journey";
import { Experience } from "@/sections/Experience";
import { Capabilities } from "@/sections/Capabilities";
import { CurrentFocus } from "@/sections/CurrentFocus";
import { Contact } from "@/sections/Contact";
import { usePageMeta } from "@/lib/usePageMeta";

export function Home() {
  usePageMeta(
    "Jai Maheshwari — Software Engineer",
    "Software engineer building full-stack systems that solve real business problems. Enterprise engineering, full-stack systems, and AI-enabled tools.",
    "/"
  );

  return (
    <>
      <Hero />
      <SelectedWork />
      <EngineeringProof />
      <Journey />
      <Experience />
      <Capabilities />
      <CurrentFocus />
      <Contact />
    </>
  );
}
