import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Lock, Medal, ShieldCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Header } from "@/components/Header";
import { MissionCard } from "@/components/MissionCard";
import { ShieldProgress } from "@/components/ShieldProgress";
import { BottomBlocks } from "@/components/BottomBlocks";
import { useI18n } from "@/lib/i18n";
import { useProgress } from "@/lib/progress";
import { badgeByMission, missions, playableIds, type Mission } from "@/data/missions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "InfoQuest Cahul — Scutul comunității digitale" },
      {
        name: "description",
        content:
          "Joc educațional bilingv RO/RU despre securitate digitală: 8 misiuni contra fraudelor, deepfake-urilor și dezinformării în comunitate.",
      },
      { property: "og:title", content: "InfoQuest Cahul — Scutul comunității digitale" },
      {
        property: "og:description",
        content:
          "Observă. Verifică. Protejează comunitatea. 8 misiuni bilingve despre fraude online, deepfake și zvonuri.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { lang, t } = useI18n();
  const { isCompleted, allMvpDone } = useProgress();
  const [locked, setLocked] = useState<Mission | null>(null);

  const left = missions.filter((m) => m.x < 50);
  const right = missions.filter((m) => m.x >= 50);

  return (
    <>
      <Header />
      <main className="circuit-bg">
        <section className="relative mx-auto max-w-6xl px-4 pt-10 text-center">
          <h1 className="font-display text-3xl font-black uppercase tracking-tight sm:text-5xl">
            InfoQuest <span className="text-neon text-glow">Cahul</span>
          </h1>
          <p className="mt-2 font-display text-sm uppercase tracking-[0.25em] text-neon sm:text-base">
            {t.tagline}
          </p>
          <p className="mx-auto mt-4 inline-block rounded-full border border-gold/50 px-5 py-2 text-sm font-semibold text-gold">
            {t.motto}
          </p>
        </section>

        {/* Constellation map (desktop) */}
        <section aria-label={t.mapTitle} className="mx-auto max-w-6xl px-4 py-10">
          <div className="hidden lg:grid lg:grid-cols-[1fr_minmax(280px,380px)_1fr] lg:items-center lg:gap-6">
            <div className="space-y-4">
              {left.map((m) => (
                <MissionCard key={m.id} mission={m} onLockedClick={setLocked} />
              ))}
            </div>
            <div className="relative">
              <svg
                aria-hidden="true"
                viewBox="0 0 200 400"
                className="pointer-events-none absolute inset-0 size-full"
              >
                <path
                  d="M10 40 C 60 90, 140 90, 190 40 M10 140 C 60 190, 140 190, 190 140 M10 260 C 60 300, 140 300, 190 260 M10 360 C 70 320, 130 320, 190 360"
                  fill="none"
                  stroke="var(--gold)"
                  strokeWidth="2"
                  strokeDasharray="6 12"
                  strokeLinecap="round"
                  className="animate-dash-run opacity-70"
                />
              </svg>
              <ShieldProgress />
            </div>
            <div className="space-y-4">
              {right.map((m) => (
                <MissionCard key={m.id} mission={m} onLockedClick={setLocked} />
              ))}
            </div>
          </div>

          {/* Mobile / tablet: vertical scroll list */}
          <div className="lg:hidden">
            <ShieldProgress />
            <div className="mt-8 space-y-3">
              {missions.map((m) => (
                <MissionCard key={m.id} mission={m} onLockedClick={setLocked} />
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="mx-auto max-w-3xl px-4">
          <div className="rounded-2xl border border-neon/30 bg-card/70 p-6 backdrop-blur">
            <h2 className="text-lg font-bold text-neon">{t.storyTitle}</h2>
            <p className="mt-3 text-sm leading-relaxed text-foreground">{t.story}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.story2}</p>
          </div>
        </section>

        {/* Badges */}
        <section aria-label={t.badges} className="mx-auto mt-10 max-w-3xl px-4">
          <h2 className="text-lg font-bold text-gold">{t.badges}</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {playableIds.map((id) => {
              const done = isCompleted(id);
              return (
                <div
                  key={id}
                  className={`flex items-center gap-3 rounded-2xl border p-4 ${
                    done ? "border-gold bg-gold/10" : "border-border bg-card/60 opacity-70"
                  }`}
                >
                  <Medal
                    className={`size-8 shrink-0 ${done ? "text-gold" : "text-muted-foreground"}`}
                    aria-hidden="true"
                  />
                  <span className="text-sm font-medium text-foreground">
                    {badgeByMission[id]?.[lang]}
                  </span>
                </div>
              );
            })}
            <div
              className={`flex items-center gap-3 rounded-2xl border p-4 sm:col-span-2 ${
                allMvpDone
                  ? "border-neon bg-neon/10 glow-neon"
                  : "border-dashed border-border bg-card/60"
              }`}
            >
              <ShieldCheck
                className={`size-8 shrink-0 ${allMvpDone ? "text-neon" : "text-muted-foreground"}`}
                aria-hidden="true"
              />
              <span className="text-sm">
                <strong className="block font-semibold text-foreground">{t.finalBadge}</strong>
                <span className="text-muted-foreground">
                  {allMvpDone ? t.finalBadgeReady : t.finalBadgeHint}
                </span>
              </span>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-10 max-w-3xl px-4 text-center">
          <p className="text-sm text-foreground">{t.heroLead}</p>
          <p className="mt-1 text-sm text-gold">{t.heroSub}</p>
        </section>

        <BottomBlocks />
      </main>

      <Dialog open={locked !== null} onOpenChange={(o) => !o && setLocked(null)}>
        <DialogContent className="max-w-lg border-neon/40 bg-popover">
          {locked && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <span
                    className="grid size-8 place-items-center rounded-full font-display text-sm"
                    style={{ color: locked.color, border: `1px solid ${locked.color}` }}
                    aria-hidden="true"
                  >
                    {locked.id}
                  </span>
                  {locked.title[lang]}
                </DialogTitle>
                <DialogDescription className="text-left text-sm leading-relaxed">
                  {locked.teaser[lang]}
                </DialogDescription>
              </DialogHeader>
              <p className="flex items-center gap-2 rounded-xl bg-secondary px-4 py-3 text-sm text-muted-foreground">
                <Lock className="size-4" aria-hidden="true" /> {t.lockedTeaserNote}
              </p>
              <button
                type="button"
                onClick={() => setLocked(null)}
                className="focus-ring inline-flex min-h-11 items-center justify-center rounded-xl bg-neon px-5 text-sm font-semibold text-primary-foreground"
              >
                {t.understood}
              </button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
