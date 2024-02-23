/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

module.exports = {
  mode: 'jit',
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './src/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './**/*.scss'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        danko: {
          mauve: {
            50: "#F0EAF0",
            100: "#E8DEE7",
            200: "#D5C3D5",
            300: "#BEA6BF",
            400: "#AA8BAC",
            500: "#957099",
            600: "#7B597D",
            700: "#5E445F",
            800: "#412F41",
            900: "#241923",
            950: "#150F14"
          },
          plum: {
            50: "#F1DFE7",
            100: "#E6C6D5",
            200: "#CE92AD",
            300: "#B55983",
            400: "#853056",
            500: "#512438",
            600: "#431E2F",
            700: "#351825",
            800: "#27111B",
            900: "#190B11",
            950: "#12080C"
          },
          olivine: {
            50: "#ECF4ED",
            100: "#DFECDF",
            200: "#C6DEC5",
            300: "#B0CFAB",
            400: "#9BC091",
            500: "#88B177",
            600: "#659857",
            700: "#4A7543",
            800: "#325430",
            900: "#1C311D",
            950: "#111D12"
          },
        },
      },
      backgroundImage: {

      },
      fontFamily: {
        sans: ["'Roboto'", 'sans-serif', ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require("tailwindcss-animate"),
  ]
};
