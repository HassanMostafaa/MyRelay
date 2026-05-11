"use client";

import { Button } from "@/src/components/button/Button";
import {
  FormStatusMessage,
  type FormStatus,
} from "@/src/components/form-status-message/FormStatusMessage";
import { Modal } from "@/src/components/modal/Modal";
import { deleteTicketService } from "@/src/services/tickets/delete/deleteTicket.service";
import type { PublicTicket } from "@/src/services/tickets/utils/types";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

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
  onDeleteSuccess: (deletedTicketId: string) => void | Promise<void>;
};

export const MyTicketDetailsModal = ({
  open,
  onClose,
  ticket,
  onDeleteSuccess,
}: MyTicketDetailsModalProps) => {
  const t = useTranslations("myTicketsPage");
  const statusT = useTranslations("heroSection");
  const locale = useLocale();
  const fallbackDate = t("emptyValue");
  const [deleteStatus, setDeleteStatus] = useState<FormStatus>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!ticket) {
    return null;
  }

  const handleClose = () => {
    if (isDeleting) {
      return;
    }

    setDeleteStatus(null);
    setIsDeleting(false);
    onClose();
  };

  const handleDelete = async () => {
    if (isDeleting) {
      return;
    }

    setIsDeleting(true);
    setDeleteStatus(null);

    try {
      const result = await deleteTicketService(ticket.id);

      if (result.status === "success" && result.deleted) {
        await onDeleteSuccess(ticket.id);
        return;
      }

      setDeleteStatus({
        status: "error",
        message: result.message ?? t("modal.deleteError"),
      });
    } catch (error) {
      console.error("Error deleting ticket:", error);

      setDeleteStatus({
        status: "error",
        message: t("modal.deleteError"),
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeLabel={t("modal.close")}
      closeOnOverlayClick={!isDeleting}
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
          <FormStatusMessage formStatus={deleteStatus} />

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
      footer={
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="secondary"
            onClick={handleClose}
            disabled={isDeleting}
          >
            {t("modal.closeAction")}
          </Button>

          <Button
            type="button"
            variant="danger"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? t("modal.deleting") : t("modal.delete")}
          </Button>
        </div>
      }
    />
  );
};
