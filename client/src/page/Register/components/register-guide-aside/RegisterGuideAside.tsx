import { useTranslations } from "next-intl";
import React from "react";

export const RegisterGuideAside = () => {
  const t = useTranslations("registerPage");

  const guideItems = [
    t("guideItem1"),
    t("guideItem2"),
    t("guideItem3"),
    t("guideItem4"),
  ];

  return (
    <aside className="space-y-4 border border-border bg-card p-5 sm:p-6">
      <h2 className="text-base font-semibold text-foreground">
        {t("guideTitle")}
      </h2>
      <ol className="space-y-3">
        {guideItems.map((item, index) => (
          <li
            key={item}
            className="flex items-start gap-3 text-sm leading-6 text-muted-foreground"
          >
            <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-border text-xs font-semibold text-foreground">
              {index + 1}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
      <div className="space-y-2 border-t border-border pt-4">
        <h2 className="text-base font-semibold text-foreground">
          {t("nextTitle")}
        </h2>
        <p className="text-sm leading-6 text-muted-foreground">
          {t("nextBody")}
        </p>
      </div>
    </aside>
  );
};
