import { loginUser } from "@/features/auth";
import { handleApiError, HttpError, jsonOk } from "@/shared/lib/http";

type Body = {
  login?: string;
  password?: string;
};

export async function POST(request: Request) {
  try {
    let body: Body;
    try {
      body = (await request.json()) as Body;
    } catch {
      throw new HttpError(400, "Invalid JSON body");
    }
    const login = body.login?.trim();
    const password = body.password;
    if (!login || password == null) {
      throw new HttpError(400, "login and password are required");
    }
    const tokens = await loginUser({ login, password });
    return jsonOk(tokens);
  } catch (e) {
    return handleApiError(e);
  }
}
