"use client";

import { useCreateTicketForm } from "./utils/useCreateTicketForm";
import { Form, Formik } from "formik";
import { FormikField } from "../formil-field/FormikField";
import { useTranslations } from "next-intl";
import { Button } from "../button/Button";
import { FormStatusMessage } from "../form-status-message/FormStatusMessage";

export const CreateTicketForm = () => {
  const {
    initialValues,
    submit,
    validationSchema,
    formStatus,
    isRedirecting,
    redirectProgress,
    redirectSecondsRemaining,
  } = useCreateTicketForm();
  const formsT = useTranslations("forms");
  const pageT = useTranslations("newTicketPage");

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={submit}
      validationSchema={validationSchema}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-6 border border-border bg-card p-5 sm:p-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">
              {pageT("form.title")}
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
              {pageT("form.description")}
            </p>
          </div>

          <FormStatusMessage formStatus={formStatus} />

          <section className="space-y-4 border-t border-border pt-5 first:border-t-0 first:pt-0">
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-foreground">
                {formsT("subject")}
              </h3>
              <p className="text-sm leading-6 text-muted-foreground">
                {pageT("form.subjectDescription")}
              </p>
            </div>

            <FormikField
              type="text"
              label={formsT("subject")}
              name={"subject"}
              placeholder={formsT("subject")}
              inputClassName="bg-background/65 text-sm"
              disabled={isSubmitting || isRedirecting}
            />
          </section>

          <section className="space-y-4 border-t border-border pt-5">
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-foreground">
                {formsT("description")}
              </h3>
              <p className="text-sm leading-6 text-muted-foreground">
                {pageT("form.descriptionHelp")}
              </p>
            </div>

            <FormikField
              type="text"
              as="textarea"
              rows={6}
              label={formsT("description")}
              name={"description"}
              placeholder={formsT("description")}
              inputClassName="bg-background/65 text-sm"
              disabled={isSubmitting || isRedirecting}
            />
          </section>

          {isRedirecting ? (
            <div
              className="space-y-3 border border-primary/20 bg-primary/5 p-4"
              aria-live="polite"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm font-semibold text-foreground">
                  {pageT("redirect.title")}
                </p>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                  {pageT("redirect.countdown", {
                    seconds: redirectSecondsRemaining,
                  })}
                </p>
              </div>

              <p className="text-sm leading-6 text-muted-foreground">
                {pageT("redirect.description")}
              </p>

              <div className="h-2 overflow-hidden border border-primary/15 bg-background/80">
                <div
                  className="h-full bg-primary transition-[width] duration-100 ease-linear"
                  style={{ width: `${redirectProgress}%` }}
                />
              </div>
            </div>
          ) : null}

          <div className="flex justify-end border-t border-border pt-5">
            <Button
              disabled={isSubmitting || isRedirecting}
              variant="primary"
              type="submit"
            >
              {isSubmitting
                ? pageT("actions.submitting")
                : isRedirecting
                  ? pageT("actions.redirecting")
                : pageT("actions.submit")}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
