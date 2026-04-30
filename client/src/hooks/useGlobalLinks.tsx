import { Info, LogIn, LogOut, UserRound, UserRoundPlus } from "lucide-react";
import { useMemo } from "react";
import type { ReactNode } from "react";
import { useLogout } from "./useLogout";
import { useTranslations } from "next-intl";

export type GlobalLinkKey =
  | "about"
  | "profile"
  | "register"
  | "login"
  | "logout"
  | "create_ticket";

type UseGlobalLinksOptions =
  | {
      include: GlobalLinkKey[];
      exclude?: never;
    }
  | {
      exclude: GlobalLinkKey[];
      include?: never;
    }
  | undefined;

export type GlobalLink = {
  key: GlobalLinkKey;
  label: string;
  href?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  onClick?: () => void;
};

export const useGlobalLinks = (options?: UseGlobalLinksOptions) => {
  const { include, exclude } = options ?? {};
  const t = useTranslations();
  const { logout } = useLogout();

  return useMemo(() => {
    const GLOBAL_LINKS: Record<GlobalLinkKey, GlobalLink> = {
      about: {
        key: "about",
        label: t("about"),
        href: "/about",
        startIcon: <Info size={16} />,
      },
      profile: {
        key: "profile",
        label: t("profile"),
        href: "/profile",
        startIcon: <UserRound size={16} />,
      },
      login: {
        key: "login",
        label: t("login"),
        href: "/login",
        startIcon: <LogIn size={16} />,
      },
      logout: {
        key: "logout",
        label: t("logout"),
        startIcon: <LogOut size={16} />,
        onClick: logout,
      },
      register: {
        key: "register",
        label: t("register"),
        href: "/register",
        startIcon: <UserRoundPlus size={16} />,
      },
      create_ticket: {
        key: "create_ticket",
        label: t("forms.create_ticket"),
        href: "/new-ticket",
        startIcon: <UserRoundPlus size={16} />,
      },
    };

    const allLinks = Object.values(GLOBAL_LINKS);

    if (include && include.length > 0) {
      return include.map((key) => GLOBAL_LINKS[key]).filter(Boolean);
    }

    if (exclude && exclude.length > 0) {
      return allLinks.filter((link) => !exclude.includes(link.key));
    }

    return allLinks;
  }, [include, exclude, logout, t]);
};
