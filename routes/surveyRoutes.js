const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
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
    app.get('/api/surveys/thanks', (req, res) => {
        res.send('Thanks for voting!');
    });

    app.post('/api/surveys/webhooks', (req, res) => {
      const p = new Path('/api/surveys/:surveyId/:choice');
  
      _.chain(req.body)
        .map(({ email, url }) => {
          const match = p.test(new URL(url).pathname);
          if (match) {
            return { email, surveyId: match.surveyId, choice: match.choice };
          }
        })
        .compact()
        .uniqBy('email', 'surveyId')
        .each(({ surveyId, email, choice }) => {
          Survey.updateOne(
            {
              _id: surveyId,
              recipients: {
                $elemMatch: { email: email, responded: false },
              },
            },
            {
              $inc: { [choice]: 1 },
              $set: { 'recipients.$.responded': true },
              lastResponded: new Date(),
            }
          ).exec();
        })
        .value();
  
      res.send({});
    });

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;

        // 설문 조사 객체 생성
        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })), // 이메일 주소를 객체로 변환
            dateSent: Date.now(),
        });

        const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      // 이메일 전송
      await mg.messages.create(keys.mailGunDomain, mailer);
      res.status(200);
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      console.error(err); // 오류 로깅
      res.status(500).send({ error: err.message }); // 클라이언트에게 오류 응답 전송
    }
  });
};

