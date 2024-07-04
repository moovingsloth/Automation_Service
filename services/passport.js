const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id); //user.id is not googleId, is id assigned by MondoDB : internal id 
})

passport.deserializeUser((id, done) => {
     User.findById(id)
     .then (user => {
        done(null, user);
     })
})
 
passport.use(new GoogleStrategy(
    {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
    }, 
    async (accessToken, refreshToken, profile, done) => {

        const existingUser = await User.findOne({googleId: profile.id}) //check if we already have a record 
        if(existingUser){ //if existing user exists
            //we already have user record with a given profile ID
            return  done(null, existingUser);
        }
        //we don't have user record with a given profile ID, make a new record 
        const user =   await new User({googleId: profile.id }).save() //new instance of user -> save to database
        done(null, user); 
    }
  )
);//create instance of the  GooglePassportStrategy ->  aware passport for user to use
      