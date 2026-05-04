import path from "node:path";
import { mkdir } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import type { SavedAsset } from "./utils/types";

const ASSETS_ROOT =
  process.env.ASSETS_DIR || path.resolve(process.cwd(), "../assets");

type SaveFileStreamInput = {
  stream: NodeJS.ReadableStream;
  fileId: string;
  fileName: string;
  mimeType: string;
};

export const saveFileStream = async ({
  stream,
  fileId,
  fileName,
  mimeType,
}: SaveFileStreamInput): Promise<SavedAsset> => {
  const extension = fileName.includes(".")
    ? fileName.split(".").pop()?.toLowerCase() || "bin"
    : "bin";

  const finalFileName = `${fileId}.${extension}`;
  const storagePath = path.join(ASSETS_ROOT, finalFileName);

  await mkdir(path.dirname(storagePath), { recursive: true });

  const writeStream = createWriteStream(storagePath);

  return new Promise((resolve, reject) => {
    stream.pipe(writeStream);

    stream.on("error", reject);
    writeStream.on("error", reject);

    writeStream.on("finish", () => {
      resolve({
        fileId,
        fileName: finalFileName,
        originalName: fileName,
        storagePath,
        publicPath: `/assets/${finalFileName}`,
        mimeType,
        sizeBytes: 0, // we will calculate this next
        extension,
      });
    });
  });
};
