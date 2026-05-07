"use client";

import type { User } from "@/src/services/users/utils/types";
import { useTranslations } from "next-intl";

export const ProfileEditDetailsSummary = ({ user }: { user: User }) => {
  const t = useTranslations("profilePage.editDetails");
  const profileT = useTranslations("profilePage");

  const readonlyFields = [
    {
      label: profileT("fields.username"),
      value: user.username,
    },
    {
      label: profileT("fields.email"),
      value: user.email,
    },
    {
      label: profileT("fields.role"),
      value: profileT(`roles.${user.role}`),
    },
  ];

  const notes = [
    t("notes.items.changedOnly"),
    t("notes.items.cancel"),
    t("notes.items.live"),
  ];

  return (
    <div className="space-y-4">
      <aside className="space-y-4 border border-border bg-card p-5 sm:p-6">
        <div className="space-y-2">
          <p className="text-primary text-xs font-semibold uppercase tracking-[0.22em]">
            {t("readonlyCard.title")}
          </p>
          <p className="text-sm leading-6 text-muted-foreground">
            {t("readonlyCard.description")}
          </p>
        </div>

        <div className="space-y-3 border-t border-border pt-4">
          {readonlyFields.map((field) => (
            <div
              key={field.label}
              className="space-y-1 border border-border bg-background/65 px-3 py-3"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                {field.label}
              </p>
              <p className="text-sm text-foreground">{field.value}</p>
            </div>
          ))}
        </div>
      </aside>

      <section className="space-y-3 border border-border bg-card p-5 sm:p-6">
        <p className="text-primary text-xs font-semibold uppercase tracking-[0.22em]">
          {t("notes.title")}
        </p>
        <p className="text-sm leading-6 text-muted-foreground">
          {t("notes.description")}
        </p>

        <div className="space-y-2 border-t border-border pt-4">
          {notes.map((note) => (
            <p
              key={note}
              className="border border-border bg-background/65 px-3 py-3 text-sm leading-6 text-foreground"
            >
              {note}
            </p>
          ))}
        </div>
      </section>
    </div>
  );
};
