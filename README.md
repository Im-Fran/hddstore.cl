# HDD Tecnología Store

Landing page de **HDD Tecnología Store**, taller de servicio técnico, reparación y venta de hardware ubicado en Ñuñoa, Santiago.

## Contenido del sitio

La página es un single-page armada en `src/pages/landing/index.tsx`, que monta un componente por sección (carpeta `src/pages/landing/components/`), ancladas por id y navegables desde el nav:

- **`Nav.tsx`** — logo, marca y accesos rápidos a cada sección. El link activo se "escribe" letra por letra según la sección visible (`useSectionTyping.ts` + `IntersectionObserver`), y un botón directo a WhatsApp.
- **`Hero.tsx` — `#hero`** — titular principal y las 4 tarjetas de servicio:
  - Soporte técnico (mantenimiento, formateo, instalación de OS, remoción de virus)
  - Reparación y mejoras (diagnóstico de fallas, upgrades de rendimiento)
  - Venta de hardware (componentes, periféricos, notebooks reacondicionados)
  - Computadores a medida (armado de PCs para oficina y gaming)
- **`Nosotros.tsx` — `#nosotros`** — texto de presentación del taller, badge de reseñas de Google y un marquee infinito con testimonios de clientes.
- **`Galeria.tsx` — `#galeria`** — grilla de fotos (placeholders `Foto 1`…`Foto 6`) y panel preparado para el futuro embed real del feed de Instagram (`@hddtecnologiastore`).
- **`Ubicacion.tsx` — `#ubicacion`** — dirección, horario de atención y mapa embebido de Google Maps.
- **`Contacto.tsx` — `#contacto`** — llamado a la acción final con enlaces directos a WhatsApp e Instagram.
- **`Footer.tsx`** — logo, copyright y dirección.
- **`constants.ts`** — URLs de contacto centralizadas (WhatsApp, Instagram, Google Maps) usadas por los componentes de arriba.

### Datos de contacto usados en el sitio

| Canal | Valor |
|-------|-------|
| WhatsApp | +56 9 6199 1725 |
| Instagram | [@hddtecnologiastore](https://instagram.com/hddtecnologiastore) |
| Dirección | Av. Rodrigo de Araya 3076, Ñuñoa, Santiago |
| Horario | Lun–Vie 11:00–19:30 · Sáb 11:00–15:00 |

## Tech Stack

| Capa | Tecnología |
|------|-----------|
| UI | React 19 + TypeScript |
| Build | Vite 8 (con Rolldown) |
| Compilador | React Compiler (vía `@rolldown/plugin-babel`) |
| Estilos | CSS Modules (`src/styles/landing/components.module.css`) |
| Lint | oxlint |

## Requisitos

- Node.js
- pnpm (hay `pnpm-lock.yaml`)

## Desarrollo

```bash
pnpm install
pnpm dev       # servidor de desarrollo (Vite)
```

## Build

```bash
pnpm build     # tsc -b && vite build → genera dist/
pnpm preview   # sirve el build de dist/ localmente
```

## Lint

```bash
pnpm lint
```

## Pendiente conocido

- La galería usa fotos placeholder (`Foto 1`…`Foto 6`) y el panel de Instagram está preparado pero sin el embed real conectado.
