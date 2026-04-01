import { refreshSession } from "@/features/auth";
import { handleApiError, HttpError, jsonOk } from "@/shared/lib/http";

type Body = {
  refreshToken?: string;
};

export async function POST(request: Request) {
  try {
    let body: Body;
    try {
      body = (await request.json()) as Body;
    } catch {
      throw new HttpError(400, "Invalid JSON body");
    }
    const refreshToken = body.refreshToken?.trim();
    if (!refreshToken) {
      throw new HttpError(400, "refreshToken is required");
    }
    const tokens = await refreshSession(refreshToken);
    return jsonOk(tokens);
  } catch (e) {
    return handleApiError(e);
  }
}
