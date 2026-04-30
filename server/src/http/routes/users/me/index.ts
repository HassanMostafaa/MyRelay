import { error, success } from "@/http/utils/helpers";
import { getAuthTokenFromRequest } from "../utils/getTokenFromRequest";
import { verifyAuthToken } from "../utils/verifyAuthToken";
import { getVerifiedUserById } from "./db";

const METHOD = "GET";

export const meRoute = async (req: Request) => {
  switch (req.method) {
    case METHOD: {
      try {
        const token = getAuthTokenFromRequest(req);

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
          return error("No used with that id exist in the database", null, 401);
        }

        return success(user);
      } catch (err) {
        return error("Unauthorized", null, 401);
      }
    }

    default:
      return error(`${req.method} Method Not Allowed`, null, 405);
  }
};
