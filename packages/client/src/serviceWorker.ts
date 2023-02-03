const CACHE_NAME = "flappy-bird-cache-1";
const URLS = [
    "/",
    "/index.html",
    "/assets/images/Flappy_Logo.png",
    "/favicon.ico",
    "/offline.html",
];
const CACHE_CONTENT_TYPES = [
    "document",
    "script",
    "style",
    "font",
    "image",
    "audio",
    "object",
    "media",
];

self.addEventListener("install", (event: ExtendableEvent) => {
    console.log("install SW");

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

self.addEventListener("activate", (event: ExtendableEvent) => {
    event.waitUntil(self.clients.claim());
    console.log("activate SW");
});

const getCachedData = async (request: Request) => {
    console.log(request);
    console.log("пошел за кешом");
    const casheResponse = await caches.match(request);

    return casheResponse || updateCache(request);
};

const updateCache = async (request: Request) => {
    console.log("кеша не нашел, пошел в тырнет");
    const cache = await caches.open(CACHE_NAME);

    try {
        const response = await fetch(request);

        await cache.put(request, response.clone());

        return response;
    } catch (error) {
        console.log("ни шиша не нашел, покажу, что есть");
        return await caches.match("/offline.html");
    }
};

self.addEventListener("fetch", async event => {
    if (!CACHE_CONTENT_TYPES.includes(event.request.destination)) {
        return;
    }

    if (!event.request.url.match(/^http/)) {
        return;
    }

    console.log(event.request);

    if (event.request.url.match("^.*/sounds/.*$")) {
        return;
    }

    event.respondWith(getCachedData(event.request) as Promise<Response>);
});

declare const self: ServiceWorkerGlobalScope;

export type {};
