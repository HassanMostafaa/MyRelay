"use client";

import { Link } from "@/i18n/navigations";
import { useGlobalLinks } from "@/src/hooks/useGlobalLinks";
import { useAuthStore } from "@/src/store/useAuthStore";
import { ChevronDown, Menu, X } from "lucide-react";
import React, { FunctionComponent, useState } from "react";
import { Button } from "../../button/Button";
import { LangSwitcher } from "../../lang-switcher/LangSwitcher";
import { ThemeSwitcher } from "../../theme-switcher/ThemeSwitcher";
import { useTranslations } from "next-intl";

export const MobileMenu: FunctionComponent = () => {
  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const loggedOutLinks = useGlobalLinks({ include: ["login", "register"] });
  const loggedInLinks = useGlobalLinks({ include: ["profile", "logout"] });
  const t = useTranslations();

  const { user, state } = useAuthStore((s) => ({
    user: s.user,
    state: s.status,
  }));

  const handleCloseMenu = () => {
    setOpen(false);
    setAccountOpen(false);
  };

  return (
    <div className="md:hidden">
      <Button
        variant="secondary"
        className="aspect-square p-2!"
        onClick={() => setOpen((p) => !p)}
      >
        <Menu size={20} />
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 min-h-screen bg-background px-4 py-3 pt-5">
          <Button
            variant="secondary"
            className="aspect-square ms-auto! p-2!"
            onClick={handleCloseMenu}
          >
            <X size={20} />
          </Button>

          <div className="mt-4 flex flex-col gap-4">
            {!user && state !== "loading" && loggedOutLinks?.length > 0 && (
              <div className="flex flex-col gap-3">
                {loggedOutLinks.map((link, idx) => (
                  <Button
                    key={link.key}
                    variant={idx === 0 ? "primary" : "secondary"}
                    href={link.href}
                    onClick={handleCloseMenu}
                    className="w-full justify-start"
                  >
                    {link.startIcon}
                    {t(link.key)}
                  </Button>
                ))}
              </div>
            )}

            {user && state !== "loading" && loggedInLinks?.length > 0 && (
              <div className="border border-border bg-card p-3">
                <button
                  type="button"
                  aria-expanded={accountOpen}
                  onClick={() => setAccountOpen((previous) => !previous)}
                  className="inline-flex w-full items-center justify-between gap-3 bg-background px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-[0.28em] text-primary"
                >
                  <span className="inline-flex min-w-0 items-center gap-2">
                    <span className="size-2 shrink-0 rounded-full bg-primary" />
                    <span className="truncate">{user.username}</span>
                  </span>
                  <ChevronDown
                    size={14}
                    className={accountOpen ? "rotate-180 transition-transform" : "transition-transform"}
                  />
                </button>

                {accountOpen && (
                  <div className="mt-3 flex flex-col gap-2 border-t border-border pt-3">
                    {loggedInLinks.map((link) =>
                      link.href ? (
                        <Link
                          key={link.key}
                          href={link.href}
                          onClick={handleCloseMenu}
                          className="inline-flex items-center gap-2 bg-background px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-foreground"
                        >
                          {link.startIcon}
                          {t(link.key)}
                        </Link>
                      ) : (
                        <button
                          key={link.key}
                          type="button"
                          onClick={async () => {
                            handleCloseMenu();
                            await link.onClick?.();
                          }}
                          className="inline-flex items-center gap-2 bg-background px-3 py-2 text-start text-xs font-semibold uppercase tracking-[0.22em] text-foreground"
                        >
                          {link.startIcon}
                          {t(link.key)}
                        </button>
                      ),
                    )}
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center justify-between border-t border-border pt-4">
              <ThemeSwitcher />
              <LangSwitcher />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
