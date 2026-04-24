import { getTranslations } from "next-intl/server";

export const Home = async ({ locale }: { locale: string }) => {
  const t = await getTranslations();
  return (
    <div>
      <p>Home Page </p>
      <p>
        locale: {locale} | translation: {t("home")}
      </p>
    </div>
  );
};
