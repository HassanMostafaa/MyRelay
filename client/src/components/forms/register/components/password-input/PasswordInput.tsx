"use client";
import { FormikField } from "@/src/components/formil-field/FormikField";
import { Eye, EyeClosed, Shield } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export const PasswordInput = () => {
  const t = useTranslations("forms");

  const [hidden, setHidden] = useState<boolean>(true);

  return (
    <FormikField
      type={hidden ? "password" : "text"}
      label={t("password")}
      name="password"
      startIcon={<Shield size={16} />}
      endIcon={
        <span onClick={() => setHidden((prev) => !prev)}>
          {hidden ? <Eye size={14} /> : <EyeClosed size={14} />}
        </span>
      }
      wrapperClassName="w-full"
      placeholder={t("password")}
    />
  );
};
