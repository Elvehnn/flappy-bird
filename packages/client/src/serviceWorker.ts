const CACHE_NAME = "flappy-bird-cache-1";
const URLS = ["/", "/index.html"];

self.addEventListener("install", (event: ExtendableEvent) => {
    console.log("install SW", event);

    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(cache => cache.addAll(URLS))
            .then(() => {
                self.skipWaiting();
                console.log("skipped waiting");
            })
    );
});

declare const self: ServiceWorkerGlobalScope;

export type {};
