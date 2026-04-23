import { cors } from "../utils/cors";
import { healthRoute } from "./health";

export const routes = {
  "/health": cors(healthRoute),
};
