import Busboy from "@fastify/busboy";
import { Readable } from "node:stream";
import type { UpdateUserBody } from "../db";

export const parseUpdateUserFormData = async (req: Request) => {
  return new Promise<{
    body: UpdateUserBody;
    avatar: {
      fileName: string;
      mimeType: string;
      encoding: string;
    } | null;
  }>((resolve, reject) => {
    const contentType = req.headers.get("content-type");

    if (!contentType) {
      reject(new Error("Missing content-type"));
      return;
    }

    const busboy = Busboy({
      headers: {
        "content-type": contentType,
      },
    });

    const body: Record<string, unknown> = {};
    let avatar: {
      fileName: string;
      mimeType: string;
      encoding: string;
    } | null = null;

    busboy.on("field", (name, value) => {
      body[name] = value;
    });

    busboy.on("file", (name, stream, info: any) => {
      const fileName = info.filename;
      const mimeType = info.mimeType;
      const encoding = info.encoding;

      if (name === "avatar" && fileName) {
        avatar = {
          fileName,
          mimeType,
          encoding,
        };

        console.log("[avatar received]", avatar);
      }

      // important for now: consume the stream even if you don't save yet
      stream.resume();
    });

    busboy.on("error", reject);

    busboy.on("finish", () => {
      resolve({
        body: body as UpdateUserBody,
        avatar,
      });
    });

    if (!req.body) {
      reject(new Error("Missing request body"));
      return;
    }

    Readable.fromWeb(req.body as any).pipe(busboy);
  });
};
