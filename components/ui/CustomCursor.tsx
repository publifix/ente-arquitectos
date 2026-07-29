"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type BackgroundMode = "light" | "dark";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, summary, [data-cursor-hover]';

function readColorToken(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

export function CustomCursor() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [bgMode, setBgMode] = useState<BackgroundMode>("light");
  const [hovering, setHovering] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const tokensRef = useRef<{ ink: string; cream: string; coral: string } | null>(null);

  // Desktop-only: on touch devices this renders nothing at all.
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Hide the native cursor while ours is active.
  useEffect(() => {
    if (!isDesktop) return;
    document.body.classList.add("cursor-none");
    return () => document.body.classList.remove("cursor-none");
  }, [isDesktop]);

  // Follow the mouse with a soft lag.
  useGSAP(
    () => {
      if (!isDesktop || !dotRef.current) return;

      gsap.set(dotRef.current, { xPercent: -50, yPercent: -50 });
      const xTo = gsap.quickTo(dotRef.current, "x", { duration: 0.2, ease: "power3" });
      const yTo = gsap.quickTo(dotRef.current, "y", { duration: 0.2, ease: "power3" });

      const handleMove = (e: MouseEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
      };
      window.addEventListener("mousemove", handleMove);
      return () => window.removeEventListener("mousemove", handleMove);
    },
    { dependencies: [isDesktop] },
  );

  // Track hover over interactive elements.
  useEffect(() => {
    if (!isDesktop) return;

    const isInteractive = (el: EventTarget | null) =>
      el instanceof Element && !!el.closest(INTERACTIVE_SELECTOR);

    const handleOver = (e: MouseEvent) => {
      if (isInteractive(e.target)) setHovering(true);
    };
    const handleOut = (e: MouseEvent) => {
      if (!isInteractive(e.relatedTarget)) setHovering(false);
    };

    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);
    return () => {
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [isDesktop]);

  // Track which `[data-cursor]` section currently dominates the viewport.
  useEffect(() => {
    if (!isDesktop) return;

    const observedRatios = new Map<Element, number>();

    const pickMode = () => {
      let best: Element | null = null;
      let bestRatio = 0;
      observedRatios.forEach((ratio, el) => {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          best = el;
        }
      });
      if (best) {
        setBgMode((best as HTMLElement).dataset.cursor === "dark" ? "dark" : "light");
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          observedRatios.set(entry.target, entry.isIntersecting ? entry.intersectionRatio : 0);
        });
        pickMode();
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    const observe = (el: Element) => {
      if (observedRatios.has(el)) return;
      observedRatios.set(el, 0);
      io.observe(el);
    };
    const unobserve = (el: Element) => {
      observedRatios.delete(el);
      io.unobserve(el);
      pickMode();
    };

    document.querySelectorAll("[data-cursor]").forEach(observe);

    // Sections mount/unmount over time (e.g. the Loader), so keep watching
    // the document for new/removed `[data-cursor]` containers instead of
    // hardcoding a list of section components.
    const mo = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches("[data-cursor]")) observe(node);
          node.querySelectorAll("[data-cursor]").forEach(observe);
        });
        mutation.removedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches("[data-cursor]")) unobserve(node);
          node.querySelectorAll("[data-cursor]").forEach(unobserve);
        });
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [isDesktop]);

  // Animate color/scale whenever hover state or background mode changes.
  useEffect(() => {
    if (!isDesktop || !dotRef.current) return;

    if (!tokensRef.current) {
      tokensRef.current = {
        ink: readColorToken("--color-ink"),
        cream: readColorToken("--color-cream"),
        coral: readColorToken("--color-coral"),
      };
    }
    const tokens = tokensRef.current;

    const backgroundColor = hovering ? tokens.coral : bgMode === "dark" ? tokens.cream : tokens.ink;
    const scale = hovering ? 2.2 : 1;

    gsap.to(dotRef.current, {
      backgroundColor,
      scale,
      duration: 0.4,
      ease: "power2.out",
    });
  }, [isDesktop, hovering, bgMode]);

  if (!isDesktop) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-3 w-3 rounded-full"
      style={{ backgroundColor: "var(--color-ink)" }}
    />
  );
}
