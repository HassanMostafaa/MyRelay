import { Button } from "@/src/components/button/Button";
import { Modal } from "@/src/components/modal/Modal";
import { ImagePlus, Upload } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef } from "react";

interface IUpdateAvatarModalProps {
  open: boolean;
  onClose: () => void;
}

export const UpdateAvatarModal = ({
  open,
  onClose,
}: IUpdateAvatarModalProps) => {
  const t = useTranslations("profilePage.updateAvatar");
  const editAvatarRef = useRef<HTMLInputElement>(null);

  return (
    <Modal
      open={open}
      onClose={onClose}
      header={
        <div className="flex gap-4  items-start">
          <ImagePlus
            size={40}
            className="max-md:hidden text-muted-foreground"
          />
          <div className="space-y-2">
            <p className="text-lg">{t("title")}</p>
            <p className="text-muted-foreground text-sm">{t("description")}</p>
          </div>
        </div>
      }
      content={
        <div className="space-y-4">
          <Button onClick={() => editAvatarRef?.current?.click()}>
            <Upload size={16} /> {t("select")}
          </Button>
          {/* HIDDEN INPUT */}
          <input
            type="file"
            accept=".jpg, .jpeg, .png"
            className="w-full cursor-pointer file:hidden "
            placeholder={t("select")}
            ref={editAvatarRef}
          />
        </div>
      }
      footer={
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button variant="secondary" onClick={onClose}>
            {t("cancel")}
          </Button>
          <Button variant="primary" onClick={() => {}}>
            {t("upload")}
          </Button>
        </div>
      }
    />
  );
};
