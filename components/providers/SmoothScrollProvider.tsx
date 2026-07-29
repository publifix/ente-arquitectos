"use client";

import { useEffect } from "react";
import { createSmoothScroll } from "@/lib/gsap";

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const cleanup = createSmoothScroll();
    return cleanup;
  }, []);

  return <>{children}</>;
}
