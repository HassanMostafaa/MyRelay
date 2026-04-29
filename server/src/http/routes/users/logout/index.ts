import { success, error } from "@/http/utils/helpers";

const METHOD = "POST";

export const logoutRoute = async (req: Request) => {
  switch (req.method) {
    case METHOD:
      return success(
        { loggedOut: true },
        {
          status: 200,
          headers: {
            "Set-Cookie":
              "access_token=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0",
          },
        },
      );

    default:
      return error(`${req.method} Method Not Allowed`, null, 405);
  }
};
