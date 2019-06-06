import express from 'express';
import passport from 'passport';
import authentication from '../controllers/authentication';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.send('Express server up');
});

router.post('/signup', authentication.signUp);
router.post('/login', passport.authenticate('local'), authentication.login);
router.post('/dashboard', (req, res) => {
  if (req.isAuthenticated()) {
    res.send('isAuthenticated');
  }
  res.send('not Authenticated');
});

module.exports = router;
