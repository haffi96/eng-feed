import { defineConfig } from "astro/config";

// Plugins
import tailwind from "@astrojs/tailwind";
import preact from "@astrojs/preact";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
    output: 'server',
    adapter: vercel(),
    server: {
        port: 4321
    },
    integrations: [
        tailwind(),
        preact({ compat: true })
    ]
});