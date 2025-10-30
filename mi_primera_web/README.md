# Mi Primera Web

Este proyecto es una pequeña página web estática creada como ejercicio de diseño web.

## Enfoque de diseño

- Implementación: Desktop-first.

  - Esto significa que los estilos base están pensados para pantallas de escritorio y luego se aplican reglas condicionales para pantallas más pequeñas.
  - Para adaptar el diseño a dispositivos con pantallas más estrechas utilicé media queries (con `max-width`) que reducen o reorganizan estilos cuando la ventana es menor que ciertos anchos.

- Breakpoints (asumidos / usados):

  - `max-width: 1024px` — para tablets grandes / pantallas intermedias
  - `max-width: 768px` — para tablets pequeñas y móviles grandes
  - `max-width: 480px` — para móviles pequeños

  Nota: He usado estos puntos de corte comunes como punto de partida. Si prefieres otros valores, puedo actualizarlos.

## Archivos relevantes

- `index.html` — página principal.
- `contact.html` — página de contacto.
- `style.css` — estilos generales del sitio.
- `css/contact.css` — estilos específicos para la página de contacto.

Los estilos base están escritos pensando en escritorio; las media queries se añadieron en los archivos CSS (principalmente en `style.css` y en `css/contact.css`) para ajustar el layout, fuentes, tamaños y espaciados en pantallas más pequeñas.
