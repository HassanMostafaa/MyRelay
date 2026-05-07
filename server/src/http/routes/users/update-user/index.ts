import { error, success } from "@/http/utils/helpers";
import { getAuthTokenFromRequest } from "../utils/getTokenFromRequest";
import { verifyAuthToken } from "../utils/verifyAuthToken";
import { getVerifiedUserById } from "../me/db";
import { updateUserInDB, type UpdateUserBody } from "./db";
import { parseUpdateUserFormData } from "./utils/parse-update-user-form-data";

const METHOD = "PATCH";

export const updateUserRoute = async (req: Request) => {
  switch (req.method) {
    case METHOD: {
      try {
        const contentType = req.headers.get("content-type") || "";

        let body: UpdateUserBody;

        if (contentType.includes("multipart/form-data")) {
          const formData = await parseUpdateUserFormData(req);

          body = formData.body;

          console.log("Parsed form body:", body);
          console.log("Parsed avatar:", formData.avatar);
        } else {
          try {
            body = (await req.json()) as UpdateUserBody;
          } catch {
            return error("Invalid body JSON", null, 400);
          }
        }

        if (!body.id) {
          return error("User ID is required", null, 400);
        }

        const token = getAuthTokenFromRequest(req);

        if (!token) {
          return error(
            "Request must include an authorization token",
            null,
            401,
          );
        }

        const payload = await verifyAuthToken(token);

        if (!payload.id) {
          return error("Request token auth must include user", null, 401);
        }

        const loggedInUser = await getVerifiedUserById(String(payload.id));

        if (!loggedInUser) {
          return error("Token user does not exist", null, 401);
        }

        const isUpdatingSelf = loggedInUser.id === body.id;
        const isAdmin = loggedInUser.role === "admin";

        if (!isUpdatingSelf && !isAdmin) {
          return error(
            "Forbidden, Only admins are allowed to update other users",
            null,
            403,
          );
        }

        const updatedUser = await updateUserInDB({
          body,
          canUpdateRole: isAdmin,
        });

        if (!updatedUser) {
          return error("User to be updated failed, or not found", null, 404);
        }

        return success(updatedUser);
      } catch (err) {
        console.error("updateUserRoute error:", { err });
        return error("Internal Server Error", null, 500);
      }
    }

    default:
      return error(`${req.method} Method Not Allowed`, null, 405);
  }
};
