import { handleLoginService } from "@/src/services/users/login/login.service";
import { ApiStatus } from "@/src/services/users/utils/types";
import { useAuthStore } from "@/src/store/useAuthStore";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import * as Yup from "yup";

export const initialValues = {
  identifier: "",
  password: "",
};

export const useLoginForm = () => {
  const t = useTranslations();
  const setUser = useAuthStore((s) => s.setUser);
  const router = useRouter();

  const [formStatus, setFormStatus] = useState<{
    status: ApiStatus;
    message: string;
  } | null>(null);

  const validationSchema = useMemo(
    () =>
      Yup.object({
        identifier: Yup.string()
          .trim()
          .min(3, t("validation.username_min"))
          .required(t("validation.username_required")),

        password: Yup.string()
          .min(6, t("validation.password_min"))
          .required(t("validation.password_required")),
      }),
    [t],
  );

  const submit = useCallback(
    async (values: typeof initialValues) => {
      setFormStatus(null);

      try {
        const login = await handleLoginService(values);

        if (login?.status === "success" && login?.user) {
          setUser(login.user);
          router.replace("/");
          return;
        }

        setFormStatus({
          status: "error",
          message: login?.message ?? "Login failed",
        });
      } catch (error) {
        console.error(error);

        setFormStatus({
          status: "error",
          message: "Something went wrong. Please try again.",
        });
      }
    },
    [setUser, router],
  );

  return { submit, validationSchema, formStatus };
};
