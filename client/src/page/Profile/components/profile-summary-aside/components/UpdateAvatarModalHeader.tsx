import { ImagePlus } from "lucide-react";
import { useTranslations } from "next-intl";

export const UpdateAvatarModalHeader = () => {
  const t = useTranslations("profilePage.updateAvatar");
  return (
    <div className="flex flex-col gap-2 items-start">
      <ImagePlus size={40} className="max-md:hidden text-muted-foreground" />
      <div className="space-y-2">
        <p className="text-lg">{t("title")}</p>
        <p className="text-muted-foreground text-sm">{t("description")}</p>
      </div>
    </div>
  );
};
