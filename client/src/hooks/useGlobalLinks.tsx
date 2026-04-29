import { LogIn, LogOut, UserRound, UserRoundPlus } from "lucide-react";
import { useMemo } from "react";
import type { ReactNode } from "react";
import { useLogout } from "./useLogout";

export type GlobalLinkKey =
  | "about"
  | "privacy"
  | "terms"
  | "contact"
  | "profile"
  | "register"
  | "login"
  | "logout";

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
  const { logout } = useLogout();

  return useMemo(() => {
    const GLOBAL_LINKS: Record<GlobalLinkKey, GlobalLink> = {
      about: {
        key: "about",
        label: "About",
        href: "/about",
      },
      privacy: {
        key: "privacy",
        label: "Privacy",
        href: "/privacy",
      },
      terms: {
        key: "terms",
        label: "Terms",
        href: "/terms",
      },
      contact: {
        key: "contact",
        label: "Contact",
        href: "/contact",
      },
      profile: {
        key: "profile",
        label: "Profile",
        href: "/profile",
        startIcon: <UserRound size={16} />,
      },
      login: {
        key: "login",
        label: "Login",
        href: "/login",
        startIcon: <LogIn size={16} />,
      },
      logout: {
        key: "logout",
        label: "Logout",
        startIcon: <LogOut size={16} />,
        onClick: logout,
      },
      register: {
        key: "register",
        label: "Register",
        href: "/register",
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
  }, [include, exclude, logout]);
};
