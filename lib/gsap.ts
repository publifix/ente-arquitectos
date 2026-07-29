"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

let lenis: Lenis | undefined;

export function getLenis() {
  return lenis;
}

/**
 * Creates the Lenis smooth-scroll instance and drives it from GSAP's
 * ticker so its raf loop stays in lockstep with ScrollTrigger. Returns a
 * cleanup function; call it from the effect that owns the instance.
 */
export function createSmoothScroll() {
  if (typeof window === "undefined") return () => {};

  lenis = new Lenis({
    duration: 1.2,
    autoRaf: false,
  });

  lenis.on("scroll", ScrollTrigger.update);

  const onTick = (time: number) => {
    lenis?.raf(time * 1000);
  };
  gsap.ticker.add(onTick);
  gsap.ticker.lagSmoothing(0);

  ScrollTrigger.refresh();

  return () => {
    gsap.ticker.remove(onTick);
    lenis?.destroy();
    lenis = undefined;
  };
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
