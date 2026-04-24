import { FunctionComponent } from "react";
import { LangSwitcher } from "../lang-switcher/LangSwitcher";
import { Logo } from "../logo/Logo";
import { ThemeSwitcher } from "../theme-switcher/ThemeSwitcher";
import { Button } from "../button/Button";
import { useTranslations } from "next-intl";

export const Header: FunctionComponent = () => {
  const t = useTranslations();
  return (
    <nav className="rounded items-center justar flex gap-2 py-2 justify-between">
      <Logo />
      <div className="flex items-center gap-2">
        <LangSwitcher />
        <ThemeSwitcher />
        <Button variant="primary">{t("login")}</Button>
      </div>
    </nav>
  );
};
