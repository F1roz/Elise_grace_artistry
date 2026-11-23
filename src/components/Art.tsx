import { useEffect, useRef, type ReactNode } from 'react';
import { BRAND } from '../data/site';

/* ───────────── Wordmark (recreated from the official logo as live type) ───────────── */
export function Wordmark({ className = '', size = 'md' }: { className?: string; size?: 'sm' | 'md' | 'lg' | 'xl' }) {
  const s = {
    sm: { main: 'text-[0.95rem]', sub: 'text-[0.5rem]', line: 'w-5', gap: 'gap-2', mt: 'mt-0.5' },
    md: { main: 'text-2xl', sub: 'text-[0.6rem]', line: 'w-10', gap: 'gap-3', mt: 'mt-1' },
    lg: { main: 'text-4xl md:text-5xl', sub: 'text-xs', line: 'w-14 md:w-20', gap: 'gap-4', mt: 'mt-2' },
    xl: { main: 'text-[11vw] md:text-[8.5vw]', sub: 'text-[2.4vw] md:text-[1.6vw]', line: 'w-[14vw]', gap: 'gap-[2vw]', mt: 'mt-[1vw]' },
  }[size];
  return (
    <span className={`inline-flex flex-col items-center leading-none ${className}`}>
      <span className={`font-display font-normal uppercase tracking-logo ${s.main}`} style={{ marginRight: '-0.32em' }}>
        Elise Grace
      </span>
      <span className={`flex items-center ${s.gap} ${s.mt}`}>
        <span className={`h-px ${s.line} bg-current opacity-70`} />
        <span className={`font-display font-normal uppercase tracking-[0.42em] ${s.sub}`} style={{ marginRight: '-0.42em' }}>
          Artistry
        </span>
        <span className={`h-px ${s.line} bg-current opacity-70`} />
      </span>
    </span>
  );
}

/* ───────────── Brand icons (lucide no longer ships brand marks) ───────────── */
export function TikTokIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48Z" />
    </svg>
  );
}
export function InstagramIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* ───────────── Line-art illustrations, drawn on reveal ───────────── */
export type ArtName = 'eye' | 'lips' | 'curl' | 'updo' | 'profile' | 'brush' | 'wave' | 'leaf' | 'drop';

const P = (d: string) => <path d={d} pathLength={1} />;

