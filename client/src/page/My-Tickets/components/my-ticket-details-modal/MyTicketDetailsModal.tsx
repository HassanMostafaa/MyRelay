"use client";

import { Modal } from "@/src/components/modal/Modal";
import type { PublicTicket } from "@/src/services/tickets/utils/types";
import { useLocale, useTranslations } from "next-intl";

const formatDateTime = (
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
    timeStyle: "short",
  }).format(date);
};

const formatValue = (value: string | null | undefined, fallback: string) => {
  if (value === null || value === undefined) {
    return fallback;
  }

  const normalized = value.trim();

  return normalized.length > 0 ? normalized : fallback;
};

const formatReference = (ticketId: string) => `#${ticketId.slice(0, 8).toUpperCase()}`;

type MyTicketDetailsModalProps = {
  open: boolean;
  onClose: () => void;
  ticket: PublicTicket | null;
};

export const MyTicketDetailsModal = ({
  open,
  onClose,
  ticket,
}: MyTicketDetailsModalProps) => {
  const t = useTranslations("myTicketsPage");
  const statusT = useTranslations("heroSection");
  const locale = useLocale();
  const fallbackDate = t("emptyValue");

  if (!ticket) {
    return null;
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeLabel={t("modal.close")}
      header={
        <div className="space-y-2">
          <p className="text-primary text-xs font-semibold uppercase tracking-[0.24em]">
            {t("modal.eyebrow")}
          </p>
          <div className="space-y-1">
            <h2 className="font-heading text-2xl leading-tight text-foreground">
              {formatValue(ticket.subject, t("untitledTicket"))}
            </h2>
            <p className="text-sm leading-6 text-muted-foreground">
              {t("referenceLabel")} {formatReference(ticket.id)}
            </p>
          </div>
        </div>
      }
      content={
        <div className="space-y-5">
          <div className="flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/10 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
              <span className="size-2 rounded-full bg-current" />
              {statusT(`status.${ticket.status}`)}
            </div>
          </div>

          <section className="space-y-3 border border-border bg-background/65 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              {t("modal.descriptionLabel")}
            </p>
            <p className="whitespace-pre-wrap text-sm leading-7 text-foreground">
              {ticket.description}
            </p>
          </section>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1 border border-border bg-background/65 px-3 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                {t("createdLabel")}
              </p>
              <p className="text-sm text-foreground">
                {formatDateTime(ticket.created_at, locale, fallbackDate)}
              </p>
            </div>

            <div className="space-y-1 border border-border bg-background/65 px-3 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                {t("updatedLabel")}
              </p>
              <p className="text-sm text-foreground">
                {formatDateTime(ticket.updated_at, locale, fallbackDate)}
              </p>
            </div>
          </div>
        </div>
      }
      footer={null}
    />
  );
};
