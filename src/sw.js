const STATIC = 'staticv2';
const APP_SHELL = [
  '/',
  '/src/offline.jsx',
  '/src/App.js',
  '/src/index.js',
  '/src/assets/components/products.jsx',
  '/src/logo.png'
];

//eslint-disable-next-line no-restricted-globals
self.addEventListener('install', function(event) {
    console.log("Instalando SW");
    event.waitUntil(
      caches.open(STATIC)
        .then(function(cache) {
            console.log("SW instalado");
          return cache.addAll(APP_SHELL);
        })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request)
            .then((response) => {
                return response;
            })
            .catch(() => {
                return caches.match('./offline.jsx');
            })
    );
});