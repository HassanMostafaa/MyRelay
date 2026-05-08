import { error, success } from "@/http/utils/helpers";
import { getAuthTokenFromRequest } from "../utils/getTokenFromRequest";
import { getVerifiedUserById } from "../me/db";
import { verifyAuthToken } from "../utils/verifyAuthToken";
import { getMyTicketsFromDB } from "./db";

const METHOD = "GET";

export const myTicketsRoute = async (req: Request) => {
  switch (req.method) {
    case METHOD:
      try {
        const token = getAuthTokenFromRequest(req);
        const url = new URL(req.url);

        const pageNumber =
          Number(
            url.searchParams.get("page") ??
              url.searchParams.get("pageNumber"),
          ) || 1;
        const pageSize = Number(url.searchParams.get("pageSize")) || 10;

        if (!token) {
          return error(
            "Logged out, unauthorized, or no token passed",
            null,
            401,
          );
        }

        const payload = await verifyAuthToken(token);

        if (!payload?.id) {
          return error("Unauthorized no payload id", null, 401);
        }

        const user = await getVerifiedUserById(String(payload.id));

        if (!user) {
          return error("No user with that id exist in the database", null, 401);
        }

        const tickets = await getMyTicketsFromDB({
          userId: String(payload.id),
          pageSize,
          pageNumber,
        });

        return success(tickets);
      } catch (caughtError: any) {
        return error("Internal Server Error", caughtError, 500);
      }
      break;

    default:
      return error(`${req.method} Method Not Allowed`, null, 405);
  }
};
