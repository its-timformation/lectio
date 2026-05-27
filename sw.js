// Lectio — Service Worker
// Bump CACHE_NAME when you deploy a new version to force refresh
const CACHE_NAME = 'lectio-v1';
const SHELL = ['/'];

// Install: cache the app shell
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});

// Activate: clean up old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// Fetch: network-first, fall back to cache
// API calls (bible-api, esv, api.bible) always go network-only
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Never cache third-party API calls
  if (
    url.hostname.includes('bible-api.com') ||
    url.hostname.includes('api.esv.org') ||
    url.hostname.includes('api.bible') ||
    url.hostname.includes('fonts.googleapis.com') ||
    url.hostname.includes('fonts.gstatic.com')
  ) {
    e.respondWith(fetch(e.request));
    return;
  }

  // App shell: network first, cache as fallback
  e.respondWith(
    fetch(e.request)
      .then(response => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
        return response;
      })
      .catch(() => caches.match(e.request))
  );
});
