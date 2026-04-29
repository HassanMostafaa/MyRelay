"use client";
import { Form, Formik } from "formik";
import { FunctionComponent, useEffect, useState } from "react";
import { useRegisterForm } from "./utils/useRegisterForm";
import { Button } from "@/src/components/button/Button";
import { useTranslations } from "next-intl";
import { UsernameInput } from "./components/username-input/UsernameInput";
import { EmailInput } from "./components/email-input/EmailInput";
import { PasswordInput } from "./components/password-input/PasswordInput";
import { ConfirmPasswordInput } from "./components/confirm-password-input/ConfirmPasswordInput";
import {
  useUsernameAvailability,
  UsernameAvailabilityStatus,
} from "./utils/useUsernameAvailability";
import { ApiStatus } from "@/src/services/users/utils/types";
import { cn } from "@/src/lib/utils";

const RegisterFormFields = ({
  onUsernameStatusChange,
  formStatus,
}: {
  formStatus: {
    status: ApiStatus;
    message: string;
  } | null;
  onUsernameStatusChange: (status: UsernameAvailabilityStatus) => void;
}) => {
  const t = useTranslations("forms");
  const { status } = useUsernameAvailability();
  const isSubmitDisabled = status === "checking" || status === "taken";

  useEffect(() => {
    onUsernameStatusChange(status);
  }, [onUsernameStatusChange, status]);

  return (
    <>
      <Form className="grid w-full p-4 border grid-cols-1 gap-4 md:grid-cols-2">
        {/* <FormikWatcher /> DEBUGGING COMPONTNE */}
        {formStatus?.message && (
          <p
            className={cn(
              "text-xs col-span-full p-4 bg-linear-to-r to-transparent font-bold",
              formStatus?.status === "success"
                ? "from-primary/50"
                : "from-red-800/30",
            )}
            aria-live="polite"
          >
            {formStatus?.message}
          </p>
        )}

        <UsernameInput status={status} />

        <EmailInput />

        <PasswordInput />

        <ConfirmPasswordInput />

        <Button
          className="w-full md:col-span-2 md:ms-auto md:w-fit"
          type="submit"
          disabled={isSubmitDisabled}
        >
          {t("submit")}
        </Button>
      </Form>
    </>
  );
};

export const RegisterForm: FunctionComponent = () => {
  const t = useTranslations("validation");
  const { initialValues, validationSchema, handleSubmitRegister, formStatus } =
    useRegisterForm();
  const [usernameStatus, setUsernameStatus] =
    useState<UsernameAvailabilityStatus>("idle");

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, helpers) => {
        if (usernameStatus === "checking") {
          helpers.setSubmitting(false);
          return;
        }

        if (usernameStatus === "taken") {
          helpers.setFieldError("username", t("username_taken"));
          helpers.setSubmitting(false);
          return;
        }

        await handleSubmitRegister(values);
        helpers.setSubmitting(false);
      }}
    >
      <RegisterFormFields
        formStatus={formStatus}
        onUsernameStatusChange={setUsernameStatus}
      />
    </Formik>
  );
};
