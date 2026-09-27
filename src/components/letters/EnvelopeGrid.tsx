import { Envelope } from "./Envelope";
import type { Letter } from "@/types/letter";

export function EnvelopeGrid({ letters, openedIds, onOpen }: { letters: Letter[]; openedIds: string[]; onOpen: (letter: Letter) => void }) {
  return <div className="envelope-grid">{letters.map((letter, index) => <Envelope key={letter.id} letter={letter} index={index} opened={openedIds.includes(letter.id)} onOpen={() => onOpen(letter)} />)}</div>;
}
