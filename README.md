# AG PILOT CAL

App web instalable (PWA) para calibración de pilotos agrícolas en operaciones de siembra.

## Estructura del proyecto

```
ag-pilot-cal/
├── index.html                       → pantalla principal
├── manifest.json                    → configuración de instalación (PWA)
├── service-worker.js                → soporte offline / caché
├── css/
│   └── style.css                    → estilos compartidos
├── modules/
│   └── john-deere-siembra.html      → calculadora de calibración John Deere
└── img/
    ├── icon-192.png / icon-512.png             → ícono de instalación
    ├── icon-192-maskable.png / icon-512-maskable.png
    ├── apple-touch-icon.png / favicon.png
    ├── portada.jpg                  → imagen de portada
    └── referencia.png               → esquema de referencia
```

## Cómo agregar la calibración de otra marca

1. Copiá `modules/john-deere-siembra.html` como `modules/nombre-marca-siembra.html`.
2. Cambiá la fórmula dentro de la etiqueta `<script>` por la de la nueva marca.
3. En `index.html`, cambiá la tarjeta `disabled` correspondiente (por ejemplo Case IH)
   por una tarjeta activa con el link nuevo, siguiendo el mismo formato que la de
   John Deere.
4. Agregá el nuevo archivo a la lista `APP_SHELL` en `service-worker.js` para que
   también quede disponible sin conexión, y subí en 1 el número de `CACHE_VERSION`.

## Subir a GitHub

```bash
cd ag-pilot-cal
git init
git add .
git commit -m "AG PILOT CAL - primera versión"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/ag-pilot-cal.git
git push -u origin main
```

## Publicar con GitHub Pages (para que sea instalable)

1. En GitHub, andá a **Settings → Pages**.
2. En **Source**, elegí la rama `main` y la carpeta `/ (root)`.
3. Guardá. GitHub te va a dar una URL tipo:
   `https://TU-USUARIO.github.io/ag-pilot-cal/`
4. Abrí esa URL desde el celular (Chrome en Android o Safari en iPhone).
5. Android: aparece el cartel "Agregar a pantalla de inicio" (o menú ⋮ →
   "Instalar aplicación"). iPhone: botón compartir → "Agregar a pantalla de inicio".

**Importante:** las PWA sólo se pueden instalar sobre HTTPS (GitHub Pages ya lo
usa por defecto) — no funciona abriendo el `index.html` directo desde el archivo
local para probar la instalación, pero sí funciona todo el resto del contenido.

## Actualizar la app después de cambios

Cada vez que subas cambios a GitHub, si no ves los cambios reflejados en el celular:
1. Subí en 1 el número de `CACHE_VERSION` en `service-worker.js` (ej: `v1` → `v2`).
2. Volvé a hacer `git add . && git commit -m "update" && git push`.
3. Cerrá y volvé a abrir la app instalada (o esperá unos segundos, se actualiza sola).
