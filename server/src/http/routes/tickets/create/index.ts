import { error, success } from "@/http/utils/helpers";
import type { CreateTicketBody } from "../utils/types";
import { createTicketInDB } from "./db";

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

      const description = body?.ticket?.description?.trim() || null;
      const subject = body?.ticket?.subject?.trim() || null;
      const userId = body?.userId?.trim() || null;

      if (!subject) {
        return error("Subject is required", null, 400);
      }
      if (!description) {
        return error("Description is required", null, 400);
      }
      if (!userId) {
        return error("User identification [userId] is required", null, 400);
      }

      const insertedTicket = await createTicketInDB(body);

      if (!insertedTicket) {
        return error("Failed inserting ticket in the database", null, 400);
      }

      return success("TRIGGER SUCCESS");
    }

    default:
      return error(`${req.method} Method Not Allowed`, null, 405);
  }
};
