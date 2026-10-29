// Waveguide service worker: caches the app shell so it opens instantly and installs as an app.
// Live data (map tiles, routes, search, reports) always goes to the network.
const CACHE = "waveguide-v8";
const SHELL = ["./", "index.html", "manifest.webmanifest", "logo-96.png", "icon-192.png", "icon-512.png",
  "https://cdnjs.cloudflare.com/ajax/libs/maplibre-gl/4.7.1/maplibre-gl.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/maplibre-gl/4.7.1/maplibre-gl.min.css"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET") return;
  const isShell = u.origin === location.origin || u.hostname === "cdnjs.cloudflare.com" || u.hostname.endsWith("gstatic.com") || u.hostname === "fonts.googleapis.com";
  if (!isShell) return; // network only for live data
  // network first, fall back to cache (so updates arrive, but it still opens offline)
  e.respondWith(fetch(e.request).then(r => { if (r.ok) { const c = r.clone(); caches.open(CACHE).then(x => x.put(e.request, c)); } return r; })
    .catch(() => caches.match(e.request).then(m => m || caches.match("index.html"))));
});
