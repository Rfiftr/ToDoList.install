const CACHE_NAME = 'v4';
const assets = [
    '/',
    './index.html',
    './list.js',
    './style_To_Do_List.css',
    './images/addIcon.png',
    './images/background.png',
];

self.addEventListener('install', (event) => {
    console.log('Service worker installed');
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(assets.map(url => new Request(url, {credentials: 'same-origin'})));
        })
    );
});

self.addEventListener('activate', (event) => {
    console.log('Service worker activated');
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys
                    .filter((key) => key !== CACHE_NAME)
                    .map((key) => caches.delete(key))
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    console.log('Service worker - fetch');
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request);
        })
    );
});
