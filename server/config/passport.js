import passport from 'passport';
import { Strategy } from 'passport-local';
import User from '../models/userModel';

/*
 * @return done(error, user, info?)
 */
const handleUserValidation = (email, password, done) => {
  User.findOne({ email }, (err, user) => {
    if (err) return done(err);

    if (!user) {
      return done(null, false, { message: 'Incorrect email.' });
    }
    if (!user.validatePassword(password)) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  });
};

passport.use(
  new Strategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    handleUserValidation,
  ),
);

passport.serializeUser((user, callback) => callback(null, user.id));

passport.deserializeUser((id, callback) => {
  User.findById(id, (err, user) => {
    if (err) return callback(err);
    return callback(null, user);
  });
});
