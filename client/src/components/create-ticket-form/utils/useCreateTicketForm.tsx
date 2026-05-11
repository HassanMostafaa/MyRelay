import { createTicketService } from "@/src/services/tickets/create/createTicket.service";
import { ApiStatus } from "@/src/services/users/utils/types";
import { useAuthStore } from "@/src/store/useAuthStore";
import { FormikHelpers } from "formik";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as Yup from "yup";

const REDIRECT_DELAY_MS = 5000;
const REDIRECT_PROGRESS_INTERVAL_MS = 100;

interface ICreateTicketFormValues {
  description: string;
  subject: string;
}

const getInitialRedirectState = () => ({
  isActive: false,
  progress: 0,
  secondsRemaining: Math.ceil(REDIRECT_DELAY_MS / 1000),
});

export const useCreateTicketForm = () => {
  const router = useRouter();
  const validationT = useTranslations("validation");
  const formsT = useTranslations("forms");
  const pageT = useTranslations("newTicketPage");

  const [formStatus, setFormStatus] = useState<{
    message: string;
    status: ApiStatus;
  } | null>(null);
  const [redirectState, setRedirectState] = useState(getInitialRedirectState);
  const redirectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const redirectIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null,
  );

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

  const clearRedirectTimers = useCallback(() => {
    if (redirectTimeoutRef.current !== null) {
      clearTimeout(redirectTimeoutRef.current);
      redirectTimeoutRef.current = null;
    }

    if (redirectIntervalRef.current !== null) {
      clearInterval(redirectIntervalRef.current);
      redirectIntervalRef.current = null;
    }
  }, []);

  const resetRedirectState = useCallback(() => {
    setRedirectState(getInitialRedirectState());
  }, []);

  const startRedirectCountdown = useCallback(() => {
    clearRedirectTimers();

    const startedAt = Date.now();

    setRedirectState({
      isActive: true,
      progress: 0,
      secondsRemaining: Math.ceil(REDIRECT_DELAY_MS / 1000),
    });

    redirectIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startedAt;
      const remainingMs = Math.max(REDIRECT_DELAY_MS - elapsed, 0);

      setRedirectState({
        isActive: true,
        progress: Math.min((elapsed / REDIRECT_DELAY_MS) * 100, 100),
        secondsRemaining: Math.max(1, Math.ceil(remainingMs / 1000)),
      });
    }, REDIRECT_PROGRESS_INTERVAL_MS);

    redirectTimeoutRef.current = setTimeout(() => {
      setRedirectState({
        isActive: true,
        progress: 100,
        secondsRemaining: 0,
      });
      clearRedirectTimers();
      router.push("/my-tickets");
    }, REDIRECT_DELAY_MS);
  }, [clearRedirectTimers, router]);

  useEffect(() => clearRedirectTimers, [clearRedirectTimers]);

  const submit = async (
    value: ICreateTicketFormValues,
    { resetForm }: FormikHelpers<ICreateTicketFormValues>,
  ) => {
    try {
      clearRedirectTimers();
      resetRedirectState();
      setFormStatus(null);

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
        startRedirectCountdown();
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

  return {
    submit,
    initialValues,
    validationSchema,
    formStatus,
    isRedirecting: redirectState.isActive,
    redirectProgress: redirectState.progress,
    redirectSecondsRemaining: redirectState.secondsRemaining,
  };
};
