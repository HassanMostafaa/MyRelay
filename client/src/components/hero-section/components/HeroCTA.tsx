"use client";
import { useAuthStore } from "@/src/store/useAuthStore";
import { ArrowRight, Ticket } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "../../button/Button";

export const HeroCTA = () => {
  const t = useTranslations("");
  const user = useAuthStore((state) => state.user);

  if (user) {
    return (
      <Link href={"/new-ticket"}>
        <Button variant="primary">
          <Ticket />
          {t("forms.create_ticket")}
        </Button>
      </Link>
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Link
        href="/register"
        className="inline-flex items-center justify-center gap-2 border border-primary bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-all hover:scale-[1.03] hover:opacity-90 active:scale-95"
      >
        {t("heroSection.primaryCta")}
        <ArrowRight size={16} />
      </Link>
      <Link
        href="/login"
        className="inline-flex items-center justify-center gap-2 border border-border bg-background/70 px-5 py-2 text-sm font-semibold text-foreground transition-all hover:scale-[1.03] hover:bg-muted active:scale-95"
      >
        {t("heroSection.secondaryCta")}
      </Link>
    </div>
  );
};
