import { endpointParamsBuilder } from "../../utils/helpers";
import { ApiResponse, ApiStatus } from "../../users/utils/types";
import { PublicTicket } from "../utils/types";

const ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/ticket/delete`;

type DeleteTicketPayload = {
  deleted: boolean;
  ticket: PublicTicket;
};

type DeleteTicketServiceResponse = {
  status: ApiStatus;
  message?: string;
  deleted: boolean;
  ticket: PublicTicket | null;
};

export const deleteTicketService = async (
  ticketId: string,
): Promise<DeleteTicketServiceResponse> => {
  try {
    const fullEndpoint = endpointParamsBuilder({
      endpoint: ENDPOINT,
      params: { ticketId },
    });

    const response = await fetch(fullEndpoint, {
      method: "DELETE",
      credentials: "include",
    });

    const json: ApiResponse<DeleteTicketPayload> = await response.json();

    if (json?.status === "error") {
      return {
        status: json.status,
        message: json.message,
        deleted: false,
        ticket: null,
      };
    }

    return {
      status: json?.status ?? "error",
      message: json?.message,
      deleted: json?.data?.deleted === true,
      ticket: json?.data?.ticket ?? null,
    };
  } catch (error: unknown) {
    console.error("deleteTicketService error:", { error, ticketId });

    return {
      status: "error",
      message: "Exception error",
      deleted: false,
      ticket: null,
    };
  }
};
