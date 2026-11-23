import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { BOOK_URL, BRAND, NAV } from '../data/site';
import { gsap, getLenis, isFinePointer, prefersReducedMotion, scrollToHash } from '../lib/motion';
import { InstagramIcon, TikTokIcon, Wordmark } from './Art';

/* ───────────── Preloader: the logo assembles, then the curtain lifts ───────────── */
export function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (prefersReducedMotion()) {
      onDone();
      return;
    }
    getLenis()?.stop();
    const el = root.current!;
    const tl = gsap.timeline({
      onComplete: () => {
        getLenis()?.start();
        onDone();
      },
    });
    tl.from(el.querySelectorAll('.pl-letter'), { yPercent: 120, opacity: 0, duration: 1.1, ease: 'expo.out', stagger: 0.045 })
      .from(el.querySelectorAll('.pl-line'), { scaleX: 0, duration: 1, ease: 'expo.inOut' }, '-=0.7')
      .from(el.querySelector('.pl-sub'), { opacity: 0, letterSpacing: '0.9em', duration: 1, ease: 'expo.out' }, '<0.1')
      .to(el.querySelector('.pl-inner'), { opacity: 0, y: -30, duration: 0.6, ease: 'power2.in' }, '+=0.35')
      .to(el, { clipPath: 'inset(0 0 100% 0)', duration: 1.1, ease: 'expo.inOut' }, '-=0.15');
    return () => {
      tl.kill();
      getLenis()?.start();
    };
  }, [onDone]);

  const letters = 'ELISE GRACE'.split('');
  return (
    <div ref={root} className="grain fixed inset-0 z-[90] flex items-center justify-center overflow-hidden bg-mink text-ivory" style={{ clipPath: 'inset(0 0 0% 0)' }} aria-hidden="true">
      <div className="pl-inner relative z-[2] flex flex-col items-center">
        <div className="flex overflow-hidden font-display text-[9vw] uppercase leading-none tracking-logo md:text-6xl" style={{ marginRight: '-0.32em' }}>
          {letters.map((l, i) => (
            <span key={i} className="pl-letter inline-block" style={{ width: l === ' ' ? '0.5em' : undefined }}>
              {l}
            </span>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-4">
          <span className="pl-line h-px w-12 origin-right bg-ivory/80 md:w-20" />
          <span className="pl-sub font-display text-sm uppercase tracking-[0.42em]">Artistry</span>
          <span className="pl-line h-px w-12 origin-left bg-ivory/80 md:w-20" />
        </div>
      </div>
    </div>
  );
}

/* ───────────── Custom cursor (desktop only) ───────────── */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState('');
  const [enabled] = useState(() => isFinePointer() && !prefersReducedMotion());

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add('has-cursor');
    const xD = gsap.quickTo(dot.current, 'x', { duration: 0.12, ease: 'power3' });
    const yD = gsap.quickTo(dot.current, 'y', { duration: 0.12, ease: 'power3' });
    const xR = gsap.quickTo(ring.current, 'x', { duration: 0.55, ease: 'power3' });
    const yR = gsap.quickTo(ring.current, 'y', { duration: 0.55, ease: 'power3' });
    gsap.set([dot.current, ring.current], { opacity: 0 });
    let shown = false;
    const move = (e: PointerEvent) => {
      if (!shown) { shown = true; gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.4 }); }
      xD(e.clientX); yD(e.clientY); xR(e.clientX); yR(e.clientY);
    };
    const over = (e: Event) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>('a, button, [data-cursor], input, textarea, select, label');
      const r = ring.current!;
      if (!t) {
        r.dataset.state = '';
        setLabel('');
        return;
      }
      const c = t.dataset.cursor;
      if (c) {
        r.dataset.state = 'label';
        setLabel(c);
      } else if (t.matches('input, textarea, select')) {
        r.dataset.state = 'text';
        setLabel('');
      } else {
        r.dataset.state = 'hover';
        setLabel('');
      }
    };
    const leave = () => gsap.to([dot.current, ring.current], { opacity: 0, duration: 0.3 });
    const enter = () => gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.3 });
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', over);
    document.documentElement.addEventListener('pointerleave', leave);
    document.documentElement.addEventListener('pointerenter', enter);
    return () => {
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
      document.documentElement.removeEventListener('pointerleave', leave);
      document.documentElement.removeEventListener('pointerenter', enter);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div ref={dot} className="pointer-events-none fixed left-0 top-0 z-[95] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-bronze mix-blend-multiply" aria-hidden="true" />
      <div
        ref={ring}
        data-state=""
        aria-hidden="true"
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[94] flex items-center justify-center"
      >
        <span className="cursor-ring-shape flex items-center justify-center rounded-full border border-cocoa/40 text-[0.58rem] uppercase tracking-wide2 text-ivory">
          <span className="cursor-label">{label}</span>
        </span>
      </div>
      <style>{`
        .cursor-ring-shape{width:34px;height:34px;margin:-17px 0 0 -17px;transition:all .55s var(--ease-lux);backdrop-filter:blur(0px)}
        .cursor-label{opacity:0;transition:opacity .3s}
        .cursor-ring[data-state='hover'] .cursor-ring-shape{width:64px;height:64px;margin:-32px 0 0 -32px;border-color:rgba(156,122,92,.6);background:rgba(174,158,143,.12)}
        .cursor-ring[data-state='text'] .cursor-ring-shape{width:4px;height:28px;margin:-14px 0 0 -2px;border-radius:2px;background:rgba(156,122,92,.5);border-color:transparent}
        .cursor-ring[data-state='label'] .cursor-ring-shape{width:92px;height:92px;margin:-46px 0 0 -46px;background:rgba(34,26,21,.82);border-color:transparent;backdrop-filter:blur(6px)}
        .cursor-ring[data-state='label'] .cursor-label{opacity:1}
      `}</style>
    </>
  );
}

