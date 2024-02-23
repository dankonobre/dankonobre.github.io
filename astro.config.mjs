import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import solidJs from "@astrojs/solid-js";

export default defineConfig({
  site: 'https://dankonobre.github.io',
  base: '/',
  output: 'static',
  integrations: [,
    tailwind({
      config: {
        applyBaseStyles: false
      }
    }),
    mdx(),
    solidJs(),
  ],
  vite: {
    types: ["vite/client"]
  }
});