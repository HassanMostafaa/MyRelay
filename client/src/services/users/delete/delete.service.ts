import { endpointParamsBuilder } from "../../utils/helpers";
import { handleLogoutService } from "../logout/logout.service";
import { ApiStatus, User } from "../utils/types";

const ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/delete-user`;

export const deleteUserService = async (
  userId: User["id"],
): Promise<{ status: ApiStatus } | null> => {
  try {
    const fullEndpoint = endpointParamsBuilder({
      endpoint: ENDPOINT,
      params: { userId },
    });

    const response = await fetch(fullEndpoint, {
      method: "DELETE",
      credentials: "include",
    });

    const res = await response.json();

    if (res?.status === "success" && res?.data?.deleted) {
      // LOGOUT USER LOCALLY
      await handleLogoutService();
      return { status: res?.status };
    }

    return null;
  } catch (error) {
    console.error("Error svs deleting user:", { error, userId });
  }

  return null;
};
