const CACHE_NAME = "nieaiphone-v1";

const urlsToCache = [
  "./",
  "./index.html",
  "./home.html",
  "./chat.html",
  "./chat_ui.html",
  "./chat_action.html",
  "./ai_memory_v2.html",
  "./api.html",
  "./my_setting.html",
  "./instagram.html",
  "./music.html",
  "./worldbook.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

// 安装
self.addEventListener("install", event => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// 激活
self.addEventListener("activate", event => {

  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );

  self.clients.claim();
});

// fetch
self.addEventListener("fetch", event => {

  event.respondWith(
    fetch(event.request)
      .then(response => response)
      .catch(() => caches.match(event.request))
  );

});
