import type { ContactQuotePayload, SellCarPayload } from "@/features/contacts-us";
import { sendSiteEmail } from "@/shared/lib/mail";

function buildContactQuoteText(data: ContactQuotePayload): string {
  return [
    "New Get a Quote request",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    "",
    "Message:",
    data.message,
  ].join("\n");
}

function buildSellCarText(data: SellCarPayload): string {
  return [
    "New Sell Your Car request",
    "",
    "Personal details:",
    `Full Name: ${data.fullName}`,
    `Contact Number: ${data.contactNumber}`,
    "",
    "Car details:",
    `Make/Model: ${data.carMakeModel}`,
    `Year: ${data.year}`,
    `Mileage: ${data.mileage}`,
    `Specifications: ${data.specifications || "—"}`,
    `Trade-In: ${data.tradeIn || "—"}`,
    "",
    "Notes:",
    data.notes || "—",
  ].join("\n");
}

export async function sendContactQuoteEmail(data: ContactQuotePayload): Promise<void> {
  await sendSiteEmail({
    subject: `Get a Quote — ${data.name}`,
    text: buildContactQuoteText(data),
  });
}

export async function sendSellCarEmail(data: SellCarPayload): Promise<void> {
  const attachments = await Promise.all(
    data.images.map(async (file, index) => ({
      filename: file.name || `image-${index + 1}.jpg`,
      content: Buffer.from(await file.arrayBuffer()),
      contentType: file.type,
    })),
  );

  await sendSiteEmail({
    subject: `Sell Your Car — ${data.fullName}`,
    text: buildSellCarText(data),
    attachments,
  });
}
