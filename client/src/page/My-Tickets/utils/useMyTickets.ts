import {
  myTicketsService,
  type MyTicketsData,
} from "@/src/services/users/my-tickets/myTickets.service";
import { useEffect, useState } from "react";

export const useMyTickets = ({ pageSize = 6 }: { pageSize?: number } = {}) => {
  const [data, setData] = useState<MyTicketsData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [lastRequestedPage, setLastRequestedPage] = useState(1);

  const loadTickets = async (pageNumber: number) => {
    const hasExistingData = data !== null;

    setLastRequestedPage(pageNumber);

    if (hasExistingData) {
      setIsFetching(true);
    } else {
      setIsLoading(true);
    }

    setErrorMessage(null);

    const result = await myTicketsService({
      pageNumber,
      pageSize,
    });

    if (result.status === "success" && result.data) {
      setData(result.data);
      setErrorMessage(null);
    } else {
      setErrorMessage(result.message ?? "Exception error");
    }

    setIsLoading(false);
    setIsFetching(false);
  };

  useEffect(() => {
    let cancelled = false;

    const loadInitialTickets = async () => {
      const result = await myTicketsService({
        pageNumber: 1,
        pageSize,
      });

      if (cancelled) {
        return;
      }

      setLastRequestedPage(1);

      if (result.status === "success" && result.data) {
        setData(result.data);
        setErrorMessage(null);
      } else {
        setErrorMessage(result.message ?? "Exception error");
      }

      setIsLoading(false);
    };

    void loadInitialTickets();

    return () => {
      cancelled = true;
    };
  }, [pageSize]);

  const goToPage = (pageNumber: number) => {
    if (pageNumber < 1) {
      return;
    }

    void loadTickets(pageNumber);
  };

  const retry = () => {
    void loadTickets(lastRequestedPage);
  };

  return {
    data,
    errorMessage,
    isLoading,
    isFetching,
    goToPage,
    retry,
  };
};
