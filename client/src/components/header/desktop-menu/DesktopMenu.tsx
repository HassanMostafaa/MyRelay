"use client";
import { useGlobalLinks } from "@/src/hooks/useGlobalLinks";
import { Button } from "@/src/components/button/Button";
import { useAuthStore } from "@/src/store/useAuthStore";
import { UserMenu } from "../user-menu/UserMenu";
import { Link } from "@/i18n/navigations";

export const DesktopMenu = () => {
  const publicLinks = useGlobalLinks({
    include: ["about"],
  });

  const loggedOutLinks = useGlobalLinks({
    include: ["login", "register"],
  });

  const loggedInLinks = useGlobalLinks({
    include: ["profile", "create_ticket", "logout"],
  });

  const { user, state } = useAuthStore((s) => ({
    user: s.user,
    state: s.status,
  }));

  return (
    <div className="ms-auto flex gap-2 max-md:hidden">
      {publicLinks?.map((link) =>
        link?.href ? (
          <Link
            key={link.key}
            href={link.href}
            className="inline-flex items-center gap-2 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground transition-colors hover:text-foreground"
          >
            {link?.label}
          </Link>
        ) : null,
      )}

      {/* LOGGED OUT */}
      {!user && state !== "loading" && (
        <div className="ms-auto flex items-center gap-2">
          {loggedOutLinks?.map((link, idx) => (
            <Button
              key={link.key}
              variant={idx === 0 ? "primary" : "secondary"}
              href={link.href}
              onClick={link?.onClick}
            >
              {link.startIcon}
              {link.label}
            </Button>
          ))}
        </div>
      )}

      {/* LOGGED IN */}
      {user && state !== "loading" && loggedInLinks?.length > 0 && (
        <UserMenu user={user} links={loggedInLinks} />
      )}
    </div>
  );
};
