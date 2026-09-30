/*
 * Theme choice. "system" follows prefers-color-scheme; any other theme is set as <html data-theme="...">
 * and styled in src/styles/tokens.css. To add a theme: add it here, give it a label in Content.ui.theme
 * (pt.ts and en.ts), an icon in ThemeIcon and a [data-theme] block in tokens.css.
 */
export const themes = ["system", "light", "dark"] as const;

export type Theme = (typeof themes)[number];

export const defaultTheme: Theme = "system";

export const themeStorageKey = "theme";

// Fired on window after the choice changes in this tab ("storage" only fires in the other tabs).
export const themeChangeEvent = "themechange";

export function isTheme(value: unknown): value is Theme {
  return (themes as readonly unknown[]).includes(value);
}

// Storage can throw (blocked cookies, some private modes); the site then just follows the system.
export function readStoredTheme(): Theme {
  try {
    const stored = localStorage.getItem(themeStorageKey);
    return isTheme(stored) ? stored : defaultTheme;
  } catch {
    return defaultTheme;
  }
}

export function storeTheme(theme: Theme) {
  try {
    if (theme === defaultTheme) localStorage.removeItem(themeStorageKey);
    else localStorage.setItem(themeStorageKey, theme);
  } catch {
    // Not persisted, but still applied to the current page.
  }
  window.dispatchEvent(new Event(themeChangeEvent));
}

export function applyTheme(theme: Theme, root: HTMLElement = document.documentElement) {
  if (theme === defaultTheme) delete root.dataset.theme;
  else root.dataset.theme = theme;
}

// Set on <html> while a theme change animates, so globals.css gives it its own diagonal sweep
// (docs/features/ui-transitions/).
export const themeTransitionAttribute = "data-theme-transition";

let runningThemeTransition: ViewTransition | null = null;

// Runs a theme change as a view transition: the new colors sweep across the old ones. `update` must change the theme
// synchronously, since the browser captures the new state right after it returns. Without the View Transitions API or
// with reduced motion, it just runs `update`.
export function transitionTheme(update: () => void, doc: Document = document) {
  const reduceMotion = doc.defaultView?.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  if (reduceMotion || typeof doc.startViewTransition !== "function") {
    update();
    return;
  }
  const root = doc.documentElement;
  root.setAttribute(themeTransitionAttribute, "");
  const transition = doc.startViewTransition(update);
  runningThemeTransition = transition;
  // A second change before the first ends skips the first; only the last one clears the attribute.
  transition.finished.finally(() => {
    if (runningThemeTransition !== transition) return;
    runningThemeTransition = null;
    root.removeAttribute(themeTransitionAttribute);
  });
}

// Inlined in <head> by ThemeScript: runs before the first paint, so a stored theme never flashes the system one.
export const themeInitScript = `try{var t=localStorage.getItem(${JSON.stringify(themeStorageKey)});if(${JSON.stringify(
  themes.filter((theme) => theme !== defaultTheme),
)}.indexOf(t)>-1)document.documentElement.dataset.theme=t}catch(e){}`;
