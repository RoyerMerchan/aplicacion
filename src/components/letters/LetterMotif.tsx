import type { ReactNode } from "react";
import type { LetterMotif as Motif } from "@/types/letter";

const heart = "M60 72C48 63 31 52 31 40c0-16 21-20 29-5 8-15 29-11 29 5 0 12-17 23-29 32Z";
const titles: Record<Motif, string> = {
  breeze: "Una brisa que se lleva el enojo",
  rain: "Una nube de lluvia y un rayo de sol",
  tea: "Una taza caliente para un día difícil",
  calm: "Un nudo que se deshace en una hoja",
  heart: "Un corazón guardado en una carta",
  memories: "Dos fotografías unidas por un corazón",
  care: "Una mano cuidando un corazón",
  flame: "Una llama encendida",
  peace: "Un corazón con una curita",
  moon: "Un cohete y una luna",
  sunrise: "El sol que vuelve a salir",
  hug: "Un abrazo alrededor de un corazón",
  roots: "Un corazón que florece y echa raíces",
};

function Drawing({ motif }: { motif: Motif }): ReactNode {
  switch (motif) {
    case "breeze": return <>
      <path d="M19 42h48c18 0 18-22 4-22-8 0-10 6-9 10M13 54h75c17 0 18 20 4 22-7 1-12-4-11-9M26 66h31c13 0 14 16 3 19" />
      <path d="M77 42c4-16 19-23 29-19-3 13-13 23-29 19Z" fill="var(--motif-leaf)" />
      <path d="m78 42 19-12" />
    </>;
    case "rain": return <>
      <circle cx="80" cy="29" r="14" fill="var(--motif-gold)" stroke="none" />
      <path d="m80 8 0-5m17 12 4-4m0 22 6 1" />
      <path d="M29 59c-19-1-20-26-3-29 5-23 38-23 45-3 21-5 32 26 8 32Z" fill="var(--motif-paper)" />
      <g stroke="var(--motif-blue)"><path d="m34 71-4 9m25-9-4 9m25-9-4 9m-29 7-3 6m25-6-3 6" /></g>
    </>;
    case "tea": return <>
      <path d="M29 46h52v19c0 25-52 25-52 0Z" fill="var(--motif-paper)" />
      <path d="M81 49h8c17 0 15 23-8 23M20 86h76M43 34c-10-10 9-12 1-23M61 34c-10-10 9-12 1-23" />
      <path d="M55 69c-16-9-8-20 0-12 8-8 16 3 0 12Z" fill="var(--motif-rose)" stroke="none" />
    </>;
    case "calm": return <>
      <path d="M13 68c23 11 43-20 29-28-13-9-27 22-9 33 19 12 34-29 23-39-13-11-24 27-7 34 18 7 27-18 36-24" />
      <path d="M79 49c-5-22 10-37 28-34 1 18-7 33-28 34Z" fill="var(--motif-leaf)" />
      <path d="m79 49 17-22M19 86h77" strokeOpacity=".4" />
    </>;
    case "heart": return <>
      <path d="M19 44h82v45H19Z" fill="var(--motif-paper)" />
      <path d={heart} transform="translate(17 -9) scale(.72)" fill="var(--motif-rose)" />
      <path d="m19 44 41 27 41-27M19 89l28-27m54 27L73 62" />
      <path d="m16 21 5 2m78-4 5-3m-7 15 7 1" stroke="var(--motif-gold)" />
    </>;
    case "memories": return <>
      <g transform="rotate(-12 46 51)"><path d="M19 17h53v68H19Z" fill="var(--motif-paper)" /><path d="M25 24h41v42H25Z" fill="var(--motif-leaf)" strokeOpacity=".4" /><circle cx="54" cy="36" r="5" fill="var(--motif-gold)" stroke="none" /><path d="m26 61 13-16 12 14 8-8 7 10" /></g>
      <g transform="rotate(11 77 61)"><path d="M49 30h53v64H49Z" fill="var(--motif-paper)" /><path d="M55 36h41v39H55Z" fill="var(--motif-blue)" strokeOpacity=".3" /><path d="M75 64c-17-10-8-21 0-13 8-8 17 3 0 13Z" fill="var(--motif-rose)" stroke="none" /><path d="M65 84h19" strokeOpacity=".4" /></g>
    </>;
    case "care": return <>
      <path d={heart} transform="translate(25 -1) scale(.65)" fill="var(--motif-rose)" />
      <path d="m15 67 13-9c8-5 14-2 25 5h19c12 0 12 13 0 13H48m35-7 15-9c12-8 20 2 9 10L76 91H43L24 83" fill="var(--motif-paper)" />
      <path d="m10 69 11-8 17 26-11 8Z" fill="var(--motif-leaf)" />
    </>;
    case "flame": return <>
      <path d="M60 9c8 22 34 29 32 55-3 36-62 36-65 1-1-13 6-26 14-34-1 13 4 16 10 15 10-4 5-23 9-37Z" fill="var(--motif-gold)" />
      <path d="M60 47c5 12 17 18 15 29-3 18-28 18-31 1-2-12 10-18 16-30Z" fill="var(--motif-rose)" stroke="none" />
      <path d="m16 31-3-5m91 16 4-4M37 11l-3-5" strokeOpacity=".45" />
    </>;
    case "peace": return <>
      <path d={heart} transform="translate(-1 6)" fill="var(--motif-rose)" />
      <g transform="rotate(-32 60 50)"><rect x="36" y="41" width="48" height="20" rx="6" fill="var(--motif-paper)" /><path d="M52 42v18m16-18v18" strokeOpacity=".5" /><path d="M42 48h1m-1 6h1m34-6h1m-1 6h1" /></g>
      <path d="m26 19-5-5m73 3 5-4m-85 34-6-1" stroke="var(--motif-gold)" />
    </>;
    case "moon": return <>
      <path d="M87 14c-12 14-6 29 11 32-20 9-36-5-30-22 3-7 10-11 19-10Z" fill="var(--motif-gold)" />
      <path d="M23 78c3-25 24-41 42-43-1 20-14 39-37 47Z" fill="var(--motif-paper)" /><path d="m27 60-14 5 9 8m18 1-2 16-8-10" fill="var(--motif-rose)" />
      <circle cx="47" cy="54" r="5" fill="var(--motif-blue)" /><path d="M24 83 15 94m6-15-12 6m21 0-5 13" stroke="var(--motif-gold)" />
      <path d="m40 15 0 8m-4-4h8m49 51v8m-4-4h8" />
    </>;
    case "sunrise": return <>
      <path d="M34 62a26 26 0 0 1 52 0" fill="var(--motif-gold)" />
      <path d="M60 22V11M33 32l-8-8m62 8 8-8M22 55l-10-2m86 2 10-2" />
      <path d="M11 69c18-16 35-4 49 0s33 16 49 0M21 82c20-11 33-1 42 2s22 8 35 0" fill="none" stroke="var(--motif-leaf)" strokeWidth="4" /><path d="M35 94h48" strokeOpacity=".3" />
    </>;
    case "hug": return <>
      <path d={heart} transform="translate(17 -1) scale(.72)" fill="var(--motif-rose)" />
      <path d="M21 30c-13 17-10 45 11 55 13 6 30 5 42-1 8-4 4-13-4-11l-22 3c-15-4-22-16-17-28" fill="var(--motif-paper)" />
      <path d="M99 30c13 17 10 45-11 55-10 5-26 8-40 4-9-3-7-13 2-12l21 1c17-6 23-19 18-30" fill="var(--motif-paper)" /><path d="m17 63 13-4m60 0 13 4" stroke="var(--motif-leaf)" strokeWidth="4" />
    </>;
    case "roots": return <>
      <path d="M60 54v25m0 0-17 13m17-13 17 13m-17-13v18m-10-12-15 1m35-1 15 1" />
      <path d="M59 71c-18 1-29-9-28-22 17-1 28 9 28 22ZM62 65c16 0 28-10 27-23-16 1-26 10-27 23Z" fill="var(--motif-leaf)" />
      <path d={heart} transform="translate(21 -4) scale(.65)" fill="var(--motif-rose)" /><path d="m60 65 17-11m-18 17-17-12" />
    </>;
  }
}

export function LetterMotif({ motif, decorative = false }: { motif: Motif; decorative?: boolean }) {
  return <svg className={`letter-motif motif-${motif}`} viewBox="0 0 120 104" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" role={decorative ? undefined : "img"} aria-hidden={decorative || undefined} aria-label={decorative ? undefined : titles[motif]}>
    <Drawing motif={motif} />
  </svg>;
}
