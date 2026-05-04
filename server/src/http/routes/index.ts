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
import { updateUserRoute } from "./users/update-user";
import { deleteUserRoute } from "./users/delete-user";

// TICKETS ROUTES IMPORTS
import { createTicketRoute } from "./tickets/create";
import { deleteTicketRoute } from "./tickets/delete";
import { saveRoute } from "./save";

// ASSETS ROUTE IMPORT
import { assetsRoute } from "./assets";

export const routes = {
  // HEALTH CHECK ROUTE
  "/health": cors(healthRoute),

  // USERS ROUTES
  "/register": cors(registerRoute),
  "/login": cors(loginRoute),
  "/logout": cors(logoutRoute),
  "/username-check": cors(usernameCheck),
  "/me": cors(meRoute),
  "/delete-user": cors(deleteUserRoute),
  "/update-user": cors(updateUserRoute),

  // TICKETS ROUTES
  "/ticket/create": cors(createTicketRoute),
  "/ticket/delete": cors(deleteTicketRoute),

  // TESTING FILE SAVE
  "/save": cors(saveRoute),

  // ASSETS ROUTE
  "/assets/:fileName": cors(assetsRoute),
};
