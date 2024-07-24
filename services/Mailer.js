const mailgun = require('mailgun-js');
const keys = require('../config/keys');

class Mailer {
  constructor({ subject, recipients }, content) {
    this.mg = mailgun({ apiKey: keys.mailGunKey, domain: keys.mailGunDomain });
    this.from = 'REPLACE_WITH_YOUR_AUTHORIZED_SENDER';
    this.subject = subject;
    this.body = content;
    this.recipients = this.formatAddresses(recipients);
  }

  formatAddresses(recipients) {
    return recipients.map(({ email }) => email);
  }

  addClickTracking() {
    // Mailgun 자동 클릭 트래킹 설정
    this.trackingSettings = {
      'o:tracking': true,
      'o:tracking-clicks': true,
    };
  }

  async send() {
    this.addClickTracking();
    const data = {
      from: this.from,
      to: this.recipients.join(','),
      subject: this.subject,
      html: this.body,
      ...this.trackingSettings
    };

    const body = await this.mg.messages().send(data);
    return body;
    
}
}

module.exports = Mailer;
