import Image from "next/image";
import { Sunflower } from "@/components/ui/Sunflower";
import { MoonJourney } from "./MoonJourney";
import { LetterMotif } from "./LetterMotif";
import type { Letter, LetterBlock, LetterImage } from "@/types/letter";

function Photo({ image }: { image: LetterImage }) {
  const data = typeof image === "string" ? { src: image, alt: "Fotografía de nuestros recuerdos", width: 1200, height: 900 } : image;
  return <figure className="letter-photo"><Image src={data.src} alt={data.alt} width={data.width} height={data.height} sizes="(max-width: 650px) 85vw, 550px" />{data.caption && <figcaption>{data.caption}</figcaption>}</figure>;
}

function Block({ block }: { block: LetterBlock }) {
  switch (block.type) {
    case "moon-journey": return <MoonJourney />;
    case "text": return <div className="letter-text">{block.text}</div>;
    case "image": return <Photo image={block.image} />;
    case "audio": return <div className="letter-audio">{block.title && <p>{block.title}</p>}<audio controls preload="none" src={block.src} aria-label={block.title || "Canción de la carta"} /></div>;
    case "video": return <video controls playsInline preload="metadata" src={block.src} poster={block.poster} aria-label="Video de la carta" />;
  }
}

export function LetterPaper({ letter, index }: { letter: Letter; index: number }) {
  const hasContent = letter.content.trim() || letter.images?.length || letter.audio || letter.video || letter.blocks?.length;
  return <>
    <div className="paper-topline"><span>DE MÍ, PARA TI</span><span>CARTA {String(index + 1).padStart(2, "0")}</span></div>
    <h2 id="letter-heading">{letter.title}</h2>
    <div className="paper-ornaments">
      <div className="paper-rule" aria-hidden="true"><span /><Sunflower bloomOnly /><span /></div>
      <div className="paper-motif"><LetterMotif motif={letter.motif} /></div>
    </div>
    {hasContent ? <div className="letter-content">
      {letter.content.trim() && <div className="letter-text">{letter.content}</div>}
      {letter.images?.map((image, i) => <Photo key={i} image={image} />)}
      {letter.audio && <Block block={{ type: "audio", src: letter.audio }} />}
      {letter.video && <Block block={{ type: "video", src: letter.video }} />}
      {letter.blocks?.map((block, i) => <Block key={i} block={block} />)}
    </div> : <div className="empty-letter"><p>Esta carta todavía está<br />esperando ser escrita…</p></div>}
    <div className="paper-bottom" aria-hidden="true"><Sunflower /><span>When</span></div>
  </>;
}
