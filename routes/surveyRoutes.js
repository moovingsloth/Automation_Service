const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailgun = require('mailgun.js');
const formData = require('form-data');
const keys = require('../config/keys');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({ username: 'lee dongown', key: process.env.MAILGUN_API_KEY || keys.mailGunKey });
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    // 설문 조사 객체 생성
    const survey = new Survey({
      title,
      subject,
      body,
      recipients,
      dateSent: Date.now(),
    });

    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      // 이메일 전송
      const msg = await mg.messages.create(keys.mailGunDomain, mailer);
      console.log(msg); // 응답 데이터 로깅

      // 설문 조사 저장
      await survey.save();

      // 크레딧 차감
      req.user.credits -= 1;
      const user = await req.user.save();

      // 클라이언트에게 응답 전송
      res.status(200).send(user);
    } catch (err) {
      console.error(err); // 오류 로깅
      res.status(500).send({ error: err.message }); // 클라이언트에게 오류 응답 전송
    }
  });
};
