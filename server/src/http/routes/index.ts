import { cors } from "../utils/cors";
import { healthRoute } from "./health";
import { loginRoute } from "./users/login";
import { registerRoute } from "./users/register";
import { usernameCheck } from "./users/username-check";

export const routes = {
  "/health": cors(healthRoute),
  "/register": cors(registerRoute),
  "/login": cors(loginRoute),
  "/username-check": cors(usernameCheck),
};
