import { PublicTicket } from "../../tickets/utils/types";
import { endpointParamsBuilder } from "../../utils/helpers";
import { ApiStatus } from "../utils/types";

const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/my-tickets`;

export type MyTicketsData = {
  tickets: PublicTicket[];
  total: number;
  pageNumber: number;
  pageSize: number;
  pageCount: number;
};

export const myTicketsService = async ({
  pageNumber = 1,
  pageSize = 10,
}: {
  pageNumber?: number;
  pageSize?: number;
}): Promise<{ status: ApiStatus; data?: MyTicketsData; message?: string }> => {
  try {
    const fullEndpoint = endpointParamsBuilder({
      endpoint,
      params: {
        page: pageNumber,
        pageSize,
      },
    });

    const response = await fetch(fullEndpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const res = await response.json();

    if (res?.status === "error") {
      return {
        status: res?.status,
        message: res?.message,
      };
    }

    return {
      status: res?.status,
      data: res?.data,
    };
  } catch {
    return {
      status: "error",
      message: "Exception error",
    };
  }
};
