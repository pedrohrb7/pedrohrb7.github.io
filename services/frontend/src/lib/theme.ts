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

// Inlined in <head> by ThemeScript: runs before the first paint, so a stored theme never flashes the system one.
export const themeInitScript = `try{var t=localStorage.getItem(${JSON.stringify(themeStorageKey)});if(${JSON.stringify(
  themes.filter((theme) => theme !== defaultTheme),
)}.indexOf(t)>-1)document.documentElement.dataset.theme=t}catch(e){}`;
