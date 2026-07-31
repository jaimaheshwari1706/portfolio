import { useEffect } from "react";
import { siteConfig } from "@/config/site";

const SCRIPT_ID = "person-jsonld";

export function useSiteJsonLd() {
  useEffect(() => {
    if (document.getElementById(SCRIPT_ID)) return;

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: siteConfig.name,
      jobTitle: siteConfig.role,
      url: siteConfig.siteUrl,
      email: siteConfig.email,
      sameAs: [siteConfig.github, siteConfig.linkedin],
      knowsAbout: [
        "Full-Stack Development",
        "React",
        "Node.js",
        "MongoDB",
        "TypeScript",
        "System Architecture",
      ],
    });
    document.head.appendChild(script);
  }, []);
}
