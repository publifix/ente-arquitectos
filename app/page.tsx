import Image from "next/image";
import { basePath } from "@/lib/basePath";

const proyectosPrincipales = [
  { src: "/proyecto-principal-1.jpg", alt: "Proyecto principal 1" },
  { src: "/proyecto-principal-2.jpg", alt: "Proyecto principal 2" },
  { src: "/proyecto-principal-3.jpg", alt: "Proyecto principal 3" },
  { src: "/proyecto-principal-4.jpg", alt: "Proyecto principal 4" },
  { src: "/proyecto-principal-5.jpg", alt: "Proyecto principal 5" },
];

const portafolio = [
  { src: "/portafolio-proyecto-1.png", alt: "Proyecto de portafolio 1", w: 850, h: 518 },
  { src: "/portafolio-proyecto-2.png", alt: "Proyecto de portafolio 2", w: 1280, h: 735 },
  { src: "/portafolio-proyecto-3.png", alt: "Proyecto de portafolio 3", w: 850, h: 518 },
  { src: "/portafolio-proyecto-4.png", alt: "Proyecto de portafolio 4", w: 850, h: 507 },
  { src: "/portafolio-proyecto-5.png", alt: "Proyecto de portafolio 5", w: 850, h: 507 },
];

// `next/image` with `images.unoptimized: true` does not prepend `basePath`
// to the `src` it renders, so public/ assets need the prefix added by hand.
const asset = (path: string) => `${basePath}${path}`;

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-white font-sans dark:bg-black">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-black/[.06] bg-white/90 px-6 py-4 backdrop-blur sm:px-12 dark:border-white/[.08] dark:bg-black/90">
        <div className="flex items-center gap-3">
          <Image
            src={asset("/ENTE-LOGO-TRANSPARENTE-WEB.png")}
            alt="Ente Arquitectos"
            width={40}
            height={40}
            priority
          />
          <span className="text-sm font-semibold tracking-wide uppercase">
            Ente Arquitectos
          </span>
        </div>
        <nav className="flex gap-6 text-sm font-medium">
          <a href="#proyectos" className="hover:opacity-70">
            Proyectos
          </a>
          <a href="#portafolio" className="hover:opacity-70">
            Portafolio
          </a>
          <a href="#contacto" className="hover:opacity-70">
            Contacto
          </a>
        </nav>
      </header>

      <main className="flex-1">
        <section className="flex flex-col items-center gap-8 px-6 py-20 text-center sm:px-12">
          <div className="h-64 w-64 overflow-hidden sm:h-80 sm:w-80">
            <iframe
              src={asset("/animacion-logo.html")}
              title="Animación del logo de Ente Arquitectos"
              className="h-full w-full border-0"
              loading="lazy"
            />
          </div>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Ente Arquitectos
          </h1>
          <p className="max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
            Diseño y arquitectura con una mirada precisa sobre el espacio, la
            materialidad y el detalle.
          </p>
        </section>

        <section id="proyectos" className="px-6 py-16 sm:px-12">
          <h2 className="mb-8 text-2xl font-semibold tracking-tight">
            Proyectos destacados
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {proyectosPrincipales.map((proyecto) => (
              <div
                key={proyecto.src}
                className="relative aspect-video overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900"
              >
                <Image
                  src={asset(proyecto.src)}
                  alt={proyecto.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              </div>
            ))}
          </div>
        </section>

        <section id="portafolio" className="px-6 py-16 sm:px-12">
          <h2 className="mb-8 text-2xl font-semibold tracking-tight">
            Portafolio
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {portafolio.map((proyecto) => (
              <div
                key={proyecto.src}
                className="overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900"
              >
                <Image
                  src={asset(proyecto.src)}
                  alt={proyecto.alt}
                  width={proyecto.w}
                  height={proyecto.h}
                  className="h-auto w-full object-cover"
                  sizes="(min-width: 640px) 50vw, 100vw"
                />
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer
        id="contacto"
        className="border-t border-black/[.06] px-6 py-10 text-sm text-zinc-600 sm:px-12 dark:border-white/[.08] dark:text-zinc-400"
      >
        <p>© {new Date().getFullYear()} Ente Arquitectos</p>
      </footer>
    </div>
  );
}
