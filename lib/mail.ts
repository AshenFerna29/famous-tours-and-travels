import nodemailer from 'nodemailer';

export function getTransporter() {
  const host = process.env.SMTP_HOST!;
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = String(process.env.SMTP_SECURE || '').toLowerCase() === 'true'; 
  const user = process.env.EMAIL_USER!;
  const pass = process.env.EMAIL_PASS!;

  if (!host || !user || !pass) {
    throw new Error('SMTP is not configured. Check .env.local');
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

export function fromHeader() {
  return process.env.EMAIL_FROM || process.env.EMAIL_USER!;
}
