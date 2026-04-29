import { ApiResponse } from "../utils/types";

const fullEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/logout`;

export const handleLogoutService =
  async (): Promise<ApiResponse<null> | null> => {
    try {
      const logoutResults = await fetch(fullEndpoint, {
        method: "POST",
        credentials: "include",
      });
      const json = await logoutResults.json();

      return json;
    } catch {
      return null;
    }
  };
