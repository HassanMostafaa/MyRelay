import type { ApiResponse, EditableUserFields, User } from "../utils/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const ENDPOINT = `${API_URL}/update-user`;

type UpdateUserResponse = {
  status: ApiResponse<User | null>["status"];
  message?: string;
  data: User | null;
};

export const updateUserService = async (
  body: Partial<EditableUserFields> & { id: User["id"] },
): Promise<UpdateUserResponse> => {
  if (!API_URL) {
    return {
      status: "error",
      message: "API URL is not configured",
      data: null,
    };
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const result = (await res.json()) as UpdateUserResponse;

    if (!res.ok || result.status === "error") {
      return {
        status: "error",
        message: result.message ?? "Failed to update user",
        data: null,
      };
    }

    return {
      status: result.status,
      message: result.message,
      data: result.data ?? null,
    };
  } catch (error) {
    console.error("Error updating user:", error);

    return {
      status: "error",
      message: "Something went wrong while updating the user",
      data: null,
    };
  }
};
