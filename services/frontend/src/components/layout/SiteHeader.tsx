import type { ReactNode } from "react";
import { profile } from "@/content";

type SiteHeaderProps = {
  homeHref: string;
  children?: ReactNode;
};

export function SiteHeader({ homeHref, children }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-content items-center justify-between gap-4 px-4 sm:px-6">
        <a href={homeHref} className="font-mono text-sm font-semibold">
          {profile.name}
        </a>
        {children && <div className="flex items-center gap-6">{children}</div>}
      </div>
    </header>
  );
}
