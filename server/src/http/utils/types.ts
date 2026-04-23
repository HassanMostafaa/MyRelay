// GLOBAL RESPONSE TYPE
export type ApiStatus = "success" | "error";
export type ApiResponse<T = unknown> = {
  status: ApiStatus;
  message?: string;
  data?: T;
};
