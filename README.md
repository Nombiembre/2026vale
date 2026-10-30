# 2026vale

Diario personal construido con [Astro](https://astro.build). El sitio es público
por URL, pero está configurado para que los buscadores no lo indexen ni lo
archiven (`robots.txt`, meta `noindex` y cabecera `X-Robots-Tag`).

## Requisitos

- [Bun](https://bun.sh) (o Node.js 20+)
- Opcional: una cuenta de [Resend](https://resend.com) si quieres recibir el
  aviso de cada visita.

## Puesta en marcha

```sh
bun install
cp .env.example .env
bun run dev
```

El servidor de desarrollo queda en `http://localhost:4321`.

## Variables de entorno

| Variable        | Descripción                                                        |
| --------------- | ------------------------------------------------------------------ |
| `RESEND_APIKEY` | API key de Resend. Sin ella, el aviso de visitas queda desactivado. |
| `OWNIP`         | Tu IP pública. Las visitas desde esa IP no generan correo.          |

El aviso se envía desde `src/pages/api/visit.ts` usando `waitUntil`. La página
hace un ping a ese endpoint en cada visita, así que el sitio puede seguir siendo
estático y el aviso no retrasa la carga ni puede romper la página.

## Comandos

```sh
bun run dev      # servidor de desarrollo
bun run build    # build de producción (adapter de Vercel)
```

Para probar el build completo, usa `vercel dev` o despliega en Vercel.

## Estructura

- `src/content/diary/` — entradas del diario en Markdown/MDX.
- `src/content/observatory/` — textos largos (sección en construcción).
- `src/pages/` — rutas del sitio. Salvo `/api/visit`, todo se prerenderiza.
- `src/components/` — componentes de UI.
- `public/images/` y `public/audios/` — imágenes y audios servidos tal cual.

## Rendimiento

- Todas las páginas se generan en el build (`output: "static"`), así que se
  sirven desde la CDN.
- `/diary` no hidrata React: los filtros de año/mes son un script diminuto y
  las tarjetas ya vienen renderizadas en el HTML.
- Las imágenes de las tarjetas usan `loading="lazy"` y `decoding="async"`.

## Notas sobre el contenido

- Las entradas `nancy-*` y `/diary/2025/.../nancy-*` están ocultas de la
  navegación, pero siguen siendo accesibles por URL directa.
- Algunas fotos y audios personales que nunca estuvieron en el repositorio se
  dejaron comentados en el MDX para poder restaurarlos más adelante sin perder
  las rutas originales.
- Las imágenes de `public/images/diary/2025/julio/` están en AVIF para reducir
  el peso de la página.
