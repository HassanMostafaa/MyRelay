import { cors } from "../utils/cors";
import { healthRoute } from "./health";
import { createTicketRoute } from "./tickets/create";
import { loginRoute } from "./users/login";
import { logoutRoute } from "./users/logout";
import { meRoute } from "./users/me";
import { registerRoute } from "./users/register";
import { usernameCheck } from "./users/username-check";

export const routes = {
  "/health": cors(healthRoute),
  "/register": cors(registerRoute),
  "/login": cors(loginRoute),
  "/logout": cors(logoutRoute),
  "/username-check": cors(usernameCheck),
  "/me": cors(meRoute),

  "/ticket/create": cors(createTicketRoute),
};
