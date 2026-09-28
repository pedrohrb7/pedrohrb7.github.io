import { themeInitScript } from "@/lib/theme";

// Goes in <head> of every root layout. A plain inline script (not next/script) so it runs synchronously
// before the body is painted; next/script's beforeInteractive doesn't guarantee that.
export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />;
}
