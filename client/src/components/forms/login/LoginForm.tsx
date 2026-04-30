"use client";

import { Button } from "../../button/Button";
import { FormikField } from "../../formil-field/FormikField";
import { Form, Formik } from "formik";
import { initialValues, useLoginForm } from "./utils/useLoginForm";
import { useTranslations } from "next-intl";
import { FormStatusMessage } from "@/src/components/form-status-message/FormStatusMessage";

export const LoginForm = () => {
  const t = useTranslations("forms");
  const { submit, validationSchema, formStatus } = useLoginForm();

  return (
    <div className="w-full">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submit}
      >
        {({ isSubmitting }) => (
          <Form className="flex w-full flex-col gap-4 border border-border bg-card p-5 sm:p-6">
            <FormStatusMessage formStatus={formStatus} />

            <FormikField
              type="text"
              label={t("identifier")}
              name="identifier"
              placeholder={t("identifier")}
            />

            <FormikField
              type="password"
              label={t("password")}
              name="password"
              placeholder={t("password")}
            />

            <Button type="submit" variant="secondary" disabled={isSubmitting}>
              {t("login_submit")}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
