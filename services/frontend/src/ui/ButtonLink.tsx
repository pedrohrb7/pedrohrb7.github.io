import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
  download?: boolean;
};

const variants = {
  primary: "bg-accent text-accent-fg hover:opacity-90",
  secondary: "border border-border bg-surface text-fg hover:border-accent hover:text-accent",
} as const;

export function ButtonLink({ href, children, variant = "secondary", external = false, download = false }: ButtonLinkProps) {
  return (
    <a
      href={href}
      className={`inline-flex min-h-11 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors ${variants[variant]}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      download={download || undefined}
    >
      {children}
    </a>
  );
}
