import { useEffect, useRef } from "preact/hooks";

// Density ramp, darkest to brightest.
const RAMP = " .:-=+*x#%@";
const DEFAULT_ROWS = 22;
// Monospace cells are roughly twice as tall as they are wide.
const ASPECT = 1.9;
const FRAME_MS = 1000 / 30;
const IDLE_FRAME_MS = 1000 / 15;
const POINTER_EASE = 0.25;
const PRESENCE_EASE = 0.15;
const LENS_RADIUS = 16;
const LENS_STRENGTH = 7;

// 4x4 Bayer matrix, so fractional brightness dithers instead of banding.
const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

// base and amp are fractions of the field height, so the swells keep their
// shape whatever the row count.
interface Band {
  base: number;
  amp: number;
  k: number;
  speed: number;
  width: number;
  gain: number;
}

// Three swells stacked like the SVG wave behind the site, back to front.
const BANDS: Band[] = [
  { base: 0.27, amp: 0.1, k: 0.05, speed: 0.55, width: 0.8, gain: 0.5 },
  { base: 0.5, amp: 0.13, k: 0.038, speed: -0.4, width: 1.0, gain: 0.75 },
  { base: 0.73, amp: 0.145, k: 0.03, speed: 0.3, width: 1.3, gain: 1 },
];

interface Lens {
  col: number;
  row: number;
  presence: number;
}

function surface(band: Band, rows: number, x: number, t: number) {
  const amp = band.amp * rows;
  return band.base * rows +
    amp * Math.sin(band.k * x - band.speed * t) +
    amp * 0.35 * Math.sin(band.k * 2.7 * x + band.speed * 1.3 * t);
}

function render(cols: number, rows: number, t: number, lens: Lens | null) {
  let out = "";
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let x = col;
      let y = row;
      let glow = 0;

      if (lens) {
        // Push sample points away from the pointer, so the swell bulges
        // around it like it's under a magnifying glass.
        const dx = col - lens.col;
        const dy = (row - lens.row) * ASPECT;
        const d = Math.hypot(dx, dy);
        const r = d / LENS_RADIUS;
        if (d > 0 && r < 2.5) {
          const push = LENS_STRENGTH * lens.presence * r *
            Math.exp(0.5 - r * r);
          x -= (dx / d) * push;
          y -= (dy / d) * push / ASPECT;
          glow = Math.exp(-r * r) * lens.presence * 0.7;
        }
      }

      let v = 0;
      for (const band of BANDS) {
        const s = surface(band, rows, x, t);
        const dy = (y - s) / band.width;
        // Bright crest line plus a faint body hanging below it. Max, not
        // sum, so overlapping swells stay separate lines instead of a blob.
        let b = band.gain * Math.exp(-dy * dy);
        if (y > s) b += band.gain * 0.12 * Math.exp(-(y - s) / 3);
        v = Math.max(v, b);
      }
      v = Math.min(1, v * (1 + glow));

      const level = v * (RAMP.length - 1);
      const threshold = (BAYER[row % 4][col % 4] + 0.5) / 16;
      const idx = Math.min(
        RAMP.length - 1,
        Math.floor(level) + (level % 1 > threshold ? 1 : 0),
      );
      out += v < 0.04 ? " " : RAMP[idx];
    }
    out += "\n";
  }
  return out;
}

interface AsciiWaveProps {
  rows?: number;
}

export default function AsciiWave({ rows = DEFAULT_ROWS }: AsciiWaveProps) {
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const pre = preRef.current;
    if (!pre) return;

    const reducedMotion =
      globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const controller = new AbortController();
    const { signal } = controller;

    let cols = 0;
    let raf = 0;
    let last = 0;
    let visible = true;
    let target: { x: number; y: number } | null = null;
    let px = 0;
    let py = 0;
    let presence = 0;

    const measure = () => {
      // Measure one character so the field always fills the width.
      const probe = document.createElement("span");
      probe.textContent = "x".repeat(10);
      pre.appendChild(probe);
      const charWidth = probe.getBoundingClientRect().width / 10;
      probe.remove();
      cols = charWidth > 0 ? Math.floor(pre.clientWidth / charWidth) : 0;
    };

    const draw = (now: number) => {
      const rect = pre.getBoundingClientRect();
      const lens = presence > 0 && rect.width > 0
        ? {
          col: (px / rect.width) * cols,
          row: (py / rect.height) * rows,
          presence,
        }
        : null;
      pre.textContent = render(cols, rows, now / 1000, lens);
    };

    const tick = (now: number) => {
      raf = 0;
      if (!visible || document.hidden) return;
      const interval = target || presence > 0 ? FRAME_MS : IDLE_FRAME_MS;
      if (now - last >= interval) {
        last = now;
        if (target) {
          px += (target.x - px) * POINTER_EASE;
          py += (target.y - py) * POINTER_EASE;
        }
        presence += ((target ? 1 : 0) - presence) * PRESENCE_EASE;
        if (!target && presence < 0.01) presence = 0;
        draw(now);
      }
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (!raf && !reducedMotion) raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const onPointer = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const rect = pre.getBoundingClientRect();
      target = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      // Snap in on entry instead of sliding over from the last exit point.
      if (presence === 0) {
        px = target.x;
        py = target.y;
      }
    };

    measure();
    draw(0);

    if (reducedMotion) {
      const resize = new ResizeObserver(() => {
        measure();
        draw(0);
      });
      resize.observe(pre);
      return () => resize.disconnect();
    }

    pre.addEventListener("pointermove", onPointer, { signal });
    pre.addEventListener("pointerenter", onPointer, { signal });
    pre.addEventListener("pointerleave", (e) => {
      if (e.pointerType !== "touch") target = null;
    }, { signal });
    document.addEventListener(
      "visibilitychange",
      () => document.hidden ? stop() : start(),
      { signal },
    );

    const resize = new ResizeObserver(measure);
    resize.observe(pre);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false;
      if (visible) start();
      else stop();
    });
    io.observe(pre);

    start();

    return () => {
      stop();
      controller.abort();
      resize.disconnect();
      io.disconnect();
    };
  }, [rows]);

  return (
    <pre
      ref={preRef}
      className="ascii-wave gradient-text movie-gradient"
      aria-hidden="true"
    />
  );
}
