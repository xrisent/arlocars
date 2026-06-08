import type SMTPTransport from "nodemailer/lib/smtp-transport";

export function getSmtpTransportOptions(): SMTPTransport.Options {
  const port = Number(process.env.SMTP_PORT);

  return {
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  };
}

export function getMailFrom(): string {
  return process.env.MAIL_FROM ?? process.env.SMTP_USER ?? "";
}

export function getJwtAccessSecret(): Uint8Array {
  return new TextEncoder().encode(process.env.JWT_ACCESS_SECRET);
}

export function getJwtRefreshSecret(): Uint8Array {
  return new TextEncoder().encode(process.env.JWT_REFRESH_SECRET);
}
