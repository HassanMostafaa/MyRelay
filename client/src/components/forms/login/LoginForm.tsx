"use client";

import { Button } from "../../button/Button";
import { FormikField } from "../../formil-field/FormikField";
import { Form, Formik } from "formik";
import React from "react";
import { initialValues, useLoginForm } from "./utils/useLoginForm";
import { cn } from "@/src/lib/utils";

export const LoginForm = () => {
  const { submit, validationSchema, formStatus } = useLoginForm();

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submit}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-4">
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
              label="Username or E-mail address"
              name="identifier"
              placeholder="Email or username"
            />

            <FormikField
              type="password"
              label="Password"
              name="password"
              placeholder="Password"
            />

            <Button type="submit" variant="secondary" disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
