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
  const t = useTranslations("forms");

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={submit}
      validationSchema={validationSchema}
    >
      {({ isSubmitting }) => (
        <Form>
          <FormStatusMessage formStatus={formStatus} />

          <FormikField type="text" label={t("subject")} name={"subject"} />

          <FormikField
            type="text"
            label={t("description")}
            name={"description"}
          />

          <Button disabled={isSubmitting} variant="primary" type="submit">
            {t("create_ticket")}
          </Button>
        </Form>
      )}
    </Formik>
  );
};
