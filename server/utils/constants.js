import Joi from '@hapi/joi';

const loginFields = {
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string().required(),
};

const signupFields = {
  name: Joi.string(),
  ...loginFields,
};

const changeLifeCycle = {
  _id: Joi.string().required(),
  lifeCycle: Joi.string().required(),
};

const JoiObject = schema => Joi.object().keys(schema);

export const LOGIN_FIELDS_SCHEMA = JoiObject(loginFields);
export const SIGNUP_FIELDS_SCHEMA = JoiObject(signupFields);
export const ISSUE_CHANGE_LIFECYCLE_SCHEMA = JoiObject(changeLifeCycle);
