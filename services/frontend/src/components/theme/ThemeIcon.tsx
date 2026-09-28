import type { ReactNode } from "react";
import type { Theme } from "@/lib/theme";

function Icon({ size = 16, children }: { size?: number; children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const themePaths: Record<Theme, ReactNode> = {
  system: (
    <>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </>
  ),
  light: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </>
  ),
  dark: <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />,
};

export function ThemeIcon({ theme }: { theme: Theme }) {
  return <Icon>{themePaths[theme]}</Icon>;
}

export function ChevronDownIcon() {
  return (
    <Icon size={12}>
      <path d="m6 9 6 6 6-6" />
    </Icon>
  );
}

export function CheckIcon() {
  return (
    <Icon size={14}>
      <path d="M20 6 9 17l-5-5" />
    </Icon>
  );
}
