"use client";

import { useEffect, useState } from "react";
import { findActiveSection } from "@/lib/active-section";
import type { Content, SectionId } from "@/types/content";

const navSections: SectionId[] = ["about", "experience", "projects", "skills", "contact"];

// Where a section counts as "reached": 30% down the viewport, below the sticky header and the scroll-mt-20 offset.
const activeLineRatio = 0.3;

type SectionNavProps = {
  ui: Content["ui"];
};

// Without JS the links work as before, just without the highlight.
export function SectionNav({ ui }: SectionNavProps) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    // Every section on the page, not only the ones in the menu: while reading "education" nothing is highlighted
    // instead of the previous menu item.
    const sections = [...document.querySelectorAll<HTMLElement>("main section[id]")];
    let frame = 0;

    const update = () => {
      frame = 0;
      const root = document.documentElement;
      const atBottom = window.innerHeight + window.scrollY >= root.scrollHeight - 2;
      const positions = sections.map((section) => ({ id: section.id, top: section.getBoundingClientRect().top }));
      setActive(findActiveSection(positions, window.innerHeight * activeLineRatio, atBottom));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <nav aria-label={ui.primaryNav} className="hidden md:block">
      <ul className="flex gap-6 text-sm lg:gap-8">
        {navSections.map((id) => {
          const current = id === active;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={current ? "location" : undefined}
                className={`transition-colors ${current ? "text-accent" : "text-muted hover:text-fg"}`}
              >
                {ui.sections[id]}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
