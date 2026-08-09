import { useState } from "react";
import { CheckCircle2, XCircle, FileWarning } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import type { ChecklistMission, Mission } from "@/data/missions";
import {
  ConsequencePanel,
  MissionShell,
  Panel,
  PrimaryButton,
  StoryPanel,
  TheoryPanel,
} from "./shared";

/** Generic "select all correct actions / signals" mission. */
export function MissionChecklist({ mission, data }: { mission: Mission; data: ChecklistMission }) {
  const { lang, t } = useI18n();
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [picked, setPicked] = useState<string[]>([]);

  const correctItems = data.items.filter((i) => i.correct);
  const hits = correctItems.filter((i) => picked.includes(i.id));
  const wrongPicks = data.items.filter((i) => !i.correct && picked.includes(i.id));
  const success = hits.length >= data.minCorrect && wrongPicks.length === 0;

  const toggle = (id: string) =>
    setPicked((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const restart = () => {
    setPicked([]);
    setStep(0);
  };

  return (
    <MissionShell mission={mission} step={step}>
      {step === 0 && <StoryPanel brief={data.brief} onNext={() => setStep(1)} />}

      {step === 1 && (
        <div className="space-y-5">
          <Panel className="border-danger/40">
            <p className="flex items-center gap-2 text-xs uppercase tracking-widest text-danger">
              <FileWarning className="size-4" aria-hidden="true" />
              {lang === "ro" ? "Dovada" : "Улика"}
            </p>
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-foreground">
              {data.scene[lang]}
            </p>
          </Panel>

          <fieldset>
            <legend className="mb-3 text-sm font-semibold text-foreground">
              {data.prompt[lang]}
            </legend>
            <ul className="grid gap-2 sm:grid-cols-2">
              {data.items.map((item) => {
                const on = picked.includes(item.id);
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => toggle(item.id)}
                      aria-pressed={on}
                      className={`focus-ring w-full rounded-xl border px-4 py-3 text-left text-sm transition ${
                        on
                          ? "border-neon bg-neon/15 text-foreground"
                          : "border-border bg-card/70 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {item.label[lang]}
                    </button>
                  </li>
                );
              })}
            </ul>
          </fieldset>

          <PrimaryButton disabled={picked.length === 0} onClick={() => setStep(2)}>
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
              {data.items.map((item) => {
                const on = picked.includes(item.id);
                const ok = item.correct ? on : !on;
                return (
                  <li key={item.id} className="flex gap-2 text-sm">
                    {ok ? (
                      <CheckCircle2
                        className="mt-0.5 size-4 shrink-0 text-success"
                        aria-hidden="true"
                      />
                    ) : (
                      <XCircle className="mt-0.5 size-4 shrink-0 text-danger" aria-hidden="true" />
                    )}
                    <span>
                      <span className="font-medium text-foreground">{item.label[lang]}</span>
                      <span className="block text-muted-foreground">{item.explain[lang]}</span>
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
          points={data.theory}
          badge={data.badge}
          reaction={data.reactions.good}
          onReplay={restart}
        />
      )}
    </MissionShell>
  );
}
