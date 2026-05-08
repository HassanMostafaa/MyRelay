"use client";

import { Link } from "@/i18n/navigations";
import { Button } from "@/src/components/button/Button";
import { cn } from "@/src/lib/utils";
import type { PublicTicket } from "@/src/services/tickets/utils/types";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { MyTicketsGuideAside } from "./components/my-tickets-guide-aside/MyTicketsGuideAside";
import { MyTicketsHeader } from "./components/my-tickets-header/MyTicketsHeader";
import { MyTicketDetailsModal } from "./components/my-ticket-details-modal/MyTicketDetailsModal";
import { useMyTickets } from "./utils/useMyTickets";

const PAGE_SIZE = 6;

const formatDateTime = (
  value: string | null | undefined,
  locale: string,
  fallback: string,
) => {
  if (!value) {
    return fallback;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return fallback;
  }

  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

const formatValue = (value: string | null | undefined, fallback: string) => {
  if (value === null || value === undefined) {
    return fallback;
  }

  const normalized = value.trim();

  return normalized.length > 0 ? normalized : fallback;
};

const formatReference = (ticketId: string) => `#${ticketId.slice(0, 8).toUpperCase()}`;

const getStatusClasses = (status: PublicTicket["status"]) => {
  switch (status) {
    case "open":
      return "border-primary/30 bg-primary/10 text-primary";
    case "assigned":
      return "border-sky-500/30 bg-sky-500/10 text-sky-600 dark:text-sky-300";
    case "resolved":
      return "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300";
    case "closed":
      return "border-muted bg-muted/40 text-muted-foreground";
    default:
      return "border-border bg-background text-foreground";
  }
};

export const MyTicketsPage = () => {
  const t = useTranslations("myTicketsPage");
  const statusT = useTranslations("heroSection");
  const locale = useLocale();
  const [selectedTicket, setSelectedTicket] = useState<PublicTicket | null>(null);
  const { data, errorMessage, isFetching, isLoading, goToPage, retry } =
    useMyTickets({
      pageSize: PAGE_SIZE,
    });

  const tickets = data?.tickets ?? [];
  const total = data?.total ?? 0;
  const totalPages = data?.pageCount ?? 0;
  const currentPage = data?.pageNumber ?? 1;
  const pageSize = data?.pageSize ?? PAGE_SIZE;
  const fallbackDate = t("emptyValue");
  const numberFormatter = new Intl.NumberFormat(locale);
  const hasTickets = tickets.length > 0;

  const stats = [
    {
      label: t("stats.totalTickets"),
      value: numberFormatter.format(total),
    },
    {
      label: t("stats.perPage"),
      value: numberFormatter.format(pageSize),
    },
    {
      label: t("stats.totalPages"),
      value: numberFormatter.format(totalPages),
    },
  ];

  return (
    <div className="my-container space-y-6 py-6 lg:space-y-8 lg:py-12">
      <MyTicketsHeader stats={stats} />

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start xl:gap-10">
        <div className="w-full">
          <section className="space-y-5 border border-border bg-card p-5 sm:p-6">
            <div className="flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold text-foreground">
                  {t("listTitle")}
                </h2>
                <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                  {t("listDescription")}
                </p>
              </div>

              {hasTickets ? (
                <div className="inline-flex items-center gap-2 border border-border bg-background/65 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  <span className="size-2 rounded-full bg-primary" />
                  {t("pagination.summary", {
                    page: numberFormatter.format(currentPage),
                    totalPages: numberFormatter.format(totalPages),
                  })}
                </div>
              ) : null}
            </div>

            {errorMessage && hasTickets ? (
              <div className="space-y-3 border border-destructive/20 bg-destructive/5 p-4">
                <p className="text-sm leading-6 text-foreground">
                  {t("partialError")}
                </p>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => retry()}
                  disabled={isFetching}
                >
                  {t("retry")}
                </Button>
              </div>
            ) : null}

            {isLoading ? (
              <div className="border border-border bg-background/65 p-4">
                <p className="text-sm text-muted-foreground">{t("loading")}</p>
              </div>
            ) : errorMessage && !hasTickets ? (
              <div className="space-y-4 border border-destructive/20 bg-destructive/5 p-5">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    {t("errorTitle")}
                  </h3>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {t("errorDescription")}
                  </p>
                </div>

                <Button
                  type="button"
                  variant="primary"
                  onClick={() => retry()}
                  disabled={isFetching}
                >
                  {t("retry")}
                </Button>
              </div>
            ) : !hasTickets ? (
              <div className="space-y-4 border border-border bg-background/65 p-5">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    {t("emptyTitle")}
                  </h3>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {t("emptyDescription")}
                  </p>
                </div>

                <Link href="/new-ticket">
                  <Button variant="primary">{t("createCta")}</Button>
                </Link>
              </div>
            ) : (
              <>
                <div className="grid gap-4">
                  {tickets.map((ticket) => (
                    <article
                      key={ticket.id}
                      className="border border-border bg-background/65 transition-colors hover:border-primary/30"
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedTicket(ticket)}
                        className="flex w-full flex-col gap-4 p-4 text-left"
                      >
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div className="space-y-2">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                              {t("referenceLabel")} {formatReference(ticket.id)}
                            </p>
                            <h3 className="text-lg font-semibold text-foreground">
                              {formatValue(ticket.subject, t("untitledTicket"))}
                            </h3>
                          </div>

                          <span
                            className={cn(
                              "inline-flex w-fit items-center gap-2 border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em]",
                              getStatusClasses(ticket.status),
                            )}
                          >
                            <span className="size-2 rounded-full bg-current" />
                            {statusT(`status.${ticket.status}`)}
                          </span>
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm leading-6 text-muted-foreground [display:-webkit-box] overflow-hidden [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
                            {ticket.description}
                          </p>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                            {t("openDetails")}
                          </p>
                        </div>

                        <div className="grid gap-3 border-t border-border pt-4 sm:grid-cols-2">
                          <div className="space-y-1 border border-border bg-card px-3 py-3">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                              {t("createdLabel")}
                            </p>
                            <p className="text-sm text-foreground">
                              {formatDateTime(
                                ticket.created_at,
                                locale,
                                fallbackDate,
                              )}
                            </p>
                          </div>

                          <div className="space-y-1 border border-border bg-card px-3 py-3">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                              {t("updatedLabel")}
                            </p>
                            <p className="text-sm text-foreground">
                              {formatDateTime(
                                ticket.updated_at,
                                locale,
                                fallbackDate,
                              )}
                            </p>
                          </div>
                        </div>
                      </button>
                    </article>
                  ))}
                </div>

                <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm leading-6 text-muted-foreground">
                    {isFetching ? t("updating") : t("pagination.description")}
                  </p>

                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="secondary"
                      disabled={currentPage <= 1 || isFetching}
                      onClick={() => {
                        setSelectedTicket(null);
                        goToPage(currentPage - 1);
                      }}
                    >
                      {t("pagination.previous")}
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      disabled={currentPage >= totalPages || isFetching}
                      onClick={() => {
                        setSelectedTicket(null);
                        goToPage(currentPage + 1);
                      }}
                    >
                      {t("pagination.next")}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </section>
        </div>

        <div className="w-full lg:max-w-sm">
          <MyTicketsGuideAside />
        </div>
      </div>

      <MyTicketDetailsModal
        ticket={selectedTicket}
        open={selectedTicket !== null}
        onClose={() => setSelectedTicket(null)}
      />
    </div>
  );
};
