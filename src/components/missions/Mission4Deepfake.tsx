import { useState } from "react";
import { Play, Search, CheckCircle2, XCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { mission4, type Mission } from "@/data/missions";
import { ConsequencePanel, MissionShell, Panel, PrimaryButton, StoryPanel, TheoryPanel } from "./shared";

export function Mission4Deepfake({ mission }: { mission: Mission }) {
  const { lang, t } = useI18n();
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [picked, setPicked] = useState<string[]>([]);
  const [verdict, setVerdict] = useState<"fake" | "real" | null>(null);

  const realClues = mission4.clues.filter((c) => c.real);
  const foundReal = realClues.filter((c) => picked.includes(c.id));
  const success = verdict === "fake" && foundReal.length >= 3;

  const toggle = (id: string) =>
    setPicked((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <MissionShell mission={mission} step={step}>
      {step === 0 && <StoryPanel brief={mission4.brief} onNext={() => setStep(1)} />}

      {step === 1 && (
        <div className="space-y-5">
          <Panel className="border-violet/50">
            <div
              className="relative grid aspect-video place-items-center overflow-hidden rounded-xl border border-violet/40 bg-background"
              role="img"
              aria-label={mission4.videoCaption[lang]}
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,color-mix(in_oklab,var(--violet)_35%,transparent),transparent_65%)]"
              />
              <Play className="size-14 text-violet" aria-hidden="true" />
              <span className="absolute bottom-3 left-3 right-3 text-xs text-muted-foreground">
                {mission4.videoCaption[lang]}
              </span>
            </div>
          </Panel>

          <Panel>
            <p className="flex items-center gap-2 text-xs uppercase tracking-widest text-neon">
              <Search className="size-4" aria-hidden="true" />
              {lang === "ro" ? "Tabla de probe" : "Доска доказательств"}
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {mission4.clues.map((clue) => {
                const on = picked.includes(clue.id);
                return (
                  <li key={clue.id}>
                    <button
                      type="button"
                      onClick={() => toggle(clue.id)}
                      aria-pressed={on}
                      className={`focus-ring w-full rounded-xl border px-4 py-3 text-left text-sm transition ${
                        on
                          ? "border-neon bg-neon/15 text-foreground"
                          : "border-border bg-card/70 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {clue.label[lang]}
                    </button>
                  </li>
                );
              })}
            </ul>
          </Panel>

          <Panel>
            <p className="text-sm font-semibold text-foreground">{t.verdictQuestion}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {(["fake", "real"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setVerdict(v)}
                  aria-pressed={verdict === v}
                  className={`focus-ring min-h-11 rounded-xl border px-4 text-sm font-semibold transition ${
                    verdict === v
                      ? "border-gold bg-gold/20 text-foreground"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {mission4.verdicts[v][lang]}
                </button>
              ))}
            </div>
          </Panel>

          <PrimaryButton disabled={verdict === null} onClick={() => setStep(2)}>
            {t.submit}
          </PrimaryButton>
        </div>
      )}

      {step === 2 && (
        <ConsequencePanel
          success={success}
          good={mission4.goodOutcome}
          bad={mission4.badOutcome}
          extra={
            <ul className="mt-4 space-y-2">
              {mission4.clues.map((clue) => {
                const on = picked.includes(clue.id);
                const good = clue.real ? on : !on;
                return (
                  <li key={clue.id} className="flex gap-2 text-sm">
                    {good ? (
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                    ) : (
                      <XCircle className="mt-0.5 size-4 shrink-0 text-danger" aria-hidden="true" />
                    )}
                    <span>
                      <span className="font-medium text-foreground">{clue.label[lang]}</span>
                      <span className="block text-muted-foreground">{clue.explain[lang]}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          }
          onNext={() => setStep(3)}
        />
      )}

      {step === 3 && (
        <TheoryPanel
          missionId={mission.id}
          points={mission4.theory}
          badge={mission4.badge}
          onReplay={() => {
            setPicked([]);
            setVerdict(null);
            setStep(0);
          }}
        />
      )}
    </MissionShell>
  );
}
