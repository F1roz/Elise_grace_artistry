import { useEffect, useRef } from 'react';
import { gsap, isFinePointer, prefersReducedMotion } from '../lib/motion';
import { Sparkle, Wordmark } from './Art';

const STATEMENT =
  'Every face tells its own story. Elise Grace Artistry exists to tell yours beautifully, with makeup and hair that feel personal, considered and entirely you.';

/** 3D brand card that tilts toward the cursor, with a moving light sheen. */
function TiltCard() {
  const card = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isFinePointer() || prefersReducedMotion()) return;
    const el = card.current!;
    const rx = gsap.quickTo(el, 'rotationX', { duration: 0.9, ease: 'power3' });
    const ry = gsap.quickTo(el, 'rotationY', { duration: 0.9, ease: 'power3' });
    const move = (e: PointerEvent) => {
      const b = el.getBoundingClientRect();
      const x = (e.clientX - b.left) / b.width - 0.5;
      const y = (e.clientY - b.top) / b.height - 0.5;
      rx(-y * 16);
      ry(x * 20);
      el.style.setProperty('--sx', `${(x + 0.5) * 100}%`);
      el.style.setProperty('--sy', `${(y + 0.5) * 100}%`);
    };
    const leave = () => { rx(0); ry(0); };
    const parent = el.parentElement!;
    parent.addEventListener('pointermove', move);
    parent.addEventListener('pointerleave', leave);
    return () => {
      parent.removeEventListener('pointermove', move);
      parent.removeEventListener('pointerleave', leave);
    };
  }, []);

  return (
    <div className="story-card-wrap flex justify-center py-6" style={{ perspective: '1100px' }}>
      <div
        ref={card}
        className="grain relative aspect-[4/5] w-full max-w-[380px] overflow-hidden bg-mink text-ivory shadow-[0_50px_80px_-40px_rgba(75,60,51,.55)]"
        style={{ transformStyle: 'preserve-3d', ['--sx' as string]: '30%', ['--sy' as string]: '20%' }}
      >
        <div
          className="absolute inset-0 z-[2] mix-blend-soft-light"
          style={{ background: 'radial-gradient(60% 50% at var(--sx) var(--sy), rgba(255,250,243,.75), transparent 70%)' }}
          aria-hidden="true"
        />
        <div className="absolute inset-4 border border-ivory/30" aria-hidden="true" />
        <div className="relative z-[3] flex h-full flex-col items-center justify-between py-12" style={{ transform: 'translateZ(50px)' }}>
          <span className="eyebrow text-ivory/80">Yagoona · NSW</span>
          <Wordmark size="md" />
          <span className="font-script text-3xl text-ivory/90">for every occasion</span>
        </div>
      </div>
    </div>
  );
}

export default function Story() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current!;
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        '.st-word',
        { opacity: 0.14 },
        { opacity: 1, ease: 'none', stagger: 0.08, scrollTrigger: { trigger: '.st-statement', start: 'top 80%', end: 'bottom 45%', scrub: true } }
      );
      gsap.from('.story-card-wrap', { y: 120, rotate: -4, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'center center', scrub: true } });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="story" aria-labelledby="story-title" className="relative overflow-hidden bg-porcelain py-28 md:py-40">
      <div className="pointer-events-none absolute -right-40 top-10 h-[520px] w-[520px] rounded-full bg-sand/60 blur-[120px]" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-[1400px] grid-cols-12 gap-y-16 px-5 md:px-10">
        <div className="col-span-12 lg:col-span-7">
          <p className="reveal eyebrow flex items-center gap-3 text-bronze">
            <Sparkle className="h-2.5 w-2.5" /> The Artistry
          </p>
          <h2 id="story-title" className="sr-only">About Elise Grace Artistry</h2>
          <p className="st-statement mt-10 font-display text-[2.1rem] font-light leading-[1.18] text-espresso md:text-5xl lg:text-[3.6rem]">
            {STATEMENT.split(' ').map((w, i) => (
              <span key={i} className={`st-word ${w.includes('yours') || w.includes('entirely') ? 'italic text-bronze' : ''}`}>
                {w}{' '}
              </span>
            ))}
          </p>
          <div className="mt-14 grid max-w-2xl gap-10 md:grid-cols-2">
            <p className="reveal leading-relaxed text-cocoa/85">
              Every appointment starts with a conversation: your features, your skin, your hair and the photos that inspire you.
              From there, each detail is shaped around the occasion so your look photographs beautifully and lasts the whole day.
            </p>
            <p className="reveal leading-relaxed text-cocoa/85">
              Based in Yagoona, NSW, Elise Grace Artistry offers makeup, hairstyling and mobile services, with time taken to
              listen, advise and make sure you feel completely like yourself, only elevated.
            </p>
          </div>
          <div className="reveal mt-14 flex flex-wrap gap-x-10 gap-y-3 font-display text-2xl italic text-taupe">
            <span>Considered.</span><span>Personal.</span><span>Lasting.</span>
          </div>
        </div>
        <div className="col-span-12 flex items-center lg:col-span-4 lg:col-start-9">
          <TiltCard />
        </div>
      </div>
    </section>
  );
}
