import { getTranslations } from "next-intl/server";

export const Home = async () => {
  const t = await getTranslations();
  return (
    <div>
      <p>{t("home")}</p>
    </div>
  );
};
