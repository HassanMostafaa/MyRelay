"use client";

import { cn } from "@/src/lib/utils";
import { X } from "lucide-react";
import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

type ModalSlot = ReactNode;

type ModalProps = {
  open: boolean;
  onClose: () => void;
  header?: ModalSlot;
  content?: ModalSlot;
  footer?: ModalSlot;
  children?: ReactNode;
  closeLabel?: string;
  closeOnOverlayClick?: boolean;
  overlayClassName?: string;
  panelClassName?: string;
  contentClassName?: string;
};

const renderSlot = (
  slot: ModalSlot,
  kind: "header" | "content" | "footer",
) => {
  if (typeof slot === "string" || typeof slot === "number") {
    if (kind === "header") {
      return (
        <h2 className="font-heading text-2xl leading-tight text-foreground">
          {slot}
        </h2>
      );
    }

    if (kind === "footer") {
      return <p className="text-sm text-muted-foreground">{slot}</p>;
    }

    return <p className="text-sm leading-7 text-muted-foreground">{slot}</p>;
  }

  return slot;
};

export const Modal = ({
  open,
  onClose,
  header,
  content,
  footer,
  children,
  closeLabel = "Close modal",
  closeOnOverlayClick = true,
  overlayClassName,
  panelClassName,
  contentClassName,
}: ModalProps) => {
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  if (typeof document === "undefined" || !open) {
    return null;
  }

  const bodyContent = content ?? children;

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-background/72 px-4 py-4 backdrop-blur-sm sm:px-6",
        overlayClassName,
      )}
      onClick={(event) => {
        if (closeOnOverlayClick && event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "flex max-h-[calc(100dvh-2rem)] w-full max-w-2xl flex-col overflow-hidden border border-border bg-card shadow-xl",
          panelClassName,
        )}
      >
        <header className="flex shrink-0 items-start justify-between gap-4 border-b border-border bg-card px-5 py-4 sm:px-6">
          <div className="min-w-0 flex-1">
            {header ? renderSlot(header, "header") : null}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="flex size-10 shrink-0 items-center justify-center border border-border bg-background text-foreground transition-all hover:scale-102 active:scale-98"
          >
            <X size={16} />
          </button>
        </header>

        <div
          className={cn(
            "min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6",
            contentClassName,
          )}
        >
          {bodyContent ? renderSlot(bodyContent, "content") : null}
        </div>

        {footer ? (
          <footer className="shrink-0 border-t border-border bg-card px-5 py-4 sm:px-6">
            {renderSlot(footer, "footer")}
          </footer>
        ) : null}
      </div>
    </div>,
    document.body,
  );
};
