import { createTicketService } from "@/src/services/tickets/create/createTicket.service";
import { ApiStatus } from "@/src/services/users/utils/types";
import { useAuthStore } from "@/src/store/useAuthStore";
import { FormikHelpers } from "formik";
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
  const validationT = useTranslations("validation");
  const formsT = useTranslations("forms");
  const pageT = useTranslations("newTicketPage");

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
          .min(3, validationT("description_min"))
          .required(validationT("description_required")),
        subject: Yup.string()
          .trim()
          .min(3, validationT("subject_min"))
          .required(validationT("subject_required")),
      }),
    [validationT],
  );

  const submit = async (
    value: ICreateTicketFormValues,
    { resetForm }: FormikHelpers<ICreateTicketFormValues>,
  ) => {
    try {
      if (!userId) {
        setFormStatus({
          status: "error",
          message: validationT("login_required"),
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
          message: formsT("ticket_created_successfully"),
        });
        resetForm();
        return;
      }

      setFormStatus({
        status: "error",
        message: results?.message ?? pageT("feedback.error"),
      });
    } catch {
      setFormStatus({
        status: "error",
        message: pageT("feedback.error"),
      });
    }
  };

  return { submit, initialValues, validationSchema, formStatus };
};
