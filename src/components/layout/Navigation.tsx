import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { profile } from "@/data/profile";

const links = [
  { href: "/#work", id: "work", label: "Work" },
  { href: "/#journey", id: "journey", label: "Journey" },
  { href: "/#experience", id: "experience", label: "Experience" },
  { href: "/#capabilities", id: "capabilities", label: "Capabilities" },
  { href: "/#contact", id: "contact", label: "Contact" },
];

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const location = useLocation();

  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  // Active-section tracking — homepage only, where the anchor targets exist.
  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveId(null);
      return;
    }
    const elements = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const topMost = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b
        );
        setActiveId(topMost.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [location.pathname]);

  // Mobile menu: focus management + prevent background interaction.
  useEffect(() => {
    const main = document.getElementById("main-content");
    const footer = document.querySelector("footer");

    if (open) {
      document.body.style.overflow = "hidden";
      main?.setAttribute("inert", "");
      footer?.setAttribute("inert", "");
      firstLinkRef.current?.focus();
    } else {
      document.body.style.overflow = "";
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
    }

    return () => {
      document.body.style.overflow = "";
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
    };
  }, [open]);

  // Escape closes; Tab is trapped within the panel while open.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const closeAndReturnFocus = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-paper/90 backdrop-blur-sm border-b border-ink/10" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto max-w-[1400px] px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="relative flex h-6 w-6 items-center justify-center border border-signal">
            <span className="h-1.5 w-1.5 bg-signal transition-transform duration-300 group-hover:scale-125" />
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-ink">
            {profile.name.split(" ")[0]}.{profile.name.split(" ")[1]?.[0]}
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const isActive = activeId === link.id;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`font-mono text-[11px] uppercase tracking-[0.14em] transition-colors ${
                    isActive ? "text-signal-dim" : "text-ink-soft hover:text-signal-dim"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="hidden md:block">
          <a
            href={profile.links.resume}
            className="font-mono text-[11px] uppercase tracking-[0.14em] border border-ink px-4 py-2 text-ink hover:bg-ink hover:text-paper transition-colors"
          >
            Resume
          </a>
        </div>

        <button
          ref={triggerRef}
          className="md:hidden text-ink"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu-panel"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu-panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden bg-paper border-b border-ink/10"
          >
            <ul className="px-6 py-6 space-y-5">
              {links.map((link, i) => (
                <li key={link.href}>
                  <a
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={link.href}
                    onClick={closeAndReturnFocus}
                    aria-current={activeId === link.id ? "true" : undefined}
                    className={`font-mono text-sm uppercase tracking-[0.14em] ${
                      activeId === link.id ? "text-signal-dim" : "text-ink"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={profile.links.resume}
                  className="inline-block font-mono text-sm uppercase tracking-[0.14em] border border-ink px-4 py-2 text-ink"
                >
                  Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
