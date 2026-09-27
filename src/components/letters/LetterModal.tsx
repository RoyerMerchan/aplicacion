"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { EnvelopeArtwork } from "./Envelope";
import { LetterPaper } from "./LetterPaper";
import { Sunflower } from "@/components/ui/Sunflower";
import type { Letter } from "@/types/letter";

export function LetterModal({ letter, index, onClose }: { letter: Letter; index: number; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [closing, setClosing] = useState(false);
  const reduced = useReducedMotion();
  const duration = reduced ? 0 : 0.4;

  const close = useCallback(() => {
    if (timer.current !== null) return;
    setClosing(true);
    timer.current = setTimeout(onClose, reduced ? 0 : 1100);
  }, [onClose, reduced]);

  useEffect(() => {
    const element = dialog.current;
    const previousFocus = document.activeElement as HTMLElement | null;
    element?.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      if (timer.current !== null) clearTimeout(timer.current);
      element?.close();
      document.body.style.overflow = overflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, []);

  function keepFocusInside(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;
    const targets = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(
      'button:not(:disabled), a[href], input:not(:disabled), audio[controls], video[controls], [tabindex="0"]',
    )).filter((element) => element.getClientRects().length > 0);
    const first = targets[0];
    const last = targets[targets.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }

  return <dialog ref={dialog} className="letter-dialog" aria-labelledby="letter-heading" onKeyDown={keepFocusInside} onCancel={(event) => { event.preventDefault(); close(); }}>
    <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: closing ? 0 : 1 }} transition={{ duration, delay: closing && !reduced ? 0.75 : 0 }} onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
      <button className="modal-close" type="button" onClick={close} aria-label="Cerrar carta" autoFocus><X size={20} aria-hidden="true" /><span>Cerrar carta</span></button>
      <motion.div className={`opening-envelope envelope tone-${index % 4}`} aria-hidden="true" initial={{ opacity: 0, scale: 0.85 }} animate={closing ? { opacity: [0, 1, 1, 0], scale: [1, 1, 1, 0.92] } : { opacity: [0, 1, 1, 0], scale: [0.85, 1, 1, 1] }} transition={{ duration: reduced ? 0 : closing ? 1.05 : 1.15, times: [0, 0.2, 0.75, 1] }}>
        <EnvelopeArtwork letter={letter} index={index} />
        <motion.div className="animated-flap" initial={{ rotateX: 0 }} animate={{ rotateX: closing ? 0 : -180 }} transition={{ duration, delay: reduced ? 0 : closing ? 0.6 : 0.2 }} />
        <motion.div className="extracted-note" initial={{ y: 0 }} animate={{ y: closing ? 0 : -105 }} transition={{ duration, delay: reduced ? 0 : closing ? 0.25 : 0.55 }}><Sunflower /></motion.div>
      </motion.div>
      <motion.article className="letter-paper" tabIndex={0} aria-labelledby="letter-heading" initial={{ opacity: 0, y: reduced ? 0 : 45, scale: reduced ? 1 : 0.7 }} animate={{ opacity: closing ? 0 : 1, y: closing && !reduced ? 45 : 0, scale: closing && !reduced ? 0.7 : 1 }} transition={{ duration, delay: reduced || closing ? 0 : 0.95, ease: [0.22, 1, 0.36, 1] }} style={{ pointerEvents: closing ? "none" : "auto" }}>
        <LetterPaper letter={letter} index={index} />
      </motion.article>
    </motion.div>
  </dialog>;
}
