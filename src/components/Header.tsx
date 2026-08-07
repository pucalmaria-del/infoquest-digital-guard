import { Link } from "@tanstack/react-router";
import { ShieldCheck, Sparkles, Medal } from "lucide-react";
import { useI18n, type Lang } from "@/lib/i18n";
import { useProgress } from "@/lib/progress";

function LangSwitch() {
  const { lang, setLang, t } = useI18n();
  const langs: { id: Lang; label: string; flag: string }[] = [
    { id: "ro", label: "RO", flag: "🇷🇴" },
    { id: "ru", label: "RU", flag: "🇷🇺" },
  ];
  return (
    <div
      role="group"
      aria-label={t.langLabel}
      className="flex items-center gap-1 rounded-full border border-border bg-card/70 p-1"
    >
      {langs.map((l) => (
        <button
          key={l.id}
          type="button"
          onClick={() => setLang(l.id)}
          aria-pressed={lang === l.id}
          aria-label={`${t.a11y.switchTo} ${l.label}`}
          className={`focus-ring flex min-h-9 items-center gap-1 rounded-full px-3 text-sm font-semibold transition-colors ${
            lang === l.id
              ? "bg-neon text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <span aria-hidden="true">{l.flag}</span>
          {l.label}
        </button>
      ))}
    </div>
  );
}

export function Header() {
  const { t } = useI18n();
  const { xp, completed } = useProgress();
  const xpMax = 360;
  const pct = Math.min(100, Math.round((xp / xpMax) * 100));

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3">
        <Link
          to="/"
          className="focus-ring flex items-center gap-2 rounded-md"
          aria-label={t.brand}
        >
          <span className="relative grid size-10 place-items-center rounded-lg border border-neon/50 bg-card glow-neon">
            <ShieldCheck className="size-5 text-neon" aria-hidden="true" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-sm font-bold tracking-wider text-foreground sm:text-base">
              INFOQUEST CAHUL
            </span>
            <span className="block text-xs text-neon">{t.tagline}</span>
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-3">
          <div className="hidden min-w-40 sm:block">
            <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Sparkles className="size-3 text-gold" aria-hidden="true" /> {t.xp}
              </span>
              <span className="font-semibold text-foreground">{xp}</span>
            </div>
            <div
              className="h-2 overflow-hidden rounded-full bg-secondary"
              role="progressbar"
              aria-valuenow={xp}
              aria-valuemin={0}
              aria-valuemax={xpMax}
              aria-label={t.xp}
            >
              <div
                className="h-full rounded-full bg-gold transition-[width] duration-700"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
          <span className="flex items-center gap-1 rounded-full border border-border bg-card/70 px-3 py-1.5 text-xs text-muted-foreground">
            <Medal className="size-3.5 text-gold" aria-hidden="true" />
            <span className="font-semibold text-foreground">{completed.length}</span>/8
          </span>
          <LangSwitch />
        </div>
      </div>
    </header>
  );
}
