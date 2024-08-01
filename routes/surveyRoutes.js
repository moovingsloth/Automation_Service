const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailgun = require('mailgun.js');
const formData = require('form-data');
const keys = require('../config/keys');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({username: 'lee dongown', key: process.env.MAILGUN_API_KEY || keys.mailGunKey});  // Mailgun 클라이언트 초기화
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.post('/api/surveys', async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients,
      dateSent: Date.now(),
    });

    const mailer = new Mailer(survey, surveyTemplate(survey));

    mg.messages.create(keys.mailGunDomain, mailer)
    .then(msg => {
      console.log(msg); // 응답 데이터 로깅
      res.status(200).send(msg); // 클라이언트에게 응답 전송
    })
    .catch(err => {
      console.error(err); // 오류 로깅
      res.status(500).send({ error: err.message }); // 클라이언트에게 오류 응답 전송
    });
  });
};
