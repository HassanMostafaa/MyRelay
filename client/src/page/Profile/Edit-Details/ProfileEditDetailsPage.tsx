"use client";

import { useTranslations } from "next-intl";
import { useAuthStore } from "@/src/store/useAuthStore";
import { ProfileEditDetailsForm } from "./components/ProfileEditDetailsForm";
import { ProfileEditDetailsSummary } from "./components/ProfileEditDetailsSummary";

export const ProfileEditDetailsPage = () => {
  const t = useTranslations("profilePage.editDetails");
  const { status, user } = useAuthStore((state) => ({
    status: state.status,
    user: state.user,
  }));

  return (
    <div className="my-container space-y-6 py-6 lg:space-y-8 lg:py-12">
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

      {status === "loading" || !user ? (
        <section className="border border-border bg-card p-5 sm:p-6">
          <p className="text-sm text-muted-foreground">{t("loading")}</p>
        </section>
      ) : (
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
          <div className="w-full">
            <ProfileEditDetailsForm user={user} />
          </div>
          <div className="w-full lg:max-w-sm">
            <ProfileEditDetailsSummary user={user} />
          </div>
        </div>
      )}
    </div>
  );
};
