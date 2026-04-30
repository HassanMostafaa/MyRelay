import { Link } from "@/i18n/navigations";
import { ArrowRight, Check } from "lucide-react";
import { useTranslations } from "next-intl";

const ctaItemKeys = ["lifecycle", "chat", "roles"] as const;

export const AboutCallToAction = () => {
  const t = useTranslations("aboutPage");

  return (
    <section className="relative isolate overflow-hidden border border-border bg-card/50 p-5 sm:p-6 lg:p-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.16),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.12),transparent_30%)]" />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl space-y-4">
          <div className="space-y-3">
            <p className="text-primary text-xs font-semibold uppercase tracking-[0.3em]">
              {t("ctaEyebrow")}
            </p>
            <h2 className="font-heading text-3xl leading-tight text-foreground sm:text-4xl">
              {t("ctaTitle")}
            </h2>
            <p className="text-sm leading-7 text-muted-foreground sm:text-base">
              {t("ctaDescription")}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {ctaItemKeys.map((key) => (
              <span
                key={key}
                className="inline-flex items-center gap-2 border border-border bg-background/80 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-foreground"
              >
                <Check size={14} className="text-primary" />
                {t(`ctaItems.${key}`)}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
          <Link
            href="/register"
            className="inline-flex items-center justify-center gap-2 border border-primary bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:scale-[1.03] hover:opacity-90 active:scale-95"
          >
            {t("primaryCta")}
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 border border-border bg-background/70 px-5 py-3 text-sm font-semibold text-foreground transition-all hover:scale-[1.03] hover:bg-muted active:scale-95"
          >
            {t("secondaryCta")}
          </Link>
        </div>
      </div>
    </section>
  );
};
