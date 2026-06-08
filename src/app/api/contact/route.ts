import { sendContactQuoteEmail } from "@/features/contacts-us/api";
import { parseContactQuoteBody } from "@/features/contacts-us/lib";
import { handleApiError, HttpError, jsonOk } from "@/shared/lib/http";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      throw new HttpError(400, "Invalid JSON body");
    }

    const parsed = parseContactQuoteBody(body);
    await sendContactQuoteEmail(parsed);
    return jsonOk({ ok: true });
  } catch (e) {
    return handleApiError(e);
  }
}
