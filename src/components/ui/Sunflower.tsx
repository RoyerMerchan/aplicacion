type SunflowerProps = {
  bloomOnly?: boolean;
  engraved?: boolean;
};

export function Sunflower({ bloomOnly = false, engraved = false }: SunflowerProps) {
  return (
    <svg className="sunflower" viewBox={bloomOnly ? "0 0 60 56" : "0 0 60 76"} fill="none" aria-hidden="true">
      {!bloomOnly && <>
      <path d="M30 32c-4 15 5 23 0 41" stroke="#73804c" strokeWidth="2" strokeLinecap="round" />
      <path d="M31 59c-10 0-16-6-16-13 10 0 16 5 16 13ZM32 51c9-1 14-6 14-12-8 1-13 5-14 12Z" fill="#8c985e" />
      </>}
      {Array.from({ length: 12 }, (_, index) => (
        <ellipse key={index} cx="30" cy="13" rx="5" ry="11" fill={engraved ? "none" : index % 2 ? "#e5b94c" : "#d9a439"} stroke={engraved ? "currentColor" : "#c79230"} strokeWidth={engraved ? 1.6 : 0.5} transform={`rotate(${index * 30} 30 28)`} />
      ))}
      <circle cx="30" cy="28" r="10" fill={engraved ? "none" : "#70503a"} stroke={engraved ? "currentColor" : "none"} strokeWidth="1.6" />
      <circle cx="30" cy="28" r="7" stroke={engraved ? "currentColor" : "#a27a4a"} strokeWidth="2" strokeDasharray="1 3" />
    </svg>
  );
}
