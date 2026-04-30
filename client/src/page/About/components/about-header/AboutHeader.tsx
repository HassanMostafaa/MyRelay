import { useTranslations } from "next-intl";

const highlightKeys = ["intake", "handoffs", "ownership"] as const;

export const AboutHeader = () => {
  const t = useTranslations("aboutPage");

  return (
    <header className="relative isolate overflow-hidden border border-border bg-card/40 p-5 sm:p-6 lg:p-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.12),transparent_30%)]" />

      <div className="relative my-container  grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)] lg:items-start">
        <div className="space-y-4">
          <p className="text-primary text-xs font-semibold uppercase tracking-[0.3em]">
            {t("eyebrow")}
          </p>

          <div className="space-y-3">
            <h1 className="max-w-4xl font-heading text-3xl leading-tight text-foreground sm:text-4xl lg:text-5xl">
              {t("title")}
            </h1>
            <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base lg:text-lg">
              {t("description")}
            </p>
          </div>
        </div>

        <aside className="space-y-4 border border-border bg-background/85 p-5 backdrop-blur">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-primary">
              {t("highlightLabel")}
            </p>
            <h2 className="text-2xl font-semibold text-foreground">
              {t("highlightTitle")}
            </h2>
            <p className="text-sm leading-6 text-muted-foreground">
              {t("highlightBody")}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {highlightKeys.map((key, index) => (
              <article
                key={key}
                className="space-y-3 border border-border bg-card px-4 py-4"
              >
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">
                  <span className="size-2 rounded-full bg-primary" />
                  {`0${index + 1}`}
                </span>
                <p className="text-sm leading-6 text-foreground">
                  {t(`highlightItems.${key}`)}
                </p>
              </article>
            ))}
          </div>
        </aside>
      </div>
    </header>
  );
};
