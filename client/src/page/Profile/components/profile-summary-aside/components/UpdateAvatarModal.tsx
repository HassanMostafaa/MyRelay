import { Modal } from "@/src/components/modal/Modal";
import { useTranslations } from "next-intl";
import { UpdateAvatarModalHeader } from "./UpdateAvatarModalHeader";
import { UpdateAvatarModalFooter } from "./UpdateAvatarModalFooter";
import { Form, Formik } from "formik";
import { useUpdateAvatar } from "../utils/useUpdateAvatar";
import { FormikField } from "@/src/components/formil-field/FormikField";
import { FormikWatcher } from "@/src/components/forms/register/components/formik-watcher/FormikWatcher";

interface IUpdateAvatarModalProps {
  open: boolean;
  onClose: () => void;
}

export const UpdateAvatarModal = ({
  open,
  onClose,
}: IUpdateAvatarModalProps) => {
  const t = useTranslations("profilePage.updateAvatar");
  const { initialValues, updateAvatar, validationSchema } = useUpdateAvatar();

  return (
    <Modal
      open={open}
      onClose={onClose}
      header={<UpdateAvatarModalHeader />}
      content={
        <Formik
          onSubmit={updateAvatar}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          <Form className="space-y-4">
            <FormikWatcher />
            <FormikField
              name="avatar"
              type="file"
              inputClassName="file:hidden! cursor-pointer!"
              key={"avatar"}
              label={t("select")}
            />

            <UpdateAvatarModalFooter onClose={onClose} />
          </Form>
        </Formik>
      }
      footer={null}
    />
  );
};
