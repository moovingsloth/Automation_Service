const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session'); //give access to cookies
const passport = require('passport'); //tell passport to make use of cookies
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User'); 
require('./services/passport'); //assign anything, just want to be executed

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,  //cookie is automatically expired;miliseconds 
        keys:  [keys.cookieKey]//key to encrypt cookie  
    })
);
 
app.use(passport.initialize());
app.use(passport.session())

require('./routes/authRoutes')(app); //require returns a function
require('./routes/billingRoutes')(app);

const PORT = process.env.PORT || 2000;
 app.listen(PORT); 