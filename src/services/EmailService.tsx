export const Email = {
  send: function (a) {
    return new Promise(function (n, e) {
      (a.nocache = Math.floor(1e6 * Math.random() + 1)), (a.Action = 'Send');
      const t = JSON.stringify(a);
      Email.ajaxPost('https://smtpjs.com/v3/smtpjs.aspx?', t, function (e) {
        n(e);
      });
    });
  },
  ajaxPost: function (e, n, t) {
    const a = Email.createCORSRequest('POST', e);
    a.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'),
      (a.onload = function () {
        const e = a.responseText;
        null != t && t(e);
      }),
      a.send(n);
  },
  ajax: function (e, n) {
    const t = Email.createCORSRequest('GET', e);
    (t.onload = function () {
      const e = t.responseText;
      null != n && n(e);
    }),
      t.send();
  },
  createCORSRequest: function (e, n) {
    let t = new XMLHttpRequest();
    return (
      'withCredentials' in t
        ? t.open(e, n, !0)
        : 'undefined' != typeof XMLHttpRequest
        ? (t = new XMLHttpRequest()).open(e, n)
        : (t = null),
      t
    );
  },
};

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
    SecureToken: 'f4df08d5-c2da-49db-a670-8ef2979207e4',
    To: 'czarny.mlot666@gmail.com',
    From: 'czarny.mlot666@gmail.com',
    Subject: emailSubject,
    Body: emailBody,
  })) as string;
  return returnMessage;
};
