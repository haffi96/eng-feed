import { defineConfig } from "astro/config";

// Plugins
import tailwind from "@astrojs/tailwind";
import preact from "@astrojs/preact";
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
    output: 'server',
    adapter: node({
        mode: 'standalone',
    }),
    server: {
        port: 4321
    },
    integrations: [
        tailwind(),
        preact({ compat: true })
    ]
});