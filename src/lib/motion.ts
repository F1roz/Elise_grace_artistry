import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const isFinePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

let lenis: Lenis | null = null;

/** Smooth scrolling, synced with GSAP ScrollTrigger. Disabled for reduced motion. */
export function initSmoothScroll() {
  if (prefersReducedMotion() || lenis) return lenis;
  lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

export function getLenis() {
  return lenis;
}

/** Scroll to an in-page anchor (#id) smoothly, accounting for the fixed nav. */
export function scrollToHash(hash: string) {
  const el = document.querySelector<HTMLElement>(hash);
  if (!el) return;
  if (lenis) {
    lenis.start();
    lenis.scrollTo(el, { offset: 0, duration: 1.4 });
  }
  else el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  // Move focus for keyboard and screen-reader users
  el.setAttribute('tabindex', '-1');
  el.focus({ preventScroll: true });
}

export { gsap, ScrollTrigger };
