import * as Yup from "yup";
import { useTranslations } from "next-intl";
import { handleRegisterService } from "@/src/services/users/register/register.service";
import { useState } from "react";
import { useAuthStore } from "@/src/store/useAuthStore";
import { ApiStatus } from "@/src/services/users/utils/types";
import { useRouter } from "next/navigation";

export interface RegisterFormValues {
  email: string;
  password: string;
  passwordConfirm: string;
  username: string;
}

export const initialValues: RegisterFormValues = {
  email: "",
  password: "",
  passwordConfirm: "",
  username: "",
};

export const useRegisterForm = () => {
  const t = useTranslations();
  const router = useRouter();
  const [formStatus, setFormStatus] = useState<{
    status: ApiStatus;
    message: string;
  } | null>(null);

  const { setUser } = useAuthStore((s) => ({
    setUser: s.setUser,
    user: s.user,
  }));

  const handleSubmitRegister = async (values: RegisterFormValues) => {
    setFormStatus(null);
    try {
      const results = await handleRegisterService(values);

      setFormStatus({ message: results.message, status: results.status });

      // AUTO LOGIN LOGIC
      if (
        results?.loginResponse?.status === "success" &&
        results?.loginResponse?.user
      ) {
        setUser(results?.loginResponse?.user);

        // router.replace("/");
      }
    } catch (error) {
      console.error("ERROR SUBMITTING REGISTER FORM", error);
    }
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .trim()
      .min(3, t("validation.username_min"))
      .required(t("validation.username_required")),

    email: Yup.string()
      .trim()
      .email(t("validation.email_invalid"))
      .required(t("validation.email_required")),

    password: Yup.string()
      .min(6, t("validation.password_min"))
      .required(t("validation.password_required")),

    passwordConfirm: Yup.string()
      .oneOf([Yup.ref("password")], t("validation.passwords_must_match"))
      .required(t("validation.password_confirmed_required")),
  });

  return {
    initialValues,
    handleSubmitRegister,
    validationSchema,
    formStatus,
  };
};
