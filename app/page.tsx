"use client";

import { useRef, useState } from "react";
import { Loader } from "@/components/sections/Loader";
import { FragmentedHeading } from "@/components/ui/FragmentedHeading";
import { SectionNumber } from "@/components/ui/SectionNumber";
import { gsap, useGSAP } from "@/lib/gsap";

export default function Home() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!heroRevealed || !heroRef.current) return;
      gsap.to(heroRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
      });
    },
    { dependencies: [heroRevealed] },
  );

  return (
    <>
      <Loader onDock={() => setHeroRevealed(true)} />

      <main>
        {/* Placeholder Hero — the real Hero (with the right-panel photo)
            lands in Prompt 02. This proves the Loader → reveal handoff
            and doubles as the FragmentedHeading demo from Prompt 00. */}
        <section
          ref={heroRef}
          data-cursor="light"
          className="flex h-screen flex-col justify-center gap-8 px-8 py-32 opacity-0 sm:px-16"
          style={{ transform: "translateY(24px)" }}
        >
          <SectionNumber value={1} label="Hero (placeholder)" />
          <FragmentedHeading
            as="h1"
            className="font-serif text-4xl leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl"
            lines={[
              "Arquitectura contemporánea",
              "pensada desde lo _esencial_,",
              "construida para durar.",
            ]}
          />
        </section>

        <section className="h-screen" aria-hidden="true" />
      </main>
    </>
  );
}
