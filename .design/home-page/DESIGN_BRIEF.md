# DESIGN_BRIEF.md — ENTE ARQUITECTOS (home page / storytelling principal)
### Preparado para el flujo de `designer-skills` (julianoczkowski) — colócalo en `.design/home-page/DESIGN_BRIEF.md` de tu repo antes de correr `/information-architecture` o `/design-tokens`, para que el skill parta de esto en vez de interrogarte desde cero con `/grill-me`.

---

## 1. Proyecto

**Cliente:** ENTE ARQUITECTOS (estudio de arquitectura + ENTE Constructora, su brazo de construcción).
**Tipo de sitio:** Landing/home narrativa de una sola página larga (long-scroll storytelling), en la línea de sitios premiados de arquitectura/real estate de lujo.
**Idioma:** Español.

## 2. Referencia e inspiración

**Sitio de referencia:** https://normalisboring.es/ (Awwwards Site of the Day — "avant-garde branding and digital experience for a luxury real estate brand").

Qué se toma de la referencia (método, no copia literal):
- Storytelling en scroll largo, dividido en "beats" narrativos, no en secciones genéricas de landing.
- Titulares fragmentados en líneas cortas que se revelan línea por línea al hacer scroll, con una palabra en cursiva como giro conceptual dentro de cada frase-manifiesto.
- Sección de valores/pilares en scroll horizontal pineado (scroll vertical → desplazamiento horizontal, con snap).
- Alternancia de fondos claros/oscuros entre secciones para generar ritmo, no una sola paleta plana todo el recorrido.
- Cierre poético/aforístico antes del CTA final.

Qué NO se copia: el copy es 100% propio de ENTE (ver sección 4), la paleta es propia (ver sección 5), y la identidad tipográfica queda abierta a definir en `/design-tokens` o `/frontend-design`.

## 3. Filosofía estética recomendada (para `/design-tokens` y `/frontend-design`)

De las 8 filosofías del skill, las dos más afines a este proyecto son:

- **Editorial / Magazine** — Content-led, display typography, print-inspired. Es la que mejor casa con el tratamiento de texto fragmentado tipo manifiesto y el ritmo de lectura pausada del storytelling.
- **Swiss / International Typographic** — como alternativa si se quiere una jerarquía tipográfica más estructurada/grid-locked, dado que ENTE tiene dos identidades (Arquitectura + Construcción) que se benefician de un sistema más ordenado.

Sugerencia: arrancar con **Editorial/Magazine** como base y tomar prestada la disciplina de grid de Swiss para la sección de Pilares y Proyectos (que son más "catálogo").

## 4. Estructura narrativa + copy final (ya cerrado, no reinterpretar)

El orden es fijo. Construcción vive inmediatamente después de Arquitectura, dentro del mismo scroll continuo (no es página aparte).

### 4.1 Hero / Nosotros
Titular fragmentado (línea por línea, "sensibilidad" en cursiva):
> Diseñamos espacios / que equilibran / funcionalidad y belleza / con precisión / y *sensibilidad*

Apoyo:
> "Con más de 15 años de experiencia en arquitectura contemporánea, cada proyecto es una oportunidad para replantear la manera en que habitamos el mundo — integrando el contexto, la esencia del cliente y los valores del diseño atemporal."

### 4.2 Filosofía (pull quote, sección pineada, fondo oscuro)
> "Para mí, la arquitectura no es simplemente el resultado de un servicio entre cliente y arquitecto; es el fruto de un proceso consciente, razonable y responsable, vivido en comunión con cada persona y cada espacio."
> — Arq. Carlos Espinosa

Puente:
> "Concibo la simplicidad como una decisión consciente: eliminar lo superfluo para revelar la autenticidad del espacio."

### 4.3 Pilares (scroll horizontal pineado, 3 tarjetas)
- **01 CONSCIENTE** — "Entender el lugar donde nace cada proyecto: su ubicación, su entorno, el momento en el que se construye y el presupuesto que lo hace posible."
- **02 RAZONABLE** — "Buscar siempre el equilibrio entre la funcionalidad y la estética, elegir cuidadosamente los materiales y aplicar la técnica constructiva adecuada para que cada espacio sea auténtico y duradero."
- **03 RESPONSABLE** — "Honrar la confianza de quienes eligen el estudio, trabajar con orden y compromiso, y aportar toda la experiencia para lograr un resultado que trascienda."

### 4.4 Cierre conceptual (pantalla completa, sola, fondo claro — respiro tras Filosofía)
> Crear no es lo mismo que construir, / y construir no es lo mismo que crear. / La arquitectura es el puente que une ambos actos: / convierte las ideas en espacios habitables, / sensibles y llenos de *vida*.

