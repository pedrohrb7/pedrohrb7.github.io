"use client";

import { useEffect, useState } from "react";
import { CheckIcon, CopyIcon } from "./icons";

export type CopyFieldLabels = {
  copy: string;
  copyAriaLabel: string;
  copied: string;
  failed: string;
};

type CopyFieldProps = {
  value: string;
  labels: CopyFieldLabels;
};

type Status = "idle" | "copied" | "failed";

const resetAfterMs = 2000;

// A value shown as selectable text with a copy button. Without JavaScript the button is hidden
// (data-requires-js) and the text can still be selected and copied by hand.
export function CopyField({ value, labels }: CopyFieldProps) {
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (status === "idle") return;
    const timer = setTimeout(() => setStatus("idle"), resetAfterMs);
    return () => clearTimeout(timer);
  }, [status]);

  const copy = async () => {
    try {
      // Throws when the Clipboard API is missing (insecure context) or permission is denied.
      await navigator.clipboard.writeText(value);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  };

  return (
    // Same 44px height as ButtonLink (min-h-11 includes the border), so it lines up with the buttons next to it.
    <div className="inline-flex min-h-11 max-w-full items-center gap-2 rounded-md border border-border bg-surface pr-1 pl-4">
      <span className="min-w-0 font-mono text-sm break-all select-all">{value}</span>
      <button
        type="button"
        data-requires-js
        aria-label={labels.copyAriaLabel}
        onClick={copy}
        className="flex min-h-9 shrink-0 cursor-pointer items-center gap-1.5 rounded px-3 text-sm font-medium text-accent transition-colors hover:bg-accent/10"
      >
        {status === "copied" ? <CheckIcon /> : <CopyIcon />}
        <span>{status === "copied" ? labels.copied : status === "failed" ? labels.failed : labels.copy}</span>
      </button>
      <span className="sr-only" aria-live="polite">
        {status === "copied" ? labels.copied : status === "failed" ? labels.failed : ""}
      </span>
    </div>
  );
}
