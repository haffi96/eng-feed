import { defineConfig } from "astro/config";

// Plugins
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
    server: { port: 8000 },
    integrations: [
        tailwind(),
    ],
});
