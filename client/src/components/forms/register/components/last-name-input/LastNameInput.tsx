import { FormikField } from "@/src/components/formil-field/FormikField";
import { UserRound } from "lucide-react";
import { useTranslations } from "next-intl";

export const LastNameInput = () => {
  const t = useTranslations("forms");

  return (
    <FormikField
      type="text"
      label={t("last_name")}
      startIcon={<UserRound size={16} />}
      name="last_name"
      wrapperClassName="w-full"
      placeholder={t("last_name")}
    />
  );
};
