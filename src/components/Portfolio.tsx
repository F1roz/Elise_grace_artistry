import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react';
import { BRAND, PORTFOLIO, type PortfolioItem } from '../data/site';
import { gsap, getLenis, prefersReducedMotion } from '../lib/motion';
import { InstagramIcon, LineArt } from './Art';

const FILTERS = ['All', 'Makeup', 'Hair', 'Occasion'] as const;
type Filter = (typeof FILTERS)[number];

const SHAPE: Record<PortfolioItem['shape'], string> = {
  tall: 'md:row-span-2 aspect-[3/4] md:aspect-auto',
  wide: 'md:col-span-2 aspect-[4/3] md:aspect-auto',
  square: 'aspect-square md:aspect-auto',
};

/** A real photo when `src` is set; otherwise an art-directed placeholder. */
function Visual({ item, large = false }: { item: PortfolioItem; large?: boolean }) {
  if (item.src) {
    return <img src={item.src} alt={item.alt ?? item.title} loading="lazy" decoding="async" className="h-full w-full object-cover" />;
  }
  const [a, b, c] = item.tone;
  return (
    <div
      role="img"
      aria-label={`${item.title}: placeholder artwork, portfolio photograph coming soon`}
      className="grain relative h-full w-full overflow-hidden"
      style={{ background: `radial-gradient(90% 70% at 30% 20%, ${a} 0%, ${b} 52%, ${c} 100%)` }}
    >
      <div className="absolute inset-0 opacity-60 mix-blend-soft-light" style={{ background: `linear-gradient(115deg, transparent 30%, rgba(255,250,242,.55) 48%, transparent 62%)` }} />
      <div className="absolute inset-0 flex items-center justify-center p-[12%] text-ivory/85">
        <LineArt name={item.art} className={large ? 'h-[70vh] max-h-full w-auto' : 'h-full w-full'} strokeWidth={large ? 0.9 : 1.6} />
      </div>
    </div>
  );
}

