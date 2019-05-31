import User from '../models/userModel';
import { buildResponse } from '../utils/helpers';

exports.signUp = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!email || !password) {
    const errorMessage = 'You must provide email and password';
    const response = buildResponse(false, errorMessage);
    return res.status(400).send(response);
  }
  User.findOne({ email }, (err, existingUser) => {
    if (err) {
      return next(err);
    }
    if (existingUser) {
      const errorMessage = 'Email already in use';
      const response = buildResponse(false, errorMessage);
      return res.status(400).send(response);
    }
    const user = new User({
      name,
      email,
      password,
    });
    user.save((error) => {
      if (error) {
        return next(error);
      }
      const response = buildResponse(true, []);
      return res.status(200).send(response);
    });
    return null;
  });
  return null;
};
