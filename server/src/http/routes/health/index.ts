import { error, resolveLocale, success } from "@/http/utils/helpers";
import { dbHealthCheck } from "./db";

const routeMessage = {
  en: (status: string, time: string) =>
    `Server running. Database status: ${status}. Checked at ${time}`,

  ar: (status: string, time: string) =>
    `الخادم يعمل. حالة قاعدة البيانات: ${status}. تم التحقق في ${time}`,
};

const formatTime = (locale: "en" | "ar") => {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-AE" : "en-US", {
    dateStyle: "medium",
    timeStyle: "medium",
  }).format(new Date());
};

export const healthRoute = async (_req: Request) => {
  const locale = resolveLocale(_req);
  const health = await dbHealthCheck();

  if (!health) return error("Database health failed");

  const { status } = health || {};

  const time = formatTime(locale);
  const message = routeMessage[locale](status, time);

  return success(message);
};
