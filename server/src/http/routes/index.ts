// CORS CONFIG WRAPPER
import { cors } from "../utils/cors";

// HEALTH CHECK ROUTE IMPORT
import { healthRoute } from "./health";

// USERS ROUTES IMPORTS
import { loginRoute } from "./users/login";
import { logoutRoute } from "./users/logout";
import { meRoute } from "./users/me";
import { registerRoute } from "./users/register";
import { usernameCheck } from "./users/username-check";

// TICKETS ROUTES IMPORTS
import { createTicketRoute } from "./tickets/create";
import { deleteTicketRoute } from "./tickets/delete";

export const routes = {
  // HEALTH CHECK ROUTE
  "/health": cors(healthRoute),

  // USERS ROUTES
  "/register": cors(registerRoute),
  "/login": cors(loginRoute),
  "/logout": cors(logoutRoute),
  "/username-check": cors(usernameCheck),
  "/me": cors(meRoute),

  // TICKETS ROUTES
  "/ticket/create": cors(createTicketRoute),
  "/ticket/delete": cors(deleteTicketRoute),
};
