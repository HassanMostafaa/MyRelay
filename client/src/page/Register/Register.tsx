import { RegisterForm } from "@/src/components/forms/register/RegisterForm";
import { useTranslations } from "next-intl";
import React from "react";

export const RegisterPage = () => {
  const t = useTranslations();
  return (
    <div>
      <h1>{t("register")}</h1>

      <RegisterForm />
    </div>
  );
};
