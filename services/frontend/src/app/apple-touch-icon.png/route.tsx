import { ImageResponse } from "next/og";
import { readGeistFont } from "@/lib/geist-fonts";
import { lightColors } from "@/styles/tokens";

// Required by output: "export" for route handlers.
export const dynamic = "force-static";

// Same "PB" monogram as public/icon.svg, full-bleed: iOS applies its own rounded mask.
export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: lightColors.accent,
          color: lightColors["accent-fg"],
          fontFamily: "Geist",
          fontSize: 96,
          fontWeight: 600,
          letterSpacing: -4,
        }}
      >
        PB
      </div>
    ),
    { width: 180, height: 180, fonts: [{ name: "Geist", data: await readGeistFont("sansSemiBold"), weight: 600 }] },
  );
}
