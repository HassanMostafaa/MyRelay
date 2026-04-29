import { ApiStatus, User } from "../utils/types";

const fullEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/me`;

export const getMeService = async (): Promise<{
  status: ApiStatus;
  data: User;
} | null> => {
  const results = await fetch(fullEndpoint, { credentials: "include" });
  const json = await results.json();

  return json;
};
