# ENTE ARQUITECTOS — Sistema de color
### Paleta definida por el usuario: #FCF8F4 · #000000 · #B6C5D2 · #ECE4DB · #C6D7E7 · #DF5A5C

---

## 1. Lectura de la paleta

Son 6 colores que se organizan naturalmente en 3 familias:

- **Cálidos claros** — FCF8F4 (crema) y ECE4DB (lino) — la base "día", tierra suave.
- **Fríos claros** — C6D7E7 (cielo) y B6C5D2 (bruma) — un segundo registro más arquitectónico, casi mineral/cielo, que rompe con lo puramente cálido.
- **Extremos** — 000000 (tinta, negro puro) como ancla oscura total, y DF5A5C (coral) como único acento vivo de toda la paleta.

Esto le da a ENTE algo distinto al sitio de referencia: en vez de una paleta 100% "tonos tierra", tienen una **dualidad cálido/frío** (crema-lino vs cielo-bruma) que pueden usar para diferenciar identidades dentro del mismo storytelling — por ejemplo Arquitectura en registro cálido y Construcción en registro frío, o alternar por pilar.

---

## 2. Tokens

| Token | Hex | Familia | Uso principal |
|---|---|---|---|
| `cream` | `#FCF8F4` | Cálido claro | Fondo primario, la mayoría de las secciones claras |
| `linen` | `#ECE4DB` | Cálido claro | Fondo secundario, tarjetas, capas sobre `cream` |
| `sky` | `#C6D7E7` | Frío claro | Fondo alterno, secciones con tono más arquitectónico/sereno |
| `mist` | `#B6C5D2` | Frío claro | Fondo alterno más profundo, bordes, estados hover sobre `sky` |
| `ink` | `#000000` | Extremo oscuro | Texto sobre fondos claros; fondo de secciones oscuras |
| `coral` | `#DF5A5C` | Acento | Énfasis, cursivas, CTA, números, links — SIEMPRE con moderación |

---

## 3. Regla de oro (para que no se pierda cohesión)

1. **El texto siempre es `ink` sobre fondos claros, o `cream` sobre `ink`.** Nunca uses `sky`, `mist` o `coral` como color de texto de párrafo — están para fondos, formas y acentos puntuales, no para lectura extendida (ver contraste abajo, son valores muy claros y pierden legibilidad).
2. **`coral` es el único acento de toda la marca.** Aparece en: la palabra en cursiva de cada manifiesto, los números 01/02/03, el CTA de contacto, links activos. Nunca como fondo de sección completa — es demasiado intenso para eso en un sitio que busca calma.
3. **`ink` puro (#000000) es el único oscuro disponible** (no hay un "negro cálido" derivado). Úsalo sin miedo como fondo de sección — es intencional y da un golpe de contraste fuerte y editorial frente a las secciones cálidas/frías claras.

---

## 4. Mapa de color por sección del storytelling

| Sección | Fondo | Texto | Acento |
|---|---|---|---|
| **01 Hero / Nosotros** | `cream` #FCF8F4 | `ink` #000000 | `coral` en "sensibilidad" |
| **02 Filosofía (pull quote)** | `ink` #000000 | `cream` #FCF8F4 | `coral` en la atribución o en alguna palabra clave de la cita |
| **03 Pilares** | alterna por tarjeta → 01 `sky` #C6D7E7 · 02 `linen` #ECE4DB · 03 `mist` #B6C5D2 | `ink` en las 3 | `coral` en los números 01/02/03 (constante en las 3, para dar unidad) |
| **04 Cierre conceptual** | `cream` #FCF8F4 | `ink` #000000 | `coral` en "vida" |
| **05 Estudio** | `linen` #ECE4DB | `ink` #000000 | `coral` en "trascienden" |
| **06 Construcción** | `ink` #000000 *(identidad diferenciada, igual que Filosofía pero es la única repetición de negro — está bien, marca el peso de "lo sólido")* | `cream` #FCF8F4 | `coral` en "sólidas" |
| 07 Proyectos *(pendiente)* | sugerido `sky` o `linen` alternando por proyecto | `ink` | `coral` en número de proyecto |
| 08 Contacto/CTA *(pendiente)* | sugerido `ink` para cerrar con fuerza | `cream` | `coral` en botón CTA |

**Nota sobre Pilares:** usar las 3 tarjetas en 3 fondos distintos (sky/linen/mist) es un buen recurso para diferenciar Elegancia/Autenticidad/Funcionalidad visualmente sin depender solo del texto — cada pilar "se siente" distinto aunque comparta estructura.

---

## 5. Contraste y accesibilidad (verificado)

Cálculo de contraste real (WCAG), no estimado a ojo:

| Par | Ratio aprox. | Veredicto |
|---|---|---|
| `ink` sobre `cream` | ~20:1 | Excelente, úsalo para todo el texto de cuerpo |
| `cream` sobre `ink` | ~20:1 | Excelente |
| `linen` sobre `ink` | ~17:1 | Excelente |
| `coral` sobre `cream` | ~3.5:1 | Pasa solo para **texto grande/titulares** (AA large text), no para párrafos pequeños |
| `coral` sobre `ink` | ~5.75:1 | Pasa incluso para texto normal — el coral funciona mejor sobre fondo oscuro |
| `mist` sobre `ink` | ~12:1 | Bien si se usa como texto secundario sobre fondo oscuro (ej. atribuciones) |
| `sky` / `mist` como texto sobre `cream` | ~1.4–1.7:1 | **No usar** — casi no hay contraste, son dos claros compitiendo. Úsalos solo como fondo, nunca como color de texto sobre otro claro |

Consecuencia práctica: en las tarjetas de Pilares (fondos `sky`/`linen`/`mist`), el texto va siempre en `ink`, nunca intentes poner texto en otro tono claro encima — se pierde.

---

## 6. Variables listas para implementación

```css
:root {
  --color-cream: #FCF8F4;
  --color-linen: #ECE4DB;
  --color-sky: #C6D7E7;
  --color-mist: #B6C5D2;
  --color-ink: #000000;
  --color-coral: #DF5A5C;
}
```

```js
// tailwind.config extend
colors: {
  cream: '#FCF8F4',
  linen: '#ECE4DB',
  sky: '#C6D7E7',
  mist: '#B6C5D2',
  ink: '#000000',
  coral: '#DF5A5C',
}
```

---

## 7. Para cuando instales el skill de UI/UX

Este documento es el input de marca: 6 colores cerrados, roles asignados por sección, reglas de uso del acento y del contraste ya resueltas. El skill puede tomarlo como sistema base y expandirlo (estados hover/focus, sombras, opacidades) sin tener que decidir la paleta desde cero.
