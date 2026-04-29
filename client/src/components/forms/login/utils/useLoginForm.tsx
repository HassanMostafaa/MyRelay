import { handleLoginService } from "@/src/services/users/login/login.service";
import { ApiStatus } from "@/src/services/users/utils/types";
import { useAuthStore } from "@/src/store/useAuthStore";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";

export const initialValues = {
  identifier: "",
  password: "",
};

export const useLoginForm = () => {
  const t = useTranslations();
  const { setUser } = useAuthStore((s) => ({
    setUser: s.setUser,
  }));
  const router = useRouter();
  const [formStatus, setFormStatus] = useState<{
    status: ApiStatus;
    message: string;
  } | null>(null);

  const submit = async (values: typeof initialValues) => {
    try {
      const login = await handleLoginService(values);

      if (login?.status === "success" && login?.user) {
        setUser(login.user);
        // router.replace("/");
      }

      if (login?.status === "error") {
        setFormStatus({
          status: "error",
          message: login?.message ?? "LOGIN ERR STATUS ERROR AND NO MESSAGE",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validationSchema = Yup.object({
    identifier: Yup.string()
      .trim()
      .min(3, t("validation.username_min"))
      .required(t("validation.username_required")),

    password: Yup.string()
      .min(6, t("validation.password_min"))
      .required(t("validation.password_required")),
  });
  return { submit, validationSchema, formStatus };
};
