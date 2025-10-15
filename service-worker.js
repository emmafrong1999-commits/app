const CACHE_NAME = 'checkin-cache-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/main/192.png',
  '/main/512.png',
  '/manifest.json'
];

// ติดตั้ง Service Worker และ cache ไฟล์
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// ดึงไฟล์จาก cache ก่อน แล้วค่อย fetch
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

// อัปเดต cache และลบ cache เก่า
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});
