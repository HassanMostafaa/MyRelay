import {
  Headset,
  LayoutDashboard,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";

const journeyKeys = ["capture", "route", "resolve", "improve"] as const;

const roleCards: {
  key: "user" | "agent" | "admin";
  icon: LucideIcon;
}[] = [
  {
    key: "user",
    icon: UserRound,
  },
  {
    key: "agent",
    icon: Headset,
  },
  {
    key: "admin",
    icon: LayoutDashboard,
  },
];

export const AboutOperatingModelSection = () => {
  const t = useTranslations("aboutPage");

  return (
    <section className="grid gap-4 xl:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)]">
      <article className="space-y-5 border border-border bg-background/75 p-5 sm:p-6">
        <div className="space-y-2">
          <p className="text-primary text-xs font-semibold uppercase tracking-[0.3em]">
            {t("journeyEyebrow")}
          </p>
          <h2 className="font-heading text-3xl leading-tight text-foreground sm:text-4xl">
            {t("journeyTitle")}
          </h2>
          <p className="text-sm leading-7 text-muted-foreground sm:text-base">
            {t("journeyDescription")}
          </p>
        </div>

        <div className="space-y-3">
          {journeyKeys.map((key, index) => (
            <div
              key={key}
              className="grid gap-3 border border-border bg-card px-4 py-4 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-start"
            >
              <div className="inline-flex size-10 items-center justify-center border border-border bg-background text-sm font-semibold text-primary">
                {index + 1}
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-foreground">
                  {t(`journeySteps.${key}.title`)}
                </h3>
                <p className="text-sm leading-6 text-muted-foreground">
                  {t(`journeySteps.${key}.body`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </article>

      <aside className="space-y-5 border border-border bg-card/60 p-5 sm:p-6">
        <div className="space-y-2">
          <p className="text-primary text-xs font-semibold uppercase tracking-[0.3em]">
            {t("rolesEyebrow")}
          </p>
          <h2 className="text-2xl font-semibold text-foreground">
            {t("rolesTitle")}
          </h2>
          <p className="text-sm leading-6 text-muted-foreground">
            {t("rolesDescription")}
          </p>
        </div>

        <div className="space-y-3">
          {roleCards.map(({ key, icon: Icon }) => (
            <article
              key={key}
              className="space-y-3 border border-border bg-background/80 px-4 py-4"
            >
              <Icon size={18} className="text-primary" />
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-foreground">
                  {t(`roles.${key}.title`)}
                </h3>
                <p className="text-sm leading-6 text-muted-foreground">
                  {t(`roles.${key}.body`)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </aside>
    </section>
  );
};
