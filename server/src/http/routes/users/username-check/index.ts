import { error, success } from "@/http/utils/helpers";
import { checkUsername } from "./db";

const METHOD = "GET";

export const usernameCheck = async (req: Request) => {
  switch (req.method) {
    case METHOD: {
      try {
        const { searchParams } = new URL(req.url);
        const username = searchParams.get("username")?.trim();

        if (!username) {
          return error("Username is required", null, 400);
        }

        const result = await checkUsername({ username });

        return success(result);
      } catch (err) {
        console.error("usernameCheck error:", err);
        return error("Internal Server Error", null, 500);
      }
    }

    default:
      return error(`${req.method} Method Not Allowed`, null, 405);
  }
};