/* ───────────── Anchor link that uses smooth scrolling ───────────── */
export function AnchorLink({ href, className = '', children, onClick, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        onClick?.(e);
        if (href.startsWith('#')) {
          e.preventDefault();
          // let any open overlay close and release scroll first
          setTimeout(() => scrollToHash(href), onClick ? 90 : 0);
        }
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

/* ───────────── Sticky navigation ───────────── */
export function Nav({ ready }: { ready: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const toggleBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > window.innerHeight * 0.75);
      setHidden(y > last && y > window.innerHeight * 1.1);
      last = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      lenis?.stop();
      document.body.style.overflow = 'hidden';
      if (!prefersReducedMotion()) {
        gsap.fromTo(panel.current!.querySelectorAll('.m-item'), { yPercent: 110 }, { yPercent: 0, duration: 1, ease: 'expo.out', stagger: 0.06, delay: 0.25 });
      }
      const first = panel.current!.querySelector<HTMLElement>('a');
      setTimeout(() => first?.focus(), 50);
      const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    } else {
      lenis?.start();
      document.body.style.overflow = '';
    }
  }, [open]);

  const close = () => setOpen(false);
  const dark = scrolled || open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${hidden && !open ? '-translate-y-full' : 'translate-y-0'} ${
          ready ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transitionTimingFunction: 'var(--ease-lux)' }}
      >
        <div
          className={`mx-auto flex items-center justify-between px-5 transition-all duration-700 md:px-10 ${
            scrolled && !open ? 'bg-porcelain/80 py-3 text-cocoa shadow-[0_1px_0_rgba(75,60,51,.08)] backdrop-blur-md' : 'py-5 text-ivory md:py-7'
          } ${open ? 'text-ivory' : ''}`}
        >
          <AnchorLink href="#top" aria-label={`${BRAND.name}, back to top`} className="relative z-[60]" onClick={close}>
            <Wordmark size="sm" />
          </AnchorLink>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {NAV.map((n) => (
                <li key={n.href}>
                  <AnchorLink href={n.href} className="link-u eyebrow py-1">
                    {n.label}
                  </AnchorLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="relative z-[60] flex items-center gap-3">
            <a
              href={BOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn hidden !px-5 !py-3 sm:inline-flex ${dark && !open ? 'btn-solid' : 'btn-line'}`}
            >
              <span>Book via DM</span>
              <ArrowUpRight className="relative z-[1] h-3.5 w-3.5" strokeWidth={1.4} />
            </a>
            <button
              ref={toggleBtn}
              type="button"
              className="flex h-11 w-11 items-center justify-center lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X strokeWidth={1.2} /> : <Menu strokeWidth={1.2} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={panel}
        className={`grain fixed inset-0 z-40 flex flex-col justify-between overflow-hidden bg-espresso px-6 pb-10 pt-28 text-ivory transition-[clip-path] duration-[900ms] lg:hidden`}
        style={{ clipPath: open ? 'circle(150% at 100% 0)' : 'circle(0% at 100% 0)', transitionTimingFunction: 'var(--ease-lux)' }}
        aria-hidden={!open}
        inert={!open ? true : undefined}
      >
        <nav aria-label="Mobile" className="relative z-[2]">
          <ul className="space-y-1">
            {NAV.map((n, i) => (
              <li key={n.href} className="overflow-hidden">
                <AnchorLink href={n.href} onClick={close} className="m-item flex items-baseline gap-4 py-1.5">
                  <span className="font-sans text-[0.65rem] tracking-wide2 text-mink">0{i + 1}</span>
                  <span className="display text-5xl">{n.label}</span>
                </AnchorLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="relative z-[2] space-y-6">
          <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" className="btn btn-light w-full">
            <span>Book your appointment via DM</span>
          </a>
          <div className="flex items-center justify-between text-sand">
            <span className="eyebrow">{BRAND.locationShort}</span>
            <div className="flex gap-5">
              <a href={BRAND.instagram.url} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a href={BRAND.tiktok.url} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <TikTokIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ───────────── Mobile floating booking bar ───────────── */
export function MobileBookBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const book = document.getElementById('book');
      const nearBook = book ? book.getBoundingClientRect().top < window.innerHeight * 0.9 : false;
      setShow(window.scrollY > window.innerHeight * 0.9 && !nearBook);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] transition-all duration-700 sm:hidden ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0'
      }`}
      style={{ transitionTimingFunction: 'var(--ease-lux)' }}
    >
      <div className="flex items-stretch overflow-hidden rounded-full bg-espresso/90 text-ivory shadow-[0_18px_40px_-12px_rgba(34,26,21,.55)] backdrop-blur-md">
        <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-2 py-3.5 eyebrow">
          <InstagramIcon className="h-4 w-4" /> Book via DM
        </a>
        <span className="my-2.5 w-px bg-ivory/20" />
        <a href={BRAND.tiktok.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center px-5" aria-label="TikTok">
          <TikTokIcon className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
