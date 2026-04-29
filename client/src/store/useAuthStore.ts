import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";
import { User } from "../services/users/utils/types";

type AuthStatus = "loading" | "authenticated" | "guest" | "initial";

type AuthStore = {
  user: User | null;
  status: AuthStatus;

  // setters
  setUser: (user: User | null) => void;
  setLoading: () => void;
  logout: () => void;
};

export const useAuthStore = createWithEqualityFn<AuthStore>(
  (set) => ({
    user: null,
    status: "loading",

    setUser: (user) =>
      set({
        user,
        status: user ? "authenticated" : "guest",
      }),

    setLoading: () =>
      set({
        status: "loading",
      }),

    logout: () =>
      set({
        user: null,
        status: "guest",
      }),
  }),
  shallow,
);
