"use client";

import { useEffect, useId, useRef, type MouseEvent, type ReactNode } from "react";
import { fillTemplate } from "@/lib/carousel";
import { closeAction } from "@/lib/project-details";
import type { ProjectDetailsLabels } from "@/types/content";
import { ArrowRightIcon, CloseIcon } from "@/ui/icons";

/*
 * "View details" button plus the project's drawer (docs/features/project-details/). A native modal <dialog> gives the
 * focus trap, Esc, the inert page behind it and focus returning to the button. The drawer's content is rendered on the
 * server and comes in as children. The URL hash mirrors the drawer, so a link with the hash opens it.
 */

type ProjectDetailsProps = {
  hash: string;
  number: string;
  name: string;
  role: string;
  labels: ProjectDetailsLabels;
  children: ReactNode;
};

/*
 * Bottom sheet on phones, right-hand drawer from md up (docs/features/ui-transitions/, phase 5). Closed, the panel sits
 * off screen and the backdrop is clear; open, both are in place. So the same transition runs both ways: in with
 * @starting-style (starting:) in 700 ms, out in 200 ms ease-in. The way in is long on purpose (Pedro found 300 ms
 * abrupt), on a curve that starts fast and settles slowly, like a sheet (ease-sheet, tokens.css). transition-discrete
 * on display and overlay keeps the closed dialog shown and in the top layer until it has slid out. No motion with prefers-reduced-motion: every
 * transition class is motion-safe:, durations included (a bare duration-* would animate the default
 * transition-property, all). open:flex, not flex: a display class would override the closed dialog's display: none.
 */
const drawerClassName = [
  "fixed inset-x-0 top-auto bottom-0 m-0 max-h-[90dvh] w-full max-w-none flex-col overflow-hidden outline-none open:flex",
  "rounded-t-lg border-t border-border bg-surface text-fg",
  "md:inset-y-0 md:right-0 md:left-auto md:h-dvh md:max-h-none md:max-w-drawer md:rounded-none md:border-t-0 md:border-l",
  // Panel: off screen when closed and before it opens, in place when open.
  "translate-y-full open:translate-y-0 starting:open:translate-y-full",
  "md:translate-x-full md:translate-y-0 md:open:translate-x-0 md:starting:open:translate-x-full md:starting:open:translate-y-0",
  "motion-safe:transition-[translate,display,overlay] motion-safe:transition-discrete",
  "motion-safe:duration-200 motion-safe:ease-in motion-safe:open:duration-700 motion-safe:open:ease-sheet",
  // Backdrop: same timing, clear when closed.
  "backdrop:bg-transparent open:backdrop:bg-overlay/50 starting:open:backdrop:bg-transparent",
  "motion-safe:backdrop:transition-[background-color,display,overlay] motion-safe:backdrop:transition-discrete",
  "motion-safe:backdrop:duration-200 motion-safe:backdrop:ease-in",
  "motion-safe:open:backdrop:duration-700 motion-safe:open:backdrop:ease-sheet",
].join(" ");

// Focus goes to the drawer itself, not to its first control: screen readers announce the title, Tab reaches the x,
// and the x doesn't show a focus ring when the drawer opens from a link (no click before it).
function show(dialog: HTMLDialogElement) {
  dialog.showModal();
  dialog.focus();
}

export function ProjectDetails({ hash, number, name, role, labels, children }: ProjectDetailsProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  // Whether the open drawer has a history entry of its own (opened by the button), so closing it can pop that entry.
  const pushed = useRef(false);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    // Follows the URL: a link with the hash, Back/Forward, or a hash typed in the address bar.
    const sync = () => {
      const target = window.location.hash === hash;
      if (target && !dialog.open) {
        pushed.current = false;
        show(dialog);
      } else if (!target && dialog.open) {
        dialog.close();
      }
    };

    const onClose = () => {
      const action = closeAction({ hash: window.location.hash, ownHash: hash, pushed: pushed.current });
      pushed.current = false;
      if (action === "back") window.history.back();
      // null state: Next.js' patched replaceState keeps its router state in the entry.
      if (action === "replace") window.history.replaceState(null, "", window.location.pathname + window.location.search);
    };

    sync();
    dialog.addEventListener("close", onClose);
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync);
    return () => {
      dialog.removeEventListener("close", onClose);
      window.removeEventListener("popstate", sync);
      window.removeEventListener("hashchange", sync);
    };
  }, [hash]);

  const open = () => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    pushed.current = true;
    // Goes through Next.js' patched pushState, which copies its router state: a Back to an entry without it would
    // make the App Router reload the page.
    window.history.pushState(null, "", hash);
    show(dialog);
  };

  // A click on the backdrop targets the dialog itself; clicks on the content land on its children.
  const closeOnBackdrop = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) event.currentTarget.close();
  };

  return (
    <>
      <button
        type="button"
        data-requires-js
        aria-haspopup="dialog"
        aria-label={fillTemplate(labels.openAriaLabel, { name })}
        onClick={open}
        // -ml-3: the text lines up with the card's content. -mb-3: the 44px target overlaps the card's padding, so the
        // text sits as far from the card's bottom edge as from the divider above it.
        className="group -mb-3 -ml-3 inline-flex min-h-11 shrink-0 cursor-pointer items-center gap-1.5 rounded-md px-3 text-sm font-medium text-accent transition-colors hover:bg-accent/10"
      >
        {labels.open}
        {/* The arrow nudges toward where the drawer comes from. */}
        <span className="transition-transform duration-150 ease-out motion-safe:group-hover:translate-x-1">
          <ArrowRightIcon />
        </span>
      </button>
      <dialog
        ref={dialogRef}
        tabIndex={-1}
        aria-labelledby={titleId}
        onClick={closeOnBackdrop}
        className={drawerClassName}
      >
        <header className="flex items-start justify-between gap-4 border-b border-border py-4 pr-3 pl-6">
          <div className="min-w-0 pt-2.5">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-xs text-accent">[{number}]</span>
              <h2 id={titleId} className="text-lg font-semibold">
                {name}
              </h2>
            </div>
            <p className="mt-1 font-mono text-xs text-muted">{role}</p>
          </div>
          <button
            type="button"
            aria-label={labels.close}
            onClick={() => dialogRef.current?.close()}
            className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted transition-[color,scale] hover:text-accent motion-safe:active:scale-95"
          >
            <CloseIcon />
          </button>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-6">{children}</div>
      </dialog>
    </>
  );
}
