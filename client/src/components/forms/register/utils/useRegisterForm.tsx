import * as Yup from "yup";
import { useTranslations } from "next-intl";

export const initialValues = {
  email: "",
  password: "",
  passwordConfirm: false,
  username: "",
};

export const useRegisterForm = () => {
  const t = useTranslations();

  const handleSubmitRegister = (values: typeof initialValues) => {
    console.log({ values });
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
      .min(8, t("validation.password_min"))
      .required(t("validation.password_required")),

    passwordConfirm: Yup.string()
      .oneOf([Yup.ref("password")], t("validation.passwords_must_match"))
      .required(t("validation.password_confirmed_required")),
  });

  return {
    initialValues,
    handleSubmitRegister,
    validationSchema,
  };
};
