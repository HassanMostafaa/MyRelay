"use client";
import { Form, Formik } from "formik";
import { FunctionComponent } from "react";
import { useRegisterForm } from "./utils/useRegisterForm";
import { Button } from "@/src/components/button/Button";
import { useTranslations } from "next-intl";
import { UsernameInput } from "./components/username-input/UsernameInput";
import { EmailInput } from "./components/email-input/EmailInput";
import { PasswordInput } from "./components/password-input/PasswordInput";
import { ConfirmPasswordInput } from "./components/confirm-password-input/ConfirmPasswordInput";

export const RegisterForm: FunctionComponent = () => {
  const t = useTranslations("forms");
  const { initialValues, validationSchema, handleSubmitRegister } =
    useRegisterForm();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmitRegister}
    >
      <Form className="grid w-full grid-cols-1 gap-4 border border-border p-5 sm:p-6 md:grid-cols-2">
        <UsernameInput />

        <EmailInput />

        <PasswordInput />

        <ConfirmPasswordInput />

        <Button
          className="w-full md:col-span-2 md:ms-auto md:w-fit"
          type="submit"
        >
          {t("submit")}
        </Button>
      </Form>
    </Formik>
  );
};
