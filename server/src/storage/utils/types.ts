// server/src/storage/storage.types.ts

import type { UserRole } from "@/http/routes/users/utils/types";

export type AssetOwnerType = UserRole;

export type UserAssetKind = "avatar" | "document";

export type SaveAssetInput = {
  ownerType: AssetOwnerType;
  ownerId: string;
  kind: UserAssetKind;
  file: File;
};

export type SavedAsset = {
  fileId: string;
  originalName: string;
  storagePath: string;
  publicPath: string;
  mimeType: string;
  sizeBytes: number;
  extension: string;
  fileName: string;
};
