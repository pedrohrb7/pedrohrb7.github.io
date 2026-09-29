"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore, type KeyboardEvent } from "react";
import { flushSync } from "react-dom";
import {
  applyTheme,
  defaultTheme,
  readStoredTheme,
  storeTheme,
  themeChangeEvent,
  themeStorageKey,
  themes,
  transitionTheme,
  type Theme,
} from "@/lib/theme";
import type { Content } from "@/types/content";
import { CheckIcon, ChevronDownIcon } from "@/ui/icons";
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

/*
 * Theme picker: a button showing the effective scheme (sun or moon, even on "system") that opens a listbox.
 * Follows the WAI-ARIA "select-only combobox" pattern: arrows, Home/End, Enter/Space, Escape, Tab and typing a
 * letter all work; the option list is data-driven, so new themes are just more entries in `themes`.
 */
export function ThemeSelect({ labels }: ThemeSelectProps) {
  // The server can't know the stored theme; the static HTML renders "system" and hydration picks up the real one.
  const theme = useSyncExternalStore(subscribe, readStoredTheme, () => defaultTheme);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const id = useId();
  const listId = `${id}-list`;
  const optionId = (index: number) => `${id}-option-${index}`;

  // Keeps <html data-theme> in sync, including choices made in other tabs.
  useEffect(() => applyTheme(theme), [theme]);

  // Closes on a click or tap outside.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const openList = () => {
    setActive(themes.indexOf(theme));
    setOpen(true);
  };

  const choose = (choice: Theme) => {
    // Closed before the transition captures the old state, so the list doesn't fade out with the page.
    flushSync(() => setOpen(false));
    buttonRef.current?.focus();
    // applyTheme right away, not through the effect below: the transition needs the new colors when `update` returns.
    transitionTheme(() => {
      applyTheme(choice);
      storeTheme(choice);
    });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const last = themes.length - 1;
    const keys: Record<string, () => void> = open
      ? {
          ArrowDown: () => setActive((index) => Math.min(index + 1, last)),
          ArrowUp: () => setActive((index) => Math.max(index - 1, 0)),
          Home: () => setActive(0),
          End: () => setActive(last),
          Enter: () => choose(themes[active]),
          " ": () => choose(themes[active]),
          Escape: () => setOpen(false),
        }
      : { ArrowDown: openList, ArrowUp: openList, Enter: openList, " ": openList };

    if (event.key === "Tab") {
      setOpen(false);
      return;
    }
    const action = keys[event.key];
    if (action) {
      event.preventDefault();
      action();
      return;
    }
    // Typing a letter jumps to the first option starting with it.
    if (open && event.key.length === 1) {
      const match = themes.findIndex((option) =>
        labels.options[option].toLowerCase().startsWith(event.key.toLowerCase()),
      );
      if (match >= 0) setActive(match);
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <div className="rounded-md border border-border p-0.5">
        <button
          ref={buttonRef}
          type="button"
          role="combobox"
          aria-label={labels.label}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          aria-activedescendant={open ? optionId(active) : undefined}
          title={`${labels.label}: ${labels.options[theme]}`}
          onClick={() => (open ? setOpen(false) : openList())}
          onKeyDown={onKeyDown}
          className="flex min-h-9 min-w-11 cursor-pointer items-center justify-center gap-1 rounded px-2 text-muted transition-colors hover:text-fg"
        >
          {/* The effective scheme, decided in CSS by the `dark:` variant so it is right before hydration. */}
          <span className="dark:hidden">
            <ThemeIcon theme="light" />
          </span>
          <span className="hidden dark:block">
            <ThemeIcon theme="dark" />
          </span>
          <span className={`transition-transform ${open ? "rotate-180" : ""}`}>
            <ChevronDownIcon />
          </span>
        </button>
      </div>
      <ul
        id={listId}
        role="listbox"
        aria-label={labels.label}
        hidden={!open}
        className="absolute top-full right-0 z-20 mt-2 min-w-40 rounded-md border border-border bg-surface p-1 text-sm"
      >
        {themes.map((option, index) => {
          const selected = option === theme;
          return (
            <li
              key={option}
              id={optionId(index)}
              role="option"
              aria-selected={selected}
              onPointerEnter={() => setActive(index)}
              onClick={() => choose(option)}
              // No color transition: the highlight must follow arrow keys and the pointer instantly.
              className={`flex min-h-9 cursor-pointer items-center gap-2 rounded px-3 ${
                index === active ? "bg-accent/10" : ""
              } ${selected ? "font-medium text-accent" : index === active ? "text-fg" : "text-muted"}`}
            >
              <ThemeIcon theme={option} />
              <span className="flex-1">{labels.options[option]}</span>
              {selected && <CheckIcon />}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
