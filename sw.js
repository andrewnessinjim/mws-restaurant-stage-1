self.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request).then(response => {
        if(response) return response;

        return fetch(event.request).then(response => {
            const responseClone = response.clone();

            caches.open('v1').then(cache => {
                cache.put(event.request, responseClone);
            });

            return response;
        })
    }));
});