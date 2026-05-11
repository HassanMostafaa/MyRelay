"use client";

import { Button } from "@/src/components/button/Button";
import {
  FormStatusMessage,
  type FormStatus,
} from "@/src/components/form-status-message/FormStatusMessage";
import { Modal } from "@/src/components/modal/Modal";
import type { PublicTicket } from "@/src/services/tickets/utils/types";
import { Trash } from "lucide-react";
import { useTranslations } from "next-intl";

type DeleteTicketConfirmationModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  ticket: PublicTicket;
  deleteStatus: FormStatus;
  isDeleting: boolean;
};

const formatValue = (value: string | null | undefined, fallback: string) => {
  if (value === null || value === undefined) {
    return fallback;
  }

  const normalized = value.trim();

  return normalized.length > 0 ? normalized : fallback;
};

const formatReference = (ticketId: string) =>
  `#${ticketId.slice(0, 8).toUpperCase()}`;

export const DeleteTicketConfirmationModal = ({
  open,
  onClose,
  onConfirm,
  ticket,
  deleteStatus,
  isDeleting,
}: DeleteTicketConfirmationModalProps) => {
  const t = useTranslations("myTicketsPage");

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeLabel={t("modal.confirmDelete.close")}
      closeOnOverlayClick={!isDeleting}
      header={
        <div className="space-y-2">
          <p className="text-destructive text-xs font-semibold uppercase tracking-[0.24em]">
            {t("modal.delete")}
          </p>
          <div className="space-y-1">
            <h2 className="font-heading text-2xl leading-tight text-foreground">
              {t("modal.confirmDelete.title")}
            </h2>
            <p className="text-sm leading-6 text-muted-foreground">
              {t("modal.confirmDelete.subtitle")}
            </p>
          </div>
        </div>
      }
      content={
        <div className="space-y-4">
          <FormStatusMessage formStatus={deleteStatus} />

          <p className="text-sm leading-7 text-muted-foreground">
            {t("modal.confirmDelete.description")}
          </p>

          <div className="space-y-3 border border-destructive/20 bg-destructive/10 p-4">
            <p className="text-destructive text-[11px] font-semibold uppercase tracking-[0.22em]">
              {t("modal.confirmDelete.ticketLabel")}
            </p>
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">
                {formatValue(ticket.subject, t("untitledTicket"))}
              </p>
              <p className="text-sm text-muted-foreground">
                {t("referenceLabel")} {formatReference(ticket.id)}
              </p>
            </div>
          </div>
        </div>
      }
      footer={
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button variant="secondary" onClick={onClose} disabled={isDeleting}>
            {t("modal.confirmDelete.cancel")}
          </Button>
          <Button variant="danger" onClick={onConfirm} disabled={isDeleting}>
            <Trash size={16} />
            {isDeleting ? t("modal.deleting") : t("modal.confirmDelete.confirm")}
          </Button>
        </div>
      }
    />
  );
};
