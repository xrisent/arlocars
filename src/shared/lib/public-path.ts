import path from "node:path";

/** DB stores paths like `/uploads/cars/...` */
export function absPublicFilePath(relativeFromPublic: string): string {
  const clean = relativeFromPublic.startsWith("/") ? relativeFromPublic.slice(1) : relativeFromPublic;
  return path.join(process.cwd(), "public", clean);
}
