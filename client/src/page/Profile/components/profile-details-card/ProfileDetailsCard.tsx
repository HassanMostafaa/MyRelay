"use client";

import { User } from "@/src/services/users/utils/types";
import { useLocale, useTranslations } from "next-intl";

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

export const ProfileDetailsCard = ({ user }: { user: User }) => {
  const t = useTranslations("profilePage");
  const locale = useLocale();
  const emptyValue = t("emptyValue");
  const lastName = user.last_name || user.last_mame;

  const sections = [
    {
      title: t("sections.account"),
      fields: [
        {
          label: t("fields.firstName"),
          value: formatValue(user.first_name, emptyValue),
        },
        {
          label: t("fields.lastName"),
          value: formatValue(lastName, emptyValue),
        },
        { label: t("fields.username"), value: user.username },
        { label: t("fields.email"), value: user.email },
        { label: t("fields.role"), value: t(`roles.${user.role}`) },
      ],
    },
    {
      title: t("sections.contact"),
      fields: [
        {
          label: t("fields.phone"),
          value: formatValue(user.phone, emptyValue),
        },
        {
          label: t("fields.address"),
          value: formatValue(user.address, emptyValue),
        },
      ],
    },
    {
      title: t("sections.location"),
      fields: [
        {
          label: t("fields.country"),
          value: formatValue(user.country, emptyValue),
        },
        { label: t("fields.city"), value: formatValue(user.city, emptyValue) },
        {
          label: t("fields.dateOfBirth"),
          value: formatDate(user.date_of_birth, locale, emptyValue),
        },
      ],
    },
  ];

  return (
    <section className="space-y-6 border border-border bg-card p-4 sm:p-6">
      {sections.map((section) => (
        <div key={section.title} className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-base font-semibold text-foreground">
              {section.title}
            </h2>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {section.fields.map((field) => (
              <article
                key={`${section.title}-${field.label}`}
                className="space-y-2 border border-border bg-background/65 p-4"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  {field.label}
                </p>
                <p className="text-sm leading-6 text-foreground">
                  {field.value}
                </p>
              </article>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};
