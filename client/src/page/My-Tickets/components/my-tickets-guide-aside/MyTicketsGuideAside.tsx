import { Link } from "@/i18n/navigations";
import { Button } from "@/src/components/button/Button";
import { useTranslations } from "next-intl";

const requirementKeys = ["auth", "pagination", "ownership"] as const;
const featureKeys = ["newest", "timestamps", "history"] as const;

export const MyTicketsGuideAside = () => {
  const t = useTranslations("myTicketsPage");

  return (
    <div className="space-y-4">
      <aside className="space-y-4 border border-border bg-card p-5 sm:p-6">
        <div className="space-y-2">
          <p className="text-primary text-xs font-semibold uppercase tracking-[0.22em]">
            {t("requirements.title")}
          </p>
          <p className="text-sm leading-6 text-muted-foreground">
            {t("requirements.description")}
          </p>
        </div>

        <div className="space-y-3 border-t border-border pt-4">
          {requirementKeys.map((key, index) => (
            <div
              key={key}
              className="flex items-start gap-3 border border-border bg-background/65 px-3 py-3 text-sm leading-6 text-foreground"
            >
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-border text-xs font-semibold text-foreground">
                {index + 1}
              </span>
              <span>{t(`requirements.items.${key}`)}</span>
            </div>
          ))}
        </div>
      </aside>

      <section className="space-y-3 border border-border bg-card p-5 sm:p-6">
        <p className="text-primary text-xs font-semibold uppercase tracking-[0.22em]">
          {t("featureNotes.title")}
        </p>
        <p className="text-sm leading-6 text-muted-foreground">
          {t("featureNotes.description")}
        </p>

        <div className="space-y-2 border-t border-border pt-4">
          {featureKeys.map((key) => (
            <p
              key={key}
              className="border border-border bg-background/65 px-3 py-3 text-sm leading-6 text-foreground"
            >
              {t(`featureNotes.items.${key}`)}
            </p>
          ))}
        </div>
      </section>

      <section className="space-y-3 border border-border bg-card p-5 sm:p-6">
        <p className="text-primary text-xs font-semibold uppercase tracking-[0.22em]">
          {t("cta.title")}
        </p>
        <p className="text-sm leading-6 text-muted-foreground">
          {t("cta.description")}
        </p>

        <Link href="/new-ticket">
          <Button variant="primary" className="w-full">
            {t("cta.button")}
          </Button>
        </Link>
      </section>
    </div>
  );
};
