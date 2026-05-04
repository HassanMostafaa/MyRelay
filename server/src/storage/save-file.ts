import path from "node:path";
import { mkdir } from "node:fs/promises";
import type { SavedAsset } from "./utils/types";

type SaveFileInput = {
  file: File;
  fileId: string;
};

const ASSETS_ROOT = path.resolve(process.cwd(), "../assets");

export const saveFile = async ({
  file,
  fileId,
}: SaveFileInput): Promise<SavedAsset | null> => {
  if (!(file instanceof File)) {
    throw new Error("File must be an instance of File");
  }

  const ext = file.name.includes(".")
    ? file.name.split(".").pop()?.toLowerCase()
    : "bin";

  const fileName = `${fileId}.${ext}`;

  const storagePath = path.join(ASSETS_ROOT, fileName);

  await mkdir(ASSETS_ROOT, { recursive: true });
  await Bun.write(storagePath, file);

  return {
    fileId,
    fileName,
    originalName: file.name,
    storagePath,
    publicPath: `/assets/${fileName}`,
    mimeType: file.type,
    sizeBytes: file.size,
    extension: ext ?? "",
  };
};
