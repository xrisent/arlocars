import path from "node:path";

/**
 * Uploaded files must live outside the Next.js build output: on Hostinger's
 * Node.js App hosting each deploy creates a fresh versioned directory and
 * repoints `public/` at it, which would silently wipe previously uploaded
 * car photos. Set `UPLOADS_DIR` to an absolute path outside the deploy
 * directory in production; it defaults to `public/uploads` for local/Docker
 * setups where the directory (or a mounted volume) already persists.
 */
export function uploadsRootAbs(): string {
  return process.env.UPLOADS_DIR
    ? path.resolve(process.env.UPLOADS_DIR)
    : path.join(process.cwd(), "public", "uploads");
}

/** DB stores paths like `/uploads/cars/...` */
export function absUploadFilePath(relativeFromUploads: string): string {
  const clean = relativeFromUploads.replace(/^\/?uploads\/?/, "");
  return path.join(uploadsRootAbs(), clean);
}
