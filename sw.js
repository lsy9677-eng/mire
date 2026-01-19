
const CACHE_NAME = 'namyang-pwa-v2026_final_fix'; // v20260119 -> v2026 등으로 확 바꾸세요!

self.addEventListener('install', (event) => {
  self.skipWaiting(); // 대기 없이 즉시 설치
});

self.addEventListener('activate', (event) => {
  // 기존에 저장된 모든 캐시(v1, v2, v3...)를 싹 다 지워버립니다.
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// 파일 요청이 오면 저장된 거 안 쓰고 무조건 인터넷에서 새로 가져옵니다.
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request)); 
});
