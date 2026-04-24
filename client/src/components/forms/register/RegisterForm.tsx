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

const RegisterFormFields = ({
  onUsernameStatusChange,
}: {
  onUsernameStatusChange: (status: UsernameAvailabilityStatus) => void;
}) => {
  const t = useTranslations("forms");
  const { status } = useUsernameAvailability();
  const isSubmitDisabled = status === "checking" || status === "taken";

  useEffect(() => {
    onUsernameStatusChange(status);
  }, [onUsernameStatusChange, status]);

  return (
    <Form className="grid w-full grid-cols-1 gap-4 border border-border p-5 sm:p-6 md:grid-cols-2">
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
  );
};

export const RegisterForm: FunctionComponent = () => {
  const validationT = useTranslations("validation");
  const { initialValues, validationSchema, handleSubmitRegister } =
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
          helpers.setFieldError("username", validationT("username_taken"));
          helpers.setSubmitting(false);
          return;
        }

        await handleSubmitRegister(values);
        helpers.setSubmitting(false);
      }}
    >
      <RegisterFormFields onUsernameStatusChange={setUsernameStatus} />
    </Formik>
  );
};
