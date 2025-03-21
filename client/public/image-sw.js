// image-sw.js - Service worker for caching images
const VERSION = 'v1';
const CACHE_NAME = `image-cache-${VERSION}`;

// Critical images that should be cached immediately
const CRITICAL_IMAGES = [
  './src/assets/images/bg.webp',
  './src/assets/images/valley.webp'
];

// Install event - cache critical images immediately
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching critical images');
        return cache.addAll(CRITICAL_IMAGES);
      })
      .then(() => self.skipWaiting()) // Activate SW immediately
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim()) // Take control of clients immediately
  );
});

// Fetch event - serve from cache if available, otherwise fetch and cache
self.addEventListener('fetch', event => {
  // Only handle image requests
  if (!event.request.url.match(/\.(webp|jpg|jpeg|png|gif|svg)$/)) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(response => {
      // Cache hit - return the response
      if (response) {
        return response;
      }

      // Clone the request
      const fetchRequest = event.request.clone();

      // For images, use a network request with a timeout
      return Promise.race([
        fetch(fetchRequest),
        new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Timeout')), 3000);
        })
      ])
        .then(response => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          // Open the cache
          caches.open(CACHE_NAME)
            .then(cache => {
              // Add the response to the cache
              cache.put(event.request, responseToCache);
            });

          return response;
        })
        .catch(error => {
          console.log('Fetch failed, falling back to network:', error);
          return fetch(event.request);
        });
    })
  );
});

// Handle messages from the client
self.addEventListener('message', event => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
}); 