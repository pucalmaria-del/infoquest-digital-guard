import { useI18n } from "@/lib/i18n";
import { useProgress, TOTAL_MISSIONS } from "@/lib/progress";
import patrol from "@/assets/patrol-shield.png";

export function ShieldProgress() {
  const { t } = useI18n();
  const { completed, shieldPercent } = useProgress();

  return (
    <div className="relative mx-auto w-full max-w-sm text-center">
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute inset-6 -z-10 rounded-full bg-neon/25 blur-3xl animate-shield-pulse"
        />
        <img
          src={patrol}
          alt={t.storyTitle}
          width={1024}
          height={1024}
          className="mx-auto w-full drop-shadow-[0_0_35px_color-mix(in_oklab,var(--neon)_45%,transparent)]"
        />
      </div>

      <div className="mt-2">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          {t.shieldProgress}
        </p>
        <div
          className="mx-auto mt-2 flex max-w-56 gap-1"
          role="progressbar"
          aria-valuenow={completed.length}
          aria-valuemin={0}
          aria-valuemax={TOTAL_MISSIONS}
          aria-label={t.shieldProgress}
        >
          {Array.from({ length: TOTAL_MISSIONS }).map((_, i) => (
            <span
              key={i}
              className={`h-2 flex-1 rounded-full transition-all duration-500 ${
                i < completed.length ? "bg-neon glow-neon" : "bg-secondary"
              }`}
            />
          ))}
        </div>
        <p className="mt-2 font-display text-lg text-neon text-glow">{shieldPercent}%</p>
      </div>
    </div>
  );
}
