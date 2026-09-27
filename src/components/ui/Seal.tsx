import { Sunflower } from "./Sunflower";

export function Seal({ className = "" }: { className?: string }) {
  return <span className={`wax-seal ${className}`} aria-hidden="true"><Sunflower bloomOnly engraved /></span>;
}
