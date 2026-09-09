/* Sai Kripa — offline shell.
   Bump CACHE when you change the site, so visitors get the new version. */
const CACHE = 'saikripa-v2';
const SHELL = [
  '/', '/manifest.webmanifest',
  '/images/icon-32.png', '/images/icon-192.png',
  '/images/logo-mark-dark.png', '/images/logo-lockup-dark.png',
  '/images/corporate.svg', '/images/launch.svg', '/images/activation.svg', '/images/wedding.svg',
  '/images/exhibition.svg', '/images/fest.svg', '/images/opening.svg', '/images/community.svg'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// Network first for the page, cache first for assets.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req)
      .then(r => { caches.open(CACHE).then(c => c.put(req, r.clone())); return r; })
      .catch(() => caches.match('/')));
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
    if (r.ok) { const copy = r.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return r;
  })));
});
