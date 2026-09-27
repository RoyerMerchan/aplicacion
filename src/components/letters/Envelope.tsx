"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { Seal } from "@/components/ui/Seal";
import { Sunflower } from "@/components/ui/Sunflower";
import { LetterMotif } from "./LetterMotif";
import type { Letter } from "@/types/letter";

export function EnvelopeArtwork({ letter, index, opened = false }: { letter: Letter; index: number; opened?: boolean }) {
  const prefix = letter.title.startsWith("Ábreme cuando") ? "Ábreme cuando…" : "Ábreme para…";
  const situation = letter.title.replace(/^Ábreme (cuando |para )/, "");
  return <>
    <div className="envelope-paper" aria-hidden="true" />
    <div className="envelope-back" aria-hidden="true" />
    <div className="envelope-flap" aria-hidden="true" />
    <div className="envelope-folds" aria-hidden="true" />
    <div className="envelope-label"><span className="envelope-prefix">{prefix}</span><span className="envelope-title">{situation}</span></div>
    <div className="envelope-flower" aria-hidden="true"><Sunflower /></div>
    <div className="envelope-motif" aria-hidden="true"><LetterMotif motif={letter.motif} decorative /></div>
    <Seal />
    <span className="envelope-number" aria-hidden="true">Nº {String(index + 1).padStart(2, "0")}</span>
    {opened && <span className="read-mark"><Check size={11} aria-hidden="true" /> Abierta</span>}
  </>;
}

export function Envelope({ letter, index, opened, onOpen }: { letter: Letter; index: number; opened: boolean; onOpen: () => void }) {
  const reduced = useReducedMotion();
  const rotation = [-1.2, 0.8, -0.6, 1.1][index % 4];
  return (
    <motion.div className="envelope-slot" initial={{ opacity: 0, y: reduced ? 0 : 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: reduced ? 0 : Math.min(index * 0.055, 0.45) }}>
      <motion.button type="button" className={`envelope tone-${index % 4}`} style={{ rotate: reduced ? 0 : rotation }} whileHover={reduced ? {} : { y: -7, rotate: 0 }} whileTap={reduced ? {} : { scale: 0.97 }} transition={{ type: "spring", stiffness: 270, damping: 23 }} onClick={onOpen} aria-label={`${letter.title}${opened ? ", abierta anteriormente" : ""}`} aria-haspopup="dialog">
        <EnvelopeArtwork letter={letter} index={index} opened={opened} />
      </motion.button>
    </motion.div>
  );
}
