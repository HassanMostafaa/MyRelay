"use client";
import { useGlobalLinks } from "@/src/hooks/useGlobalLinks";
import { Button } from "@/src/components/button/Button";
import { useTranslations } from "next-intl";
import { useAuthStore } from "@/src/store/useAuthStore";
import { UserMenu } from "../user-menu/UserMenu";
import { Link } from "@/i18n/navigations";

export const DesktopMenu = () => {
  const t = useTranslations();
  const publicLinks = useGlobalLinks({
    include: ["about"],
  });

  const loggedOutLinks = useGlobalLinks({
    include: ["login", "register"],
  });

  const loggedInLinks = useGlobalLinks({
    include: ["profile", "about", "logout"],
  });

  const { user, state } = useAuthStore((s) => ({
    user: s.user,
    state: s.status,
  }));

  return (
    <div className="ms-auto flex gap-2 max-md:hidden">
      {/* LOGGED OUT */}
      {!user && state !== "loading" && (
        <div className="ms-auto flex items-center gap-2">
          {publicLinks?.map((link) =>
            link?.href ? (
              <Link
                key={link.key}
                href={link.href}
                className="inline-flex items-center gap-2 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground transition-colors hover:text-foreground"
              >
                {t(link.key)}
              </Link>
            ) : null,
          )}
          {loggedOutLinks?.map((link, idx) => (
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
