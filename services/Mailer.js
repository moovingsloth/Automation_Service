const formData = require('form-data');
  const Mailgun = require('mailgun.js');
  const mailgun = new Mailgun(formData);
  const mailgunKey = require('../config/keys');
  const mg = mailgun.client({username: 'api', mailgunKey});
  
  module.exports = mg.messages.create('sandbox9b35be02824e42db92f85a42dd985017.mailgun.org', {
  	from: "Excited User <mailgun@sandbox9b35be02824e42db92f85a42dd985017.mailgun.org>",
  	to: ["test@example.com"],
  	subject: "Hello",
  	text: "Testing some Mailgun awesomeness!",
  	html: "<h1>Testing some Mailgun awesomeness!</h1>"
  })
  .then(msg => console.log(msg)) // logs response data
  .catch(err => console.log(err)); // logs any error