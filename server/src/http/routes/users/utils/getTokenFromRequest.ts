export const getAuthTokenFromRequest = (req: Request) => {
  const cookieHeader = req.headers.get("cookie");

  if (!cookieHeader) return null;

  const token = cookieHeader
    .split("; ")
    .find((cookie) => cookie.startsWith("access_token="))
    ?.split("=")[1];

  return token ?? null;
};
