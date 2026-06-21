const CACHE_NAME = 'tagebuch-v2';
const ASSETS = [
  '/Tagebuch/',
  '/Tagebuch/index.html',
  '/Tagebuch/manifest.json',
  '/Tagebuch/logo.jpg'
];

// Installieren und Assets in den Cache laden
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});

// Aktivieren und alten Cache löschen
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Offline-Abfrage ermöglichen
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cachedResponse => {
      return cachedResponse || fetch(e.request);
    })
  );
});