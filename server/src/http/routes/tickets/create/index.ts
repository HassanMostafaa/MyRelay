import { error, success } from "@/http/utils/helpers";
import type { CreateTicketBody } from "../utils/types";
import { createTicketInDB } from "./db";
import { getVerifiedUserById } from "../../users/me/db";

const METHOD = "POST";
const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

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
      if (!UUID_REGEX.test(userId)) {
        return error("Invalid userId format", null, 400);
      }

      const user = await getVerifiedUserById(userId);

      if (!user) {
        return error("No user with that id exists in the database", null, 404);
      }

      const insertedTicket = await createTicketInDB({
        userId,
        ticket: {
          subject,
          description,
        },
      });

      if (!insertedTicket) {
        return error("Failed inserting ticket in the database", null, 400);
      }

      return success(insertedTicket, { status: 201 });
    }

    default:
      return error(`${req.method} Method Not Allowed`, null, 405);
  }
};
