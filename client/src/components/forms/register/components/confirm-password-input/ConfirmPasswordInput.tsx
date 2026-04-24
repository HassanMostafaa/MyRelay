import { FormikField } from "@/src/components/formil-field/FormikField";
import { ShieldPlus, Eye, EyeClosed } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export const ConfirmPasswordInput = () => {
  const t = useTranslations("forms");

  const [hidden, setHidden] = useState<boolean>(true);

  return (
    <FormikField
      type={hidden ? "password" : "text"}
      label={t("confirm_password")}
      name="passwordConfirm"
      wrapperClassName="w-full"
      placeholder={t("confirm_password")}
      startIcon={<ShieldPlus size={16} />}
      endIcon={
        <span onClick={() => setHidden((prev) => !prev)}>
          {hidden ? <Eye size={14} /> : <EyeClosed size={14} />}
        </span>
      }
    />
  );
};
