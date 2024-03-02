import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import solidJs from "@astrojs/solid-js";
import metaTags from "astro-meta-tags";
import react from "@astrojs/react";
import sentry from "@sentry/astro";
import spotlightjs from "@spotlightjs/astro";
import lighthouse from "astro-lighthouse";
import icon from "astro-icon";

export default defineConfig({
  site: 'https://dankonobre.github.io',
  base: '/',
  output: 'static',
  integrations: [
    tailwind(
      {
        config: {
          applyBaseStyles: false
        }
      },
    ),
    mdx(),
    solidJs(),
    metaTags(),
    react(),
    sentry(),
    spotlightjs(),
    lighthouse(),
    icon(
      {
        include: {
          mdi: ["github"],
        },
      },
    ),
  ],
  vite: {
    types: ["vite/client"]
  }
});