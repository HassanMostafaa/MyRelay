import { resolveLocale, success } from "@/http/utils/helpers";
import type { RouteMessage } from "@/http/utils/types";

const routeMessage: RouteMessage = {
  en: "Running and healthy",
  ar: "الخادم يعمل وبصحة جيدة",
};
export const healthRoute = (_req: Request) => {
  const locale = resolveLocale(_req);
  return success(routeMessage[locale]);
};
