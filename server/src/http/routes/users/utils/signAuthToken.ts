import { SignJWT } from "jose";
import { getJwtSecret } from "./getJwtSecret";
import type { PublicUser } from "./types";

export const signAuthToken = async (user: PublicUser) => {
  return new SignJWT({ id: user?.id })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(getJwtSecret());
};
