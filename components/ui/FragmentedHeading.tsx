"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

// Wrap a substring in this delimiter to render it as the emphasized
// word/phrase, e.g. "Arquitectura _contemporánea_ para vivir".
const EMPHASIS_DELIMITER = "_";

function renderLine(line: string): ReactNode {
  const parts = line.split(EMPHASIS_DELIMITER);

  return parts.map((part, index) =>
    // Odd indexes are the segments between delimiters, i.e. the
    // emphasized phrase.
    index % 2 === 1 ? (
      <em key={index} className="italic text-coral">
        {part}
      </em>
    ) : (
      part
    ),
  );
}

type FragmentedHeadingProps = {
  lines: string[];
  as?: ElementType;
  className?: string;
};

export function FragmentedHeading({
  lines,
  as: Tag = "h1",
  className = "",
}: FragmentedHeadingProps) {
  const containerRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // `type: "lines"` re-measures the rendered element and groups its
      // text into the *visual* lines the browser actually wraps to (not
      // just our `lines` array), masking each one so it can rise from
      // below without revealing neighboring lines.
      const split = SplitText.create(containerRef.current, {
        type: "lines",
        mask: "lines",
        linesClass: "line",
      });

      gsap.from(split.lines, {
        yPercent: 110,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      return () => {
        split.revert();
      };
    },
    { scope: containerRef, dependencies: [lines] },
  );

  return (
    <Tag ref={containerRef} className={className}>
      {lines.map((line, index) => (
        <span key={index} className="block">
          {renderLine(line)}
        </span>
      ))}
    </Tag>
  );
}
