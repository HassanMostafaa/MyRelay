import Busboy from "@fastify/busboy";
import { saveFileStream } from "@/storage/save-file-stream";
import { error, success } from "@/http/utils/helpers";
import type { SavedAsset } from "@/storage/utils/types";
import { createUploadProgressTracker } from "@/storage/utils/helpers";

export const saveRoute = async (req: Request): Promise<Response> => {
  try {
    const savedFile = await new Promise<SavedAsset | null>(
      (resolve, reject) => {
        const contentType = req.headers.get("content-type");

        if (!contentType) {
          return resolve(null);
        }

        const busboy = new Busboy({
          headers: {
            "content-type": contentType,
          },
        });

        let savePromise: Promise<SavedAsset> | null = null;

        busboy.on(
          "file",
          (_fieldName, fileStream, fileName, _encoding, mimeType) => {
            const totalBytes = Number(req.headers.get("content-length")) || 0;

            const tracker = createUploadProgressTracker({
              fileName,
              totalBytes,
            });

            fileStream.on("data", tracker.onChunk);

            fileStream.on("end", tracker.onComplete);

            savePromise = saveFileStream({
              stream: fileStream,
              fileId: crypto.randomUUID(),
              fileName,
              mimeType,
            });
          },
        );

        busboy.on("finish", async () => {
          try {
            resolve(savePromise ? await savePromise : null);
          } catch (err) {
            reject(err);
          }
        });

        busboy.on("error", reject);

        req.body
          ?.pipeTo(
            new WritableStream({
              write(chunk) {
                busboy.write(chunk);
              },
              close() {
                busboy.end();
              },
              abort(reason) {
                reject(reason);
              },
            }),
          )
          .catch(reject);
      },
    );

    if (!savedFile) {
      return error("File is required", null, 400);
    }

    return success(savedFile);
  } catch (err) {
    console.error("saveRoute error:", err);
    return error("Failed to save file", null, 500);
  }
};
