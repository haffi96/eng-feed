import { defineConfig } from "astro/config";

// Plugins
import tailwind from "@astrojs/tailwind";
import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  server: {
    port: 4321
  },
  integrations: [
    tailwind(),
    preact({ compat: true })
]
});