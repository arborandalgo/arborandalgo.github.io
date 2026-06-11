// @ts-check
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";

import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: "https://arborandalgo.com",

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [sitemap(), partytown()],
});
