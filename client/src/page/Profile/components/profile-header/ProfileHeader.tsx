"use client";

import { useTranslations } from "next-intl";

export const ProfileHeader = () => {
  const t = useTranslations("profilePage");

  return (
    <header className="max-w-3xl space-y-4">
      <p className="text-primary text-xs font-semibold uppercase tracking-[0.3em]">
        {t("eyebrow")}
      </p>
      <div className="space-y-3">
        <h1 className="font-heading text-3xl leading-tight text-foreground sm:text-4xl lg:text-5xl">
          {t("title")}
        </h1>
        <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
          {t("description")}
        </p>
      </div>
    </header>
  );
};
