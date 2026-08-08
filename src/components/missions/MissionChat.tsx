import { useState } from "react";
import { MessageSquareX, ShieldX, ShieldCheck, User } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import type { ChatMission, Mission } from "@/data/missions";
import { ConsequencePanel, MissionShell, Panel, StoryPanel, TheoryPanel } from "./shared";

/** Generic dialogue mission: pick replies, avoid the "leak"/escalation options. */
export function MissionChat({
  mission,
  data,
  exitLabel,
  goodTag,
  badTag,
}: {
  mission: Mission;
  data: ChatMission;
  exitLabel: { ro: string; ru: string };
  goodTag: { ro: string; ru: string };
  badTag: { ro: string; ru: string };
}) {
  const { lang, t } = useI18n();
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [turn, setTurn] = useState(0);
  const [failed, setFailed] = useState(false);
  const [log, setLog] = useState<{ who: "caller" | "me"; text: string }[]>([
    { who: "caller", text: data.turns[0]!.caller[lang] },
  ]);

  const restart = () => {
    setStep(0);
    setTurn(0);
    setFailed(false);
    setLog([{ who: "caller", text: data.turns[0]!.caller[lang] }]);
  };

  const choose = (index: number) => {
    const option = data.turns[turn]!.options[index]!;
    const next = [...log, { who: "me" as const, text: option.text[lang] }];
    if (option.kind === "leak") {
      setFailed(true);
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
    if (nextTurn >= data.turns.length) {
      setLog(next);
      setStep(2);
      return;
    }
    next.push({ who: "caller", text: data.turns[nextTurn]!.caller[lang] });
    setLog(next);
    setTurn(nextTurn);
  };

  const lastExit = data.turns[data.turns.length - 1]!.options.find((o) => o.kind === "hangup");

  return (
    <MissionShell mission={mission} step={step}>
      {step === 0 && <StoryPanel brief={data.brief} onNext={() => setStep(1)} />}

      {step === 1 && (
        <div className="space-y-5">
          <Panel className="border-neon/50">
            <div className="flex items-center gap-3 border-b border-border pb-3">
              <span className="grid size-10 place-items-center rounded-full bg-secondary">
                <User className="size-5 text-neon" aria-hidden="true" />
              </span>
              <span className="text-sm">
                <span className="block font-semibold text-foreground">{data.callerName[lang]}</span>
                <span className="block text-xs text-danger">
                  {lang === "ro" ? "sursă neverificată" : "непроверенный источник"}
                </span>
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
            {data.turns[turn]!.options.map((option, i) => (
              <button
                key={i}
                type="button"
                onClick={() => choose(i)}
                className="focus-ring block w-full rounded-xl border border-border bg-card/70 px-4 py-3 text-left text-sm text-foreground transition hover:border-neon hover:bg-secondary"
              >
                {option.text[lang]}
              </button>
            ))}
            {lastExit ? (
              <button
                type="button"
                onClick={() => {
                  setLog([...log, { who: "me", text: lastExit.text[lang] }]);
                  setStep(2);
                }}
                className="focus-ring mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-danger/60 px-4 py-3 text-sm font-semibold text-danger hover:bg-danger/10"
              >
                <MessageSquareX className="size-4" aria-hidden="true" />
                {exitLabel[lang]}
              </button>
            ) : null}
          </fieldset>
        </div>
      )}

      {step === 2 && (
        <ConsequencePanel
          success={!failed}
          good={data.goodOutcome}
          bad={data.badOutcome}
          reactions={data.reactions}
          extra={
            failed ? (
              <p className="mt-4 flex items-center gap-2 rounded-xl bg-danger/15 px-4 py-3 text-sm text-danger">
                <ShieldX className="size-4" aria-hidden="true" />
                {badTag[lang]}
              </p>
            ) : (
              <p className="mt-4 flex items-center gap-2 rounded-xl bg-success/15 px-4 py-3 text-sm text-success">
                <ShieldCheck className="size-4" aria-hidden="true" />
                {goodTag[lang]}
              </p>
            )
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
