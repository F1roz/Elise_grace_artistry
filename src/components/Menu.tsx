import { ArrowUpRight } from 'lucide-react';
import { BOOK_URL, MENU } from '../data/site';
import { Sparkle } from './Art';
import SilkCanvas from './SilkCanvas';

export default function Menu() {
  return (
    <section id="menu" aria-labelledby="menu-title" className="grain relative overflow-hidden bg-espresso py-28 text-ivory md:py-40">
      <SilkCanvas palette="dark" className="opacity-60" scale={0.4} />
      <div className="absolute inset-0 bg-espresso/55" aria-hidden="true" />
      <div className="relative z-[2] mx-auto max-w-[1300px] px-5 md:px-10">
        <div className="text-center">
          <p className="reveal eyebrow flex items-center justify-center gap-3 text-mink">
            <span className="h-px w-10 bg-current" /> The Menu <span className="h-px w-10 bg-current" />
          </p>
          <h2 id="menu-title" className="display mt-7 text-6xl md:text-8xl" data-split>
            <span className="line-mask"><span className="line-inner">Price <span className="italic text-mink">List</span></span></span>
          </h2>
          <p className="reveal mx-auto mt-6 max-w-md text-sand/80">
            Transparent pricing for every appointment. Message to check availability and your final quote.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-16 lg:grid-cols-[1.25fr_1fr] lg:gap-24">
          <Group g={MENU[0]} />
          <div className="space-y-16">
            {MENU.slice(1).map((g) => <Group key={g.title} g={g} />)}
          </div>
        </div>

        <div className="reveal mt-20 flex flex-col items-center gap-6 text-center">
          <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" className="btn btn-light">
            <span>Book via Instagram DM</span>
            <ArrowUpRight className="relative z-[1] h-4 w-4" strokeWidth={1.3} />
          </a>
          <p className="max-w-lg text-xs leading-relaxed text-sand/60">
            Prices as published by Elise Grace Artistry. Hair prices vary with length and thickness. Pricing for mobile
            appointments is confirmed when you enquire.
          </p>
        </div>
      </div>
    </section>
  );
}

function Group({ g }: { g: (typeof MENU)[number] }) {
  return (
    <div className="reveal">
      <div className="mb-6 flex items-end gap-4">
        <h3 className="font-display text-4xl font-light uppercase tracking-[0.18em]">{g.title}</h3>
        <span className="mb-1 font-script text-2xl text-mink">{g.script}</span>
      </div>
      <ul className="border-t border-ivory/15">
        {g.items.map((it) => (
          <li key={it.name} className="group relative border-b border-ivory/15 py-5">
            <span className="absolute inset-y-0 left-0 w-0 bg-ivory/[0.04] transition-all duration-700 group-hover:w-full" style={{ transitionTimingFunction: 'var(--ease-lux)' }} aria-hidden="true" />
            <div className="relative flex items-baseline gap-4">
              <Sparkle className="h-2 w-2 shrink-0 self-center text-mink transition-transform duration-700 group-hover:rotate-90" />
              <span className="min-w-0 font-display text-xl md:text-2xl">{it.name}</span>
              <span className="mx-1 min-w-[1.5rem] flex-1 translate-y-[-4px] border-b border-dotted border-ivory/25" aria-hidden="true" />
              <span className="whitespace-nowrap font-display text-xl italic md:text-2xl">{it.price}</span>
            </div>
            {it.detail && <p className="relative mt-1 pl-6 text-xs uppercase tracking-[0.14em] text-sand/60">{it.detail}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
