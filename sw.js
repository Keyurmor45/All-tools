const CACHE_NAME = 'alltools-v1';

const HTML_FILES = [
  '/',
  '/index.html',
  '/404.html',
  '/about.html',
  '/ai-lab.html',
  '/changelog.html',
  '/chat.html',
  '/cheatsheets.html',
  '/dashboard.html',
  '/games.html',
  '/guestbook.html',
  '/news.html',
  '/playground.html',
  '/portfolio.html',
  '/stats.html'
];

const JS_CSS_FILES = [
  '/style.css',
  '/app-core.js',
  '/app-init.js',
  '/sfx.js',
  '/cyber-core.js',
  '/cursor.js',
  '/arcade.js',
  '/widgets.js',
  '/unique-features.js',
  '/tools-pdf.js',
  '/tools-trading.js',
  '/ai-lab.js',
  '/chat.js',
  '/news.js',
  '/portfolio.js',
  '/inject-mute.js',
  '/inject-unique.js',
  '/tighten-nav.js',
  '/update-nav.js',
  '/manifest.json',
  '/icon.svg',
  '/icon-192.png',
  '/icon-512.png'
];

// Add tools-1.js through tools-22.js
for (let i = 1; i <= 22; i++) {
  JS_CSS_FILES.push(`/tools-${i}.js`);
}

const STATIC_ASSETS = [...HTML_FILES, ...JS_CSS_FILES];

// Install Event - cache all static assets
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.allSettled(
        STATIC_ASSETS.map((url) => {
          return fetch(url).then((response) => {
            if (response.ok) {
              return cache.put(url, response);
            }
          });
        })
      );
    })
  );
});

// Activate Event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - Cache-first strategy for local assets, network-first for APIs/external
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  const isLocal = url.origin === self.location.origin;
  const isApi = url.pathname.startsWith('/api') || !isLocal;

  if (isApi) {
    // Network-first strategy for API and external calls
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return networkResponse;
        })
        .catch(() => caches.match(request))
    );
  } else {
    // Cache-first strategy for local files
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          // Serve from cache, optionally revalidate background
          fetch(request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => cache.put(request, networkResponse));
            }
          }).catch(() => {});
          return cachedResponse;
        }

        // Not in cache, fetch from network
        return fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return networkResponse;
        }).catch(() => {
          // Fallback for HTML navigation requests when offline
          if (request.headers.get('accept')?.includes('text/html')) {
            return caches.match('/index.html') || caches.match('/');
          }
        });
      })
    );
  }
});
