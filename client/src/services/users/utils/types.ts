// src/http/utils/types.ts

export type UserRole = "admin" | "user" | "agent";

export type User = {
  id: string;
  email: string;
  username: string;
  role: UserRole;
  phone: string | null;
  country: string | null;
  city: string | null;
  date_of_birth: string | null;
  address: string | null;
  email_verified: boolean;
  phone_verified: boolean;
  created_at: string;
  updated_at: string;
  first_name: string;
  last_name: string;
  last_mame?: string;
};

export type PublicUser = Omit<User, "password_hash">;

export type RegisterBody = {
  email: string;
  password: string;
  username: string;
  first_name: string;
  last_name: string;
};

export type LoginBody = {
  identifier: string;
  password: string;
};

// GLOBAL RESPONSE TYPE
export type ApiStatus = "success" | "error";
export type ApiResponse<T = unknown> = {
  status: ApiStatus;
  message?: string;
  data?: T;
};
