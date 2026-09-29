import type { ReactNode } from "react";

// Inline stroke icons (no icon font): 24x24 grid, currentColor, decorative (aria-hidden).
export function Icon({ size = 16, children }: { size?: number; children: ReactNode }) {
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

export function ChevronDownIcon() {
  return (
    <Icon size={12}>
      <path d="m6 9 6 6 6-6" />
    </Icon>
  );
}

export function CheckIcon({ size = 14 }: { size?: number }) {
  return (
    <Icon size={size}>
      <path d="M20 6 9 17l-5-5" />
    </Icon>
  );
}

export function CopyIcon({ size = 14 }: { size?: number }) {
  return (
    <Icon size={size}>
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </Icon>
  );
}
