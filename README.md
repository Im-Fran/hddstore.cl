<div align="center">

# 🖥️ HDD Tecnología Store

**Landing page de un taller de servicio técnico, reparación y venta de hardware en Ñuñoa, Santiago.**

</div>

---

## 📖 Overview

Sitio de una sola página para **HDD Tecnología Store**, construido con React 19 + TypeScript sobre Vite. Toda la navegación ocurre dentro de un scroll a pantalla completa por sección (`@fullpage/react-fullpage`), con el ítem activo del nav "escribiéndose" letra por letra a medida que el usuario avanza.

No hay backend ni base de datos: es un sitio estático de marketing con enlaces directos a WhatsApp, Instagram y Google Maps.

---

## ✨ Features

- **Scroll a pantalla completa** — cada sección ocupa `100dvh` y se navega con `fullpage.js`, sincronizado con el nav vía el callback `afterLoad` (no `IntersectionObserver`, porque fullpage.js no expone `id`s en el DOM).
- **Nav con "typing" activo** — el label de la sección visible se escribe letra por letra (`useSectionTyping.ts`) al hacer scroll o click en el nav.
- **Servicios** (`#servicios`) — soporte técnico, reparación y mejoras, venta de hardware, computadores a medida.
- **Nosotros** (`#nosotros`) — presentación del taller y reseñas.
- **Galería** (`#galeria`) — 4 fotos placeholder + embed real del feed de Instagram (`@hddtecnologiastore`).
- **Ubicación** (`#ubicacion`) — dirección, horario y mapa embebido de Google Maps.
- **Contacto** (`#contacto`) — CTA final con enlaces directos a WhatsApp e Instagram.

### Datos de contacto usados en el sitio

| Canal | Valor |
|-------|-------|
| WhatsApp | +56 9 6199 1725 |
| Instagram | [@hddtecnologiastore](https://instagram.com/hddtecnologiastore) |
| Dirección | Av. Rodrigo de Araya 3076, Ñuñoa, Santiago |
| Horario | Lun–Vie 11:00–19:30 · Sáb 11:00–15:00 |

Todos centralizados en `src/pages/landing/components/constants.ts`.

---

## 🛠 Tech Stack

| Capa | Tecnología |
|------|-----------|
| UI | React 19 + TypeScript |
| Scroll / secciones | `@fullpage/react-fullpage` (fullpage.js) |
| Build | Vite 8 (Rolldown) |
| Compilador | React Compiler (vía `@rolldown/plugin-babel`) |
| Estilos | Tailwind CSS 4 |
| Iconos | lucide-react |
| Lint | oxlint |

---

## 📋 Requisitos

- **Node.js**
- **pnpm** (hay `pnpm-lock.yaml` y `pnpm-workspace.yaml`)

---

## 🚀 Getting Started

### 1. Clonar el repositorio

```bash
git clone git@github.com:Im-Fran/hddstore.cl.git
cd hddstore.cl
```

### 2. Instalar dependencias

```bash
pnpm install
```

### 3. Correr en desarrollo

```bash
pnpm dev
```

Vite mostrará la URL local en la terminal (por defecto `http://localhost:5173`).

---

## 🏗 Build de producción

```bash
pnpm build     # tsc -b && vite build → genera dist/
pnpm preview   # sirve el build de dist/ localmente
```

---

## 🧹 Lint

```bash
pnpm lint      # oxlint
```

---

## 📁 Estructura del proyecto

La página se arma en `src/pages/landing/index.tsx`, que monta un componente por sección dentro del wrapper de fullpage.js:

```
src/pages/landing/
├── index.tsx                    # LandingPage: ReactFullpage + nav
└── components/
    ├── Nav.tsx                  # logo, marca, nav con typing y botón WhatsApp
    ├── Servicios.tsx            # #servicios — hero + 4 tarjetas de servicio
    ├── Nosotros.tsx             # #nosotros — presentación y reseñas
    ├── Galeria.tsx              # #galeria — fotos + embed de Instagram
    ├── Ubicacion.tsx            # #ubicacion — dirección, horario, mapa
    ├── Contacto.tsx             # #contacto — CTA final
    ├── Footer.tsx                # logo, copyright, dirección (vive dentro de #contacto)
    ├── useSectionTyping.ts       # hook del efecto "escribir letra por letra"
    └── constants.ts              # URLs de contacto (WhatsApp, Instagram, Maps)
```

---

## ⚠️ Pendiente conocido

- La galería mezcla 4 fotos placeholder con el embed real del feed de Instagram — falta reemplazar los placeholders por fotos reales del taller.

---

## 📄 Licencia

Repositorio privado (`"private": true` en `package.json`), sin licencia pública.

---

<div align="center">
Made with ☕ by <a href="https://franciscosolis.cl">Fran</a>
</div>
