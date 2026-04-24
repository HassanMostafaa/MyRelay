import { cors } from "../utils/cors";
import { healthRoute } from "./health";
import { registerRoute } from "./users/register";
import { usernameCheck } from "./users/username-check";

export const routes = {
  "/health": cors(healthRoute),
  "/register": cors(registerRoute),
  "/username-check": cors(usernameCheck),
};
