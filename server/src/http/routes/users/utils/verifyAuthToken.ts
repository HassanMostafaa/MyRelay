import { jwtVerify } from "jose";
import { getJwtSecret } from "../utils/getJwtSecret";

export const verifyAuthToken = async (token: string) => {
  const { payload } = await jwtVerify(token, getJwtSecret());

  return payload;
};
