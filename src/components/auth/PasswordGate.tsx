"use client";

import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, KeyRound } from "lucide-react";
import { ACCESS_CODE } from "@/lib/storage";
import { Seal } from "@/components/ui/Seal";
import { Sunflower } from "@/components/ui/Sunflower";

export function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [code, setCode] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [unlocking, setUnlocking] = useState(false);
  const reduced = useReducedMotion();

  function submit(event: FormEvent) {
    event.preventDefault();
    if (code === ACCESS_CODE) setUnlocking(true);
    else setAttempt((value) => value + 1);
  }

  return (
    <motion.main className="gate" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: reduced ? 0 : -12 }} transition={{ duration: 0.4 }}>
      <div className="gate-brand"><span className="brand-mark">When</span><span className="gate-owner">Cartas para Emily</span></div>
      <motion.div className="gate-card" animate={{ opacity: unlocking ? 0 : 1, y: unlocking && !reduced ? -20 : 0 }} transition={{ duration: reduced ? 0 : 0.55 }} onAnimationComplete={() => { if (unlocking) onUnlock(); }}>
        <div className="gate-envelope" aria-hidden="true"><div className="gate-note"><Sunflower /></div><div className="gate-envelope-front" /><Seal /></div>
        <h1>Cajita de sobres</h1>
        <motion.form key={attempt} onSubmit={submit} animate={attempt && !reduced ? { x: [0, -7, 7, -5, 5, 0] } : { x: 0 }} transition={{ duration: 0.35 }}>
          <label htmlFor="our-code">Clave</label>
          <div className="password-field"><KeyRound size={17} aria-hidden="true" /><input id="our-code" type="password" inputMode="numeric" autoComplete="current-password" maxLength={8} value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, ""))} placeholder="········" required aria-invalid={attempt > 0 && !unlocking} aria-describedby="code-feedback" disabled={unlocking} /></div>
          <p id="code-feedback" className="code-feedback" role="status">{attempt > 0 && !unlocking ? "Esa no es nuestra clave 👀" : ""}</p>
          <button className="primary-button" disabled={unlocking} type="submit">{unlocking ? "Abriendo tu caja…" : "Abrir caja de cartas"}<ArrowRight size={17} aria-hidden="true" /></button>
        </motion.form>
      </motion.div>
    </motion.main>
  );
}
