import { FragmentedHeading } from "@/components/ui/FragmentedHeading";
import { SectionNumber } from "@/components/ui/SectionNumber";

export default function Home() {
  return (
    <main>
      {/* Spacer so the heading below starts out of view and the
          ScrollTrigger reveal is visible while scrolling, proving Lenis
          smooth scroll + ScrollTrigger are wired together correctly. */}
      <section className="flex h-screen items-center justify-center px-8">
        <p className="max-w-md text-center font-sans text-sm uppercase tracking-widest text-ink/50">
          Desplázate para ver el titular fragmentado
        </p>
      </section>

      <section className="flex min-h-screen flex-col justify-center gap-8 px-8 py-32 sm:px-16">
        <SectionNumber value={1} label="Demo" />
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
  );
}
