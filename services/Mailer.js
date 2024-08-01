class Mailer {
    constructor({ subject, recipients }, content) {
        this.from = "Lee Dongwon <dlehddnjs245tommy@gmail.com>";
        this.to ="dlehddnjs245@naver.com";
        this.subject = subject;
        this.html = content;
        this.text = "Testing some Mailgun awesomeness!";
    }
};

module.exports = Mailer;
