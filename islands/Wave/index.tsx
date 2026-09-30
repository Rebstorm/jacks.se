import { useEffect, useRef } from "preact/hooks";

// The site's wave outline; drawn as-is whenever nothing is poking it.
const REST_PATH =
  "M0,50 C500,-50 500,150 1000,50 C1500,-50 1500,150 2000,50 V100 H0 Z";

// The two cubic segments of REST_PATH, sampled so we can bend them.
const SEGMENTS = [
  [[0, 50], [500, -50], [500, 150], [1000, 50]],
  [[1000, 50], [1500, -50], [1500, 150], [2000, 50]],
];
const SAMPLES_PER_SEGMENT = 160;

// How far the swell reaches (svg units) and how wide it is.
const SWELL_HEIGHT = 38;
const SWELL_WIDTH = 110;
// The swell fades out as the cursor moves this far below the wave edge (px).
const REACH_PX = 260;
// Spring on the swell height, so it wobbles a bit on the way in and out.
const STIFFNESS = 0.08;
const DAMPING = 0.78;
const FOLLOW = 0.18;

// Scrolling sloshes the wave: speed kicks a looser spring, so it wobbles a
// few times before settling. Sized in screen px so phones feel it too.
const SLOSH_PX = 14;
const SLOSH_KICK = 0.0035;
const SLOSH_MAX_KICK = 0.5;
const SLOSH_STIFFNESS = 0.05;
const SLOSH_DAMPING = 0.9;
// Ripple along the edge while sloshing, so it reads as water, not a lift.
const RIPPLE_K = 0.011;
const RIPPLE_SPEED = 0.12;
// The edge eases into these instead of clipping flat against the viewBox
// (y -50..80). Near MAX_Y the wave all but retracts, which is fine.
const MIN_Y = -48;
const MAX_Y = 76;
const SLOSH_MAX = 1.2;
const SETTLED = 0.002;

// Squash a displacement so the edge approaches the bounds smoothly
// (tanh saturation) rather than hitting them and going flat.
function soften(lift: number, y: number) {
  const room = lift > 0 ? y - MIN_Y : MAX_Y - y;
  if (room <= 0) return 0;
  return room * Math.tanh(lift / room);
}

function sample() {
  const points: [number, number][] = [];
  for (const [p0, p1, p2, p3] of SEGMENTS) {
    for (let i = 0; i < SAMPLES_PER_SEGMENT; i++) {
      const t = i / SAMPLES_PER_SEGMENT;
      const u = 1 - t;
      const a = u * u * u, b = 3 * u * u * t, c = 3 * u * t * t, d = t * t * t;
      points.push([
        a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0],
        a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1],
      ]);
    }
  }
  points.push([2000, 50]);
  return points;
}

export default function Wave() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const path = pathRef.current;
    if (!svg || !path) return;
    if (globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const points = sample();
    const controller = new AbortController();
    const { signal } = controller;

    let raf = 0;
    let pointer: { x: number; y: number } | null = null;
    // Cursor x is smoothed in screen space: the svg itself keeps sliding
    // and loops every 10s, so smoothing in svg space would jump on reset.
    let screenX = 0;
    let height = 0;
    let velocity = 0;
    let slosh = 0;
    let sloshVelocity = 0;
    let phase = 0;
    let lastScrollY = globalThis.scrollY;

    const toSvgX = (clientX: number, clientY: number) => {
      const ctm = svg.getScreenCTM();
      if (!ctm) return null;
      const p = new DOMPoint(clientX, clientY).matrixTransform(ctm.inverse());
      return p.x;
    };

    const tick = () => {
      raf = 0;
      const rect = svg.getBoundingClientRect();
      const edge = rect.bottom;
      let target = 0;
      if (pointer) {
        screenX += (pointer.x - screenX) * FOLLOW;
        const below = pointer.y - edge;
        target = Math.max(0, Math.min(1, 1 - below / REACH_PX));
      }

      velocity = (velocity + (target - height) * STIFFNESS) * DAMPING;
      height += velocity;
      sloshVelocity = (sloshVelocity - slosh * SLOSH_STIFFNESS) *
        SLOSH_DAMPING;
      slosh += sloshVelocity;
      phase += RIPPLE_SPEED;

      // Everything settled: park the loop until the next pointer or scroll.
      const still = target === 0 &&
        Math.abs(height) < SETTLED && Math.abs(velocity) < SETTLED &&
        Math.abs(slosh) < SETTLED && Math.abs(sloshVelocity) < SETTLED;
      if (still) {
        height =
          velocity =
          slosh =
          sloshVelocity =
            0;
        path.setAttribute("d", REST_PATH);
        return;
      }

      // Scrolled out of view: keep the springs going, skip the drawing.
      if (rect.bottom > 0) {
        const cx = toSvgX(screenX, edge) ?? -1e4;
        const sloshUnits = rect.width > 0
          ? SLOSH_PX / (rect.width / 2000) * slosh
          : 0;
        let d = "";
        for (let i = 0; i < points.length; i++) {
          const [x, y] = points[i];
          const g = (x - cx) / SWELL_WIDTH;
          const ripple = 0.65 + 0.35 * Math.sin(x * RIPPLE_K + phase);
          // Rotated 180deg on screen, so "up" in svg space reaches down
          // toward the cursor.
          const lift = SWELL_HEIGHT * height * Math.exp(-g * g) +
            sloshUnits * ripple;
          const bent = y - soften(lift, y);
          d += `${i ? "L" : "M"}${x.toFixed(1)},${bent.toFixed(1)}`;
        }
        path.setAttribute("d", d + "V100H0Z");
      }
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const follow = (x: number, y: number) => {
      if (!pointer && height === 0) screenX = x;
      pointer = { x, y };
      start();
    };

    globalThis.addEventListener("pointermove", (e) => {
      if (e.pointerType !== "touch") follow(e.clientX, e.clientY);
    }, { passive: true, signal });
    document.documentElement.addEventListener("pointerleave", () => {
      pointer = null;
    }, { signal });

    // Touch events keep firing while the page scrolls (pointer events get
    // cancelled), so a finger near the top can drag the swell along.
    globalThis.addEventListener("touchmove", (e) => {
      const t = e.touches[0];
      if (t) follow(t.clientX, t.clientY);
    }, { passive: true, signal });
    const release = () => {
      pointer = null;
    };
    globalThis.addEventListener("touchend", release, { signal });
    globalThis.addEventListener("touchcancel", release, { signal });

    globalThis.addEventListener("scroll", () => {
      const delta = globalThis.scrollY - lastScrollY;
      lastScrollY = globalThis.scrollY;
      // Scrolling down tugs the edge down, scrolling up pushes it back.
      const kick = Math.max(
        -SLOSH_MAX_KICK,
        Math.min(SLOSH_MAX_KICK, delta * SLOSH_KICK),
      );
      // Capped, so a frantic flick session can't wind it up forever.
      sloshVelocity = Math.max(
        -SLOSH_MAX,
        Math.min(SLOSH_MAX, sloshVelocity + kick),
      );
      start();
    }, { passive: true, signal });

    return () => {
      controller.abort();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={"overflow-hidden"}>
      <svg
        ref={svgRef}
        class="wave"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -50 2000 130"
      >
        <path ref={pathRef} fill="var(--background-contrast)" d={REST_PATH}>
        </path>
      </svg>
    </div>
  );
}