const ART: Record<ArtName, ReactNode> = {
  eye: (
    <>
      {P('M40 88 Q100 52 162 84')}
      {P('M28 136 Q100 74 172 134 Q100 182 28 136 Z')}
      <circle cx="100" cy="132" r="24" pathLength={1} />
      <circle cx="100" cy="132" r="9" pathLength={1} />
      {P('M52 116 L44 100')}{P('M68 104 L63 87')}{P('M86 98 L84 80')}{P('M104 96 L105 78')}{P('M122 99 L126 82')}{P('M140 106 L148 91')}{P('M155 117 L166 104')}
      {P('M60 168 Q100 186 142 166')}
    </>
  ),
  lips: (
    <>
      {P('M34 140 Q64 108 100 126 Q136 108 166 140 Q134 182 100 180 Q66 182 34 140 Z')}
      {P('M34 140 Q100 152 166 140')}
      {P('M84 158 Q100 166 118 158')}
      {P('M70 96 Q100 88 130 96')}
    </>
  ),
  curl: (
    <>
      {P('M64 14 C34 56 120 78 88 122 C56 166 136 186 104 246')}
      {P('M92 14 C62 56 148 78 116 122 C84 166 164 186 132 246')}
      {P('M120 18 C92 58 172 80 142 124 C112 168 186 190 158 244')}
      {P('M40 30 C14 72 96 94 64 138 C34 180 108 200 80 248')}
    </>
  ),
  updo: (
    <>
      <circle cx="122" cy="58" r="30" pathLength={1} />
      {P('M104 70 C112 50 136 46 146 62')}
      {P('M98 82 C60 88 48 124 58 156 C62 170 56 180 50 190 C60 194 62 198 62 204 C70 214 74 226 92 228 C106 230 112 236 112 258')}
      {P('M98 82 C132 86 156 112 156 150 C156 178 146 196 140 212')}
      {P('M110 98 C128 104 140 120 144 140')}
    </>
  ),
  profile: (
    <>
      {P('M118 28 C78 28 58 58 60 92 C61 108 53 116 48 126 C46 131 52 134 56 135 C54 141 56 145 60 147 C56 152 58 157 64 159 C66 171 70 181 84 183 C98 185 104 190 106 210 L106 252')}
      {P('M118 28 C158 32 176 78 168 128 C162 176 176 216 192 252')}
      {P('M126 44 C150 52 160 86 154 124 C148 164 160 204 174 240')}
      {P('M80 92 Q88 88 96 92')}
    </>
  ),
  brush: (
    <>
      {P('M100 250 L100 140')}
      {P('M92 140 L108 140 L110 112 L90 112 Z')}
      {P('M90 112 C84 78 88 40 100 18 C112 40 116 78 110 112')}
      {P('M100 108 L100 40')}
      <circle cx="150" cy="70" r="20" pathLength={1} />
      {P('M136 70 Q150 60 164 70')}
    </>
  ),
  wave: (
    <>
      {P('M10 70 C50 40 80 100 120 70 C160 40 180 90 196 74')}
      {P('M10 100 C50 70 80 130 120 100 C160 70 180 120 196 104')}
      {P('M10 130 C50 100 80 160 120 130 C160 100 180 150 196 134')}
      {P('M10 160 C50 130 80 190 120 160 C160 130 180 180 196 164')}
      {P('M10 190 C50 160 80 220 120 190 C160 160 180 210 196 194')}
    </>
  ),
  leaf: (
    <>
      {P('M100 250 C100 180 96 110 104 30')}
      {P('M100 200 C70 196 54 172 52 150 C76 150 96 172 100 200')}
      {P('M100 160 C130 156 148 132 150 110 C126 110 104 132 100 160')}
      {P('M101 118 C74 114 60 92 60 72 C82 72 100 94 101 118')}
      {P('M103 78 C126 74 138 56 140 38 C120 40 104 56 103 78')}
    </>
  ),
  drop: (
    <>
      {P('M100 40 C126 86 150 116 150 150 C150 180 128 204 100 204 C72 204 50 180 50 150 C50 116 74 86 100 40 Z')}
      {P('M78 150 C78 166 88 178 100 182')}
      {P('M40 236 L160 236')}
      {P('M64 248 L136 248')}
    </>
  ),
};

/** Draws itself when it scrolls into view. */
export function LineArt({ name, className = '', strokeWidth = 1.1 }: { name: ArtName; className?: string; strokeWidth?: number }) {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const el = ref.current!;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('is-drawn');
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <svg
      ref={ref}
      viewBox="0 0 200 260"
      className={`draw ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      vectorEffect="non-scaling-stroke"
    >
      {ART[name]}
    </svg>
  );
}

/** Rotating circular text badge. */
export function OrbitBadge({ className = '', text = `${BRAND.name} · ${BRAND.locationShort} · ` }: { className?: string; text?: string }) {
  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <svg viewBox="0 0 200 200" className="spin-slow h-full w-full">
        <defs>
          <path id="orbit" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text className="fill-current font-sans uppercase" style={{ fontSize: 12.4, letterSpacing: '0.34em' }}>
          <textPath href="#orbit">{text}</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-script text-3xl">eg</span>
    </div>
  );
}

/** Four-point sparkle used as a typographic ornament (echoes her story graphics). */
export function Sparkle({ className = 'h-3 w-3' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 0c.6 6.2 5.8 11.4 12 12-6.2.6-11.4 5.8-12 12-.6-6.2-5.8-11.4-12-12C6.2 11.4 11.4 6.2 12 0Z" />
    </svg>
  );
}
