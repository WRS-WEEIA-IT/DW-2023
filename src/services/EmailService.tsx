'use strict';
import Email from './SMTP';

const createFormEmailBody = (name: string, email: string, message: string) => {
  return `<b>Name:</b> ${name}<br><b>Email:</b> ${email}<br><b>Message:</b> ${message}<br>`;
};

const createFormEmailSubject = (email: string) => {
  return `DW 2023 - Email od ${email}`;
};

export const sendEmail = async (name: string, email: string, message: string): Promise<string> => {
  if (!name || !email || !message) throw new Error('Parameter passed as empty string');

  const emailSubject = createFormEmailSubject(email);
  const emailBody = createFormEmailBody(name, email, message);
  const returnMessage: string = (await Email.send({
    SecureToken: '92dc0f81-03a8-4df9-8e18-46db71b9d140',
    To: 'j.misko@samorzad.p.lodz.pl',
    From: 'j.misko@samorzad.p.lodz.pl',
    Subject: emailSubject,
    Body: emailBody,
  })) as string;
  return returnMessage;
};
