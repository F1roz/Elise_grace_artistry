import { useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { BOOK_URL, BRAND } from '../data/site';
import { gsap, isFinePointer, prefersReducedMotion } from '../lib/motion';
import { LineArt, OrbitBadge, Sparkle } from './Art';
import { AnchorLink } from './Chrome';
import SilkCanvas from './SilkCanvas';

export default function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ready) return;
    const el = root.current!;
    const reduced = prefersReducedMotion();
    const ctx = gsap.context(() => {
      if (!reduced) {
        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
        tl.from('.h-line', { yPercent: 115, duration: 1.6, stagger: 0.12 })
          .from('.h-arch', { clipPath: 'inset(100% 0 0 0 round 999px 999px 0 0)', duration: 1.8, ease: 'expo.inOut' }, 0.05)
          .from('.h-arch-inner', { scale: 1.35, duration: 2.2 }, 0.05)
          .from('.h-fade', { opacity: 0, y: 24, duration: 1.2, stagger: 0.08 }, 0.6)
          .from('.h-badge', { opacity: 0, scale: 0.6, rotate: -60, duration: 1.6 }, 0.8);

        // Scroll: content drifts and softens, arch rises faster (depth)
        gsap.to('.h-copy', { yPercent: -18, opacity: 0.2, ease: 'none', scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true } });
        gsap.to('.h-arch-wrap', { yPercent: -26, ease: 'none', scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true } });
        gsap.to('.h-badge', { yPercent: -80, rotate: 90, ease: 'none', scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true } });
      }

      // Mouse parallax layers: a subtle 3D depth field
      if (!reduced && isFinePointer()) {
        const layers = gsap.utils.toArray<HTMLElement>('[data-depth]');
        const setters = layers.map((l) => ({
          d: parseFloat(l.dataset.depth || '0'),
          x: gsap.quickTo(l, 'x', { duration: 1.4, ease: 'power3' }),
          y: gsap.quickTo(l, 'y', { duration: 1.4, ease: 'power3' }),
          r: gsap.quickTo(l, 'rotationY', { duration: 1.4, ease: 'power3' }),
        }));
        const move = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          setters.forEach((s) => {
            s.x(nx * s.d * 40);
            s.y(ny * s.d * 30);
            s.r(nx * s.d * 6);
          });
        };
        window.addEventListener('pointermove', move, { passive: true });
        return () => window.removeEventListener('pointermove', move);
      }
    }, el);
    return () => ctx.revert();
  }, [ready]);

  return (
    <section ref={root} id="top" aria-label="Introduction" className="grain relative flex min-h-[100svh] flex-col overflow-hidden bg-mink text-ivory">
      <SilkCanvas palette="mink" />
      {/* tonal veil for legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#6F5F52]/55 via-[#8D7C6E]/15 to-transparent" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#5E4F44]/45 to-transparent" aria-hidden="true" />

      <div className="relative z-[2] mx-auto grid w-full max-w-[1500px] flex-1 grid-cols-12 items-center gap-y-6 lg:gap-6 px-5 pb-28 pt-32 md:px-10 lg:pt-28" style={{ perspective: '1200px' }}>
        {/* Copy */}
        <div className="h-copy relative col-span-12 lg:col-span-7" data-depth="0.35">
          <div className="h-badge pointer-events-none absolute right-0 top-12 h-24 w-24 text-ivory/90 sm:h-32 sm:w-32 lg:hidden">
            <OrbitBadge className="h-full w-full" />
          </div>
          <p className="h-fade eyebrow mb-7 flex items-center gap-3 text-ivory/85">
            <Sparkle className="h-2.5 w-2.5" /> Makeup &amp; Hairstyling · {BRAND.locationShort}
          </p>
          <h1 className="display text-[17vw] text-ivory sm:text-[13vw] lg:text-[8.6vw] 2xl:text-[9.5rem]">
            <span className="line-mask"><span className="h-line line-inner">Beauty,</span></span>
            <span className="line-mask"><span className="h-line line-inner pl-[0.6em] italic">Artfully</span></span>
            <span className="line-mask relative"><span className="h-line line-inner">Defined.</span></span>
          </h1>
          <p className="h-fade mt-8 max-w-md text-[1.02rem] leading-relaxed text-ivory/90">
            Bespoke makeup artistry and hairstyling, made around your features, your inspiration and your occasion.
            In the studio or wherever your day begins.
          </p>
          <div className="h-fade mt-10 flex flex-wrap items-center gap-4">
            <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" className="btn btn-light">
              <span>Book your appointment</span>
              <ArrowUpRight className="relative z-[1] h-4 w-4" strokeWidth={1.3} />
            </a>
            <AnchorLink href="#portfolio" className="btn btn-line text-ivory">
              <span>Explore my work</span>
            </AnchorLink>
          </div>
        </div>

        {/* Arch composition */}
        <div className="col-span-12 hidden justify-center lg:col-span-5 lg:flex">
          <div className="h-arch-wrap relative" data-depth="-0.6" style={{ transformStyle: 'preserve-3d' }}>
            <div className="h-arch relative h-[68vh] max-h-[640px] w-[min(30vw,430px)] overflow-hidden rounded-t-full border border-ivory/35 shadow-[0_40px_90px_-30px_rgba(40,30,24,.6)]" style={{ clipPath: 'inset(0 0 0 0 round 999px 999px 0 0)' }}>
              <div className="h-arch-inner absolute inset-0">
                <SilkCanvas palette="dark" scale={0.5} />
              </div>
              <div className="absolute inset-3 rounded-t-full border border-ivory/20" aria-hidden="true" />
              <div className="absolute inset-0 flex items-end justify-center pb-10 text-ivory/80">
                <LineArt name="profile" className="h-[78%] w-auto" strokeWidth={1} />
              </div>
              <p className="absolute left-1/2 top-[18%] -translate-x-1/2 font-script text-4xl text-ivory/90">elise grace</p>
            </div>
            <div className="h-badge absolute -bottom-10 -left-16 h-36 w-36 text-ivory" data-depth="1.1">
              <OrbitBadge className="h-full w-full" />
            </div>
            <p className="h-fade absolute -right-24 top-1/2 rotate-90 eyebrow whitespace-nowrap text-ivory/70">Makeup · Hair · Mobile</p>
          </div>
        </div>
      </div>

      {/* Bottom rail */}
      <div className="relative z-[2] border-t border-ivory/20">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-6 px-5 py-4 md:px-10">
          <AnchorLink href="#story" className="h-fade group flex items-center gap-3 eyebrow text-ivory/85">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/40 transition-colors group-hover:bg-ivory group-hover:text-espresso">
              <ArrowDown className="h-3.5 w-3.5" strokeWidth={1.3} />
            </span>
            Scroll
          </AnchorLink>
          <div className="relative hidden flex-1 overflow-hidden md:block" aria-hidden="true">
            <div className="marquee flex w-max gap-10 whitespace-nowrap font-display text-lg italic text-ivory/80">
              {Array.from({ length: 2 }).map((_, k) => (
                <span key={k} className="flex gap-10">
                  {['Makeup artistry', 'Hairstyling', 'Mobile services', 'Facials', 'Yagoona, NSW', 'DM to book'].map((w) => (
                    <span key={w} className="flex items-center gap-10">
                      {w} <Sparkle className="h-2 w-2 not-italic" />
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
          <a href={BRAND.instagram.url} target="_blank" rel="noopener noreferrer" className="h-fade link-u eyebrow text-ivory/85">
            {BRAND.instagram.handle}
          </a>
        </div>
      </div>
    </section>
  );
}
