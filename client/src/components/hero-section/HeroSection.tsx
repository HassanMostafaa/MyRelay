import { Link } from "@/i18n/navigations";
import { ArrowRight, MessageSquare, ShieldCheck, Ticket } from "lucide-react";
import { getTranslations } from "next-intl/server";

const lifecycleKeys = ["open", "assigned", "resolved", "closed"] as const;
const roleKeys = ["user", "agent", "admin"] as const;

export const HeroSection = async () => {
  const t = await getTranslations("heroSection");

  return (
    <section className="relative isolate overflow-hidden py-6 lg:py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.14),transparent_30%)]" />
      <div className="my-container">
        <div className="relative space-y-4 bg-card/40 ">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] lg:items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 border border-border bg-background/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
                <span className="size-2 rounded-full bg-primary" />
                {t("eyebrow")}
              </div>

              <div className="space-y-4">
                <h1 className="max-w-4xl font-heading text-4xl leading-none text-foreground sm:text-5xl lg:text-6xl">
                  {t("title")}
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base lg:text-lg">
                  {t("subtitle")}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 border border-primary bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-all hover:scale-[1.03] hover:opacity-90 active:scale-95"
                >
                  {t("primaryCta")}
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 border border-border bg-background/70 px-5 py-2 text-sm font-semibold text-foreground transition-all hover:scale-[1.03] hover:bg-muted active:scale-95"
                >
                  {t("secondaryCta")}
                </Link>
              </div>
            </div>

            <aside className="space-y-5 border border-border bg-background/85 p-5 shadow-sm backdrop-blur sm:p-6">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-primary">
                  {t("workflowEyebrow")}
                </p>
                <h2 className="text-2xl font-semibold text-foreground">
                  {t("workflowTitle")}
                </h2>
                <p className="text-sm leading-6 text-muted-foreground">
                  {t("workflowSubtitle")}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {lifecycleKeys.map((key) => (
                  <div
                    key={key}
                    className="border border-border bg-card px-3 py-3 text-center text-xs font-semibold uppercase tracking-[0.18em] text-foreground"
                  >
                    {t(`status.${key}`)}
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-border pt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  {t("rolesLabel")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {roleKeys.map((key) => (
                    <span
                      key={key}
                      className="border border-border bg-card px-3 py-2 text-xs font-medium uppercase tracking-[0.18em] text-foreground"
                    >
                      {t(`roles.${key}`)}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <article className="space-y-3 border border-border bg-background/75 p-4">
              <Ticket size={18} className="text-primary" />
              <div className="space-y-1">
                <h2 className="text-sm font-semibold text-foreground">
                  {t("featureTicketsTitle")}
                </h2>
                <p className="text-xs leading-6 text-muted-foreground">
                  {t("featureTicketsBody")}
                </p>
              </div>
            </article>

            <article className="space-y-3 border border-border bg-background/75 p-4">
              <MessageSquare size={18} className="text-primary" />
              <div className="space-y-1">
                <h2 className="text-sm font-semibold text-foreground">
                  {t("featureChatTitle")}
                </h2>
                <p className="text-xs leading-6 text-muted-foreground">
                  {t("featureChatBody")}
                </p>
              </div>
            </article>

            <article className="space-y-3 border border-border bg-background/75 p-4">
              <ShieldCheck size={18} className="text-primary" />
              <div className="space-y-1">
                <h2 className="text-sm font-semibold text-foreground">
                  {t("featureRolesTitle")}
                </h2>
                <p className="text-xs leading-6 text-muted-foreground">
                  {t("featureRolesBody")}
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};
