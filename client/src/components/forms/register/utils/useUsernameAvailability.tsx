"use client";

import { useField } from "formik";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { usernameCheckService } from "@/src/services/users/username-check/username.service";

const USERNAME_MIN_LENGTH = 3;

export type UsernameAvailabilityStatus =
  | "idle"
  | "checking"
  | "available"
  | "taken"
  | "error";

export const useUsernameAvailability = () => {
  const t = useTranslations("validation");
  const [field, , helpers] = useField<string>("username");
  const [requestState, setRequestState] = useState<{
    username: string;
    status: UsernameAvailabilityStatus;
  }>({
    username: "",
    status: "idle",
  });
  const [availabilityCache, setAvailabilityCache] = useState<
    Record<string, boolean>
  >({});
  const setError = helpers.setError;
  const setTouched = helpers.setTouched;
  const username = field.value.trim();
  const hasCachedAvailability = username in availabilityCache;
  const cachedAvailability = hasCachedAvailability
    ? availabilityCache[username]
    : undefined;

  const status: UsernameAvailabilityStatus =
    username.length < USERNAME_MIN_LENGTH
      ? "idle"
      : cachedAvailability !== undefined
        ? cachedAvailability
          ? "available"
          : "taken"
        : requestState.username === username
          ? requestState.status
          : "idle";

  useEffect(() => {
    if (username.length < USERNAME_MIN_LENGTH) {
      return;
    }

    if (hasCachedAvailability && cachedAvailability !== undefined) {
      if (cachedAvailability) {
        setError(undefined);
      } else {
        setTouched(true, false);
        setError(t("username_taken"));
      }

      return;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      try {
        setRequestState({
          username,
          status: "checking",
        });
        const result = await usernameCheckService({
          username,
          signal: controller.signal,
        });

        setAvailabilityCache((prev) => ({
          ...prev,
          [username]: result.available,
        }));
        setRequestState({
          username,
          status: result.available ? "available" : "taken",
        });

        if (result.available) {
          setError(undefined);
          return;
        }

        setTouched(true, false);
        setError(t("username_taken"));
      } catch (error) {
        if (
          error instanceof Error &&
          error.name === "AbortError"
        ) {
          return;
        }

        setRequestState({
          username,
          status: "error",
        });
      }
    }, 400);

    return () => {
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, [cachedAvailability, hasCachedAvailability, setError, setTouched, t, username]);

  return { status };
};
