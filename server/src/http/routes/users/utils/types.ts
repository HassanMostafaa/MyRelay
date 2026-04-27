// src/http/utils/types.ts

export type UserRole = "admin" | "user" | "agent";

export type User = {
  id: string;
  email: string;
  username: string;
  password_hash: string;
  role: UserRole;
  phone: string | null;
  country: string | null;
  city: string | null;
  date_of_birth: string | null;
  address: string | null;
  created_at: string;
  updated_at: string;
};

export type PublicUser = Omit<User, "password_hash">;

export type RegisterBody = {
  email: string;
  password: string;
  username: string;
};

export const SUPPORTED_LOCALES = ["en", "ar"] as const;
export type TLocale = (typeof SUPPORTED_LOCALES)[number];

export type RouteMessage = Record<TLocale, string>;

export type LoginBody = {
  identifier: string;
  password: string;
};
