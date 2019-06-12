import express from 'express';
import passport from 'passport';
import authentication from '../controllers/authentication';

import { joiValidate } from '../utils/helpers';
import { LOGIN_FIELDS_SCHEMA } from '../utils/constants';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.send('Express server up');
});

router.post('/signup', authentication.signUp);
router.post(
  '/login',
  (req, res, next) => {
    joiValidate(req, res, LOGIN_FIELDS_SCHEMA);
    next();
  },
  passport.authenticate('local'),
  authentication.login,
);

module.exports = router;
