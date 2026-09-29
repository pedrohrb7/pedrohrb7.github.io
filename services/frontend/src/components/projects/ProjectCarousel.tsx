"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { currentSlide, fillTemplate, formatCounter } from "@/lib/carousel";
import type { ProjectCarouselLabels } from "@/types/content";
import { ArrowLeftIcon, ArrowRightIcon } from "@/ui/icons";

/*
 * Projects carousel (docs/features/projects-carousel/). The track is a native horizontal scroller with CSS scroll-snap,
 * so swiping, trackpads and arrow keys work without JavaScript; this component only syncs the counter, buttons and
 * indicators with the scroll position. Split in parts sharing a context so the controls can sit in the section header.
 */

type CarouselState = {
  count: number;
  index: number;
  trackRef: RefObject<HTMLDivElement | null>;
  setIndex: (index: number) => void;
  goTo: (index: number) => void;
};

const CarouselContext = createContext<CarouselState | null>(null);

function useCarousel() {
  const state = useContext(CarouselContext);
  if (!state) throw new Error("Carousel parts must be inside <ProjectCarousel>.");
  return state;
}

const slidesOf = (track: HTMLDivElement) => [...track.children] as HTMLElement[];

export function ProjectCarousel({ count, children }: { count: number; children: ReactNode }) {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((target: number) => {
    const track = trackRef.current;
    const slide = track && slidesOf(track)[target];
    if (!track || !slide) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: slide.offsetLeft, behavior: reduceMotion ? "auto" : "smooth" });
  }, []);

  return <CarouselContext value={{ count, index, trackRef, setIndex, goTo }}>{children}</CarouselContext>;
}

export function ProjectCarouselTrack({ labels, slides }: { labels: ProjectCarouselLabels; slides: ReactNode[] }) {
  const { count, trackRef, setIndex } = useCarousel();
  const multiple = count > 1;

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !multiple) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      setIndex(
        currentSlide({
          scrollLeft: track.scrollLeft,
          maxScrollLeft: track.scrollWidth - track.clientWidth,
          slideOffsets: slidesOf(track).map((slide) => slide.offsetLeft),
        }),
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    track.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [trackRef, setIndex, multiple]);

  return (
    <div
      ref={trackRef}
      // Focusable so keyboard users can scroll it with the arrow keys.
      tabIndex={multiple ? 0 : undefined}
      aria-label={multiple ? labels.track : undefined}
      role={multiple ? "region" : undefined}
      // Slides stretch to the tallest one (flex default), so every card has the same height; the track is as tall as
      // that card and never needs to scroll vertically.
      className="relative flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden scroll-smooth rounded-lg [scrollbar-width:none] motion-reduce:scroll-auto [&::-webkit-scrollbar]:hidden"
    >
      {slides.map((slide, position) => (
        <div
          key={position}
          role={multiple ? "group" : undefined}
          aria-roledescription={multiple ? labels.slideRoleDescription : undefined}
          aria-label={multiple ? fillTemplate(labels.slideLabel, { n: position + 1, total: count }) : undefined}
          // flex: the card inside fills the stretched slide.
          className={`flex shrink-0 snap-start ${multiple ? "w-5/6 md:w-full" : "w-full"}`}
        >
          {slide}
        </div>
      ))}
    </div>
  );
}

const controlClass =
  "flex size-11 cursor-pointer items-center justify-center rounded-md border border-border text-muted transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border disabled:hover:text-muted";

export function ProjectCarouselControls({ labels }: { labels: ProjectCarouselLabels }) {
  const { count, index, goTo } = useCarousel();
  if (count < 2) return null;

  return (
    <div data-requires-js className="flex items-center gap-3">
      <span className="font-mono text-xs text-muted" aria-live="polite">
        {formatCounter(index, count)}
      </span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label={labels.previous}
          disabled={index === 0}
          onClick={() => goTo(index - 1)}
          className={controlClass}
        >
          <ArrowLeftIcon />
        </button>
        <button
          type="button"
          aria-label={labels.next}
          disabled={index === count - 1}
          onClick={() => goTo(index + 1)}
          className={controlClass}
        >
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
}

export function ProjectCarouselIndicators({ labels }: { labels: ProjectCarouselLabels }) {
  const { count, index, goTo } = useCarousel();
  if (count < 2) return null;

  return (
    <div data-requires-js className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
      <div className="flex items-center gap-1">
        {Array.from({ length: count }, (_, position) => {
          const current = position === index;
          return (
            // 24px tall hit area around a 4px bar.
            <button
              key={position}
              type="button"
              aria-label={fillTemplate(labels.goTo, { n: position + 1 })}
              aria-current={current ? "true" : undefined}
              onClick={() => goTo(position)}
              className="group flex h-6 w-9 cursor-pointer items-center justify-center"
            >
              <span
                className={`h-1 w-8 rounded-full transition-colors ${
                  current ? "bg-accent" : "bg-border group-hover:bg-muted"
                }`}
              />
            </button>
          );
        })}
      </div>
      <p className="font-mono text-xs text-muted">{labels.hint}</p>
    </div>
  );
}
