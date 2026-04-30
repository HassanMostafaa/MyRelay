import { FormikField } from "@/src/components/formil-field/FormikField";
import { UserRound } from "lucide-react";
import { useTranslations } from "next-intl";

export const FirstNameInput = () => {
  const t = useTranslations("forms");

  return (
    <FormikField
      type="text"
      label={t("first_name")}
      startIcon={<UserRound size={16} />}
      name="first_name"
      wrapperClassName="w-full"
      placeholder={t("first_name")}
    />
  );
};
