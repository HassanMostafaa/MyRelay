import { ApiResponse, ApiStatus } from "../../users/utils/types";
import { CreateTicketBody, PublicTicket } from "../utils/types";

const fullEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/ticket/create`;

interface ICreateTicketServiceResponse {
  status: ApiStatus;
  message?: string;
  ticket: PublicTicket | null;
}

export const createTicketService = async (
  requestBody: CreateTicketBody,
): Promise<ICreateTicketServiceResponse> => {
  try {
    const body = JSON.stringify(requestBody);
    const results = await fetch(fullEndpoint, {
      credentials: "include",
      method: "POST",
      body,
    });

    const json: ApiResponse<PublicTicket> = await results.json();

    if (json?.status === "error") {
      return { ticket: null, message: json.message, status: json.status };
    }
    return { ticket: json?.data || null, status: json?.status };
  } catch (error: unknown) {
    console.error({ error });
    return { ticket: null, status: "error", message: "Exception error" };
  }
};
