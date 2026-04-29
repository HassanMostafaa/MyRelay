"use client";

import { useAuthStore } from "@/src/store/useAuthStore";
import { useTranslations } from "next-intl";
import { ProfileDetailsCard } from "./components/profile-details-card/ProfileDetailsCard";
import { ProfileHeader } from "./components/profile-header/ProfileHeader";
import { ProfileSummaryAside } from "./components/profile-summary-aside/ProfileSummaryAside";

export const ProfilePage = () => {
  const t = useTranslations("profilePage");
  const { user, status } = useAuthStore((state) => ({
    user: state.user,
    status: state.status,
  }));

  if (status === "loading" || !user) {
    return (
      <div className="my-container space-y-6 py-6 lg:space-y-8 lg:py-12">
        <ProfileHeader />
        <section className="border border-border bg-card p-5 sm:p-6">
          <p className="text-sm text-muted-foreground">{t("loading")}</p>
        </section>
      </div>
    );
  }

  return (
    <div className="my-container space-y-6 py-6 lg:space-y-8 lg:py-12">
      <ProfileHeader />

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start xl:gap-10">
        <div className="w-full">
          <ProfileDetailsCard user={user} />
        </div>
        <div className="w-full lg:max-w-sm">
          <ProfileSummaryAside user={user} />
        </div>
      </div>
    </div>
  );
};
