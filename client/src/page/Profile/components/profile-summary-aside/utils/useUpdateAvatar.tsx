import { updateUserService } from "@/src/services/users/update-user/updateUser.service";
import { useAuthStore } from "@/src/store/useAuthStore";
import { useTranslations } from "next-intl";
import React from "react";
import * as Yup from "yup";

export const useUpdateAvatar = () => {
  const t = useTranslations("profilePage.updateAvatar");
  const [isLoading, setIsLoading] = React.useState(false);
  const user = useAuthStore((state) => state.user);

  const initialValues: { avatar: File | null } = {
    avatar: null,
  };

  const validationSchema = Yup.object({
    avatar: Yup.mixed().required(t("validation.avatar_required")),
  });

  const updateAvatar = async (values: typeof initialValues) => {
    console.log("Updating avatar...", { values });

    if (!user?.id) return;

    try {
      setIsLoading(true);

      const json = await updateUserService({
        first_name: "UPDATED",
        id: user?.id,
      });

      console.log("Update avatar hook response:", json);
    } catch (error) {
      console.log("Error updating avatar:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { updateAvatar, isLoading, initialValues, validationSchema };
};
