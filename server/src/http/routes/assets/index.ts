import path from "node:path";
import { stat } from "node:fs/promises";
import { file } from "bun";

const ASSETS_ROOT =
  process.env.ASSETS_DIR || path.resolve(process.cwd(), "../assets");

const contentTypes: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
};

export const assetsRoute = async (req: Request) => {
  const url = new URL(req.url);

  const fileName = url.pathname.replace("/assets/", "");

  if (!fileName) {
    return Response.json(
      { status: "error", message: "Asset name is required", data: null },
      { status: 400 },
    );
  }

  // prevent path traversal like ../../secret.env
  //   const safeFileName = path.basename(fileName);
  const relativePath = url.pathname.replace("/assets/", "");
  const safePath = path
    .normalize(relativePath)
    .replace(/^(\.\.(\/|\\|$))+/, "");
  const filePath = path.join(ASSETS_ROOT, safePath);

  try {
    await stat(filePath);

    const ext = path.extname(filePath).toLowerCase();

    return new Response(file(filePath), {
      headers: {
        "Content-Type": contentTypes[ext] || "application/octet-stream",
        "Cache-Control": "public, max-age=31536000",
      },
    });
  } catch {
    return Response.json(
      { status: "error", message: "Asset not found", data: null },
      { status: 404 },
    );
  }
};
