import {
  Layers3,
  MessageSquareText,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";

const transformationCards: {
  key: "visibility" | "collaboration" | "governance";
  icon: LucideIcon;
}[] = [
  {
    key: "visibility",
    icon: Layers3,
  },
  {
    key: "collaboration",
    icon: MessageSquareText,
  },
  {
    key: "governance",
    icon: ShieldCheck,
  },
];

export const AboutTransformationSection = () => {
  const t = useTranslations("aboutPage");

  return (
    <section className="space-y-5">
      <div className="max-w-3xl space-y-3">
        <p className="text-primary text-xs font-semibold uppercase tracking-[0.3em]">
          {t("pillarsEyebrow")}
        </p>
        <h2 className="font-heading text-3xl leading-tight text-foreground sm:text-4xl">
          {t("pillarsTitle")}
        </h2>
        <p className="text-sm leading-7 text-muted-foreground sm:text-base">
          {t("pillarsDescription")}
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {transformationCards.map(({ key, icon: Icon }) => (
          <article
            key={key}
            className="space-y-4 border border-border bg-card/60 p-5 sm:p-6"
          >
            <Icon size={20} className="text-primary" />
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-foreground">
                {t(`pillars.${key}.title`)}
              </h3>
              <p className="text-sm leading-6 text-muted-foreground">
                {t(`pillars.${key}.body`)}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
