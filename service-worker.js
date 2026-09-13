// AG PILOT CAL — service worker
// Sube CACHE_VERSION cada vez que cambies archivos para forzar la actualización.
const CACHE_VERSION = 'ag-pilot-cal-v3';

const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './css/style.css',
  './modules/john-deere-siembra.html',
  './img/icon-192.png',
  './img/icon-512.png',
  './img/icon-192-maskable.png',
  './img/icon-512-maskable.png',
  './img/apple-touch-icon.png',
  './img/favicon.png',
  './img/portada.jpg',
  './img/referencia.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_VERSION).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Network-first para HTML/CSS/JS: siempre intenta traer la versión más nueva
// del servidor primero, y solo usa la copia guardada si no hay conexión.
// Cache-first para imágenes, que cambian poco y así cargan más rápido.
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const isAsset = /\.(png|jpg|jpeg|svg|webp)$/i.test(event.request.url);

  if (isAsset) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        return cached || fetch(event.request).then((response) => {
          const clone = response.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(event.request, clone));
          return response;
        });
      })
    );
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_VERSION).then((cache) => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
