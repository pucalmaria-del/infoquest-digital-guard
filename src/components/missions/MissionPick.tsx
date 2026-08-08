import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import type { Mission, PickMission } from "@/data/missions";
import { ConsequencePanel, MissionShell, PrimaryButton, StoryPanel, TheoryPanel } from "./shared";

/** Generic "pick the only legitimate option" mission. */
export function MissionPick({ mission, data }: { mission: Mission; data: PickMission }) {
  const { lang, t } = useI18n();
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [choice, setChoice] = useState<string | null>(null);

  const success = data.cards.some((c) => c.real && c.id === choice);

  return (
    <MissionShell mission={mission} step={step}>
      {step === 0 && <StoryPanel brief={data.brief} onNext={() => setStep(1)} />}

      {step === 1 && (
        <div className="space-y-5">
          <p className="text-sm font-semibold text-foreground">{data.prompt[lang]}</p>
          <div className="grid gap-3 md:grid-cols-3">
            {data.cards.map((card) => {
              const on = choice === card.id;
              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => setChoice(card.id)}
                  aria-pressed={on}
                  className={`focus-ring rounded-2xl border p-4 text-left transition ${
                    on
                      ? "border-gold bg-gold/15"
                      : "border-border bg-card/70 hover:border-neon hover:bg-secondary"
                  }`}
                >
                  <span className="block text-sm font-bold text-foreground">{card.title[lang]}</span>
                  <span className="mt-2 block text-xs leading-relaxed text-muted-foreground">
                    {card.body[lang]}
                  </span>
                </button>
              );
            })}
          </div>

          <PrimaryButton disabled={choice === null} onClick={() => setStep(2)}>
            {t.submit}
          </PrimaryButton>
        </div>
      )}

      {step === 2 && (
        <ConsequencePanel
          success={success}
          good={data.goodOutcome}
          bad={data.badOutcome}
          reactions={data.reactions}
          extra={
            <ul className="mt-4 space-y-2">
              {data.cards.map((card) => (
                <li key={card.id} className="flex gap-2 text-sm">
                  {card.real ? (
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                  ) : (
                    <XCircle className="mt-0.5 size-4 shrink-0 text-danger" aria-hidden="true" />
                  )}
                  <span>
                    <span className="font-medium text-foreground">{card.title[lang]}</span>
                    <span className="block text-muted-foreground">{card.explain[lang]}</span>
                  </span>
                </li>
              ))}
            </ul>
          }
          onNext={() => setStep(3)}
        />
      )}

      {step === 3 && (
        <TheoryPanel
          missionId={mission.id}
          points={data.theory}
          badge={data.badge}
          reaction={data.reactions.good}
          onReplay={() => {
            setChoice(null);
            setStep(0);
          }}
        />
      )}
    </MissionShell>
  );
}
