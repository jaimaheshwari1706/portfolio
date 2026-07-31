import { useEffect } from "react";
import { siteConfig } from "@/config/site";

function setMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(path: string) {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", `${siteConfig.siteUrl}${path}`);
}

export function usePageMeta(title: string, description: string, path = "/") {
  useEffect(() => {
    const fullTitle = title.includes(siteConfig.name) ? title : `${title} — ${siteConfig.name}`;
    const imageUrl = `${siteConfig.siteUrl}${siteConfig.ogImage}`;

    document.title = fullTitle;
    setMeta("description", description);

    setMeta("og:title", fullTitle, "property");
    setMeta("og:description", description, "property");
    setMeta("og:url", `${siteConfig.siteUrl}${path}`, "property");
    setMeta("og:image", imageUrl, "property");
    setMeta("og:type", "website", "property");

    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);
    setMeta("twitter:image", imageUrl);

    setCanonical(path);
  }, [title, description, path]);
}
