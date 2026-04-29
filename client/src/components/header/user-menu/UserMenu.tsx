"use client";

import { Link } from "@/i18n/navigations";
import type { GlobalLink } from "@/src/hooks/useGlobalLinks";
import { cn } from "@/src/lib/utils";
import type { User } from "@/src/services/users/utils/types";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useId, useRef, useState } from "react";

type UserMenuProps = {
  user: User;
  links: GlobalLink[];
  fullWidth?: boolean;
  onItemSelect?: () => void;
};

export const UserMenu = ({
  user,
  links,
  fullWidth = false,
  onItemSelect,
}: UserMenuProps) => {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const handleSelect = async (action?: () => void | Promise<void>) => {
    setOpen(false);
    onItemSelect?.();
    await action?.();
  };

  return (
    <div
      ref={wrapperRef}
      className={cn("relative", fullWidth && "w-full")}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((previous) => !previous)}
        className={cn(
          "inline-flex items-center gap-2 border border-border bg-background/80 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary transition-all hover:scale-102 active:scale-98",
          fullWidth && "w-full justify-between",
        )}
      >
        <span className="inline-flex items-center gap-2">
          <span className="size-2 rounded-full bg-primary" />
          <span className="truncate">{user.username}</span>
        </span>
        <ChevronDown
          size={14}
          className={cn(
            "transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          className={cn(
            "absolute top-full z-50 mt-2 border border-border bg-card p-2 shadow-sm",
            fullWidth
              ? "start-0 w-full"
              : "end-0 min-w-56",
          )}
        >
          <div className="flex flex-col gap-2">
            {links.map((link) =>
              link.href ? (
                <Link
                  key={link.key}
                  href={link.href}
                  role="menuitem"
                  onClick={() => handleSelect()}
                  className="inline-flex items-center gap-2 border border-transparent bg-background/65 px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-foreground transition-all hover:border-border hover:bg-background"
                >
                  {link.startIcon}
                  {t(link.key)}
                </Link>
              ) : (
                <button
                  key={link.key}
                  type="button"
                  role="menuitem"
                  onClick={() => handleSelect(link.onClick)}
                  className="inline-flex items-center gap-2 border border-transparent bg-background/65 px-3 py-2 text-start text-xs font-semibold uppercase tracking-[0.22em] text-foreground transition-all hover:border-border hover:bg-background"
                >
                  {link.startIcon}
                  {t(link.key)}
                </button>
              ),
            )}
          </div>
        </div>
      )}
    </div>
  );
};
