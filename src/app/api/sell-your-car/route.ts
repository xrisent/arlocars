import { parseSellCarForm } from "@/features/contacts-us";
import { sendSellCarEmail } from "@/features/contacts-us/api";
import { handleApiError, jsonOk } from "@/shared/lib/http";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const parsed = parseSellCarForm(form);
    await sendSellCarEmail(parsed);
    return jsonOk({ ok: true });
  } catch (e) {
    return handleApiError(e);
  }
}
