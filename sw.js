// [수정] 버전 업그레이드 (v2 -> v3) & parent.html 추가
const CACHE_NAME = 'namyang-pwa-v3';

const urlsToCache = [
  './',
  './index.html',
  './parent.html',  // notice.html 대신 이거!
  './manifest.json',
  './nam-192.png',
  './nam-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : Promise.resolve()))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});