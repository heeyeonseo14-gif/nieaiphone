const CACHE_NAME = "nieaiphone-cache-v2";

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
  event.waitUntil(self.clients.claim());
});

// 请求拦截
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {

      // 如果缓存有就用缓存
      if (response) {
        return response;
      }

      // 没有就去网络请求
      return fetch(event.request).then(networkResponse => {

        // 把新的请求缓存起来
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });

      });

    })
  );
});
