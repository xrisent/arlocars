import { readFile, stat } from "node:fs/promises";
import path from "node:path";

import { uploadsRootAbs } from "@/shared/lib/public-path";

export const runtime = "nodejs";

const CONTENT_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

export async function GET(
  _request: Request,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path: segments } = await context.params;

  if (!segments?.length || segments.some((s) => s === "." || s === "..")) {
    return new Response("Not found", { status: 404 });
  }

  const root = uploadsRootAbs();
  const filePath = path.join(root, ...segments);

  if (filePath !== root && !filePath.startsWith(root + path.sep)) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const info = await stat(filePath);
    if (!info.isFile()) {
      return new Response("Not found", { status: 404 });
    }

    const buf = await readFile(filePath);
    const contentType = CONTENT_TYPES[path.extname(filePath).toLowerCase()] ?? "application/octet-stream";

    return new Response(new Uint8Array(buf), {
      headers: {
        "Content-Type": contentType,
        "Content-Length": String(buf.length),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
