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
import { FirstNameInput } from "./components/first-name-input/FirstNameInput";
import { LastNameInput } from "./components/last-name-input/LastNameInput";
import {
  useUsernameAvailability,
  UsernameAvailabilityStatus,
} from "./utils/useUsernameAvailability";

import {
  FormStatus,
  FormStatusMessage,
} from "@/src/components/form-status-message/FormStatusMessage";

const RegisterFormFields = ({
  onUsernameStatusChange,
  formStatus,
}: {
  formStatus: FormStatus;
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
        <FormStatusMessage formStatus={formStatus} />

        <FirstNameInput />

        <LastNameInput />

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