export default function Portfolio() {
  const root = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<Filter>('All');
  const [active, setActive] = useState<number | null>(null);
  const items = useMemo(() => (filter === 'All' ? PORTFOLIO : PORTFOLIO.filter((p) => p.category === filter)), [filter]);
  const hasPlaceholders = PORTFOLIO.some((p) => !p.src);

  // Scroll reveal: tiles unmask upward with inner image counter-zoom
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray<HTMLElement>('.pf-tile').forEach((t, i) => {
        gsap.fromTo(
          t,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'expo.out', delay: (i % 3) * 0.08, scrollTrigger: { trigger: t, start: 'top 90%' } }
        );
        gsap.fromTo(t.querySelector('.pf-media'), { scale: 1.3 }, { scale: 1, duration: 2, ease: 'expo.out', delay: (i % 3) * 0.08, scrollTrigger: { trigger: t, start: 'top 90%' } });
      });
    }, root);
    return () => ctx.revert();
  }, [items]);

  return (
    <section ref={root} id="portfolio" aria-labelledby="portfolio-title" className="relative bg-porcelain py-28 md:py-40">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="grid grid-cols-12 items-end gap-y-8 md:gap-8">
          <div className="col-span-12 lg:col-span-8">
            <p className="reveal eyebrow text-bronze">Portfolio</p>
            <h2 id="portfolio-title" className="display mt-6 text-[15vw] text-espresso md:text-[9rem]" data-split>
              <span className="line-mask"><span className="line-inner">Signature</span></span>
              <span className="line-mask"><span className="line-inner pl-[1.2em] italic text-taupe">Work</span></span>
            </h2>
          </div>
          <div className="reveal col-span-12 lg:col-span-4">
            <p className="leading-relaxed text-cocoa/85">
              A closer look at the artistry. Browse by makeup, hair and occasion, and tap any piece to view it full screen.
            </p>
            <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter portfolio">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  aria-pressed={filter === f}
                  onClick={() => setFilter(f)}
                  className={`border px-5 py-2.5 eyebrow transition-all duration-500 ${
                    filter === f ? 'border-espresso bg-espresso text-ivory' : 'border-cocoa/20 text-cocoa hover:border-cocoa'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        <ul className="mt-16 grid grid-cols-1 md:grid-flow-dense gap-4 sm:grid-cols-2 md:auto-rows-[22vw] md:grid-cols-3 md:gap-5 xl:auto-rows-[19vw] 2xl:auto-rows-[300px]">
          {items.map((item, i) => (
            <li key={item.id} className={`pf-tile group relative overflow-hidden ${SHAPE[item.shape]}`}>
              <button
                type="button"
                onClick={() => setActive(i)}
                data-cursor="View"
                className="absolute inset-0 block h-full w-full text-left"
                aria-label={`Open ${item.title} (${item.category}) full screen`}
              >
                <div className="pf-media absolute inset-0 transition-transform duration-[1400ms] group-hover:scale-[1.06]" style={{ transitionTimingFunction: 'var(--ease-lux)' }}>
                  <Visual item={item} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-espresso/0 to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-ivory md:p-6">
                  <div className="overflow-hidden pb-1">
                    <p className="eyebrow text-ivory/75">{item.category}</p>
                    <p className="font-display text-3xl leading-[1.2] transition-transform duration-700 md:translate-y-2 md:group-hover:translate-y-0">{item.title}</p>
                  </div>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/50 transition-all duration-700 group-hover:rotate-45 group-hover:bg-ivory group-hover:text-espresso">
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.3} />
                  </span>
                </div>
                {!item.src && <span className="absolute left-4 top-4 bg-ivory/85 px-2.5 py-1 text-[0.58rem] uppercase tracking-[0.18em] text-cocoa backdrop-blur">Placeholder</span>}
              </button>
            </li>
          ))}
        </ul>

        <div className="reveal mt-14 flex flex-col items-start justify-between gap-6 border-t border-cocoa/15 pt-8 md:flex-row md:items-center">
          <p className="max-w-xl text-sm text-cocoa/70">
            {hasPlaceholders
              ? 'Illustrated placeholders shown while the portfolio is being curated. See the latest real looks on Instagram and TikTok.'
              : 'See the latest looks on Instagram and TikTok.'}
          </p>
          <a href={BRAND.instagram.url} target="_blank" rel="noopener noreferrer" className="btn btn-line on-light text-espresso">
            <span className="flex items-center gap-3"><InstagramIcon /> See more on Instagram</span>
          </a>
        </div>
      </div>

      {active !== null && <Lightbox items={items} index={active} onIndex={setActive} onClose={() => setActive(null)} />}
    </section>
  );
}

function Lightbox({ items, index, onIndex, onClose }: { items: PortfolioItem[]; index: number; onIndex: (i: number) => void; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const item = items[index];
  const go = useCallback((d: number) => onIndex((index + d + items.length) % items.length), [index, items.length, onIndex]);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    getLenis()?.stop();
    document.body.style.overflow = 'hidden';
    ref.current?.querySelector<HTMLElement>('[data-close]')?.focus();
    if (!prefersReducedMotion()) gsap.fromTo(ref.current, { clipPath: 'inset(50% 0 50% 0)' }, { clipPath: 'inset(0% 0 0% 0)', duration: 0.9, ease: 'expo.inOut' });
    return () => {
      getLenis()?.start();
      document.body.style.overflow = '';
      prev?.focus();
    };
  }, []);

  useEffect(() => {
    if (!prefersReducedMotion()) gsap.fromTo(stage.current, { opacity: 0, scale: 0.97 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'expo.out' });
  }, [index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'Tab') {
        // keep focus inside the dialog
        const f = ref.current!.querySelectorAll<HTMLElement>('button');
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, onClose]);

  // swipe on touch
  const touch = useRef(0);

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title}, ${index + 1} of ${items.length}`}
      className="grain fixed inset-0 z-[80] flex flex-col bg-espresso text-ivory"
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - touch.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
      }}
    >
      <div className="relative z-[2] flex items-center justify-between px-5 py-5 md:px-10">
        <p className="eyebrow text-sand/80">
          {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')} · {item.category}
        </p>
        <button data-close type="button" onClick={onClose} className="flex h-12 w-12 items-center justify-center rounded-full border border-ivory/30 transition-colors hover:bg-ivory hover:text-espresso" aria-label="Close full screen view">
          <X className="h-5 w-5" strokeWidth={1.2} />
        </button>
      </div>
      <div className="relative z-[2] flex min-h-0 flex-1 items-center justify-center gap-4 px-3 md:px-10">
        <button type="button" onClick={() => go(-1)} className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-full border border-ivory/30 transition-colors hover:bg-ivory hover:text-espresso md:flex" aria-label="Previous">
          <ArrowLeft className="h-5 w-5" strokeWidth={1.2} />
        </button>
        <div ref={stage} className="relative h-full max-h-[78vh] w-full max-w-[min(900px,100%)] overflow-hidden">
          <Visual item={item} large />
        </div>
        <button type="button" onClick={() => go(1)} className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-full border border-ivory/30 transition-colors hover:bg-ivory hover:text-espresso md:flex" aria-label="Next">
          <ArrowRight className="h-5 w-5" strokeWidth={1.2} />
        </button>
      </div>
      <div className="relative z-[2] flex items-end justify-between gap-4 px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-5 md:px-10">
        <h3 className="display text-4xl md:text-6xl">{item.title}</h3>
        <div className="flex gap-2 md:hidden">
          <button type="button" onClick={() => go(-1)} className="flex h-12 w-12 items-center justify-center rounded-full border border-ivory/30" aria-label="Previous"><ArrowLeft className="h-4 w-4" strokeWidth={1.2} /></button>
          <button type="button" onClick={() => go(1)} className="flex h-12 w-12 items-center justify-center rounded-full border border-ivory/30" aria-label="Next"><ArrowRight className="h-4 w-4" strokeWidth={1.2} /></button>
        </div>
        {!item.src && <p className="hidden text-xs text-sand/60 md:block">Placeholder artwork · portfolio photograph coming soon</p>}
      </div>
    </div>
  );
}
