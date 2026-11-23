# Elise Grace Artistry — website

React + TypeScript + Vite + Tailwind CSS + GSAP (ScrollTrigger) + Lenis smooth scroll + Lucide icons.
The hero "liquid satin" is a hand-written WebGL shader (no Three.js needed — keeps the site light).

## Run
    npm install
    npm run dev       # local preview
    npm run build     # production build → dist/index.html (single self-contained file)

Deploy `dist/` to Netlify, Vercel or any static host.

## Edit content
Everything — services, prices, testimonials, links, tips, portfolio — lives in `src/data/site.ts`.

## Add real portfolio photos
1. Put images in `src/assets/` (JPG/WebP, ~1600px on the long edge).
2. In `src/data/site.ts`, import each image and add `src` + `alt` to a PORTFOLIO item:
       import softGlam from '../assets/soft-glam.jpg';
       { id: 'p1', ..., src: softGlam, alt: 'Soft glam makeup with defined brows' }
   The placeholder art and "Placeholder" tag disappear automatically.
Tip: for normal hosting with many photos, remove `viteSingleFile()` in vite.config.ts so images ship as separate files.

## TikTok videos
The three frames in the Social section link to the profile. To embed specific videos, replace those
frames in `src/components/Sections.tsx` (`Social`) with TikTok's official embed code.

## Fonts
Cormorant Garamond (display, matched to the logo), Pinyon Script (accents, echoing the brand's story graphics),
Jost (body). All self-hosted via @fontsource — no external requests.
