const express = require('express')
const router = express.Router()
const User = require('../model/authicate')

//require passport
const passport = require('passport')
const session = require('express-session')


//from doc
const GoogleStrategy = require('passport-google-oauth20').Strategy;
passport.use(new GoogleStrategy({
  //we get these vars from google console.cloud.good
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK
},
  async function (accessToken, refreshToken, profile, done) {
    const newUser = {
      googleId: profile.id,
      displayName: profile.displayName,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      profileImage: profile.photos[0].value,
    };

    try {
      let user = await User.findOne({ googleId: profile.id });
      if (user) {
        done(null, user);
      } else {
        user = await User.create(newUser);
        done(null, user);
      }
    } catch (error) {
      console.log(error);
    }
  }

));

//google login route
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));
//receiving user data
router.get('/google/callback',
  passport.authenticate('google',
    {
      failureRedirect: '/',
      successRedirect: '/dashboard'
    }),
);
//router if something goes wrong
router.get('/login-fail ', (req, res) => {
  res.send('Wrong Credentials !')
})
// Destroy user session
router.get('/logout', (req, res) => {
  req.session.destroy(error => {
    if(error) {
      console.log(error);
      res.send('Error loggin out');
    } else {
      res.redirect('/')
    }
  })
});

//presist user data after succesful auth
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//retrieve user data afterr sucessful auth
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = router 