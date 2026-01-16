// [수정] 버전 확 올림 (v2026) -> 브라우저 캐시 강제 초기화
const CACHE_NAME = 'namyang-pwa-v2026';

const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './nam-192.png',
  './nam-512.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting(); // 대기 없이 즉시 설치
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
  self.clients.claim(); // 즉시 제어권 가져옴
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
