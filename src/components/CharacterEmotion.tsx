import { characters, emotionLabel, type Emotion } from "@/data/characters";
import { useI18n } from "@/lib/i18n";

const mouth: Record<Emotion, string> = {
  joy: "M 34 62 Q 50 78 66 62",
  proud: "M 36 64 Q 50 72 64 62",
  calm: "M 38 66 L 62 66",
  worried: "M 36 70 Q 50 62 64 70",
  sad: "M 34 72 Q 50 58 66 72",
  angry: "M 34 70 Q 50 64 66 72",
};

const brows: Record<Emotion, [string, string]> = {
  joy: ["M 30 38 Q 38 33 46 37", "M 54 37 Q 62 33 70 38"],
  proud: ["M 30 36 Q 38 32 46 36", "M 54 36 Q 62 32 70 36"],
  calm: ["M 30 38 L 46 38", "M 54 38 L 70 38"],
  worried: ["M 30 34 Q 38 40 46 38", "M 54 38 Q 62 40 70 34"],
  sad: ["M 30 33 Q 38 41 46 40", "M 54 40 Q 62 41 70 33"],
  angry: ["M 30 40 Q 38 32 46 40", "M 54 40 Q 62 32 70 40"],
};

/** Expressive vector avatar for a patrol character. */
export function CharacterEmotion({
  characterId,
  emotion,
  size = 72,
}: {
  characterId: string;
  emotion: Emotion;
  size?: number;
}) {
  const { lang } = useI18n();
  const c = characters[characterId] ?? characters["vig"]!;
  const [browL, browR] = brows[emotion];
  const eyeY = emotion === "joy" ? 48 : 49;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label={`${c.name[lang]} — ${emotionLabel[emotion][lang]}`}
      className="shrink-0"
    >
      <circle cx="50" cy="50" r="48" fill="color-mix(in oklab, var(--card) 80%, black)" />
      <circle cx="50" cy="50" r="46" fill="none" stroke={c.color} strokeWidth="2.5" />
      {c.robot ? (
        <rect x="20" y="22" width="60" height="58" rx="14" fill={c.tone} />
      ) : (
        <>
          <ellipse cx="50" cy="52" rx="28" ry="31" fill={c.tone} />
          <path
            d="M 22 44 Q 50 12 78 44 Q 68 30 50 28 Q 32 30 22 44"
            fill={c.color}
            opacity="0.85"
          />
        </>
      )}
      <g stroke="#1b2233" strokeWidth="3.2" strokeLinecap="round" fill="none">
        <path d={browL} />
        <path d={browR} />
      </g>
      {emotion === "joy" ? (
        <g stroke="#1b2233" strokeWidth="3.2" strokeLinecap="round" fill="none">
          <path d={`M 34 ${eyeY + 2} Q 39 ${eyeY - 4} 44 ${eyeY + 2}`} />
          <path d={`M 56 ${eyeY + 2} Q 61 ${eyeY - 4} 66 ${eyeY + 2}`} />
        </g>
      ) : (
        <>
          <circle cx="39" cy={eyeY} r="4" fill="#1b2233" />
          <circle cx="61" cy={eyeY} r="4" fill="#1b2233" />
        </>
      )}
      <path
        d={mouth[emotion]}
        stroke="#1b2233"
        strokeWidth="3.4"
        strokeLinecap="round"
        fill="none"
      />
      {emotion === "sad" && <circle cx="42" cy="60" r="3" fill="var(--neon)" opacity="0.9" />}
      {emotion === "angry" && (
        <path d="M 70 26 L 78 18" stroke="var(--danger)" strokeWidth="3" strokeLinecap="round" />
      )}
      {(emotion === "joy" || emotion === "proud") && (
        <path
          d="M 80 24 l 2.5 5.5 5.5 2.5 -5.5 2.5 -2.5 5.5 -2.5 -5.5 -5.5 -2.5 5.5 -2.5 z"
          fill="var(--gold)"
        />
      )}
    </svg>
  );
}
