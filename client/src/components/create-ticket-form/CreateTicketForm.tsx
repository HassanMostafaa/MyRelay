"use client";

import { useCreateTicketForm } from "./utils/useCreateTicketForm";
import { Form, Formik } from "formik";
import { FormikField } from "../formil-field/FormikField";
import { useTranslations } from "next-intl";
import { Button } from "../button/Button";
import { FormStatusMessage } from "../form-status-message/FormStatusMessage";

export const CreateTicketForm = () => {
  const { initialValues, submit, validationSchema, formStatus } =
    useCreateTicketForm();
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
              label={formsT("description")}
              name={"description"}
              placeholder={formsT("description")}
              inputClassName="bg-background/65 text-sm"
            />
          </section>

          <div className="flex justify-end border-t border-border pt-5">
            <Button disabled={isSubmitting} variant="primary" type="submit">
              {isSubmitting
                ? pageT("actions.submitting")
                : pageT("actions.submit")}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
