const CACHE_NAME = 'lectio-v3';
const SHELL = ['/'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (url.hostname.includes('bible-api.com') || url.hostname.includes('api.esv.org') || url.hostname.includes('api.bible') || url.hostname.includes('fonts.google')) {
    e.respondWith(fetch(e.request)); return;
  }
  e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open(CACHE_NAME).then(ca => ca.put(e.request, c)); return r; }).catch(() => caches.match(e.request)));
});
