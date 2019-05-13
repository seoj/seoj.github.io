self.addEventListener('install', () => {
  console.log('[ServiceWorker] Install');
});

self.addEventListener('fetch', (evt) => {
  console.log('[ServiceWorker] Fetch', evt.request.url);
});
