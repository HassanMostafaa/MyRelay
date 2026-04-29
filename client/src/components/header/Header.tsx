import { FunctionComponent } from "react";
import { LangSwitcher } from "../lang-switcher/LangSwitcher";
import { Logo } from "../logo/Logo";
import { ThemeSwitcher } from "../theme-switcher/ThemeSwitcher";
import { MobileMenu } from "./mobile-menu/MobileMenu";
import { DesktopMenu } from "./desktop-menu/DesktopMenu";
// import { useAuthStore } from "@/src/store/useAuthStore";

export const Header: FunctionComponent = () => {
  return (
    <nav className="flex my-container items-center justify-between py-4">
      <Logo />

      {/* Desktop */}
      <div className="hidden flex-1 md:flex items-center gap-2">
        <ThemeSwitcher />

        {/* DESKTOP */}
        <DesktopMenu />

        <LangSwitcher />
      </div>

      {/* MOBILE */}
      <MobileMenu />
    </nav>
  );
};
