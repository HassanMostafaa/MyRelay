"use client";

import {
  FormStatus,
} from "@/src/components/form-status-message/FormStatusMessage";
import { updateUserService } from "@/src/services/users/update-user/updateUser.service";
import type { User } from "@/src/services/users/utils/types";
import { useAuthStore } from "@/src/store/useAuthStore";
import { useTranslations } from "next-intl";
import { useCallback, useMemo, useState } from "react";
import * as Yup from "yup";
import {
  getProfileEditDetailsChangedFields,
  getProfileEditDetailsInitialValues,
} from "./profileEditDetailsForm";

export const useProfileEditDetailsForm = (user: User) => {
  const t = useTranslations();
  const setUser = useAuthStore((state) => state.setUser);
  const [formStatus, setFormStatus] = useState<FormStatus>(null);

  const today = useMemo(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }, []);

  const initialValues = useMemo(
    () => getProfileEditDetailsInitialValues(user),
    [user],
  );

  const validationSchema = useMemo(
    () =>
      Yup.object({
        first_name: Yup.string()
          .trim()
          .required(t("validation.first_name_required")),
        last_name: Yup.string()
          .trim()
          .required(t("validation.last_name_required")),
        phone: Yup.string().trim(),
        country: Yup.string().trim(),
        city: Yup.string().trim(),
        address: Yup.string().trim(),
        date_of_birth: Yup.string()
          .trim()
          .test(
            "date-of-birth-max",
            t("validation.date_of_birth_max"),
            (value) => !value || value <= today,
          ),
      }),
    [t, today],
  );

  const clearFormStatus = useCallback(() => {
    setFormStatus(null);
  }, []);

  const submit = useCallback(
    async (values: typeof initialValues) => {
      setFormStatus(null);

      try {
        const editedValues = getProfileEditDetailsChangedFields(values, user);

        if (Object.keys(editedValues).length === 0) {
          return;
        }

        const result = await updateUserService({
          id: user.id,
          ...editedValues,
        });

        if (result.status === "success" && result.data) {
          setUser(result.data);
          setFormStatus({
            status: "success",
            message:
              result.message ?? t("profilePage.editDetails.feedback.success"),
          });
          return;
        }

        setFormStatus({
          status: "error",
          message: result.message ?? t("profilePage.editDetails.feedback.error"),
        });
      } catch (error) {
        console.error("Error updating profile details:", error);

        setFormStatus({
          status: "error",
          message: t("profilePage.editDetails.feedback.error"),
        });
      }
    },
    [setUser, t, user],
  );

  return {
    clearFormStatus,
    formStatus,
    initialValues,
    submit,
    validationSchema,
  };
};
