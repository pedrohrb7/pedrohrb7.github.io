import type { ReactNode } from "react";
import type { Theme } from "@/lib/theme";
import { Icon } from "@/ui/icons";

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
