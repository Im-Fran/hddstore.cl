# Diseño: Routing con react-router-dom, página 404 y página de display para el local

## Contexto

El sitio hoy renderiza `LandingPage` directo desde `App.tsx`, sin router (aunque
`react-router-dom` ya está instalado). Se necesita:

1. Configurar `react-router-dom` con rutas reales.
2. Una página 404 para rutas no encontradas.
3. Una página nueva (`/display`) pensada para dejar corriendo en un monitor
   dentro del local: contacto/horario y estadísticas rotando en la columna
   izquierda, reseñas de Google en scroll infinito en la columna derecha.

## Routing

`App.tsx` pasa a usar `<BrowserRouter>` + `<Routes>`:

- `/` → `LandingPage` (sin cambios de comportamiento)
- `/display` → `DisplayPage` (nueva)
- `*` → `NotFoundPage` (nueva)

## NotFoundPage

Página simple en `src/pages/not-found/index.tsx`, mismo lenguaje visual que
el landing (`bg-ink`, tipografía mono, colores de marca): título "404",
mensaje corto, y un link a `/`. Sin lógica ni estado.

## Código de reseñas compartido

`Nosotros.tsx` hoy concentra tipos (`Review`, `PlaceData`, `GoogleReview`,
`PlacesResponse`), `normalizePlaceData`, `FALLBACK_DATA`, `Stars` y
`ReviewCard`. `DisplayPage` necesita los mismos datos y el mismo
`ReviewCard`/`Stars`, así que se extraen a
`src/pages/landing/components/reviews.ts` (tipos + normalización + fallback)
y `reviews-card.tsx` (componentes `Stars`/`ReviewCard`, sin JSX en el `.ts`).
`Nosotros.tsx` pasa a importar desde ahí; su comportamiento no cambia.

Se agrega también un hook pequeño `useGoogleReviews()` (mismo módulo o uno
nuevo `useGoogleReviews.ts`) que encapsula el `fetch('/api/reviews')` +
fallback que hoy vive inline en `Nosotros.tsx`, para que `Nosotros.tsx` y
`DisplayPage` no dupliquen ese `useEffect`.

## Worker: nuevo endpoint `/api/instagram-stats`

En `src/worker/index.ts`, un nuevo handler para `GET /api/instagram-stats`
que devuelve JSON `{ followers: number, posts: number }` con valores mock
hardcodeados (comentario indicando que se reemplazará por integración real
con Instagram Graph API más adelante — requiere cuenta Business/Creator,
Facebook App y token de larga duración, fuera de alcance de este trabajo).

`/api/reviews` no cambia: ya expone `rating` y `userRatingCount`, que
cubren "puntaje de reseña de Google" y "cantidad de reseñas de Google".

## DisplayPage (`/display`)

Ruta pensada para un monitor sin interacción de usuario (kiosco). Ocupa
`h-dvh` completo, sin scroll de página.

### Header

Header propio y minimal — no el `Nav` del landing, que trae secciones de
scroll y menú hamburguesa que no aplican en una pantalla sin navegación.
Reutiliza el bloque de logo/marca del `Nav` (mismo estilo `bg-ink`, logo,
"HDD" + "TECNOLOGÍA STORE") a la izquierda. A la derecha, un botón de
WhatsApp con ícono + **número de teléfono visible siempre** (a diferencia
del botón del `Nav`, que oculta el texto en mobile — acá no hace falta
responsive porque es una pantalla fija).

### Columna izquierda: slides verticales automáticos

Un hook `useAutoSlide(count, intervalMs)` (nuevo, chico) devuelve el índice
del slide activo y avanza solo cada 8000ms (`setInterval` + `setState`,
sin librería nueva). Dos slides, transición vertical vía CSS
(`transition-transform` sobre un track `translateY`, mismo enfoque que ya
usa el marquee de `Nosotros.tsx`, adaptado para avanzar por índice en vez
de loop continuo):

1. **Contacto + horario**: mismo contenido que `Ubicacion.tsx` (dirección,
   horario), tomado de `constants.ts` — sin duplicar los strings, se
   exportan desde ahí si no lo están ya.
2. **Estadísticas**: grid 2x2 con 4 stat-tiles (número grande + label):
   seguidores IG, posts IG, cantidad de reseñas Google (`userRatingCount`),
   puntaje Google (`rating`, con estrellas via `Stars`).

### Columna derecha: reseñas en scroll infinito

Reusa `useGoogleReviews()` + `ReviewCard`. Track de reseñas duplicado
(mismo truco que `Nosotros.tsx`: la lista se concatena consigo misma y el
track recorre 0→-50% en loop) pero:
- Sin pausa al hover (no hay usuario interactuando).
- Sin `onClick`/modal (no hace falta abrir detalle en una pantalla pasiva).
- Dirección vertical, ocupando el alto completo de la columna.

## Testing

- Chequeo manual (`npm run dev`, visitar `/`, `/display`, `/ruta-inexistente`)
  ya que es una página visual sin lógica de negocio compleja.
- El proyecto no tiene test runner instalado (no hay Vitest/Jest en
  `package.json`). El único punto con lógica no trivial es `useAutoSlide`
  (avance de índice + wrap-around): se deja como función pura exportable
  aparte del hook, con un `assert`-based self-check simple que se pueda
  correr con `node` (sin agregar dependencias nuevas).

## Fuera de alcance

- Integración real con Instagram Graph API (queda mockeada).
- Cualquier cambio de comportamiento en `LandingPage` más allá de extraer
  código compartido a nuevos archivos.
