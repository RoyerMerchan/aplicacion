export type LetterImage = string | {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type LetterBlock =
  | { type: "text"; text: string }
  | { type: "image"; image: LetterImage }
  | { type: "audio"; src: string; title?: string }
  | { type: "video"; src: string; poster?: string }
  | { type: "moon-journey" };

export type LetterMotif = "breeze" | "rain" | "tea" | "calm" | "heart" | "memories" | "care" | "flame" | "peace" | "moon" | "sunrise" | "hug" | "roots";

export type Letter = {
  id: string;
  title: string;
  content: string;
  motif: LetterMotif;
  images?: LetterImage[];
  audio?: string;
  video?: string;
  /** Optional ordered content, for interleaving paragraphs and media. */
  blocks?: LetterBlock[];
};
