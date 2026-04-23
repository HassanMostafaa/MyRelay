// src/http/utils/response.ts
import type { ApiResponse } from "./types";

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

export const error = (message: string, status = 500, init?: ResponseInit) => {
  const body: ApiResponse<null> = {
    status: "error",
    message,
  };

  return Response.json(body, {
    status,
    ...init,
  });
};
