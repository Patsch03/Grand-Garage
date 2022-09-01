var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));


router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/garage',
    failureRedirect : '/'
  }
));

// Google OAuth callback route
router.get('/auth/google/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/garage',
    failureRedirect : '/'
  }
));

// OAuth logout route
router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/garage');
  });
});



module.exports = router;
