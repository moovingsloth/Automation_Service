const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const mg = require('./mailgun');
const keys = require('../config/keys');

const Survey = mongoose.model('surveys');

module.exports = (app) => {
  app.get('/api/surveys/thanks', (req, res) => {
    res.send('Thanks for voting!');
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    // const { subject, body, recipients } = req.body;

      await mg.messages.create(keys.MAIL_GUN_DOMAIN, {
        from: "lee dongown <dlehddnjs245tommy@gmail.com>",
        to: "dlehddnjs245@naver.com",
        text: "Testing some Mailgun awesomeness!",
        html: "<h1>Testing some Mailgun awesomeness!</h1>"
      })
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);
    /*
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients
        .split(',')
        .map((email) => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now(),
    });

    // Great place to send an email!
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
    }*/
  });
};