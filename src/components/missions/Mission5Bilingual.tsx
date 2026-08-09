import { useState } from "react";
import { CheckCircle2, XCircle, Info } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { mission5, reactions5, type Mission } from "@/data/missions";
import {
  ConsequencePanel,
  MissionShell,
  Panel,
  PrimaryButton,
  StoryPanel,
  TheoryPanel,
} from "./shared";

export function Mission5Bilingual({ mission }: { mission: Mission }) {
  const { lang, t } = useI18n();
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [picked, setPicked] = useState<number[]>([]);

  const manipulative = mission5.ru.tokens
    .map((tok, i) => ({ tok, i }))
    .filter((x) => x.tok.manipulative);
  const found = manipulative.filter((x) => picked.includes(x.i));
  const missed = manipulative.filter((x) => !picked.includes(x.i));
  const success = missed.length === 0;

  const toggle = (i: number) =>
    setPicked((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));

  return (
    <MissionShell mission={mission} step={step}>
      {step === 0 && <StoryPanel brief={mission5.brief} onNext={() => setStep(1)} />}

      {step === 1 && (
        <div className="space-y-5">
          <Panel className="border-neon/40">
            <p className="flex gap-2 text-sm text-muted-foreground">
              <Info className="mt-0.5 size-4 shrink-0 text-neon" aria-hidden="true" />
              {mission5.factNote[lang]}
            </p>
          </Panel>

          <div className="grid gap-4 md:grid-cols-2">
            <Panel>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                🇷🇴 {mission5.ro.label}
              </p>
              <p className="mt-3 text-sm leading-loose text-foreground">
                {mission5.ro.tokens.map((tok, i) => (
                  <span key={i}>{tok.text} </span>
                ))}
              </p>
            </Panel>

            <Panel className="border-gold/50">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                🇷🇺 {mission5.ru.label}
              </p>
              <p className="mt-3 text-sm leading-loose">
                {mission5.ru.tokens.map((tok, i) => (
                  <span key={i}>
                    <button
                      type="button"
                      onClick={() => toggle(i)}
                      aria-pressed={picked.includes(i)}
                      aria-label={`${tok.text}`}
                      className={`focus-ring rounded px-1 transition ${
                        picked.includes(i)
                          ? "bg-gold/30 text-foreground underline decoration-gold decoration-2"
                          : "text-foreground hover:bg-secondary"
                      }`}
                    >
                      {tok.text}
                    </button>{" "}
                  </span>
                ))}
              </p>
            </Panel>
          </div>

          <p className="text-xs text-muted-foreground">
            {lang === "ro"
              ? "Marchează în versiunea RU cuvintele adăugate care schimbă emoția."
              : "Отметь в версии RU добавленные слова, которые меняют эмоцию."}
          </p>

          <PrimaryButton disabled={picked.length === 0} onClick={() => setStep(2)}>
            {t.submit}
          </PrimaryButton>
        </div>
      )}

      {step === 2 && (
        <ConsequencePanel
          success={success}
          good={mission5.goodOutcome}
          bad={mission5.badOutcome}
          reactions={reactions5}
          extra={
            <div className="mt-4 space-y-3">
              <p className="text-xs uppercase tracking-widest text-success">
                {t.found}: {found.length}/{manipulative.length}
              </p>
              <ul className="space-y-2">
                {manipulative.map((x) => {
                  const ok = picked.includes(x.i);
                  return (
                    <li key={x.i} className="flex gap-2 text-sm">
                      {ok ? (
                        <CheckCircle2
                          className="mt-0.5 size-4 shrink-0 text-success"
                          aria-hidden="true"
                        />
                      ) : (
                        <XCircle
                          className="mt-0.5 size-4 shrink-0 text-danger"
                          aria-hidden="true"
                        />
                      )}
                      <span>
                        <strong className="font-semibold text-foreground">{x.tok.text}</strong>
                        {x.tok.note ? (
                          <span className="block text-muted-foreground">{x.tok.note[lang]}</span>
                        ) : null}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          }
          onNext={() => setStep(3)}
        />
      )}

      {step === 3 && (
        <TheoryPanel
          missionId={mission.id}
          points={mission5.theory}
          badge={mission5.badge}
          reaction={reactions5.good}
          onReplay={() => {
            setPicked([]);
            setStep(0);
          }}
        />
      )}
    </MissionShell>
  );
}
