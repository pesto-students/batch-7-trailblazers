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

const getMembers = {
  id: Joi.number().required(),
};

const updateMemberRole = {
  id: Joi.number().required(),
  member: Joi.string().required(),
  role: Joi.string().required(),
};

const deleteMember = {
  id: Joi.number().required(),
  member: Joi.string().required(),
};

const addBoard = {
  name: Joi.string().required(),
  lifeCycles: Joi.array()
    .items(Joi.string().required())
    .unique()
    .required(),
};

const JoiObject = schema => Joi.object().keys(schema);

export const LOGIN_FIELDS_SCHEMA = JoiObject(loginFields);
export const SIGNUP_FIELDS_SCHEMA = JoiObject(signupFields);
export const ISSUE_CHANGE_LIFECYCLE_SCHEMA = JoiObject(changeLifeCycle);
export const GET_MEMBERS = JoiObject(getMembers);
export const UPDATE_MEMBER_ROLE = JoiObject(updateMemberRole);
export const DELETE_MEMBER = JoiObject(deleteMember);
export const ADD_BOARD = JoiObject(addBoard);
