const NAME_CACHE = "motorkupwa1";
var cacheAssets = [
    "/",
    "/manifest.json",
    "/nav.html",
    "/index.html",
    "/pages/dashboard.html",
    "/pages/stock.html",
    "/pages/checkout.html",
    "/pages/profile.html",
    "/css/materialize.min.css",
    "/css/style.css",
    "/js/jquery-3.2.1.min.js",
    "/js/materialize.min.js",
    "/js/main.js",
    "/icon.png",
    "/assets/image-beat.png",
    "/assets/image-pcx.jpg",
    "/assets/image-scopy.png",
    "/assets/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2"
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(NAME_CACHE).then(function (cache) {
            return cache.addAll(cacheAssets);
        })
    );
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches
        .match(event.request, {
            cacheName: NAME_CACHE
        })
        .then(function (response) {
            if (response) {
                console.log("Service Workers : Gunakan asseets dari cache : ", response.url);
                return response;
            }
            console.log("Service Workers : Memuat assets dari server :", event.request.url);
            return fetch(event.request);

        })
    );
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName != NAME_CACHE) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});