import { error, success } from "@/http/utils/helpers";

import { verifyAuthToken } from "../utils/verifyAuthToken";
import { getVerifiedUserById } from "../me/db";
import { deleteUserFromDB } from "./db";
import { getAuthTokenFromRequest } from "../utils/getTokenFromRequest";

const METHOD = "DELETE";

export const deleteUserRoute = async (req: Request) => {
  switch (req.method) {
    case METHOD: {
      try {
        const { searchParams } = new URL(req.url);
        const userIdToDelete = searchParams.get("userId");

        if (!userIdToDelete) {
          return error("User ID is required", null, 400);
        }

        const token = getAuthTokenFromRequest(req);

        if (!token) {
          return error(
            "Missing auth token, must be logged in to delete account",
            null,
            401,
          );
        }

        const payload = await verifyAuthToken(token);

        if (!payload.id) {
          return error("Invalid token auth value", null, 401);
        }

        const loggedInUser = await getVerifiedUserById(String(payload.sub));

        if (!loggedInUser) {
          return error("Auth token user does not exist", null, 401);
        }

        const isDeletingSelf = loggedInUser.id === userIdToDelete;
        const isAdmin = loggedInUser.role === "admin";

        if (!isDeletingSelf && !isAdmin) {
          return error("Only admins can delete other accounts.", null, 403);
        }

        const deletedUser = await deleteUserFromDB(userIdToDelete);

        if (!deletedUser) {
          return error("Failed removing user from database", null, 404);
        }

        return success({
          deleted: true,
          user: deletedUser,
        });
      } catch (err) {
        console.error("deleteUserRoute error:", err);
        return error("Internal Server Error", null, 500);
      }
    }

    default:
      return error(`${req.method} Method Not Allowed`, null, 405);
  }
};
