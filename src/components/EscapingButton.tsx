import { useEffect, useRef, useState, type ReactNode } from 'react';

const RADIUS = 160;
const TOUCH_RADIUS = 130;
const PUSH = 1.4;
const FRICTION = 0.88;
const MARGIN = 12;
const DASH_EASE = 0.14;
const DASH_MIN_DIST = 180;

type Point = { x: number; y: number };

function pickTarget(touch: Point, w: number, h: number): Point {
  const maxX = window.innerWidth - w - MARGIN;
  const maxY = window.innerHeight - h - MARGIN;
  const far: Point[] = [];
  let farthest: Point = { x: MARGIN, y: MARGIN };
  let farthestDist = -1;

  for (let i = 0; i < 24; i++) {
    const x = MARGIN + Math.random() * Math.max(0, maxX - MARGIN);
    const y = MARGIN + Math.random() * Math.max(0, maxY - MARGIN);
    const d = Math.hypot(x + w / 2 - touch.x, y + h / 2 - touch.y);
    if (d >= DASH_MIN_DIST) far.push({ x, y });
    if (d > farthestDist) {
      farthestDist = d;
      farthest = { x, y };
    }
  }
  return far.length ? far[Math.floor(Math.random() * far.length)] : farthest;
}

export default function EscapingButton({ children }: { children: ReactNode }) {
  const slotRef = useRef<HTMLSpanElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [escaping, setEscaping] = useState(false);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);

  const pos = useRef<Point>({ x: 0, y: 0 });
  const vel = useRef<Point>({ x: 0, y: 0 });
  const mouse = useRef<Point | null>(null);
  const target = useRef<Point | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const start = () => {
      if (started.current || !slotRef.current) return;
      const r = slotRef.current.getBoundingClientRect();
      started.current = true;
      pos.current = { x: r.left, y: r.top };
      setSize({ w: r.width, h: r.height });
      setEscaping(true);
    };

    const centerOf = (): Point | null => {
      if (started.current && btnRef.current) {
        return {
          x: pos.current.x + btnRef.current.offsetWidth / 2,
          y: pos.current.y + btnRef.current.offsetHeight / 2,
        };
      }
      if (slotRef.current) {
        const r = slotRef.current.getBoundingClientRect();
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      }
      return null;
    };

    const onPointer = (e: PointerEvent) => {
      const p = { x: e.clientX, y: e.clientY };
      mouse.current = p;
      const c = centerOf();
      if (!c) return;
      const dist = Math.hypot(c.x - p.x, c.y - p.y);

      if (e.pointerType === 'touch') {
        if (e.type === 'pointerdown' && dist < TOUCH_RADIUS) {
          start();
          const w = btnRef.current?.offsetWidth ?? 80;
          const h = btnRef.current?.offsetHeight ?? 44;
          target.current = pickTarget(p, w, h);
          vel.current = { x: 0, y: 0 };
        }
      } else if (dist < RADIUS) {
        start();
      }
    };

    const onLeave = () => {
      mouse.current = null;
    };

    window.addEventListener('pointermove', onPointer);
    window.addEventListener('pointerdown', onPointer);
    window.addEventListener('pointerup', onLeave);
    window.addEventListener('pointercancel', onLeave);
    document.addEventListener('pointerleave', onLeave);

    let raf = 0;
    const tick = () => {
      const btn = btnRef.current;
      if (started.current && btn) {
        const w = btn.offsetWidth;
        const h = btn.offsetHeight;
        const p = pos.current;
        const v = vel.current;
        const m = mouse.current;
        const t = target.current;
        const maxX = window.innerWidth - w - MARGIN;
        const maxY = window.innerHeight - h - MARGIN;

        if (t) {
          p.x += (t.x - p.x) * DASH_EASE;
          p.y += (t.y - p.y) * DASH_EASE;
          if (Math.hypot(t.x - p.x, t.y - p.y) < 1) target.current = null;
        } else {
          if (m) {
            const cx = p.x + w / 2;
            const cy = p.y + h / 2;
            let dx = cx - m.x;
            let dy = cy - m.y;
            const dist = Math.hypot(dx, dy) || 0.001;

            if (dist < RADIUS) {
              dx /= dist;
              dy /= dist;
              const force = (1 - dist / RADIUS) * PUSH;
              v.x += dx * force * 3;
              v.y += dy * force * 3;

              const nearX = p.x <= MARGIN + 2 || p.x >= maxX - 2;
              const nearY = p.y <= MARGIN + 2 || p.y >= maxY - 2;
              if (nearX) v.y += (dy >= 0 ? 1 : -1) * force * 3;
              if (nearY) v.x += (dx >= 0 ? 1 : -1) * force * 3;
            }
          }
          v.x *= FRICTION;
          v.y *= FRICTION;
          p.x += v.x;
          p.y += v.y;
        }

        if (p.x < MARGIN) { p.x = MARGIN; v.x = 0; }
        if (p.x > maxX)   { p.x = maxX;   v.x = 0; }
        if (p.y < MARGIN) { p.y = MARGIN; v.y = 0; }
        if (p.y > maxY)   { p.y = maxY;   v.y = 0; }

        btn.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('pointerdown', onPointer);
      window.removeEventListener('pointerup', onLeave);
      window.removeEventListener('pointercancel', onLeave);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <span
      ref={slotRef}
      className="btn-no-slot"
      style={size ? { width: size.w, height: size.h } : undefined}
    >
      <button
        ref={btnRef}
        className={`btn btn-no${escaping ? ' escaping' : ''}`}
        style={escaping ? { transform: `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)` } : undefined}
      >
        {children}
      </button>
    </span>
  );
}
