"use client";

import { Button } from "../../button/Button";
import { FormikField } from "../../formil-field/FormikField";
import { Form, Formik } from "formik";
import React from "react";
import { initialValues, useLoginForm } from "./utils/useLoginForm";
import { cn } from "@/src/lib/utils";
import { useTranslations } from "next-intl";

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
