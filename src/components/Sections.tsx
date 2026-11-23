import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, Car, Check, Copy, MapPin, MessageCircle, Play, Sparkles } from 'lucide-react';
import { BOOK_URL, BRAND, CARE_TIPS, NAV, TESTIMONIALS, WHY } from '../data/site';
import { gsap, prefersReducedMotion } from '../lib/motion';
import { InstagramIcon, LineArt, Sparkle, TikTokIcon, Wordmark } from './Art';
import { AnchorLink } from './Chrome';
import SilkCanvas from './SilkCanvas';

/* ═════════════ MOBILE SERVICES ═════════════ */
export function MobileServices() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = root.current!;
    const ctx = gsap.context(() => {
      const path = el.querySelector<SVGPathElement>('.route')!;
      const car = el.querySelector<SVGGElement>('.route-car')!;
      const len = path.getTotalLength();
      const place = (p: number) => {
        const pt = path.getPointAtLength(len * p);
        car.setAttribute('transform', `translate(${pt.x} ${pt.y})`);
        path.style.strokeDashoffset = String(len * (1 - p));
      };
      path.style.strokeDasharray = String(len);
      if (prefersReducedMotion()) return place(1);
      place(0);
      const st = { p: 0 };
      gsap.to(st, {
        p: 1, ease: 'none',
        onUpdate: () => place(st.p),
        scrollTrigger: { trigger: '.route-svg', start: 'top 80%', end: 'bottom 40%', scrub: 0.6 },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="mobile" aria-labelledby="mobile-title" className="grain relative overflow-hidden bg-espresso py-28 text-ivory md:py-40">
      <SilkCanvas palette="dark" scale={0.45} />
      <div className="absolute inset-0 bg-gradient-to-b from-espresso/70 via-espresso/30 to-espresso/80" aria-hidden="true" />
      <div className="relative z-[2] mx-auto grid max-w-[1400px] grid-cols-12 items-center gap-y-16 px-5 md:px-10">
        <div className="col-span-12 lg:col-span-6">
          <p className="reveal eyebrow flex items-center gap-3 text-mink"><Car className="h-4 w-4" strokeWidth={1.2} /> Mobile services</p>
          <h2 id="mobile-title" className="display mt-7 text-[14vw] md:text-8xl lg:text-[6.6rem]" data-split>
            <span className="line-mask"><span className="line-inner">Luxury beauty,</span></span>
            <span className="line-mask"><span className="line-inner italic text-mink">wherever</span></span>
            <span className="line-mask"><span className="line-inner">you are.</span></span>
          </h2>
          <p className="reveal mt-8 max-w-lg text-[1.02rem] leading-relaxed text-sand/85">
            Mobile makeup and hairstyling services are available, so you can get ready somewhere comfortable, surrounded by
            the people you love. Send a DM with your date, location and how many people are getting ready, and Elise will
            confirm availability.
          </p>
          <div className="reveal mt-10 flex flex-wrap gap-4">
            <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" className="btn btn-light">
              <span>Enquire about mobile</span>
              <ArrowUpRight className="relative z-[1] h-4 w-4" strokeWidth={1.3} />
            </a>
            <AnchorLink href="#book" className="btn btn-line text-ivory"><span>Plan your enquiry</span></AnchorLink>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-6">
          <svg viewBox="0 0 560 420" className="route-svg w-full" role="img" aria-label="Illustration: from Yagoona to your door">
            <defs>
              <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                <stop offset="0" stopColor="#C9B49E" stopOpacity=".35" />
                <stop offset="1" stopColor="#C9B49E" stopOpacity="0" />
              </radialGradient>
            </defs>
            {[...Array(7)].map((_, i) => (
              <circle key={i} cx="280" cy="210" r={40 + i * 34} fill="none" stroke="#F5EEE6" strokeOpacity={0.05 + (6 - i) * 0.008} />
            ))}
            <path d="M70 320 C 150 120, 260 360, 330 200 S 470 80, 490 110" fill="none" stroke="#F5EEE6" strokeOpacity=".18" strokeWidth="1" strokeDasharray="2 7" />
            <path className="route" d="M70 320 C 150 120, 260 360, 330 200 S 470 80, 490 110" fill="none" stroke="#C9B49E" strokeWidth="1.4" strokeLinecap="round" />
            <circle cx="70" cy="320" r="46" fill="url(#glow)" />
            <circle cx="70" cy="320" r="6" fill="#F5EEE6" />
            <circle cx="490" cy="110" r="60" fill="url(#glow)" />
            <circle cx="490" cy="110" r="7" fill="none" stroke="#F5EEE6" />
            <circle cx="490" cy="110" r="2.5" fill="#F5EEE6" />
            <g className="route-car">
              <circle r="15" fill="#F5EEE6" />
              <path d="M-6 0.5 L6 0.5 M-5 0.5 L-3.5 -3.5 L3.5 -3.5 L5 0.5 L5 4 L-5 4 Z" fill="none" stroke="#221A15" strokeWidth="1.2" strokeLinejoin="round" />
            </g>
            <text x="70" y="362" textAnchor="middle" className="fill-ivory font-sans uppercase" style={{ fontSize: 11, letterSpacing: '0.24em' }}>Yagoona</text>
            <text x="490" y="62" textAnchor="middle" className="fill-ivory font-display italic" style={{ fontSize: 26 }}>your place</text>
          </svg>
        </div>
      </div>
    </section>
  );
}

/* ═════════════ KIND WORDS (real client messages) ═════════════ */
export function KindWords() {
  return (
    <section aria-labelledby="words-title" className="relative overflow-hidden bg-sand py-28 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="reveal eyebrow text-bronze">Kind words</p>
            <h2 id="words-title" className="display mt-6 text-6xl text-espresso md:text-8xl" data-split>
              <span className="line-mask"><span className="line-inner">From <span className="italic text-taupe">her clients</span></span></span>
            </h2>
          </div>
          <p className="reveal max-w-xs text-sm text-cocoa/70">Shared from messages clients sent to Elise after their appointments.</p>
        </div>
        <div className="snap-row -mx-5 mt-16 flex gap-5 overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-2 md:gap-8 md:overflow-visible md:px-0">
          {TESTIMONIALS.map((t, i) => (
            <figure key={i} className="reveal relative min-w-[86%] bg-porcelain p-8 md:min-w-0 md:p-12">
              <span className="pointer-events-none absolute right-8 top-2 font-display text-[9rem] leading-none text-sand" aria-hidden="true">&ldquo;</span>
              <blockquote className="relative">
                <p className="font-display text-2xl font-light leading-snug text-espresso md:text-[1.9rem]">{t.quote}</p>
                <p className="mt-6 font-display text-xl italic text-taupe">{t.tail}</p>
              </blockquote>
              <figcaption className="mt-10 flex items-center gap-4 border-t border-cocoa/10 pt-6 eyebrow text-cocoa/70">
                <Sparkle className="h-2.5 w-2.5 text-bronze" />
                {t.who}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═════════════ WHY CHOOSE ═════════════ */
export function Why() {
  return (
    <section aria-labelledby="why-title" className="relative bg-porcelain py-28 md:py-40">
      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-y-14 px-5 md:px-10">
        <div className="col-span-12 lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <p className="reveal eyebrow text-bronze">Why Elise Grace</p>
            <h2 id="why-title" className="display mt-6 text-6xl text-espresso md:text-7xl" data-split>
              <span className="line-mask"><span className="line-inner">The details</span></span>
              <span className="line-mask"><span className="line-inner italic text-taupe">make it yours</span></span>
            </h2>
            <div className="reveal mt-10 hidden h-64 w-48 text-taupe lg:block">
              <LineArt name="brush" className="h-full w-full" />
            </div>
          </div>
        </div>
        <ol className="col-span-12 lg:col-span-7 lg:col-start-6">
          {WHY.map((w, i) => (
            <li key={w.title} className="reveal group relative grid grid-cols-[auto_1fr] gap-x-8 border-t border-cocoa/15 py-10 md:py-12">
              <span className="absolute left-0 top-0 h-px w-0 bg-bronze transition-all duration-1000 group-hover:w-full" style={{ transitionTimingFunction: 'var(--ease-lux)' }} aria-hidden="true" />
              <span className="font-display text-xl italic text-bronze">0{i + 1}</span>
              <div>
                <h3 className="font-display text-4xl font-light text-espresso transition-transform duration-700 group-hover:translate-x-2 md:text-5xl">{w.title}</h3>
                <p className="mt-4 max-w-lg leading-relaxed text-cocoa/80">{w.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ═════════════ HAIR CARE NOTES ═════════════ */
export function CareNotes() {
  return (
    <section aria-labelledby="care-title" className="relative overflow-hidden border-t border-cocoa/10 bg-ivory py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="reveal font-script text-4xl text-taupe">between appointments</p>
            <h2 id="care-title" className="reveal display mt-2 text-5xl text-espresso md:text-6xl">Five ways to keep hair healthy</h2>
          </div>
          <p className="reveal eyebrow text-cocoa/60">healthy hair, happy you</p>
        </div>
        <ol className="snap-row -mx-5 mt-14 flex gap-px overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-5 md:overflow-visible md:px-0">
          {CARE_TIPS.map((c, i) => (
            <li key={c.title} className="reveal group min-w-[72%] bg-porcelain p-7 transition-colors duration-700 hover:bg-mink hover:text-ivory sm:min-w-[45%] md:min-w-0">
              <span className="font-display text-5xl font-light text-mink transition-colors duration-700 group-hover:text-ivory">0{i + 1}</span>
              <h3 className="mt-8 font-sans text-xs uppercase tracking-wide2 font-normal">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed opacity-80">{c.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ═════════════ SOCIAL ═════════════ */
export function Social() {
  return (
    <section id="social" aria-labelledby="social-title" className="grain relative overflow-hidden bg-mink py-28 text-ivory md:py-40">
      <SilkCanvas palette="mink" scale={0.4} className="opacity-70" />
      <div className="relative z-[2] mx-auto grid max-w-[1400px] grid-cols-12 items-center gap-y-16 px-5 md:px-10">
        <div className="col-span-12 lg:col-span-5">
          <p className="reveal eyebrow flex items-center gap-3"><TikTokIcon className="h-4 w-4" /> On TikTok</p>
          <h2 id="social-title" className="display mt-7 text-[14vw] md:text-8xl" data-split>
            <span className="line-mask"><span className="line-inner">Watch the</span></span>
            <span className="line-mask"><span className="line-inner italic">artistry unfold</span></span>
          </h2>
          <p className="reveal mt-8 max-w-md leading-relaxed text-ivory/90">
            Transformations, techniques and behind-the-scenes moments. Follow along for the latest looks, and send a DM when
            you are ready to book.
          </p>
          <div className="reveal mt-10 flex flex-wrap gap-4">
            <a href={BRAND.tiktok.url} target="_blank" rel="noopener noreferrer" className="btn btn-light">
              <TikTokIcon className="relative z-[1] h-4 w-4" />
              <span>Follow on TikTok</span>
            </a>
            <a href={BRAND.instagram.url} target="_blank" rel="noopener noreferrer" className="btn btn-line text-ivory">
              <InstagramIcon className="relative z-[1] h-4 w-4" />
              <span>Instagram</span>
            </a>
          </div>
          <p className="reveal mt-8 font-display text-2xl italic text-ivory/85">{BRAND.tiktok.handle}</p>
        </div>

        {/* Video preview frames: link to the profile. Replace with TikTok embeds when ready. */}
        <div className="col-span-12 lg:col-span-7">
          <div className="grid grid-cols-3 items-center gap-3 md:gap-5">
            {[
              { art: 'eye' as const, label: 'Makeup', offset: 'translate-y-10' },
              { art: 'curl' as const, label: 'Hair', offset: '-translate-y-6' },
              { art: 'lips' as const, label: 'Glam', offset: 'translate-y-4' },
            ].map((v, i) => (
              <a
                key={v.label}
                href={BRAND.tiktok.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Watch"
                aria-label={`Watch ${v.label.toLowerCase()} videos on TikTok`}
                className={`reveal group relative aspect-[9/16] overflow-hidden rounded-[22px] border border-ivory/30 bg-cocoa/40 shadow-[0_30px_60px_-30px_rgba(34,26,21,.7)] backdrop-blur-sm ${v.offset}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-taupe/40 via-cocoa/30 to-espresso/70" />
                <div className="absolute inset-0 flex items-center justify-center p-6 text-ivory/70 transition-transform duration-1000 group-hover:scale-110">
                  <LineArt name={v.art} className="h-2/3 w-full" />
                </div>
                <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ivory/90 text-espresso transition-transform duration-700 group-hover:scale-110">
                  <Play className="ml-0.5 h-5 w-5" strokeWidth={1.4} fill="currentColor" />
                </span>
                <span className="absolute inset-x-0 bottom-0 flex items-center justify-between p-3 text-[0.6rem] uppercase tracking-[0.2em] md:p-4">
                  {v.label} <TikTokIcon className="h-3.5 w-3.5" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═════════════ BOOKING / ENQUIRY COMPOSER ═════════════ */
const OCCASIONS = ['Wedding or bridal party', 'Formal', 'Engagement', 'Birthday or celebration', 'Event or night out', 'Photoshoot', 'Other'];
const SERVICE_OPTS = ['Makeup', 'Hair', 'Facial', 'Nanoplasty'];

export function Book() {
  const id = useId();
  const [f, setF] = useState({ name: '', occasion: OCCASIONS[0], date: '', people: '1', where: 'Studio' as 'Studio' | 'Mobile', suburb: '', notes: '' });
  const [services, setServices] = useState<string[]>(['Makeup', 'Hair']);
  const [errors, setErrors] = useState<string[]>([]);
  const [status, setStatus] = useState('');

  const message = useMemo(() => {
    const date = f.date ? new Date(f.date + 'T00:00').toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : 'TBC';
    const lines = [
      `Hi Elise! I'd love to book an appointment.`,
      ``,
      `Name: ${f.name || '…'}`,
      `Occasion: ${f.occasion}`,
      `Service: ${services.length ? services.join(' + ') : '…'}`,
      `Date: ${date}`,
      `Number of people: ${f.people}`,
      `Location: ${f.where === 'Mobile' ? `Mobile service${f.suburb ? `, ${f.suburb}` : ''}` : 'Studio, Yagoona'}`,
    ];
    if (f.notes.trim()) lines.push(`Notes: ${f.notes.trim()}`);
    lines.push('', 'Thank you!');
    return lines.join('\n');
  }, [f, services]);

  const validate = () => {
    const e: string[] = [];
    if (!f.name.trim()) e.push('name');
    if (!services.length) e.push('services');
    if (f.where === 'Mobile' && !f.suburb.trim()) e.push('suburb');
    setErrors(e);
    return e;
  };

  const copyThenGo = async (ev: React.MouseEvent<HTMLAnchorElement>) => {
    const e = validate();
    if (e.length) {
      ev.preventDefault();
      setStatus('Please complete the highlighted fields first.');
      document.getElementById(`${id}-${e[0]}`)?.focus();
      return;
    }
    try {
      await navigator.clipboard.writeText(message);
      setStatus('Message copied. Paste it into your DM to send it to Elise.');
    } catch {
      setStatus('Could not copy automatically. Select the message above and copy it, then paste it into your DM.');
    }
  };

  const copyOnly = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setStatus('Message copied to your clipboard.');
    } catch {
      setStatus('Could not copy automatically. Select the message text and copy it manually.');
    }
  };

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setF((s) => ({ ...s, [k]: e.target.value }));
    setErrors((er) => er.filter((x) => x !== k));
  };
  const field = '[font-variant-numeric:lining-nums] mt-2 w-full border-0 border-b border-cocoa/25 bg-transparent px-0 py-3 font-display text-xl text-espresso placeholder:text-cocoa/35 focus:border-bronze focus:outline-none focus:ring-0';
  const label = 'eyebrow text-cocoa/70';
  const err = (k: string) => errors.includes(k);

  return (
    <section id="book" aria-labelledby="book-title" className="relative overflow-hidden bg-porcelain py-28 md:py-40">
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[600px] w-[600px] rounded-full bg-sand/70 blur-[140px]" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-[1400px] grid-cols-12 gap-y-16 px-5 md:px-10 lg:gap-x-16">
        <div className="col-span-12 lg:col-span-5">
          <p className="reveal eyebrow text-bronze">Book your appointment</p>
          <h2 id="book-title" className="display mt-6 text-[15vw] text-espresso md:text-8xl lg:text-[6.4rem]" data-split>
            <span className="line-mask"><span className="line-inner">Let&rsquo;s create</span></span>
            <span className="line-mask"><span className="line-inner italic text-taupe">your look.</span></span>
          </h2>
          <p className="reveal mt-8 max-w-md text-lg leading-relaxed text-cocoa/85">
            Ready for your next special occasion? Get in touch and let&rsquo;s create something beautiful.
          </p>

          <div className="reveal mt-10 flex flex-wrap gap-3">
            <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
              <InstagramIcon className="relative z-[1] h-4 w-4" />
              <span>Book your appointment</span>
            </a>
            <a href={BRAND.tiktok.url} target="_blank" rel="noopener noreferrer" className="btn btn-line on-light text-espresso">
              <TikTokIcon className="relative z-[1] h-4 w-4" />
              <span>Message on TikTok</span>
            </a>
          </div>

          <dl className="reveal mt-14 divide-y divide-cocoa/10 border-y border-cocoa/10">
            {[
              { icon: <MessageCircle className="h-4 w-4" strokeWidth={1.2} />, k: 'Bookings', v: 'By direct message on Instagram or TikTok' },
              { icon: <MapPin className="h-4 w-4" strokeWidth={1.2} />, k: 'Location', v: BRAND.location },
              { icon: <Car className="h-4 w-4" strokeWidth={1.2} />, k: 'Mobile', v: 'Mobile makeup & hairstyling services available' },
            ].map((r) => (
              <div key={r.k} className="flex items-start gap-5 py-5">
                <span className="mt-0.5 text-bronze">{r.icon}</span>
                <dt className="w-24 shrink-0 eyebrow text-cocoa/60">{r.k}</dt>
                <dd className="text-cocoa">{r.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Enquiry composer — builds a ready-to-send DM; nothing is submitted or auto-confirmed */}
        <div className="col-span-12 lg:col-span-7">
          <form
            noValidate
            onSubmit={(e) => e.preventDefault()}
            className="reveal relative bg-ivory p-6 shadow-[0_40px_80px_-50px_rgba(75,60,51,.5)] md:p-12"
            aria-describedby={`${id}-help`}
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="font-script text-3xl text-taupe">enquiry</p>
                <h3 className="display text-4xl text-espresso md:text-5xl">Plan your DM</h3>
              </div>
              <Sparkles className="mt-2 h-5 w-5 text-bronze" strokeWidth={1.2} aria-hidden="true" />
            </div>
            <p id={`${id}-help`} className="mt-4 max-w-lg text-sm leading-relaxed text-cocoa/70">
              Fill in your details and we&rsquo;ll write the message for you. Copy it, open Instagram or TikTok and paste it
              into a DM. Elise will reply personally to confirm availability.
            </p>

            <div className="mt-10 grid gap-x-8 gap-y-8 md:grid-cols-2">
              <div>
                <label htmlFor={`${id}-name`} className={label}>Your name *</label>
                <input id={`${id}-name`} className={`${field} ${err('name') ? '!border-[#9b4a3c]' : ''}`} value={f.name} onChange={set('name')} placeholder="First name" autoComplete="given-name" aria-invalid={err('name')} />
                {err('name') && <p className="mt-2 text-xs text-[#9b4a3c]">Please add your name.</p>}
              </div>
              <div>
                <label htmlFor={`${id}-occasion`} className={label}>Occasion</label>
                <select id={`${id}-occasion`} className={field} value={f.occasion} onChange={set('occasion')}>
                  {OCCASIONS.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
              <fieldset className="md:col-span-2" aria-invalid={err('services')}>
                <legend className={label}>Services *</legend>
                <div className="mt-4 flex flex-wrap gap-2" id={`${id}-services`} tabIndex={-1}>
                  {SERVICE_OPTS.map((s) => {
                    const on = services.includes(s);
                    return (
                      <button
                        key={s}
                        type="button"
                        aria-pressed={on}
                        onClick={() => {
                          setServices((v) => (on ? v.filter((x) => x !== s) : [...v, s]));
                          setErrors((er) => er.filter((x) => x !== 'services'));
                        }}
                        className={`flex items-center gap-2 border px-4 py-2.5 text-sm transition-all duration-500 ${on ? 'border-espresso bg-espresso text-ivory' : 'border-cocoa/25 text-cocoa hover:border-cocoa'}`}
                      >
                        {on && <Check className="h-3.5 w-3.5" strokeWidth={1.5} />} {s}
                      </button>
                    );
                  })}
                </div>
                {err('services') && <p className="mt-2 text-xs text-[#9b4a3c]">Choose at least one service.</p>}
              </fieldset>
              <div>
                <label htmlFor={`${id}-date`} className={label}>Preferred date</label>
                <input id={`${id}-date`} type="date" className={field} value={f.date} onChange={set('date')} min={new Date().toISOString().slice(0, 10)} />
              </div>
              <div>
                <label htmlFor={`${id}-people`} className={label}>Number of people</label>
                <select id={`${id}-people`} className={field} value={f.people} onChange={set('people')}>
                  {['1', '2', '3', '4', '5', '6+'].map((n) => <option key={n}>{n}</option>)}
                </select>
              </div>
              <fieldset className="md:col-span-2">
                <legend className={label}>Where</legend>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {(['Studio', 'Mobile'] as const).map((w) => (
                    <label key={w} className={`flex cursor-pointer items-center justify-center gap-2 border px-4 py-3.5 text-sm transition-all duration-500 has-[:focus-visible]:outline has-[:focus-visible]:outline-1 has-[:focus-visible]:outline-bronze ${f.where === w ? 'border-espresso bg-espresso text-ivory' : 'border-cocoa/25 text-cocoa hover:border-cocoa'}`}>
                      <input type="radio" name={`${id}-where`} value={w} checked={f.where === w} onChange={() => setF((s) => ({ ...s, where: w }))} className="sr-only" />
                      {w === 'Studio' ? <MapPin className="h-4 w-4" strokeWidth={1.2} /> : <Car className="h-4 w-4" strokeWidth={1.2} />}
                      {w === 'Studio' ? 'Studio · Yagoona' : 'Mobile service'}
                    </label>
                  ))}
                </div>
              </fieldset>
              {f.where === 'Mobile' && (
                <div className="md:col-span-2">
                  <label htmlFor={`${id}-suburb`} className={label}>Your suburb *</label>
                  <input id={`${id}-suburb`} className={`${field} ${err('suburb') ? '!border-[#9b4a3c]' : ''}`} value={f.suburb} onChange={set('suburb')} placeholder="Where should Elise come to?" autoComplete="address-level2" aria-invalid={err('suburb')} />
                  {err('suburb') && <p className="mt-2 text-xs text-[#9b4a3c]">Please add your suburb for mobile bookings.</p>}
                </div>
              )}
              <div className="md:col-span-2">
                <label htmlFor={`${id}-notes`} className={label}>Notes & inspiration</label>
                <textarea id={`${id}-notes`} rows={2} className={`${field} resize-none`} value={f.notes} onChange={set('notes')} placeholder="Start time, the look you love, hair length…" />
              </div>
            </div>

            <div className="mt-10 bg-porcelain p-5">
              <div className="flex items-center justify-between">
                <p className="eyebrow text-cocoa/60">Your message</p>
                <button type="button" onClick={copyOnly} className="flex items-center gap-2 eyebrow text-bronze link-u"><Copy className="h-3.5 w-3.5" strokeWidth={1.3} /> Copy</button>
              </div>
              <textarea readOnly value={message} rows={9} aria-label="Generated message preview" className="mt-3 w-full resize-none border-0 bg-transparent p-0 font-sans text-sm leading-relaxed text-cocoa focus:ring-0" />
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <a href={BRAND.instagram.url} target="_blank" rel="noopener noreferrer" onClick={copyThenGo} className="btn btn-solid">
                <InstagramIcon className="relative z-[1] h-4 w-4" />
                <span>Copy &amp; open Instagram</span>
              </a>
              <a href={BRAND.tiktok.url} target="_blank" rel="noopener noreferrer" onClick={copyThenGo} className="btn btn-line on-light text-espresso">
                <TikTokIcon className="relative z-[1] h-4 w-4" />
                <span>Copy &amp; open TikTok</span>
              </a>
            </div>
            <p role="status" aria-live="polite" className="mt-5 min-h-[1.25rem] text-sm text-bronze">{status}</p>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ═════════════ FOOTER ═════════════ */
export function Footer() {
  return (
    <footer className="grain relative overflow-hidden bg-espresso pt-24 text-ivory">
      <div className="relative z-[2] mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="grid grid-cols-12 gap-y-12 border-b border-ivory/10 pb-16">
          <div className="col-span-12 md:col-span-5">
            <p className="display text-5xl md:text-6xl">Ready when <span className="italic text-mink">you are.</span></p>
            <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" className="btn btn-light mt-8">
              <span>Book via DM</span>
              <ArrowUpRight className="relative z-[1] h-4 w-4" strokeWidth={1.3} />
            </a>
          </div>
          <nav aria-label="Footer" className="col-span-6 md:col-span-2 md:col-start-7">
            <p className="eyebrow text-mink">Explore</p>
            <ul className="mt-5 space-y-3">
              {NAV.map((n) => (
                <li key={n.href}><AnchorLink href={n.href} className="link-u text-sand/85">{n.label}</AnchorLink></li>
              ))}
            </ul>
          </nav>
          <div className="col-span-6 md:col-span-3 md:col-start-10">
            <p className="eyebrow text-mink">Connect</p>
            <ul className="mt-5 space-y-3">
              <li><a href={BRAND.instagram.url} target="_blank" rel="noopener noreferrer" className="link-u flex items-center gap-2 text-sand/85"><InstagramIcon /> Instagram</a></li>
              <li><a href={BRAND.tiktok.url} target="_blank" rel="noopener noreferrer" className="link-u flex items-center gap-2 text-sand/85"><TikTokIcon /> TikTok</a></li>
            </ul>
            <p className="mt-8 eyebrow text-mink">Studio</p>
            <p className="mt-3 text-sand/85">{BRAND.location}</p>
            <p className="mt-1 text-sand/60">Mobile services available</p>
          </div>
        </div>
        <div className="flex justify-center overflow-hidden py-14 text-ivory/90 md:py-20" aria-hidden="true">
          <Wordmark size="xl" />
        </div>
        <div className="flex flex-col items-center justify-between gap-3 border-t border-ivory/10 py-7 text-xs text-sand/50 md:flex-row">
          <p>&copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
          <AnchorLink href="#top" className="link-u eyebrow">Back to top</AnchorLink>
        </div>
      </div>
    </footer>
  );
}
