"use client";

import { useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { ArrowDown, LockKeyhole, MailOpen } from "lucide-react";
import { Sunflower } from "@/components/ui/Sunflower";
import { PasswordGate } from "@/components/auth/PasswordGate";
import { EnvelopeGrid } from "@/components/letters/EnvelopeGrid";
import { LetterModal } from "@/components/letters/LetterModal";
import { collection, letters } from "@/data/letters";
import { useLetters } from "@/hooks/useLetters";
import type { Letter } from "@/types/letter";

export function OpenWhen() {
  const { ready, authenticated, openedIds, storageUnavailable, setAccess, markOpened } = useLetters();
  const [selected, setSelected] = useState<Letter | null>(null);

  function openLetter(letter: Letter) {
    setSelected(letter);
    markOpened(letter.id);
  }

  return <MotionConfig reducedMotion="user">
    {!ready ? <main className="loading-screen" aria-label="Preparando tus cartas"><span className="brand-mark">When</span></main> : <AnimatePresence mode="wait">
      {!authenticated ? <PasswordGate key="gate" onUnlock={() => setAccess(true)} /> : <motion.div key="collection" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
        <header className="site-header"><a href="#" className="wordmark" aria-label="Open When, inicio"><span className="brand-mark">When</span><span>HECHO PARA TI</span></a><button className="lock-button" onClick={() => { setSelected(null); setAccess(false); }}><LockKeyhole size={14} aria-hidden="true" /><span>Bloquear cartas</span></button></header>
        <main className="collection-main">
          <section className="intro" aria-labelledby="collection-heading">
            <h1 id="collection-heading">Open <em>When</em><span className="wine">…</span></h1>
            <p>{collection.subtitle}</p>
            <div className="intro-detail" aria-hidden="true"><span /><Sunflower bloomOnly /><span /></div>
          </section>
          <section className="letters-section" aria-labelledby="letters-heading">
            <div className="collection-toolbar"><div><h2 id="letters-heading">Cartas de Emily</h2><p>Elige la que necesites hoy.<ArrowDown size={13} aria-hidden="true" /></p></div><div className="progress-info" role="status"><MailOpen size={15} aria-hidden="true" /><span>{openedIds.length} de {letters.length} cartas abiertas</span><div className="progress-track" aria-hidden="true"><span style={{ width: `${openedIds.length / letters.length * 100}%` }} /></div></div></div>
            <EnvelopeGrid letters={letters} openedIds={openedIds} onOpen={openLetter} />
          </section>
          <footer className="collection-footer"><p>De aquí a la luna y de vuelta 1 millón de veces....</p></footer>
        </main>
        {selected && <LetterModal key={selected.id} letter={selected} index={letters.findIndex((letter) => letter.id === selected.id)} onClose={() => setSelected(null)} />}
      </motion.div>}
    </AnimatePresence>}
    {storageUnavailable && <p className="storage-notice" role="status">Tu navegador no permite guardar los cambios. Se conservarán mientras esta página siga abierta.</p>}
  </MotionConfig>;
}
