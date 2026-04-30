import { createTicketService } from "@/src/services/tickets/create/createTicket.service";
import { ApiStatus } from "@/src/services/users/utils/types";
import { useAuthStore } from "@/src/store/useAuthStore";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import * as Yup from "yup";

// {
//   "ticket": {
//     "description": "hassan2 ticket desc",
//     "subject": "ticket subject"
//   },
//   "userId": "0a7ac2fc-0630-4aab-a6a3-bac2a1decdf4"
// }

interface ICreateTicketFormValues {
  description: string;
  subject: string;
}

export const useCreateTicketForm = () => {
  const t = useTranslations("validation");

  const [formStatus, setFormStatus] = useState<{
    message: string;
    status: ApiStatus;
  } | null>(null);

  const user = useAuthStore((s) => s.user);
  const userId = user?.id || null;

  const initialValues: ICreateTicketFormValues = {
    description: "",
    subject: "",
  };

  const validationSchema = useMemo(
    () =>
      Yup.object({
        description: Yup.string()
          .trim()
          .min(3, t("description_min"))
          .required(t("description_required")),
        subject: Yup.string()
          .trim()
          .min(3, t("subject_min"))
          .required(t("subject_required")),
      }),
    [t],
  );

  //   const submit = useCallback(() => {}, []);
  const submit = async (value: ICreateTicketFormValues) => {
    try {
      if (!userId) {
        setFormStatus({
          status: "error",
          message: t("login_required"),
        });
        return;
      }

      const results = await createTicketService({
        userId,
        ticket: value,
      });

      if (results?.status === "success" && results?.ticket) {
        setFormStatus({
          status: "success",
          message: t("ticket_created_successfully"),
        });
      }

      console.log("CREATE TICKET SERVICE RESULTS", { results });
    } catch (error) {
      console.error({ error });
    }
  };

  return { submit, initialValues, validationSchema, formStatus };
};
