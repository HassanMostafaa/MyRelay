import { ApiResponse, ApiStatus, User } from "../utils/types";

const fullEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/login`;

export const handleLoginService = async (requestBody: {
  identifier: string;
  password: string;
}): Promise<{ status: ApiStatus; message?: string; user: User | null }> => {
  try {
    const body = JSON.stringify(requestBody);
    const results = await fetch(fullEndpoint, {
      credentials: "include",
      method: "POST",
      body,
    });

    const json: ApiResponse<User> = await results.json();

    if (json?.status === "error") {
      return { user: null, message: json.message, status: json.status };
    }
    return { user: json?.data || null, status: json?.status };
  } catch (error: unknown) {
    console.error({ error });
    return { user: null, status: "error", message: "Exception error" };
  }
};
