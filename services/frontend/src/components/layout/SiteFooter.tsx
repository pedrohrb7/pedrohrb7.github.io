import { profile } from "@/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <p className="mx-auto max-w-3xl px-4 py-8 font-mono text-xs text-muted sm:px-6">
        © {new Date().getFullYear()} {profile.name}
      </p>
    </footer>
  );
}
