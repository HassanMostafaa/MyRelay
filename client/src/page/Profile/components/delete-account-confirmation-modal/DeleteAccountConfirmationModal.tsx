"use client";

import { Button } from "@/src/components/button/Button";
import { Modal } from "@/src/components/modal/Modal";
import { User } from "@/src/services/users/utils/types";
import { Trash } from "lucide-react";
import { useTranslations } from "next-intl";

type DeleteAccountConfirmationModalProps = {
  open: boolean;
  onClose: () => void;
  user: User;
  onConfirm?: () => void | Promise<void>;
};

export const DeleteAccountConfirmationModal = ({
  open,
  onClose,
  user,
  onConfirm,
}: DeleteAccountConfirmationModalProps) => {
  const t = useTranslations("profilePage");

  const handleConfirm = async () => {
    await onConfirm?.();
    onClose();
  };

  const fullName = [user.first_name, user.last_name || user.last_mame]
    .map((value) => value?.trim() ?? "")
    .filter(Boolean)
    .join(" ");

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeLabel={t("danger.modal.close")}
      header={
        <div className="space-y-2">
          <p className="text-destructive text-xs font-semibold uppercase tracking-[0.24em]">
            {t("sections.danger")}
          </p>
          <div className="space-y-1">
            <h2 className="font-heading text-2xl leading-tight text-foreground">
              {t("danger.modal.title")}
            </h2>
            <p className="text-sm leading-6 text-muted-foreground">
              {t("danger.modal.subtitle")}
            </p>
          </div>
        </div>
      }
      content={
        <div className="space-y-4">
          <p className="text-sm leading-7 text-muted-foreground">
            {t("danger.modal.description")}
          </p>

          <div className="space-y-3 border border-destructive/20 bg-destructive/10 p-4">
            <p className="text-destructive text-[11px] font-semibold uppercase tracking-[0.22em]">
              {t("danger.modal.accountLabel")}
            </p>
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">
                {fullName || user.username}
              </p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
        </div>
      }
      footer={
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button variant="secondary" onClick={onClose}>
            {t("danger.modal.cancel")}
          </Button>
          <Button variant="danger" onClick={handleConfirm}>
            <Trash size={16} />
            {t("danger.modal.confirm")}
          </Button>
        </div>
      }
    />
  );
};
