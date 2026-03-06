import nodemailer from 'nodemailer';

export function createTransport() {
  const mode = process.env.SMTP_PROVIDER || 'gmail';
  if (mode === 'sendgrid') {
    return nodemailer.createTransport({ host: 'smtp.sendgrid.net', port: 587, auth: { user: 'apikey', pass: process.env.SENDGRID_API_KEY } });
  }
  if (mode === 'mailgun') {
    return nodemailer.createTransport({ host: 'smtp.mailgun.org', port: 587, auth: { user: process.env.MAILGUN_SMTP_USER, pass: process.env.MAILGUN_SMTP_PASS } });
  }
  return nodemailer.createTransport({ service: 'gmail', auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD } });
}
