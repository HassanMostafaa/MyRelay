"use client";
import { useGlobalLinks } from "@/src/hooks/useGlobalLinks";
import { Button } from "@/src/components/button/Button";
import { useTranslations } from "next-intl";
import { useAuthStore } from "@/src/store/useAuthStore";

export const DesktopMenu = () => {
  const t = useTranslations();

  const loggedOutLinks = useGlobalLinks({
    include: ["login", "register"],
  });

  const loggedInLinks = useGlobalLinks({
    include: ["logout"],
  });

  const { user, state } = useAuthStore((s) => ({
    user: s.user,
    state: s.status,
  }));

  return (
    <div className="ms-auto max-md:hidden">
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

      {user && state !== "loading" && loggedInLinks?.length > 0 && (
        <div className="flex gap-2 ms-auto">
          {user?.username && (
            <span className="inline-flex items-center gap-2 border border-border bg-background/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
              <span className="size-2 rounded-full bg-primary" />
              {user?.username}
            </span>
          )}
          {loggedInLinks.map((link, idx) => (
            <Button
              key={link.key}
              variant={idx === 0 ? "secondary" : "secondary"}
              href={link.href}
              onClick={link?.onClick}
            >
              {link.startIcon}
              {t(link.key)}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};
