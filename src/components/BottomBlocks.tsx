import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { QRCodeSVG } from "qrcode.react";
import { Download, Image as ImageIcon, QrCode, Users, PlayCircle, Trash2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { DEMO_VIDEO_URL, TEAM_MEMBERS } from "@/data/config";

type BlockKey = "logo" | "qr" | "members" | "demo";

function BlockShell({
  label,
  children,
  onClick,
  ariaLabel,
}: {
  label: string;
  children: React.ReactNode;
  onClick: () => void;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="focus-ring flex min-h-36 flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-neon/40 bg-card/60 p-4 text-center transition-colors hover:border-neon hover:bg-card"
    >
      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </span>
      {children}
    </button>
  );
}

export function BottomBlocks() {
  const { lang, t } = useI18n();
  const [open, setOpen] = useState<BlockKey | null>(null);
  const [logo, setLogo] = useState<string | null>(null);
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.origin);
  }, []);

  const readFile = (file?: File | null) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => setLogo(String(reader.result));
    reader.readAsDataURL(file);
  };

  const downloadQr = () => {
    const svg = document.getElementById("iq-qr-large");
    if (!svg) return;
    const data = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([data], { type: "image/svg+xml" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "infoquest-qr.svg";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <section aria-label={t.bottom.members} className="mx-auto mt-14 max-w-6xl px-4 pb-16">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            readFile(e.dataTransfer.files?.[0]);
          }}
        >
          <BlockShell
            label={t.bottom.logo}
            ariaLabel={`${t.a11y.openBlock}: ${t.bottom.logo}`}
            onClick={() => setOpen("logo")}
          >
            {logo ? (
              <img
                src={logo}
                alt={t.bottom.logo}
                loading="lazy"
                className="size-20 rounded-full object-cover ring-2 ring-neon"
              />
            ) : (
              <span className="grid size-20 place-items-center rounded-full border-2 border-dashed border-neon/50">
                <ImageIcon className="size-7 text-neon" aria-hidden="true" />
              </span>
            )}
          </BlockShell>
        </div>

        <BlockShell
          label={t.bottom.qr}
          ariaLabel={`${t.a11y.openBlock}: ${t.bottom.qr}`}
          onClick={() => setOpen("qr")}
        >
          <span className="grid size-[88px] place-items-center rounded-lg bg-foreground p-2">
            {url ? <QRCodeSVG value={url} size={72} bgColor="#ffffff" fgColor="#0b1220" /> : null}
          </span>
        </BlockShell>

        <BlockShell
          label={t.bottom.members}
          ariaLabel={`${t.a11y.openBlock}: ${t.bottom.members}`}
          onClick={() => setOpen("members")}
        >
          <Users className="size-12 text-neon" aria-hidden="true" />
        </BlockShell>

        <BlockShell
          label={t.bottom.demo}
          ariaLabel={`${t.a11y.openBlock}: ${t.bottom.demo}`}
          onClick={() => setOpen("demo")}
        >
          <PlayCircle className="size-12 text-gold" aria-hidden="true" />
        </BlockShell>
      </div>

      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-2xl border-neon/40 bg-popover">
          {open === "logo" && (
            <>
              <DialogHeader>
                <DialogTitle>{t.bottom.logo}</DialogTitle>
                <DialogDescription>
                  {logo ? t.bottom.logoUploaded : t.bottom.logoHint}
                </DialogDescription>
              </DialogHeader>
              <label className="focus-ring flex cursor-pointer flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-neon/50 p-6">
                {logo ? (
                  <img
                    src={logo}
                    alt={t.bottom.logo}
                    className="size-32 rounded-full object-cover"
                  />
                ) : (
                  <ImageIcon className="size-10 text-neon" aria-hidden="true" />
                )}
                <span className="text-sm text-muted-foreground">{t.bottom.logoHint}</span>
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  aria-label={t.bottom.logo}
                  onChange={(e) => readFile(e.target.files?.[0])}
                />
              </label>
              {logo && (
                <button
                  type="button"
                  onClick={() => setLogo(null)}
                  className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  <Trash2 className="size-4" aria-hidden="true" /> {t.bottom.logoRemove}
                </button>
              )}
            </>
          )}

          {open === "qr" && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <QrCode className="size-5 text-neon" aria-hidden="true" /> {t.bottom.qr}
                </DialogTitle>
                <DialogDescription>{t.bottom.qrHint}</DialogDescription>
              </DialogHeader>
              <div className="flex flex-col items-center gap-4">
                <span className="grid size-[272px] place-items-center rounded-2xl bg-foreground p-4">
                  {url ? (
                    <QRCodeSVG
                      id="iq-qr-large"
                      value={url}
                      size={240}
                      bgColor="#ffffff"
                      fgColor="#0b1220"
                    />
                  ) : null}
                </span>
                <code className="break-all text-xs text-muted-foreground">{url}</code>
                <button
                  type="button"
                  onClick={downloadQr}
                  className="focus-ring inline-flex items-center gap-2 rounded-lg bg-neon px-4 py-2 text-sm font-semibold text-primary-foreground"
                >
                  <Download className="size-4" aria-hidden="true" /> {t.bottom.qrDownload}
                </button>
              </div>
            </>
          )}

          {open === "members" && (
            <>
              <DialogHeader>
                <DialogTitle>{t.bottom.members}</DialogTitle>
                <DialogDescription>{t.bottom.membersHint}</DialogDescription>
              </DialogHeader>
              <ul className="space-y-2">
                {TEAM_MEMBERS.map((m, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card/70 px-4 py-3 text-sm"
                  >
                    <span className="text-foreground">{m.name}</span>
                    <span className="text-muted-foreground">{m.role[lang]}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {open === "demo" && (
            <>
              <DialogHeader>
                <DialogTitle>{t.bottom.demo}</DialogTitle>
                <DialogDescription>{t.bottom.demoHint}</DialogDescription>
              </DialogHeader>
              {DEMO_VIDEO_URL.includes("ЗАМЕНИ") ? (
                <p className="rounded-xl border border-dashed border-gold/60 bg-card/70 p-4 text-sm text-muted-foreground">
                  {t.bottom.demoMissing}
                </p>
              ) : (
                <div className="aspect-video w-full overflow-hidden rounded-xl border border-neon/40">
                  <iframe
                    src={DEMO_VIDEO_URL}
                    title={t.bottom.demo}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                    allowFullScreen
                    className="size-full"
                  />
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
