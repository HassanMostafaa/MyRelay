"use client";

import { cn } from "@/src/lib/utils";
import { ApiStatus } from "@/src/services/users/utils/types";
import { useTranslations } from "next-intl";

export type FormStatus = {
  status: ApiStatus;
  message?: string;
  missing?: string[];
} | null;

type Props = {
  formStatus: FormStatus;
  className?: string;
};

export const FormStatusMessage = ({ formStatus, className }: Props) => {
  const t = useTranslations();

  if (!formStatus?.message && !formStatus?.missing?.length) return null;

  const isSuccess = formStatus.status === "success";
  const getMissingFieldLabel = (field: string) => {
    try {
      return t(`forms.${field}`);
    } catch {
      return field.replaceAll("_", " ");
    }
  };

  return (
    <div
      className={cn(
        "col-span-full space-y-3 bg-linear-to-r p-4 text-xs to-transparent",
        isSuccess ? "from-primary/50" : "from-red-800/30",
        className,
      )}
      aria-live="polite"
    >
      {formStatus.message ? (
        <p className="font-bold">⦾ {formStatus.message}</p>
      ) : null}

      {formStatus.missing?.length ? (
        <>
          <hr />
          <div className="space-y-2">
            <p className="font-bold">{t("validation.missing_values")}</p>
            <ul className="list-disc space-y-1 ps-4">
              {formStatus.missing.map((field) => (
                <li key={field}>{getMissingFieldLabel(field)}</li>
              ))}
            </ul>
          </div>
        </>
      ) : null}
    </div>
  );
};
