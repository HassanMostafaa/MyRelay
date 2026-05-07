"use client";
import { Button } from "@/src/components/button/Button";
import { useTranslations } from "next-intl";
import React from "react";
// import { useUpdateAvatar } from "../utils/useUpdateAvatar";

export const UpdateAvatarModalFooter = ({
  onClose,
}: {
  onClose: () => void;
}) => {
  const t = useTranslations("profilePage.updateAvatar");

  return (
    <>
      <hr />
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button variant="secondary" type="button" onClick={onClose}>
          {t("cancel")}
        </Button>
        <Button variant="primary" type="submit">
          {t("upload")}
        </Button>
      </div>
    </>
  );
};
