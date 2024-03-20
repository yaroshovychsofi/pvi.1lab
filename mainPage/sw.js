const CACHE_NAME = 'v1';
const urlsToCache = [
    '/',
    '/bootstrap.html',
    '/styleBootstrap.css',
    '/bootstrap.js',
    // Додайте інші ресурси, які ви хочете кешувати
];

// Встановлення Service Worker та кешування ресурсів
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Відповідь з кешу або мережі
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Кеш даних знайдено, повертаємо відповідь з кешу
                if (response) {
                    return response;
                }
                // Коли відповідь не знайдена в кеші, намагаємось запитати її з мережі
                return fetch(event.request).then(
                    function(response) {
                        // Якщо відповідь з мережі не вдало отримати, просто передаємо помилку
                        if(!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Щоб кешувати нові дані, клонуємо відповідь
                        var responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(function(cache) {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
    );
});

// Оновлення Service Worker і видалення старих кешів
self.addEventListener('activate', event => {
    var cacheWhitelist = ['v1']; // Ви можете додати версію кешу до білого списку

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
