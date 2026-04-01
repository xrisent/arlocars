import { bootstrapSuperuserOnce } from "@/features/auth";
import { handleApiError, jsonOk } from "@/shared/lib/http";

export async function POST() {
  try {
    const result = await bootstrapSuperuserOnce();
    return jsonOk(result);
  } catch (e) {
    return handleApiError(e);
  }
}
