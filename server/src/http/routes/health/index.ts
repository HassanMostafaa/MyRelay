import { success } from "@/http/utils/helpers";

export const healthRoute = (_req: Request) => {
  return success("Running and healthy");
};
