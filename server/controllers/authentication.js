import User from '../models/userModel';
import Dashboard from '../models/dashboardModel';
import { buildResponse, joiValidate } from '../utils/helpers';
import { SIGNUP_FIELDS_SCHEMA } from '../utils/constants';

const signUp = async (req, res, next) => {
  joiValidate(req, res, SIGNUP_FIELDS_SCHEMA);

  const { email, name, password } = req.body;
  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      const errorMessage = 'This email is already in use!';
      const response = buildResponse(false, errorMessage);
      return res.status(400).send(response);
    }
    const user = new User({ name, email, password });
    const newlyAddedUser = await user.save();

    const newDashboard = new Dashboard({
      userId: newlyAddedUser._id,
    });
    await newDashboard.save();
    const response = buildResponse(true, 'Signup successfully!');

    return res.status(200).send(response);
  } catch (err) {
    return next(err);
  }
};

const login = (req, res, next) => {
  req.login(req.user, (err) => {
    if (err) return next(err);
    const response = buildResponse(true, 'Login successfully!');
    return res.status(200).send(response);
  });
};

module.exports = {
  signUp,
  login,
};
