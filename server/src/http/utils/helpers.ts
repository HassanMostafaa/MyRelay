// src/http/utils/response.ts
import { SUPPORTED_LOCALES, type ApiResponse, type TLocale } from "./types";

export const success = <T>(data: T, init?: ResponseInit) => {
  const body: ApiResponse<T> = {
    status: "success",
    data,
  };

  return Response.json(body, {
    status: init?.status ?? 200,
    ...init,
  });
};

export const error = <T = null>(
  message: string,
  data?: T,
  status = 500,
  init?: ResponseInit,
) => {
  const body: ApiResponse<T> = {
    status: "error",
    message,
    data,
  };

  return Response.json(body, {
    status,
    ...init,
  });
};

export const resolveLocale = (req: Request): TLocale => {
  const locale = req.headers.get("x-locale")?.toLowerCase();

  if (locale && SUPPORTED_LOCALES.includes(locale as TLocale)) {
    return locale as TLocale;
  }

  return "en";
};
