"use client";

import { useId, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from "framer-motion";
import { Pause, Play } from "lucide-react";

const orbit = "M80 170 C85 75 260 10 345 93 C385 160 160 260 80 170";

export function MoonJourney() {
  const id = useId();
  const path = useRef<SVGPathElement>(null);
  const distance = useRef(0);
  const elapsed = useRef(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const x = useMotionValue(80);
  const y = useMotionValue(170);
  const rotate = useMotionValue(-87);

  useAnimationFrame((_, delta) => {
    if (reduced !== false || paused || !path.current || document.hidden) return;
    if (!distance.current) distance.current = path.current.getTotalLength();
    elapsed.current = (elapsed.current + Math.min(delta, 64)) % 12000;
    const position = elapsed.current / 12000 * distance.current;
    const point = path.current.getPointAtLength(position);
    const next = path.current.getPointAtLength((position + 0.5) % distance.current);
    x.set(point.x);
    y.set(point.y);
    rotate.set(Math.atan2(next.y - point.y, next.x - point.x) * 180 / Math.PI);
  });

  return <figure className="moon-journey">
    <svg className="moon-scene" viewBox="0 0 420 255" role="img" aria-labelledby={`${id}-title ${id}-description`}>
      <title id={`${id}-title`}>De la Tierra a la Luna y de vuelta</title>
      <desc id={`${id}-description`}>Un cohete recorre una órbita entre la Tierra y la Luna, una y otra vez.</desc>
      <defs>
        <radialGradient id={`${id}-sky`}><stop stopColor="#f4ead5" /><stop offset="1" stopColor="#fcf8ef" /></radialGradient>
        <clipPath id={`${id}-earth`}><circle cx="49" cy="190" r="29" /></clipPath>
      </defs>
      <rect x="1" y="1" width="418" height="253" rx="18" fill={`url(#${id}-sky)`} />
      <g fill="#b6975b" opacity=".65" aria-hidden="true">
        <circle cx="49" cy="63" r="1.5" /><circle cx="186" cy="27" r="1.5" />
        <circle cx="273" cy="208" r="1.5" /><circle cx="380" cy="181" r="1.5" />
        <path d="m127 39 2 5 5 2-5 2-2 5-2-5-5-2 5-2ZM218 126l2 5 5 2-5 2-2 5-2-5-5-2 5-2ZM336 211l1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5Z" />
      </g>
      <path ref={path} d={orbit} fill="none" stroke="#c6ac78" strokeWidth="1" strokeDasharray="3 7" opacity=".55" />
      <g aria-hidden="true">
        <circle cx="49" cy="190" r="35" fill="#d3e0da" opacity=".3" />
        <circle cx="49" cy="190" r="29" fill="#8daeb2" />
        <g clipPath={`url(#${id}-earth)`} fill="#aeb788">
          <path d="m25 167 12-4 12 8-2 10-9 4 3 9-8 4-12-10ZM51 190l13-5 16 5-8 12-7 1-2 17-8-3-4-12Z" />
          <path d="m53 159 17 4 8 13-14 3-10-8Z" />
        </g>
        <circle cx="49" cy="190" r="29" fill="none" stroke="#6e949b" strokeWidth="1" />
        <circle cx="370" cy="66" r="32" fill="#e4d7b8" opacity=".3" />
        <circle cx="370" cy="66" r="25" fill="#ded6bd" stroke="#b9aa88" strokeWidth="1" />
        <circle cx="361" cy="58" r="6" fill="#c4b89b" opacity=".65" />
        <circle cx="379" cy="74" r="8" fill="#c4b89b" opacity=".5" />
        <circle cx="368" cy="80" r="3" fill="#c4b89b" />
        <circle cx="380" cy="54" r="3" fill="#c4b89b" />
      </g>
      <motion.g className="journey-rocket" style={{ x, y, rotate, transformOrigin: "0px 0px" }} aria-hidden="true">
        <path d="M-14-4q-15 4 0 8l5-4Z" fill="#d9ae5c" />
        <path d="M-13-2q-8 2 0 4l3-2Z" fill="#f9df98" />
        <path d="m-8-5-5-8 14 5v16l-14 5 5-8Z" fill="#98535c" />
        <path d="M-12-5C-2-11 10-8 17 0 10 8-2 11-12 5Z" fill="#fff9e9" stroke="#a28a70" strokeWidth="1" />
        <path d="M10-6q4 2 7 6-3 4-7 6Z" fill="#98535c" />
        <circle cx="1" cy="0" r="3.5" fill="#9ebac1" stroke="#a28a70" />
      </motion.g>
      <g fill="#766b55" fontFamily="Georgia, serif" fontStyle="italic" fontSize="12" aria-hidden="true">
        <text x="49" y="237" textAnchor="middle">Tierra</text><text x="370" y="111" textAnchor="middle">Luna</text>
      </g>
    </svg>
    <figcaption className="journey-caption">
      <span>Tierra · Luna · Tierra</span>
      {!reduced && <button type="button" className="journey-toggle" onClick={() => setPaused((value) => !value)} aria-label={paused ? "Reanudar viaje" : "Pausar viaje"}>
        {paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}
        {paused ? "Reanudar" : "Pausar"}
      </button>}
    </figcaption>
  </figure>;
}
