import { LogIn, UserRoundPlus } from "lucide-react";
import { useMemo } from "react";
import type { ReactNode } from "react";

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
  login: {
    key: "login",
    label: "Login",
    href: "/login",
    startIcon: <LogIn size={16} />,
  },
  register: {
    key: "register",
    label: "Register",
    href: "/register",
    startIcon: <UserRoundPlus size={16} />,
  },
};

export type GlobalLinkKey =
  | "about"
  | "privacy"
  | "terms"
  | "contact"
  | "register"
  | "login";

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

type GlobalLink = {
  key: GlobalLinkKey;
  label: string;
  href: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
};

export const useGlobalLinks = (options?: UseGlobalLinksOptions) => {
  const { include, exclude } = options ?? {};

  return useMemo(() => {
    const allLinks = Object.values(GLOBAL_LINKS);

    if (include && include.length > 0) {
      return include.map((key) => GLOBAL_LINKS[key]).filter(Boolean);
    }

    if (exclude && exclude.length > 0) {
      return allLinks.filter((link) => !exclude.includes(link.key));
    }

    return allLinks;
  }, [include, exclude]);
};
