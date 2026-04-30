import { error, success } from "@/http/utils/helpers";
import { getAuthTokenFromRequest } from "@/http/routes/users/utils/getTokenFromRequest";
import { verifyAuthToken } from "@/http/routes/users/utils/verifyAuthToken";
import { deleteTicketFromDB } from "./db";

const METHOD = "DELETE";

export const deleteTicketRoute = async (req: Request) => {
  switch (req.method) {
    case METHOD: {
      try {
        const { searchParams } = new URL(req.url);
        const ticketId = searchParams.get("ticketId");

        if (!ticketId) {
          return error("Ticket ID is required", null, 400);
        }

        const token = getAuthTokenFromRequest(req);

        if (!token) {
          return error(
            "Unauthorized, auth token not found within the request",
            null,
            401,
          );
        }

        const payload = await verifyAuthToken(token);

        const userId = payload?.id;
        if (!userId) {
          return error(
            "Unauthorized, User id not found in auth token",
            null,
            401,
          );
        }

        const deletedTicket = await deleteTicketFromDB({
          ticketId,
          userId: String(userId),
        });

        if (!deletedTicket) {
          return error("Ticket not found", null, 404);
        }

        return success({
          deleted: true,
          ticket: deletedTicket,
        });
      } catch (err) {
        console.error("deleteTicketRoute error:", err);
        return error("Unauthorized", null, 401);
      }
    }

    default:
      return error(`${req.method} Method Not Allowed`, null, 405);
  }
};
