import { FormikField } from "@/src/components/formil-field/FormikField";
import { UserPen } from "lucide-react";
import { useTranslations } from "next-intl";
import { UsernameAvailabilityStatus } from "../../utils/useUsernameAvailability";

export const UsernameInput = ({
  status,
}: {
  status: UsernameAvailabilityStatus;
}) => {
  const t = useTranslations("forms");

  return (
    <div className="w-full space-y-1">
      <FormikField
        type="text"
        startIcon={<UserPen size={16} />}
        label={t("username")}
        name="username"
        placeholder={t("username")}
      />

      {status === "checking" && (
        <p className="text-xs text-muted-foreground" aria-live="polite">
          {t("username_checking")}
        </p>
      )}
      {status === "available" && (
        <p className="text-xs text-green-600" aria-live="polite">
          {t("username_available")}
        </p>
      )}
      {status === "error" && (
        <p className="text-xs text-amber-600" aria-live="polite">
          {t("username_check_failed")}
        </p>
      )}
    </div>
  );
};
