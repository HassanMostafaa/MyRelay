import { FormikField } from "@/src/components/formil-field/FormikField";
import { MailPlus } from "lucide-react";
import { useTranslations } from "next-intl";

export const EmailInput = () => {
  const t = useTranslations("forms");
  return (
    <FormikField
      type="email"
      label={t("email")}
      startIcon={<MailPlus size={16} />}
      name="email"
      wrapperClassName="w-full"
      placeholder={t("email")}
    />
  );
};
