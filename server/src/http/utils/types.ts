// GLOBAL RESPONSE TYPE
export type ApiStatus = "success" | "error";
export type ApiResponse<T = unknown> = {
  status: ApiStatus;
  message?: string;
  data?: T;
};

export const SUPPORTED_LOCALES = ["en", "ar"] as const;
export type TLocale = (typeof SUPPORTED_LOCALES)[number];
export type RouteMessage = Record<TLocale, string>;
