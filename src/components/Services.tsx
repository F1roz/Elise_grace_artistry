import { useEffect, useRef } from 'react';
import { ArrowUpRight, Car } from 'lucide-react';
import { BOOK_URL, SERVICES, type Service } from '../data/site';
import { gsap, prefersReducedMotion } from '../lib/motion';
import { LineArt, Sparkle } from './Art';

const THEMES = [
  { bg: 'bg-ivory', text: 'text-espresso', sub: 'text-cocoa/80', arch: 'bg-mink text-ivory', accent: 'text-bronze', line: 'border-cocoa/15' },
  { bg: 'bg-mink', text: 'text-ivory', sub: 'text-ivory/85', arch: 'bg-cocoa text-sand', accent: 'text-ivory', line: 'border-ivory/25' },
  { bg: 'bg-sand', text: 'text-espresso', sub: 'text-cocoa/80', arch: 'bg-taupe text-ivory', accent: 'text-bronze', line: 'border-cocoa/15' },
  { bg: 'bg-espresso', text: 'text-ivory', sub: 'text-sand/80', arch: 'bg-cocoa text-mink', accent: 'text-mink', line: 'border-ivory/15' },
];

function Panel({ s, i }: { s: Service; i: number }) {
  const t = THEMES[i % THEMES.length];
  return (
    <article
      className={`svc-panel grain relative flex min-h-[100svh] w-full shrink-0 items-center overflow-hidden ${t.bg} ${t.text} lg:h-screen lg:w-screen`}
      aria-labelledby={`svc-${s.no}`}
    >
      <span
        className="pointer-events-none absolute -bottom-[0.18em] right-[2vw] select-none font-display text-[46vw] font-light leading-none opacity-[0.07] lg:text-[34vw]"
        aria-hidden="true"
      >
        {s.no}
      </span>
      <div className="relative z-[2] mx-auto grid w-full max-w-[1400px] grid-cols-12 items-center gap-y-10 md:gap-10 px-5 py-24 md:px-10">
        <div className="svc-arch col-span-12 flex justify-center md:col-span-5">
          <div className={`relative aspect-[3/4] w-[70%] max-w-[360px] overflow-hidden rounded-t-full ${t.arch}`}>
            <div className="absolute inset-3 rounded-t-full border border-current opacity-30" aria-hidden="true" />
            <div className="absolute inset-0 flex items-center justify-center p-10">
              <LineArt name={s.art} className="h-full w-full" />
            </div>
            <span className="absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-script text-2xl opacity-90">{s.script}</span>
          </div>
        </div>
        <div className="col-span-12 md:col-span-7 md:pl-6">
          <p className={`eyebrow flex items-center gap-3 ${t.accent}`}>
            <span>{s.no}</span><span className="h-px w-10 bg-current" /> {s.note ?? 'Service'}
          </p>
          <h3 id={`svc-${s.no}`} className="display mt-6 text-[13vw] md:text-7xl lg:text-[6.2rem]">
            {s.title.split(' ').map((w, k) => (
              <span key={k} className={k === 1 ? 'italic' : ''}>{w} </span>
            ))}
          </h3>
          <p className={`mt-7 max-w-xl text-[1.02rem] leading-relaxed ${t.sub}`}>{s.body}</p>
          <ul className={`mt-9 grid max-w-xl grid-cols-2 border-t ${t.line}`}>
            {s.includes.map((x) => (
              <li key={x} className={`flex items-center gap-3 border-b py-3.5 text-sm ${t.line}`}>
                <Sparkle className={`h-2 w-2 shrink-0 ${t.accent}`} /> {x}
              </li>
            ))}
          </ul>
          <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" className={`btn mt-10 ${i % 2 ? 'btn-light' : 'btn-solid'}`}>
            <span>Enquire via DM</span>
            <ArrowUpRight className="relative z-[1] h-4 w-4" strokeWidth={1.3} />
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Services() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current!;
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;
      // Desktop: pinned horizontal journey through the services
      mm.add('(min-width: 1024px)', () => {
        const panels = gsap.utils.toArray<HTMLElement>('.svc-panel', el);
        const tween = gsap.to(track.current, {
          x: () => -(track.current!.scrollWidth - window.innerWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: '.svc-pin',
            start: 'top top',
            end: () => `+=${track.current!.scrollWidth - window.innerWidth}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            snap: { snapTo: 1 / (panels.length - 1), duration: { min: 0.3, max: 0.8 }, ease: 'power2.inOut', delay: 0.05 },
            onUpdate: (self) => {
              const bar = el.querySelector<HTMLElement>('.svc-progress');
              if (bar) bar.style.transform = `scaleX(${self.progress})`;
            },
          },
        });
        panels.forEach((p) => {
          gsap.from(p.querySelector('.svc-arch'), {
            yPercent: 20, rotate: -6, opacity: 0.3, ease: 'none',
            scrollTrigger: { trigger: p, containerAnimation: tween, start: 'left 90%', end: 'left 30%', scrub: true },
          });
        });
      });
      // Mobile/tablet: gentle reveal per panel
      mm.add('(max-width: 1023px)', () => {
        gsap.utils.toArray<HTMLElement>('.svc-arch', el).forEach((a) => {
          gsap.from(a, { y: 60, opacity: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: a, start: 'top 85%' } });
        });
      });
    }, el);
    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);

  return (
    <section ref={root} id="services" aria-labelledby="services-title" className="relative bg-ivory">
      <div className="mx-auto max-w-[1400px] px-5 pb-16 pt-28 md:px-10 md:pt-36">
        <div className="grid grid-cols-12 items-end gap-y-8 md:gap-8">
          <div className="col-span-12 md:col-span-7">
            <p className="reveal eyebrow text-bronze">Services</p>
            <h2 id="services-title" className="display mt-6 text-6xl text-espresso md:text-8xl" data-split>
              <span className="line-mask"><span className="line-inner">Crafted for</span></span>
              <span className="line-mask"><span className="line-inner italic text-taupe">your moment</span></span>
            </h2>
          </div>
          <div className="reveal col-span-12 md:col-span-4 md:col-start-9">
            <p className="leading-relaxed text-cocoa/85">
              Makeup and hair, plus facials and treatments. Every service is tailored to you, and mobile makeup and hairstyling
              services are available.
            </p>
            <p className="mt-5 inline-flex items-center gap-3 border border-cocoa/20 px-4 py-2.5 eyebrow text-cocoa">
              <Car className="h-4 w-4" strokeWidth={1.2} /> Mobile services available
            </p>
          </div>
        </div>
      </div>
      <div className="svc-pin relative overflow-hidden">
        <div ref={track} className="flex flex-col lg:w-max lg:flex-row">
          {SERVICES.map((s, i) => (
            <Panel key={s.no} s={s} i={i} />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-x-10 bottom-8 z-10 hidden h-px bg-mink/40 lg:block" aria-hidden="true">
          <div className="svc-progress h-px origin-left scale-x-0 bg-bronze" />
        </div>
      </div>
    </section>
  );
}
