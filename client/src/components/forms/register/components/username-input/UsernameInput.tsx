import { FormikField } from "@/src/components/formil-field/FormikField";
import { UserPen } from "lucide-react";
import { useTranslations } from "next-intl";

export const UsernameInput = () => {
  const t = useTranslations("forms");
  return (
    <FormikField
      type="text"
      startIcon={<UserPen size={16} />}
      label={t("username")}
      name="username"
      wrapperClassName="w-full"
      placeholder={t("username")}
    />
  );
};
