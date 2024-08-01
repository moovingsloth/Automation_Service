class Mailer {
    constructor({ subject, recipients }, content) {
        this.from = "Lee Dongwon <dlehddnjs245tommy@gmail.com>";
        this.to = this.formatRecipients(recipients); // recipients를 형식화
        this.subject = subject;
        this.html = content;
        this.text = "Testing some Mailgun awesomeness!";
    }

    formatRecipients(recipients) {
        // recipients가 배열 형태로 들어올 것이라고 가정
        return recipients.map(({ email }) => email).join(', ');
    }
}

module.exports = Mailer;
