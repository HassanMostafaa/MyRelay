import { error, success } from "@/http/utils/helpers";
import type { LoginBody } from "../utils/types";
import { findUserByIdentifier } from "./db";
import bcrypt from "bcrypt";
import { signAuthToken } from "../utils/signAuthToken";

const METHOD = "POST";

export const loginRoute = async (req: Request) => {
  switch (req.method) {
    case METHOD:
      let body: LoginBody;

      try {
        body = (await req.json()) as LoginBody;
      } catch {
        return error("Invalid JSON", null, 400);
      }

      const identifier = String(body.identifier ?? "").trim();
      const password = String(body.password ?? "");

      if (!identifier || !password) {
        return error("Username/email and password are required", null, 400);
      }

      const user = await findUserByIdentifier(identifier);

      if (!user) {
        return error("User with this identifier does not exist", null, 404);
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        user.password_hash,
      );

      if (!isPasswordValid) {
        return error(
          "Username or password was incorrect, please try again.",
          null,
          401,
        );
      }

      const { password_hash, ...publicUser } = user || {};

      const token = await signAuthToken(publicUser);

      return Response.json(
        {
          status: "success",
          data: { user: publicUser },
        },
        {
          status: 200,
          headers: {
            "Set-Cookie": `access_token=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=86400`,
          },
        },
      );

    default:
      return error(`${req.method} Method Not Allowed`, null, 405);
  }
};
