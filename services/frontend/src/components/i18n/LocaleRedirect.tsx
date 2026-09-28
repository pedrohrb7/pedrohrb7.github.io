"use client";

import { useEffect } from "react";
import { detectLocale, localePath } from "@/lib/i18n";

// GitHub Pages has no server-side redirects, so "/" picks a locale in the browser.
export function LocaleRedirect() {
  useEffect(() => {
    window.location.replace(localePath(detectLocale(navigator.languages)));
  }, []);

  return null;
}
