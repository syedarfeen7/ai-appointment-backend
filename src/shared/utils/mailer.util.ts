import nodemailer from "nodemailer";
import { config } from "../../config/env.config";

const transporter = nodemailer.createTransport({
  host: config.MAILER.HOST,
  port: config.MAILER.PORT,
  secure: true,
  auth: {
    user: config.MAILER.USER,
    pass: config.MAILER.PASS,
  },
  pool: true,
  maxConnections: 5,
  maxMessages: 50,
});

transporter.verify((error) => {
  if (error) {
    console.error("SMTP connection failed:", error.message);
  } else {
    console.log("SMTP server ready to send emails");
  }
});

export interface SendMailOptions {
  to: string;
  subject: string;
  html?: string;
  text?: string;
}

export const sendMail = async ({
  to,
  subject,
  html,
  text,
}: SendMailOptions) => {
  return await transporter.sendMail({
    from: config.MAILER.SENDER,
    to,
    subject,
    html,
    text,
  });
};
