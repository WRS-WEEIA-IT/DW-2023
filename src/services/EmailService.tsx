'use strict';
import Email from './SMTP';

const createFormEmailBody = (name: string, email: string, message: string) => {
  return `<b>Name:</b> ${name}<br><b>Email:</b> ${email}<br><b>Message:</b> ${message}<br>`;
};

const createFormEmailSubject = (email: string) => {
  return `DW 2026 - Email od ${email}`;
};

export const sendEmail = async (name: string, email: string, message: string): Promise<string> => {
  if (!name || !email || !message) throw new Error('Parameter passed as empty string');

  const emailSubject = createFormEmailSubject(email);
  const emailBody = createFormEmailBody(name, email, message);
  const returnMessage: string = (await Email.send({
    SecureToken: 'f4df08d5-c2da-49db-a670-8ef2979207e4',
    To: 'a.golus@samorzad.p.lodz.pl',
    From: 'a.golus@samorzad.p.lodz.pl',
    Subject: emailSubject,
    Body: emailBody,
  })) as string;
  return returnMessage;
};
