import { cors } from "../utils/cors";
import { healthRoute } from "./health";
import { registerRoute } from "./users/register";

export const routes = {
  "/health": cors(healthRoute),
  "/register": cors(registerRoute),
};
