import path from "node:path";
import { mkdir } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { Transform } from "node:stream";
import type { SavedAsset } from "./utils/types";

const ASSETS_ROOT =
  process.env.ASSETS_DIR || path.resolve(process.cwd(), "../assets");

type SaveFileStreamInput = {
  stream: NodeJS.ReadableStream;
  fileId: string;
  fileName: string;
  mimeType: string;
  onChunk?: (chunk: Buffer) => void;
  onComplete?: () => void;
};

export const saveFileStream = async ({
  stream,
  fileId,
  fileName,
  mimeType,
  onChunk,
  onComplete,
}: SaveFileStreamInput): Promise<SavedAsset> => {
  const extension = fileName.includes(".")
    ? fileName.split(".").pop()?.toLowerCase() || "bin"
    : "bin";

  const finalFileName = `${fileId}.${extension}`;
  const storagePath = path.join(ASSETS_ROOT, finalFileName);

  await mkdir(path.dirname(storagePath), { recursive: true });

  let sizeBytes = 0;

  const trackAndCount = new Transform({
    transform(chunk: Buffer, _encoding, callback) {
      sizeBytes += chunk.length;
      onChunk?.(chunk);
      callback(null, chunk);
    },
  });

  await pipeline(stream, trackAndCount, createWriteStream(storagePath));

  onComplete?.();

  return {
    fileId,
    fileName: finalFileName,
    originalName: fileName,
    storagePath,
    publicPath: `/assets/${finalFileName}`,
    mimeType,
    sizeBytes,
    extension,
  };
};
