// [강제 초기화 버전] 모든 캐시를 삭제하고 매번 네트워크에서 새로 받아옵니다.
const CACHE_NAME = 'namyang-pwa-v2026_inbox_fix';

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
