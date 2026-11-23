import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../lib/motion';

/**
 * Liquid-satin WebGL background.
 * A single fragment shader (no Three.js needed) renders slow, flowing silk folds
 * in the brand's mink tones, with a soft light that follows the cursor.
 * - Renders at reduced resolution for performance, pauses when off-screen.
 * - Falls back to a static CSS gradient when WebGL is unavailable.
 * - Renders a single still frame for prefers-reduced-motion.
 */

const PALETTES = {
  mink: { hi: '#F4EBE0', mid: '#B4A394', lo: '#7B695A', light: '#FFF7EE' },
  dark: { hi: '#8F7B6A', mid: '#3B2E26', lo: '#1C1511', light: '#C9B49E' },
  ivory: { hi: '#FFFDF9', mid: '#E9DED1', lo: '#BFAE9C', light: '#FFFFFF' },
};

const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p,0.,1.); }`;
const FRAG = `
precision mediump float;
uniform vec2 r; uniform float t; uniform vec2 m;
uniform vec3 cHi, cMid, cLo, cLight;
float h(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
float n(vec2 p){ vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.-2.*f);
  return mix(mix(h(i),h(i+vec2(1,0)),u.x), mix(h(i+vec2(0,1)),h(i+vec2(1,1)),u.x), u.y); }
float fbm(vec2 p){ float v=0., a=.5; for(int i=0;i<5;i++){ v+=a*n(p); p=p*2.03+vec2(1.7,9.2); a*=.5; } return v; }
void main(){
  vec2 uv = gl_FragCoord.xy / r;
  vec2 p = uv; p.x *= r.x / r.y;
  float tt = t * .045;
  vec2 q = vec2(fbm(p*.8 + tt), fbm(p*.8 + vec2(5.2,1.3) - tt));
  vec2 w = vec2(fbm(p*.9 + 1.5*q + vec2(1.7,9.2) + tt*1.2), fbm(p*.9 + 1.5*q + vec2(8.3,2.8) - tt*.8));
  float f = fbm(p*.9 + 1.3*w);
  float folds = sin((p.x*1.25 + p.y*.8 + f*2.6 + tt*1.6) * 3.14159);
  float shade = smoothstep(-1.1, .35, folds);
  float sheen = pow(smoothstep(.35, 1., folds), 2.2);
  float d = distance(uv, m);
  float light = exp(-d*d*5.5);
  vec3 col = mix(cLo, cMid, shade);
  col = mix(col, cHi, sheen * (.55 + .45*light));
  col = mix(col, cMid, f*.18);
  col += cLight * light * .10;
  col *= 1. - .22 * length(uv - vec2(.5,.55));
  gl_FragColor = vec4(col, 1.);
}`;

type Props = { palette?: keyof typeof PALETTES; className?: string; scale?: number };

export default function SilkCanvas({ palette = 'mink', className = '', scale = 0.55 }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const gl = canvas.getContext('webgl', { antialias: false, premultipliedAlpha: false, powerPreference: 'low-power' });
    if (!gl) return; // CSS fallback gradient stays visible

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = (name: string) => gl.getUniformLocation(prog, name);
    const uR = u('r'), uT = u('t'), uM = u('m');
    const pal = PALETTES[palette];
    gl.uniform3fv(u('cHi'), hex(pal.hi));
    gl.uniform3fv(u('cMid'), hex(pal.mid));
    gl.uniform3fv(u('cLo'), hex(pal.lo));
    gl.uniform3fv(u('cLight'), hex(pal.light));

    const mouse = { x: 0.68, y: 0.6, tx: 0.68, ty: 0.6 };
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.max(1, Math.floor(canvas.clientWidth * dpr * scale));
      const h = Math.max(1, Math.floor(canvas.clientHeight * dpr * scale));
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uR, w, h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMove = (e: PointerEvent) => {
      const b = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - b.left) / b.width;
      mouse.ty = 1 - (e.clientY - b.top) / b.height;
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    const reduced = prefersReducedMotion();
    let visible = true;
    let raf = 0;
    const start = performance.now() - 20000;
    const frame = (now: number) => {
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      gl.uniform1f(uT, (now - start) / 1000);
      gl.uniform2f(uM, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!reduced && visible) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const io = new IntersectionObserver(([entry]) => {
      const was = visible;
      visible = entry.isIntersecting;
      if (visible && !was && !reduced) raf = requestAnimationFrame(frame);
    });
    io.observe(canvas);
    canvas.style.opacity = '1';

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [palette, scale]);

  const p = PALETTES[palette];
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{ background: `radial-gradient(120% 90% at 70% 35%, ${p.hi} 0%, ${p.mid} 45%, ${p.lo} 100%)` }}
    >
      <canvas ref={ref} className="h-full w-full opacity-0 transition-opacity duration-[1500ms]" />
    </div>
  );
}
