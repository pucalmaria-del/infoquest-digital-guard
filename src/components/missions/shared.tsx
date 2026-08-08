import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, AlertTriangle, Medal, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { useI18n } from "@/lib/i18n";
import { useProgress } from "@/lib/progress";
import { XP_PER_MISSION } from "@/data/config";
import type { Bi, Mission, Reactions } from "@/data/missions";
import { characters, emotionLabel } from "@/data/characters";
import { CharacterEmotion } from "@/components/CharacterEmotion";

export function PrimaryButton({
  children,
  onClick,
  disabled,
  tone = "neon",
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  tone?: "neon" | "gold" | "ghost";
  type?: "button" | "submit";
}) {
  const tones = {
    neon: "bg-neon text-primary-foreground hover:brightness-110",
    gold: "bg-gold text-primary-foreground hover:brightness-110",
    ghost: "border border-border bg-card text-foreground hover:bg-secondary",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${tones[tone]}`}
    >
      {children}
    </button>
  );
}

export function MissionShell({
  mission,
  step,
  children,
}: {
  mission: Mission;
  step: 0 | 1 | 2 | 3;
  children: ReactNode;
}) {
  const { lang, t } = useI18n();
  const steps = [t.stepStory, t.stepChoice, t.stepConsequence, t.stepTheory];

  return (
    <div className="circuit-bg min-h-screen">
      <div className="relative mx-auto max-w-3xl px-4 py-8">
        <Link
          to="/"
          className="focus-ring inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" /> {t.backToMap}
        </Link>

        <h1 className="mt-4 flex items-baseline gap-3 text-2xl font-bold sm:text-3xl">
          <span className="font-display text-gold">{mission.id}</span>
          <span style={{ color: mission.color }}>{mission.title[lang]}</span>
        </h1>
        <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
          {mission.mentor[lang]}
        </p>

        <ol className="mt-6 flex gap-2" aria-label={t.mapTitle}>
          {steps.map((label, i) => (
            <li key={label} className="flex-1">
              <div
                className={`h-1.5 rounded-full ${i <= step ? "bg-neon" : "bg-secondary"}`}
                aria-hidden="true"
              />
              <span
                className={`mt-1 block text-[10px] uppercase tracking-wide sm:text-xs ${
                  i === step ? "text-neon" : "text-muted-foreground"
                }`}
                aria-current={i === step ? "step" : undefined}
              >
                {label}
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}

export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-border bg-card/80 p-5 backdrop-blur ${className}`}>
      {children}
    </div>
  );
}

export function StoryPanel({ brief, onNext }: { brief: Bi; onNext: () => void }) {
  const { lang, t } = useI18n();
  return (
    <div className="space-y-5">
      <Panel className="border-neon/40">
        <p className="text-xs uppercase tracking-widest text-neon">{t.mentorSays}</p>
        <p className="mt-3 text-sm leading-relaxed text-foreground sm:text-base">{brief[lang]}</p>
      </Panel>
      <PrimaryButton onClick={onNext}>
        {t.start} <ArrowRight className="size-4" aria-hidden="true" />
      </PrimaryButton>
    </div>
  );
}

export function ReactionPanel({
  reaction,
  tone,
}: {
  reaction: Reactions["good"];
  tone: "good" | "bad";
}) {
  const { lang } = useI18n();
  const character = characters[reaction.characterId];
  return (
    <div
      className={`animate-fade-in mt-4 flex items-center gap-4 rounded-2xl border p-4 ${
        tone === "good" ? "border-success/50 bg-success/10" : "border-danger/50 bg-danger/10"
      }`}
    >
      <CharacterEmotion characterId={reaction.characterId} emotion={reaction.emotion} size={64} />
      <div className="text-sm">
        <p className="font-semibold text-foreground">
          {character?.name[lang]}
          <span className="ml-2 text-xs font-normal uppercase tracking-widest text-muted-foreground">
            {character?.role[lang]} · {emotionLabel[reaction.emotion][lang]}
          </span>
        </p>
        <p className="mt-1 leading-relaxed text-muted-foreground">{reaction.line[lang]}</p>
      </div>
    </div>
  );
}

export function ConsequencePanel({
  success,
  good,
  bad,
  extra,
  reactions,
  onNext,
}: {
  success: boolean;
  good: Bi;
  bad: Bi;
  extra?: ReactNode;
  reactions?: Reactions;
  onNext: () => void;
}) {
  const { lang, t } = useI18n();
  return (
    <div className="space-y-5">
      <Panel className={success ? "border-success/60" : "border-danger/60"}>
        <p
          className={`flex items-center gap-2 text-sm font-semibold ${
            success ? "text-success" : "text-danger"
          }`}
        >
          {success ? (
            <CheckCircle2 className="size-5" aria-hidden="true" />
          ) : (
            <AlertTriangle className="size-5" aria-hidden="true" />
          )}
          {success ? t.correct : t.wrong}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-foreground">
          {(success ? good : bad)[lang]}
        </p>
        {extra}
        {reactions ? (
          <ReactionPanel
            reaction={success ? reactions.good : reactions.bad}
            tone={success ? "good" : "bad"}
          />
        ) : null}
      </Panel>
      <PrimaryButton onClick={onNext}>
        {t.next} <ArrowRight className="size-4" aria-hidden="true" />
      </PrimaryButton>
    </div>
  );
}

export function TheoryPanel({
  missionId,
  points,
  badge,
  reaction,
  onReplay,
}: {
  missionId: number;
  points: Record<"ro" | "ru", string[]>;
  badge: Bi;
  reaction?: Reactions["good"];
  onReplay: () => void;
}) {
  const { lang, t } = useI18n();
  const { complete, isCompleted } = useProgress();
  const already = isCompleted(missionId);

  return (
    <div className="space-y-5">
      <Panel className="border-gold/50">
        <h2 className="text-lg font-bold text-gold">{t.theoryTitle}</h2>
        <ul className="mt-4 space-y-2.5">
          {points[lang].map((p) => (
            <li key={p} className="flex gap-2 text-sm leading-relaxed text-foreground">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-neon" aria-hidden="true" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel className="border-neon/40">
        <p className="flex items-center gap-2 text-sm font-semibold text-neon">
          <Sparkles className="size-4" aria-hidden="true" />
          {t.xpEarned.replace("{xp}", String(XP_PER_MISSION))}
        </p>
        <p className="mt-2 flex items-center gap-2 text-sm text-foreground">
          <Medal className="size-4 text-gold" aria-hidden="true" />
          {t.badgeUnlocked}: <strong className="font-semibold">{badge[lang]}</strong>
        </p>
      </Panel>

      <div className="flex flex-wrap gap-3">
        <PrimaryButton
          tone="gold"
          onClick={() => {
            if (!already) complete(missionId);
          }}
        >
          {already ? t.done : t.finish}
        </PrimaryButton>
        <PrimaryButton tone="ghost" onClick={onReplay}>
          {t.replay}
        </PrimaryButton>
        <Link
          to="/"
          className="focus-ring inline-flex min-h-11 items-center justify-center rounded-xl border border-border px-5 text-sm font-semibold text-foreground hover:bg-secondary"
        >
          {t.backToMap}
        </Link>
      </div>
    </div>
  );
}
