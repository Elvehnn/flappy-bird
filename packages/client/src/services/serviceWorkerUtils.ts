import { CACHE_URLS } from "@/constants/cacheUrls";

export const registerServiceWorker = () => {
    self.__FB_CACHE_URLS__ = self.__FB_CACHE_URLS__ ?? CACHE_URLS;

    if ("serviceWorker" in navigator) {
        navigator.serviceWorker
            .register("./serviceWorker.js")
            .then(registration => {
                console.log(
                    "ServiceWorker registration successful with  scope: ",
                    registration.scope
                );
            })
            .catch((error: string) => {
                console.log("ServiceWorker registration failed: ", error);
            });
    }
};
