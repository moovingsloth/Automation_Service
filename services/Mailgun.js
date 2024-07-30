const keys = require('../config/keys');
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({username: 'lee dongown', key: keys.mailGunKey});

module.exports = mg;