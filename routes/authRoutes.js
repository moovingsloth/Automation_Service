const passport = require('passport');

module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google', { //google == GoogleStrategy in passport.use, google is internal identifier
        scope: ['profile', 'email'] //google server, ask google to give us profile,  email
        })
    );

    app.get('/auth/google/callback', passport.authenticate('google'));

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user); 
    }); 

    app.get('/api/current_user', (req, res) => {
        res.send(req.user); 
    }); 
};  

