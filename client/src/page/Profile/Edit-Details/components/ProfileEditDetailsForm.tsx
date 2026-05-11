"use client";

import { Button } from "@/src/components/button/Button";
import { FormStatusMessage } from "@/src/components/form-status-message/FormStatusMessage";
import { FormikField } from "@/src/components/formil-field/FormikField";
import type { User } from "@/src/services/users/utils/types";
import { Form, Formik } from "formik";
import { useTranslations } from "next-intl";
import { hasProfileEditDetailsChanges } from "../utils/profileEditDetailsForm";
import { useProfileEditDetailsForm } from "../utils/useProfileEditDetailsForm";
import { useRouter } from "next/navigation";

type FieldConfig = {
  name:
    | "first_name"
    | "last_name"
    | "phone"
    | "address"
    | "country"
    | "city"
    | "date_of_birth";
  label: string;
  type: "text" | "date";
};

export const ProfileEditDetailsForm = ({ user }: { user: User }) => {
  const t = useTranslations("profilePage.editDetails");
  const router = useRouter();
  const profileT = useTranslations("profilePage");
  const {
    clearFormStatus,
    formStatus,
    initialValues,
    submit,
    validationSchema,
  } = useProfileEditDetailsForm(user);

  const sections: Array<{
    title: string;
    description: string;
    fields: FieldConfig[];
  }> = [
    {
      title: profileT("sections.account"),
      description: t("form.sections.account"),
      fields: [
        {
          name: "first_name",
          label: profileT("fields.firstName"),
          type: "text",
        },
        {
          name: "last_name",
          label: profileT("fields.lastName"),
          type: "text",
        },
      ],
    },
    {
      title: profileT("sections.contact"),
      description: t("form.sections.contact"),
      fields: [
        {
          name: "phone",
          label: profileT("fields.phone"),
          type: "text",
        },
        {
          name: "address",
          label: profileT("fields.address"),
          type: "text",
        },
      ],
    },
    {
      title: profileT("sections.location"),
      description: t("form.sections.location"),
      fields: [
        {
          name: "country",
          label: profileT("fields.country"),
          type: "text",
        },
        {
          name: "city",
          label: profileT("fields.city"),
          type: "text",
        },
        {
          name: "date_of_birth",
          label: profileT("fields.dateOfBirth"),
          type: "date",
        },
      ],
    },
  ];

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validateOnMount
      validationSchema={validationSchema}
      onSubmit={submit}
    >
      {({ isSubmitting, isValid, resetForm, values }) => {
        const hasChanges = hasProfileEditDetailsChanges(values, user);

        return (
          <Form className="space-y-6 border border-border bg-card p-5 sm:p-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">
                {t("form.title")}
              </h2>
              <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                {t("form.description")}
              </p>
            </div>

            <FormStatusMessage formStatus={formStatus} />

            {sections.map((section) => (
              <section
                key={section.title}
                className="space-y-4 border-t border-border pt-5 first:border-t-0 first:pt-0"
              >
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-foreground">
                    {section.title}
                  </h3>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {section.description}
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {section.fields.map((field) => (
                    <FormikField
                      key={field.name}
                      name={field.name}
                      type={field.type}
                      label={field.label}
                      placeholder={
                        field.type === "date" ? undefined : field.label
                      }
                      inputClassName="bg-background/65 text-sm"
                    />
                  ))}
                </div>
              </section>
            ))}

            <div className="flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="secondary"
                disabled={isSubmitting || !hasChanges}
                onClick={() => {
                  resetForm();
                  clearFormStatus();
                  setTimeout(() => {
                    router.push("/profile");
                  }, 0);
                }}
              >
                {t("actions.cancel")}
              </Button>

              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting || !isValid || !hasChanges}
              >
                {isSubmitting ? t("actions.submitting") : t("actions.submit")}
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
