"use client";

import { useEffect, useRef, useState } from "react";
import { LogoSketch } from "@/components/ui/LogoSketch";
import { gsap, useGSAP } from "@/lib/gsap";
import { HERO_IMAGE_SRC, LOGO_SRC } from "@/lib/assets";

const MIN_DURATION = 2.8;
const DOCKED_SIZE = 52; // px — matches the persistent nav logo, left-6 top-6

type LoaderProps = {
  /** Fired once, slightly before the docking animation finishes, so the
   * Hero can start revealing with a bit of overlap. */
  onDock?: () => void;
};

export function Loader({ onDock }: LoaderProps) {
  const [tweenValue, setTweenValue] = useState(0);
  const [tweenDone, setTweenDone] = useState(false);
  const [resourcesLoaded, setResourcesLoaded] = useState(false);
  const [phase, setPhase] = useState<"loading" | "exiting" | "docked">("loading");

  // Real progress never reports 100% until both the minimum-duration tween
  // and the critical resources have settled, whichever takes longer.
  const progress = tweenDone && resourcesLoaded ? 1 : Math.min(tweenValue, 0.97);

  const overlayRef = useRef<HTMLDivElement>(null);
  const logoBoxRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  // Preload the Hero's critical image + the logo + fonts, and drive the
  // minimum-duration tween in parallel.
  useEffect(() => {
    let settled = 0;
    const total = 3;
    const settle = () => {
      settled += 1;
      if (settled >= total) setResourcesLoaded(true);
    };

    const heroImg = new window.Image();
    heroImg.onload = settle;
    heroImg.onerror = settle;
    heroImg.src = HERO_IMAGE_SRC;

    const logoImg = new window.Image();
    logoImg.onload = settle;
    logoImg.onerror = settle;
    logoImg.src = LOGO_SRC;

    (document.fonts?.ready ?? Promise.resolve()).then(settle);

    // Safety net: never block the intro forever on a stalled resource.
    const safety = window.setTimeout(() => setResourcesLoaded(true), 6000);

    const obj = { value: 0 };
    const tween = gsap.to(obj, {
      value: 1,
      duration: MIN_DURATION,
      ease: "power1.inOut",
      onUpdate: () => setTweenValue(obj.value),
      onComplete: () => setTweenDone(true),
    });

    return () => {
      window.clearTimeout(safety);
      tween.kill();
    };
  }, []);

  // Once progress hits 100%, hold briefly so the completed mark registers,
  // then kick off the exit transition.
  useEffect(() => {
    if (progress < 1 || phase !== "loading") return;
    const t = window.setTimeout(() => setPhase("exiting"), 300);
    return () => window.clearTimeout(t);
  }, [progress, phase]);

  // Initial centered/oversized placement of the logo box (GSAP-only
  // properties like xPercent can't be expressed as plain inline style).
  useGSAP(
    () => {
      if (!logoBoxRef.current) return;
      gsap.set(logoBoxRef.current, {
        position: "fixed",
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
        width: "min(70vw, 70vh)",
        height: "min(70vw, 70vh)",
      });
    },
    { dependencies: [] },
  );

  // Exit timeline: dock the logo to the header corner, fade the counter
  // and backdrop, and reveal the Hero with a slight overlap.
  useGSAP(
    () => {
      if (phase !== "exiting" || !logoBoxRef.current) return;

      const tl = gsap.timeline({
        onComplete: () => setPhase("docked"),
      });

      tl.to(
        logoBoxRef.current,
        {
          top: 24,
          left: 24,
          xPercent: 0,
          yPercent: 0,
          width: DOCKED_SIZE,
          height: DOCKED_SIZE,
          duration: 0.9,
          ease: "power3.inOut",
        },
        0,
      )
        .to(counterRef.current, { opacity: 0, duration: 0.3, ease: "power1.out" }, 0)
        .call(() => onDock?.(), [], 0.7)
        .to(overlayRef.current, { opacity: 0, duration: 0.5, ease: "power1.out" }, 0.7);
    },
    { dependencies: [phase] },
  );

  if (phase === "docked") {
    // The overlay is gone; only the docked mark persists as the site's
    // nav logo for the rest of the scroll journey.
    return (
      <div
        className="fixed left-6 top-6 z-40"
        style={{ width: DOCKED_SIZE, height: DOCKED_SIZE }}
        aria-hidden="true"
      >
        <LogoSketch progress={1} />
      </div>
    );
  }

  return (
    <div
      ref={overlayRef}
      data-cursor="light"
      className="fixed inset-0 z-50 bg-cream"
      style={{ pointerEvents: phase === "exiting" ? "none" : "auto" }}
    >
      <div ref={logoBoxRef}>
        <LogoSketch progress={progress} />
      </div>
      <div
        ref={counterRef}
        className="fixed bottom-8 right-8 font-serif text-4xl text-ink sm:text-5xl"
      >
        {Math.round(progress * 100)}%
      </div>
    </div>
  );
}
