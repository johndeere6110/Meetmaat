// Service worker van Meetmaat: offline gebruik en gedeelde bestanden ontvangen.
// Verhoog VERSION bij elke wijziging (meetmaat-v1 -> v2), anders krijgen telefoons de update niet.
//
// Let op: alle apps op johndeere6110.github.io (Zaaihulp, Perceelkaart, Meetmaat) delen één
// cache-opslag. Ruim daarom alleen caches op die met "meetmaat-" beginnen.
const VERSION = "meetmaat-v101";
const PREFIX = "meetmaat-";
const CORE = [
  "./",
  "index.html",
  "installeren.html",
  "manifest.webmanifest",
  "vendor/pdf.min.js",
  "vendor/pdf.worker.min.js",
  "vendor/qrcodejs/qrcode.min.js",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/maskable-512.png",
  "fonts/barlow-condensed-latin-500-normal.woff2",
  "fonts/barlow-condensed-latin-600-normal.woff2",
  "fonts/barlow-condensed-latin-700-normal.woff2",
  "fonts/ibm-plex-sans-latin-400-normal.woff2",
  "fonts/ibm-plex-sans-latin-500-normal.woff2",
  "fonts/ibm-plex-sans-latin-600-normal.woff2",
  "fonts/ibm-plex-mono-latin-400-normal.woff2",
  "fonts/ibm-plex-mono-latin-500-normal.woff2",
  "fonts/ibm-plex-mono-latin-600-normal.woff2"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith(PREFIX) && k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Kleine IndexedDB-hulp, dezelfde opslag als de pagina gebruikt
function idbPut(key, value) {
  return new Promise((res, rej) => {
    const r = indexedDB.open("meetmaat", 1);
    r.onupgradeneeded = () => r.result.createObjectStore("files");
    r.onerror = () => rej(r.error);
    r.onsuccess = () => {
      const tx = r.result.transaction("files", "readwrite");
      tx.objectStore("files").put(value, key);
      tx.oncomplete = () => res();
      tx.onerror = () => rej(tx.error);
    };
  });
}

self.addEventListener("fetch", e => {
  const req = e.request;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  // Gedeeld bestand (Delen → Meetmaat): bewaren en de app openen
  if (req.method === "POST" && url.pathname.endsWith("/share")) {
    e.respondWith((async () => {
      try {
        const form = await req.formData();
        // WhatsApp e.d. sturen soms ook het begeleidende tekstje mee (als shared.txt): neem het echte bestand,
        // dat is het grootste en niet "shared.txt"
        const files = form.getAll("file").filter(f => f && typeof f !== "string");
        const real = files.filter(f => f.name !== "shared.txt");
        const f = (real.length ? real : files).sort((a, b) => b.size - a.size)[0];
        if (f) await idbPut("shared", { name: f.name || "gedeeld.pdf", type: f.type, size: f.size, blob: f });
      } catch (err) { /* lege share: gewoon de app openen */ }
      return Response.redirect(new URL("./?shared=1", self.registration.scope).href, 303);
    })());
    return;
  }

  if (req.method !== "GET") return;

  // Alles van de app zelf: eerst netwerk (altijd de nieuwste versie, "no-cache" = even navragen bij de server),
  // anders uit de cache. Pagina's bewaren we onder hun bestandsnaam, zodat ?groep= of ?shared=1 offline ook werkt.
  const nav = req.mode === "navigate";
  const file = !nav ? null : url.pathname.endsWith("installeren.html") ? "installeren.html"
    : (url.pathname.endsWith("/") || url.pathname.endsWith("/index.html")) ? "index.html" : null;
  e.respondWith(
    fetch(req.url, { cache: "no-cache", redirect: nav ? "manual" : "follow" }).then(r => {
      if (r.ok && r.type === "basic" && !req.headers.has("range")) {
        const copy = r.clone();
        caches.open(VERSION).then(c => c.put(file || req, copy)).catch(() => {});
      }
      return r;
    }).catch(() => caches.match(file || req, { ignoreSearch: true }).then(m => m || (nav ? caches.match("index.html") : Response.error())))
  );
});
