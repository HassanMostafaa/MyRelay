import { LoginForm } from "@/src/components/forms/login/LoginForm";
import { useTranslations } from "next-intl";

export const LoginPage = () => {
  const t = useTranslations();
  return (
    <div>
      <h1>{t("login")}</h1>

      <LoginForm />
    </div>
  );
};
