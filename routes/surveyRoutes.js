const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const keys = require('../config/keys');
const mg = mailgun.client({ username: 'api', key: keys.mailGunKey });

const Survey = mongoose.model('surveys');

module.exports = app => {
    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        });

        const mailer = new Mailer(survey, surveyTemplate(survey));

        try {
            const response = await mg.messages.create(keys.mailGunDomain, {
                from: mailer.from,
                to: mailer.to,
                subject: mailer.subject,
                text: mailer.text,
                html: mailer.html
            });
            console.log(response);
            res.send(response);
        } catch (err) {
            console.error(err);
            res.status(422).send(err);
        }
    });
};
