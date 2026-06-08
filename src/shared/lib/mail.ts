import nodemailer from "nodemailer";
import type { Attachment } from "nodemailer/lib/mailer";

import { getMailFrom, getSmtpTransportOptions } from "@/shared/config/env";
import { siteConfig } from "@/shared/config/site";

let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
  transporter ??= nodemailer.createTransport(getSmtpTransportOptions());
  return transporter;
}

export async function sendSiteEmail(params: {
  subject: string;
  text: string;
  attachments?: Attachment[];
}): Promise<void> {
  await getTransporter().sendMail({
    from: getMailFrom(),
    to: siteConfig.email,
    subject: params.subject,
    text: params.text,
    attachments: params.attachments,
  });
}
