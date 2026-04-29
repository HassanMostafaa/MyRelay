import { error, success } from "@/http/utils/helpers";
import type { CreateTicketBody } from "../utils/types";

const METHOD = "POST";

export const createTicketRoute = async (req: Request) => {
  switch (req.method) {
    case METHOD: {
      let body: CreateTicketBody;

      try {
        body = (await req.json()) as CreateTicketBody;
      } catch {
        return error("Invalid JSON", null, 400);
      }

      const description = body.description?.trim();
      const subject = body.subject?.trim() || null;

      if (!description) {
        return error("Description is required", null, 400);
      }

      // later:
      // - get user from token
      // - insert into DB

      return success({
        subject,
        description,
      });
    }

    default:
      return error(`${req.method} Method Not Allowed`, null, 405);
  }
};
