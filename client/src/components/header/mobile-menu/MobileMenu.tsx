"use client";

import React, { FunctionComponent, useState } from "react";
import { Button } from "../../button/Button";
import { ThemeSwitcher } from "../../theme-switcher/ThemeSwitcher";
import { LangSwitcher } from "../../lang-switcher/LangSwitcher";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { useGlobalLinks } from "@/src/hooks/useGlobalLinks";

export const MobileMenu: FunctionComponent = () => {
  const [open, setOpen] = useState(false);
  const links = useGlobalLinks({ include: ["login", "register"] });
  const t = useTranslations();

  return (
    <>
      {/* Trigger */}
      <Button
        variant="secondary"
        className="aspect-square p-2!"
        onClick={() => setOpen((p) => !p)}
      >
        <Menu size={20} />
      </Button>

      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 px-4 min-h-screen z-50 space-y-4 py-3 bg-background ">
          {/* Top bar */}
          <Button
            variant="secondary"
            className="aspect-square ms-auto! p-2!"
            onClick={() => setOpen((p) => !p)}
          >
            <X size={20} />
          </Button>

          {/* Content */}
          <div className="flex flex-col gap-4 ">
            {links.map((link, idx) => (
              <Button
                key={link.key}
                variant={idx === 0 ? "primary" : "secondary"}
                href={link.href}
                onClick={() => setOpen(false)}
                className="w-full justify-start"
              >
                {link.startIcon}
                {t(link.key)}
              </Button>
            ))}

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <ThemeSwitcher />
              <LangSwitcher />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
