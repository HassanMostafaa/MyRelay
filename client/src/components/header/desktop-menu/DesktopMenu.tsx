"use client";
import { useGlobalLinks } from "@/src/hooks/useGlobalLinks";
import { Button } from "@/src/components/button/Button";
import { useTranslations } from "next-intl";
import { useAuthStore } from "@/src/store/useAuthStore";
import { UserMenu } from "../user-menu/UserMenu";

export const DesktopMenu = () => {
  const t = useTranslations();

  const loggedOutLinks = useGlobalLinks({
    include: ["login", "register"],
  });

  const loggedInLinks = useGlobalLinks({
    include: ["profile", "logout"],
  });

  const { user, state } = useAuthStore((s) => ({
    user: s.user,
    state: s.status,
  }));

  return (
    <div className="ms-auto max-md:hidden">
      {/* LOGGED OUT */}
      {!user && state !== "loading" && loggedOutLinks?.length > 0 && (
        <div className="flex gap-2 ms-auto">
          {loggedOutLinks.map((link, idx) => (
            <Button
              key={link.key}
              variant={idx === 0 ? "primary" : "secondary"}
              href={link.href}
              onClick={link?.onClick}
            >
              {link.startIcon}
              {t(link.key)}
            </Button>
          ))}
        </div>
      )}

      {/* LOGGED IN */}
      {user && state !== "loading" && loggedInLinks?.length > 0 && (
        <div className="flex gap-2 ms-auto">
          <UserMenu user={user} links={loggedInLinks} />
        </div>
      )}
    </div>
  );
};
