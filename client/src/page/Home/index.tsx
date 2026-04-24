import { getTranslations } from "next-intl/server";

export const HomePage = async () => {
  const t = await getTranslations();
  return (
    <div>
      <p>{t("home")}</p>
    </div>
  );
};
