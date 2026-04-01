import { HttpError } from "@/shared/lib/http";
import { verifyAccessToken } from "@/shared/lib/jwt-tokens";

export async function requireAdmin(request: Request): Promise<{ userId: number }> {
  const header = request.headers.get("authorization");
  if (!header?.startsWith("Bearer ")) {
    throw new HttpError(401, "Unauthorized");
  }
  const token = header.slice("Bearer ".length).trim();
  if (!token) {
    throw new HttpError(401, "Unauthorized");
  }
  try {
    const payload = await verifyAccessToken(token);
    if (!payload.isAdmin) {
      throw new HttpError(403, "Forbidden");
    }
    return { userId: payload.sub };
  } catch {
    throw new HttpError(401, "Invalid or expired token");
  }
}
