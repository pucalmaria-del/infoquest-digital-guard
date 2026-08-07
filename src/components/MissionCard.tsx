import { Link } from "@tanstack/react-router";
import {
  Gift,
  Languages,
  Link2Off,
  Lock,
  MapPin,
  PhoneCall,
  ScanFace,
  ShieldAlert,
  UserLock,
  Check,
  type LucideIcon,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useProgress } from "@/lib/progress";
import type { Mission } from "@/data/missions";

const icons: Record<string, LucideIcon> = {
  "user-lock": UserLock,
  "phone-call": PhoneCall,
  gift: Gift,
  "scan-face": ScanFace,
  languages: Languages,
  "map-pin": MapPin,
  "shield-alert": ShieldAlert,
  "link-2-off": Link2Off,
};

type Props = { mission: Mission; onLockedClick: (m: Mission) => void };

export function MissionCard({ mission, onLockedClick }: Props) {
  const { lang, t } = useI18n();
  const { isCompleted } = useProgress();
  const Icon = icons[mission.icon] ?? ShieldAlert;
  const locked = mission.status === "soon";
  const done = isCompleted(mission.id);

  const inner = (
    <>
      <span
        aria-hidden="true"
        className="grid size-8 shrink-0 place-items-center rounded-full border border-gold/70 font-display text-sm font-bold text-gold"
      >
        {mission.id}
      </span>
      <span
        aria-hidden="true"
        className="grid size-11 shrink-0 place-items-center rounded-xl bg-background/60"
        style={{ boxShadow: `0 0 14px color-mix(in oklab, ${mission.color} 45%, transparent)` }}
      >
        <Icon className="size-6" style={{ color: mission.color }} />
      </span>
      <span className="min-w-0 flex-1 text-left">
        <span className="block text-sm font-semibold leading-snug text-foreground">
          {mission.title[lang]}
        </span>
        <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-medium uppercase tracking-wide">
          {done ? (
            <span className="inline-flex items-center gap-1 text-success">
              <Check className="size-3" aria-hidden="true" /> {t.done}
            </span>
          ) : locked ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-muted-foreground">
              <Lock className="size-3" aria-hidden="true" /> {t.soonBadge}
            </span>
          ) : (
            <span className="text-neon">{t.playable}</span>
          )}
        </span>
      </span>
    </>
  );

  const base =
    "focus-ring group flex w-full items-center gap-3 rounded-2xl border-2 bg-card/80 p-3 backdrop-blur transition-all duration-300";

  if (locked) {
    return (
      <button
        type="button"
        onClick={() => onLockedClick(mission)}
        aria-label={`${t.a11y.lockedMission}: ${mission.title[lang]}`}
        className={`${base} border-dashed opacity-70 hover:opacity-100`}
        style={{ borderColor: `color-mix(in oklab, ${mission.color} 45%, transparent)` }}
      >
        {inner}
      </button>
    );
  }

  return (
    <Link
      to="/mission/$id"
      params={{ id: String(mission.id) }}
      aria-label={`${t.a11y.openMission}: ${mission.title[lang]}`}
      className={`${base} hover:-translate-y-0.5`}
      style={{
        borderColor: mission.color,
        boxShadow: done
          ? `0 0 22px color-mix(in oklab, ${mission.color} 55%, transparent)`
          : `0 0 12px color-mix(in oklab, ${mission.color} 25%, transparent)`,
      }}
    >
      {inner}
    </Link>
  );
}
