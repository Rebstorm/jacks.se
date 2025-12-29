// islands/Bug.tsx
import { asset, Head } from "fresh/runtime";
import { useEffect, useRef } from "preact/hooks";

export default function Bug() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Randomize lane, speed, and start delay so each visit feels a bit different
    el.style.setProperty("--lane", `${30 + Math.random() * 40}%`); // 30–70% from top
    el.style.setProperty("--speed", `${9 + Math.random() * 7}s`); // 9–16s across
    el.style.setProperty("--delay", `${(Math.random() * 2).toFixed(2)}s`);

    // Click → quick squash, then settle into cute flat state
    const onClick = () => {
      el.classList.add("pillar-squash");
      setTimeout(() => {
        el.classList.remove("pillar-squash");
        el.classList.add("pillar-dead");
        el.style.pointerEvents = "none";
      }, 160);
    };

    el.addEventListener("click", onClick);
    return () => el.removeEventListener("click", onClick);
  }, []);

  return (
    <>
      <Head>
        <link rel="preload" href={asset("./css/islands/bug.css")} as="style" />
        <link rel="stylesheet" href={asset("./css/islands/bug.css")} />
      </Head>
      <div
        ref={ref}
        className="pillar-wrap"
        role="img"
        aria-label="Caterpillar crawling. Click to squish."
        title="Caterpillar — click to squish!"
      >
        <svg
          className="pillar-svg"
          viewBox="0 0 220 120"
          width="160"
          height="88"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="gBody" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#9be879" />
              <stop offset="100%" stop-color="#57b24a" />
            </linearGradient>
            <filter id="drop">
              <feDropShadow
                dx="0"
                dy="2"
                stdDeviation="2"
                flood-opacity=".25"
              />
            </filter>
          </defs>

          {/* ---------- ALIVE ---------- */}
          <g className="pillar-alive" filter="url(#drop)">
            {/* feet (little pads) */}
            <g className="feet">
              <rect
                x="38"
                y="88"
                width="16"
                height="8"
                rx="4"
                className="foot foot--1"
              />
              <rect
                x="62"
                y="90"
                width="16"
                height="8"
                rx="4"
                className="foot foot--2"
              />
              <rect
                x="86"
                y="92"
                width="16"
                height="8"
                rx="4"
                className="foot foot--3"
              />
              <rect
                x="110"
                y="92"
                width="16"
                height="8"
                rx="4"
                className="foot foot--4"
              />
              <rect
                x="134"
                y="90"
                width="16"
                height="8"
                rx="4"
                className="foot foot--5"
              />
              <rect
                x="158"
                y="88"
                width="16"
                height="8"
                rx="4"
                className="foot foot--6"
              />
            </g>

            {/* body segments */}
            <g className="segments wiggle">
              <circle cx="50" cy="76" r="20" className="seg" />
              <circle cx="74" cy="74" r="21" className="seg" />
              <circle cx="98" cy="72" r="22" className="seg" />
              <circle cx="122" cy="70" r="23" className="seg" />
              <circle cx="146" cy="68" r="24" className="seg" />
              {/* head */}
              <circle cx="172" cy="64" r="24" className="head" />
            </g>

            {/* face on head */}
            <g className="face">
              <circle cx="164" cy="62" r="4.5" fill="#1b1b1b" />
              <circle cx="178" cy="60" r="4.5" fill="#1b1b1b" />
              <path
                d="M166 70 q6 6 16 0"
                fill="none"
                stroke="#1b1b1b"
                stroke-width="3"
                stroke-linecap="round"
              />
              {/* blush */}
              <circle cx="156" cy="68" r="3.5" fill="#ffc0cb" opacity=".6" />
              <circle cx="188" cy="66" r="3.5" fill="#ffc0cb" opacity=".6" />
            </g>

            {/* antennae */}
            <path d="M162 44 q-8 -14 -18 -16" className="ant" />
            <path d="M182 42 q6 -14 16 -18" className="ant" />
          </g>

          {/* ---------- DEAD (CUTE FLAT) ---------- */}
          <g className="pillar-flat" style="display:none">
            {/* soft ground shadow */}
            <ellipse cx="120" cy="94" rx="56" ry="12" className="shadow" />
            {/* flattened pill */}
            <rect
              x="64"
              y="78"
              width="112"
              height="24"
              rx="12"
              className="flat-body"
            />
            {/* sleepy eyes */}
            <path d="M132 86 q6 6 12 0" className="sleep-eye" />
            <path d="M110 86 q6 6 12 0" className="sleep-eye" />
            {/* tiny dust puffs */}
            <circle cx="64" cy="76" r="3" className="puff" />
            <circle cx="58" cy="78" r="2" className="puff" />
            <circle cx="176" cy="76" r="3" className="puff" />
            <circle cx="182" cy="78" r="2" className="puff" />
          </g>
        </svg>
      </div>
    </>
  );
}
