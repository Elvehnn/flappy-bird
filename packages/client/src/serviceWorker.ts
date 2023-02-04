// @ts-expect-error Property '__WB_MANIFEST' does not exist on type 'ServiceWorkerGlobalScope'.
const fileList = self.__FB_CACHE_URLS__ || ["/", "/index.html"];

const CACHE_NAME = "flappy-bird-cache-1";

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
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(cache => cache.addAll(fileList))
            .then(() => {
                self.skipWaiting();
            })
    );
});

self.addEventListener("activate", (event: ExtendableEvent) => {
    event.waitUntil(self.clients.claim());
});

const getCachedData = async (request: Request) => {
    const casheResponse = await caches.match(request);

    return casheResponse || updateCache(request);
};

const updateCache = async (request: Request) => {
    const cache = await caches.open(CACHE_NAME);

    try {
        const response = await fetch(request);

        await cache.put(request, response.clone());

        return response;
    } catch (error) {
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

    if (event.request.url.match("^.*/sounds/.*$")) {
        return;
    }

    event.respondWith(getCachedData(event.request) as Promise<Response>);
});

declare const self: ServiceWorkerGlobalScope;

export type {};
