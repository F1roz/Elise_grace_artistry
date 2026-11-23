import { useCallback, useEffect, useState } from 'react';
import { Cursor, MobileBookBar, Nav, Preloader } from './components/Chrome';
import Hero from './components/Hero';
import Story from './components/Story';
import Services from './components/Services';
import Menu from './components/Menu';
import Portfolio from './components/Portfolio';
import { Book, CareNotes, Footer, KindWords, MobileServices, Social, Why } from './components/Sections';
import { ScrollTrigger, gsap, initSmoothScroll, prefersReducedMotion } from './lib/motion';

export default function App() {
  const [ready, setReady] = useState(false);
  const done = useCallback(() => setReady(true), []);

  useEffect(() => {
    initSmoothScroll();
  }, []);

  // Global scroll reveals: fade-up blocks and masked headline lines
  useEffect(() => {
    if (!ready || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
        gsap.from(el, { y: 40, opacity: 0, duration: 1.3, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
      });
      gsap.utils.toArray<HTMLElement>('[data-split]').forEach((el) => {
        gsap.from(el.querySelectorAll('.line-inner'), {
          yPercent: 115, duration: 1.5, ease: 'expo.out', stagger: 0.1,
          scrollTrigger: { trigger: el, start: 'top 85%' },
        });
      });
    });
    const t = setTimeout(() => ScrollTrigger.refresh(), 400);
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => {
      clearTimeout(t);
      ctx.revert();
    };
  }, [ready]);

  return (
    <>
      <a href="#main" className="skip-link btn btn-solid">
        <span>Skip to content</span>
      </a>
      {!ready && <Preloader onDone={done} />}
      <Cursor />
      <Nav ready={ready} />
      <main id="main">
        <Hero ready={ready} />
        <Story />
        <Services />
        <Menu />
        <Portfolio />
        <MobileServices />
        <KindWords />
        <Why />
        <Social />
        <CareNotes />
        <Book />
      </main>
      <Footer />
      <MobileBookBar />
    </>
  );
}
