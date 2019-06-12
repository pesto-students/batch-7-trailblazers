import mongoose from 'mongoose';
import Issue from '../models/issueModel';
import { buildResponse, joiValidate } from '../utils/helpers';
import { ISSUE_CHANGE_LIFECYCLE_SCHEMA } from '../utils/constants';

const { ObjectId } = mongoose.Types;

const changeLifeCycle = async (req, res, next) => {
  joiValidate(req, res, ISSUE_CHANGE_LIFECYCLE_SCHEMA);

  const { _id, lifeCycle } = req.body;

  try {
    const issue = await Issue.findOneAndUpdate({ _id: ObjectId(_id) }, { $set: { lifeCycle } });
    if (!issue) throw new Error(`Can't add this Issue to ${lifeCycle}!`);

    return res.status(200).send(buildResponse(true, 'New Issue added!'));
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  changeLifeCycle,
};
