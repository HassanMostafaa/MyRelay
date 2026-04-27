import { FunctionComponent } from "react";
import { LangSwitcher } from "../lang-switcher/LangSwitcher";
import { Logo } from "../logo/Logo";
import { ThemeSwitcher } from "../theme-switcher/ThemeSwitcher";
import { Button } from "../button/Button";
import { useTranslations } from "next-intl";
import { useGlobalLinks } from "@/src/hooks/useGlobalLinks";
import { MobileMenu } from "./mobile-menu/MobileMenu";

export const Header: FunctionComponent = () => {
  const t = useTranslations();

  const links = useGlobalLinks({
    include: ["login", "register"],
  });

  return (
    <nav className="flex my-container items-center justify-between py-2">
      <Logo />

      {/* Desktop */}
      <div className="hidden md:flex items-center gap-2">
        <ThemeSwitcher />

        {links.map((link, idx) => (
          <Button
            key={link.key}
            variant={idx === 0 ? "primary" : "secondary"}
            href={link.href}
          >
            {link.startIcon}
            {t(link.key)}
          </Button>
        ))}

        <LangSwitcher />
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <MobileMenu />
      </div>
    </nav>
  );
};
