"use client";

import { Button } from "@/src/components/button/Button";
import { User } from "@/src/services/users/utils/types";
import { Trash } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { DeleteAccountConfirmationModal } from "../delete-account-confirmation-modal/DeleteAccountConfirmationModal";

const formatValue = (value: string | null | undefined, fallback: string) => {
  if (value === null || value === undefined) {
    return fallback;
  }

  const normalized = value.trim();

  return normalized.length > 0 ? normalized : fallback;
};

const formatDate = (
  value: string | null | undefined,
  locale: string,
  fallback: string,
) => {
  if (!value) {
    return fallback;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return fallback;
  }

  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
  }).format(date);
};

export const ProfileSummaryAside = ({ user }: { user: User }) => {
  const t = useTranslations("profilePage");
  const locale = useLocale();
  const emptyValue = t("emptyValue");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const lastName = user.last_name || user.last_mame;
  const fullName = [user.first_name, lastName]
    .map((value) => value?.trim() ?? "")
    .filter(Boolean)
    .join(" ");

  const verificationItems = [
    {
      label: t("verification.email"),
      value: user.email_verified,
    },
    {
      label: t("verification.phone"),
      value: user.phone_verified,
    },
  ];

  const metaItems = [
    {
      label: t("fields.createdAt"),
      value: formatDate(user.created_at, locale, emptyValue),
    },
    {
      label: t("fields.updatedAt"),
      value: formatDate(user.updated_at, locale, emptyValue),
    },
  ];

  return (
    <div className="space-y-4">
      <aside className="space-y-4 border border-border bg-card p-5 sm:p-6">
        <div className="space-y-2">
          <p className="text-primary text-xs font-semibold uppercase tracking-[0.26em]">
            {t("summaryEyebrow")}
          </p>
          <h2 className="text-2xl font-semibold text-foreground">
            {formatValue(fullName, user.username)}
          </h2>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">
              {formatValue(user.username, emptyValue)}
            </p>
            <p className="text-sm leading-6 text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>

        <div className="space-y-3 border-t border-border pt-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            {t("sections.verification")}
          </p>
          <div className="space-y-2">
            {verificationItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between gap-3 border border-border bg-background/65 px-3 py-3 text-sm"
              >
                <span className="text-foreground">{item.label}</span>
                <span
                  className={
                    item.value
                      ? "font-semibold text-primary"
                      : "font-semibold text-muted-foreground"
                  }
                >
                  {item.value ? t("status.verified") : t("status.notVerified")}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3 border-t border-border pt-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            {t("sections.meta")}
          </p>
          <div className="space-y-2">
            {metaItems.map((item) => (
              <div
                key={item.label}
                className="space-y-1 border border-border bg-background/65 px-3 py-3"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  {item.label}
                </p>
                <p className="text-sm text-foreground">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </aside>

      <section className="space-y-3 border border-border bg-card p-5 sm:p-6">
        <p className="text-destructive text-xs font-semibold uppercase tracking-[0.22em]">
          {t("sections.danger")}
        </p>
        <p className="text-sm leading-6 text-muted-foreground">
          {t("danger.description")}
        </p>
        <Button
          variant="danger"
          className="w-full"
          onClick={() => setDeleteModalOpen(true)}
        >
          <Trash size={16} />
          {t("danger.deleteAccount")}
        </Button>
      </section>

      <DeleteAccountConfirmationModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        user={user}
      />
    </div>
  );
};
