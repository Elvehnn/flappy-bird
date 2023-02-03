import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import * as path from "path";

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: Number(process.env.CLIENT_PORT) || 3000,
    },
    define: {
        __SERVER_PORT__: process.env.SERVER_PORT || 5000,
    },
    plugins: [react()],
    resolve: {
        alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
    },
    build: {
        rollupOptions: {
            input: {
                app: "./index.html",
                serviceWorker: "./src/serviceWorker.ts",
            },
            output: {
                entryFileNames: assetInfo => {
                    return assetInfo.name === "serviceWorker"
                        ? "[name].js"
                        : "assets/js/[name]-[hash].js";
                },
            },
        },
    },
});
