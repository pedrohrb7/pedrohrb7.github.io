"use client";

import { useEffect, useSyncExternalStore } from "react";
import {
  applyTheme,
  defaultTheme,
  isTheme,
  readStoredTheme,
  storeTheme,
  themeChangeEvent,
  themeStorageKey,
  themes,
} from "@/lib/theme";
import type { Content } from "@/types/content";
import { ThemeIcon } from "./ThemeIcon";

function subscribe(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === null || event.key === themeStorageKey) onChange();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(themeChangeEvent, onChange);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(themeChangeEvent, onChange);
  };
}

type ThemeSelectProps = {
  labels: Content["ui"]["theme"];
};

// Compact icon button in the header backed by a native <select>: keyboard, screen reader and the mobile picker
// come for free, and new themes are just more options.
export function ThemeSelect({ labels }: ThemeSelectProps) {
  // The server can't know the stored theme; the static HTML renders "system" and hydration picks up the real one.
  const theme = useSyncExternalStore(subscribe, readStoredTheme, () => defaultTheme);

  // Keeps <html data-theme> in sync, including choices made in other tabs.
  useEffect(() => applyTheme(theme), [theme]);

  return (
    <div
      title={`${labels.label}: ${labels.options[theme]}`}
      className="group relative rounded-md border border-border p-0.5 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent"
    >
      {/* The invisible <select> sits on top, so hover and focus styles are driven from this wrapper. */}
      <div className="flex min-h-9 min-w-11 items-center justify-center rounded text-muted transition-colors group-hover:text-fg">
        <ThemeIcon theme={theme} />
      </div>
      <select
        aria-label={labels.label}
        value={theme}
        onChange={(event) => {
          if (isTheme(event.target.value)) storeTheme(event.target.value);
        }}
        // Explicit colors: Tailwind's preflight makes form controls inherit the text color with a transparent
        // background, so in dark mode the native option list showed light text on the browser's white popup.
        className="absolute inset-0 cursor-pointer appearance-none bg-surface text-fg opacity-0 focus-visible:outline-none"
      >
        {themes.map((option) => (
          <option key={option} value={option} className="bg-surface text-fg">
            {labels.options[option]}
          </option>
        ))}
      </select>
    </div>
  );
}