### 4.5 Estudio (puente hacia Proyectos)
Titular: "Diseño de espacios que *trascienden*"
Apoyo: "Cada proyecto se concibe como una oportunidad para crear espacios que van más allá de lo funcional y se transforman en experiencias habitables. Un entendimiento profundo del lugar, la historia y las personas que darán vida a cada espacio."
Cierre del bloque: "Cada línea, cada material y cada detalle se piensan con cuidado para dar forma a espacios atemporales, capaces de inspirar y conectar con quienes los habitan."

### 4.6 Construcción (identidad diferenciada, fondo oscuro, inmediatamente después de Estudio)
Titular: "Convirtiendo ideas en realidades *sólidas*"
Apoyo: "A través de ENTE Constructora, llevamos las ideas arquitectónicas a la realidad con precisión y cuidado, transformando cada proyecto en un resultado tangible y duradero. Calidad constructiva, orden en cada proceso y respeto absoluto por el diseño original."
Cierre: "Entendemos la construcción como un acto responsable, donde la técnica, la planeación y la ejecución se alinean para garantizar resultados sólidos y confiables. Cada obra, una expresión fiel de la visión arquitectónica."

### 4.7 Proyectos — PENDIENTE
Falta: listado final de proyectos (nombre, año, ubicación, imágenes). El usuario está organizando las imágenes.

### 4.8 Contacto / CTA — PENDIENTE
Falta: copy final del formulario y del bloque de cierre/CTA.

### 4.9 Footer + navegación global — PENDIENTE (no bloqueante, se puede prototipar con placeholders)

## 5. Sistema de color (ya cerrado — usar tal cual en `/design-tokens`, no regenerar)

Paleta base (6 colores, definidos por el cliente):

| Token | Hex | Rol |
|---|---|---|
| `cream` | `#FCF8F4` | Fondo primario claro |
| `linen` | `#ECE4DB` | Fondo secundario claro |
| `sky` | `#C6D7E7` | Fondo alterno frío (Pilar 01) |
| `mist` | `#B6C5D2` | Fondo alterno frío profundo (Pilar 03) |
| `ink` | `#000000` | Texto sobre claro / fondo de secciones oscuras (Filosofía, Construcción) |
| `coral` | `#DF5A5C` | Único acento — cursivas, números, CTA. Nunca como fondo grande ni como texto de párrafo (contraste insuficiente sobre `cream`, ver nota) |

Regla de contraste ya verificada: texto siempre `ink` sobre claro, o `cream` sobre `ink`. `coral`/`sky`/`mist` nunca como color de texto de cuerpo — ver detalle de ratios en `ENTE_sistema_color.md` adjunto.

Mapa de fondo por sección:
Hero=`cream` · Filosofía=`ink` · Pilares=`sky`/`linen`/`mist` (una por tarjeta) · Cierre=`cream` · Estudio=`linen` · Construcción=`ink`.

**Nota para `/design-tokens`:** esta paleta no tiene un modo oscuro global definido todavía (es una paleta de "secciones claras y oscuras alternadas", no light/dark mode conmutable por el usuario). Si el flujo de designer-skills requiere sí o sí un dark mode toggleable, decidir explícitamente con el cliente si aplica a este proyecto o si el "oscuro" vive solo en las secciones Filosofía/Construcción por diseño narrativo (recomendado, dado que es un sitio editorial de una sola pasada, no una app con preferencia de tema).

## 6. Motion / interacción (dirección, no implementación final)

- Titulares: revelado línea por línea (SplitText o equivalente) al entrar en viewport, stagger corto (~0.08s) excepto en Cierre Conceptual, donde el timing es más lento/pausado.
- Filosofía y Pilares: secciones pineadas (`position: sticky` o ScrollTrigger `pin`), con scrub ligado al scroll del usuario, no autoplay.
- Pilares: scroll horizontal con snap; en mobile, degrada a swipe horizontal nativo sin pineado vertical.
- Ningún elemento debe animar de forma continua/looping sin interacción del usuario — todo disparado por scroll o hover.

## 7. Restricciones y contexto técnico

- Revisar el repo antes de generar nada nuevo: si ya existen tokens de color, tipografía o componentes, el sistema de color de la sección 5 debe integrarse ahí, no reemplazar sin avisar.
- Mobile-first obligatorio (según principios del propio skill `designer-skills`).
- Stack sugerido (ajustar si el repo ya define otro): Next.js + TypeScript + Tailwind + GSAP (ScrollTrigger/SplitText) + Lenis.

## 8. Documentos relacionados (adjuntar junto a este brief)

- `ENTE_estructura_storytelling.md` — versión narrativa extendida con notas de razonamiento por bloque.
- `ENTE_sistema_color.md` — sistema de color completo con cálculo de contraste WCAG.
