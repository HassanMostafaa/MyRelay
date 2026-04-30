import { Link } from "@/i18n/navigations";
import { House, SearchX } from "lucide-react";
import { useTranslations } from "next-intl";

const tipKeys = ["route", "home", "retry"] as const;

export const NotFoundHero = () => {
  const t = useTranslations("notFoundPage");

  return (
    <section className="relative isolate overflow-hidden border border-border bg-card/45 p-5 sm:p-6 lg:p-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.14),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(239,68,68,0.12),transparent_28%)]" />
      <div className="pointer-events-none absolute -inset-e-4 top-5 select-none font-heading text-[6rem] leading-none text-red-500/8 sm:text-[9rem] lg:text-[14rem]">
        404
      </div>

      <div className="relative my-container grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(19rem,0.9fr)] lg:items-center">
        <div className="space-y-5">
          <div className=" inline-flex font-stretch-100% font-mono items-center justify-center border border-red-500/20 bg-red-500/10 text-red-400 p-4">
            <SearchX size={30} strokeWidth={1.8} className="me-2" />{" "}
            <p>404 {t("eyebrow")}</p>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              {t("eyebrow")}
            </p>
            <h1 className="max-w-3xl font-heading text-red-500 text-4xl leading-tight sm:text-5xl">
              {t("title")}
            </h1>
            <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              {t("description")}
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 border border-primary bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:scale-[1.03] hover:opacity-90 active:scale-95"
          >
            <House size={16} />
            {t("primaryCta")}
          </Link>
        </div>

        <aside className="space-y-4 border border-border  p-5  sm:p-6">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-primary">
              {t("panelEyebrow")}
            </p>
            <h2 className="text-2xl font-semibold text-foreground">
              {t("panelTitle")}
            </h2>
          </div>

          <div className="space-y-3">
            {tipKeys.map((key) => (
              <article
                key={key}
                className="space-y-1 border border-border backdrop-blur bg-card px-4 py-4"
              >
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
                  {t(`tips.${key}.title`)}
                </h3>
                <p className="text-sm leading-6 text-muted-foreground">
                  {t(`tips.${key}.body`)}
                </p>
              </article>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
};
