import { useState } from "react";
import { PhoneOff, ShieldX, User } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { mission2, reactions2, type Mission } from "@/data/missions";
import { ConsequencePanel, MissionShell, Panel, StoryPanel, TheoryPanel } from "./shared";

export function Mission2Call({ mission }: { mission: Mission }) {
  const { lang, t } = useI18n();
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [turn, setTurn] = useState(0);
  const [leaked, setLeaked] = useState(false);
  const [log, setLog] = useState<{ who: "caller" | "me"; text: string }[]>([
    { who: "caller", text: mission2.turns[0]!.caller[lang] },
  ]);

  const restart = () => {
    setStep(0);
    setTurn(0);
    setLeaked(false);
    setLog([{ who: "caller", text: mission2.turns[0]!.caller[lang] }]);
  };

  const choose = (index: number) => {
    const option = mission2.turns[turn]!.options[index]!;
    const next = [...log, { who: "me" as const, text: option.text[lang] }];
    if (option.kind === "leak") {
      setLeaked(true);
      setLog(next);
      setStep(2);
      return;
    }
    if (option.kind === "hangup") {
      setLog(next);
      setStep(2);
      return;
    }
    const nextTurn = turn + 1;
    if (nextTurn >= mission2.turns.length) {
      setLog(next);
      setStep(2);
      return;
    }
    next.push({ who: "caller", text: mission2.turns[nextTurn]!.caller[lang] });
    setLog(next);
    setTurn(nextTurn);
  };

  return (
    <MissionShell mission={mission} step={step}>
      {step === 0 && <StoryPanel brief={mission2.brief} onNext={() => setStep(1)} />}

      {step === 1 && (
        <div className="space-y-5">
          <Panel className="border-neon/50">
            <div className="flex items-center gap-3 border-b border-border pb-3">
              <span className="grid size-10 place-items-center rounded-full bg-secondary">
                <User className="size-5 text-neon" aria-hidden="true" />
              </span>
              <span className="text-sm">
                <span className="block font-semibold text-foreground">
                  {mission2.callerName[lang]}
                </span>
                <span className="block text-xs text-danger">+373 6• ••• ••</span>
              </span>
            </div>
            <ul className="mt-4 space-y-3" aria-live="polite">
              {log.map((line, i) => (
                <li
                  key={i}
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    line.who === "caller"
                      ? "bg-secondary text-foreground"
                      : "ml-auto bg-neon/20 text-foreground"
                  }`}
                >
                  {line.text}
                </li>
              ))}
            </ul>
          </Panel>

          <fieldset className="space-y-2">
            <legend className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
              {t.stepChoice}
            </legend>
            {mission2.turns[turn]!.options.map((option, i) => (
              <button
                key={i}
                type="button"
                onClick={() => choose(i)}
                className="focus-ring block w-full rounded-xl border border-border bg-card/70 px-4 py-3 text-left text-sm text-foreground transition hover:border-neon hover:bg-secondary"
              >
                {option.text[lang]}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                setLog([...log, { who: "me", text: mission2.turns[2]!.options[0]!.text[lang] }]);
                setStep(2);
              }}
              className="focus-ring mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-danger/60 px-4 py-3 text-sm font-semibold text-danger hover:bg-danger/10"
            >
              <PhoneOff className="size-4" aria-hidden="true" />
              {lang === "ro" ? "Închide și blochează numărul" : "Сбросить и заблокировать номер"}
            </button>
          </fieldset>
        </div>
      )}

      {step === 2 && (
        <ConsequencePanel
          success={!leaked}
          good={mission2.goodOutcome}
          bad={mission2.badOutcome}
          reactions={reactions2}
          extra={
            leaked ? (
              <p className="mt-4 flex items-center gap-2 rounded-xl bg-danger/15 px-4 py-3 text-sm text-danger">
                <ShieldX className="size-4" aria-hidden="true" />
                {lang === "ro" ? "Cont compromis" : "Аккаунт скомпрометирован"}
              </p>
            ) : (
              <p className="mt-4 flex items-center gap-2 rounded-xl bg-success/15 px-4 py-3 text-sm text-success">
                <PhoneOff className="size-4" aria-hidden="true" />
                {lang === "ro" ? "Apel închis, număr blocat" : "Звонок сброшен, номер заблокирован"}
              </p>
            )
          }
          onNext={() => setStep(3)}
        />
      )}

      {step === 3 && (
        <TheoryPanel
          missionId={mission.id}
          points={mission2.theory}
          badge={mission2.badge}
          reaction={reactions2.good}
          onReplay={restart}
        />
      )}
    </MissionShell>
  );
}
