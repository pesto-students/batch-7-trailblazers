import Issue from '../models/issueModel';
import {} from '../models/commentModel';
import { buildResponse, joiValidate } from '../utils/helpers';
import {
  ISSUE_CHANGE_LIFECYCLE_SCHEMA,
  GET_ISSUE_DETAILS,
  SERVER_ERROR_MESSAGE,
} from '../utils/constants';

const getIssueDetails = async (req, res) => {
  const [isValid, response] = joiValidate(req.body, GET_ISSUE_DETAILS);
  if (!isValid) return res.status(400).send(response);

  try {
    const { id } = req.body;

    const issue = await Issue.findOne({ id }).populate('comments');
    if (!issue) {
      return res.send(buildResponse(false, "Issue doesn't exist"));
    }
    const data = issue._doc;
    // Not to expose _id of any data
    delete data._id;

    return res.send(buildResponse(true, '', data));
  } catch (err) {
    console.error(err);
    return res.status(500).send(buildResponse(false, SERVER_ERROR_MESSAGE));
  }
};

const changeLifeCycle = async (req, res) => {
  const [isValid, response] = joiValidate(req.body, ISSUE_CHANGE_LIFECYCLE_SCHEMA);
  if (!isValid) return res.status(400).send(response);
  const { id, lifeCycle } = req.body;

  try {
    const issue = await Issue.findOneAndUpdate({ id }, { $set: { lifeCycle } });
    if (!issue) throw new Error(`Can't add this Issue to ${lifeCycle}!`);

    return res.status(200).send(buildResponse(true, 'New Issue added!'));
  } catch (err) {
    console.error(err);
    return res.status(500).send(buildResponse(false, SERVER_ERROR_MESSAGE));
  }
};

const update = async (req, res) => {
  console.log(req.body);
  const [isValid, response] = joiValidate(req.body, UPDATE_ISSUE_DETAILS);
  if (!isValid) return res.status(400).send(response);

  try {
    const {
      id, title = '', dueDate, assignee, description = '', newComment,
    } = req.body;

    const updateOperation = {
      $set: {
        title,
        dueDate,
        assignee,
        description,
      },
    };

    if (newComment) {
      const comment = new Comment({
        description: newComment,
        createdBy: req.user.name,
      });
      updateOperation.$push = { comments: comment };
    }
    const result = await Issue.findOneAndUpdate({ id }, updateOperation);
    if (!result) {
      return res.send(buildResponse(false, 'Failed to update issue details!'));
    }
    return res.send(buildResponse(false, 'Issue details updated!'));
  } catch (err) {
    console.error(err);
    return res.status(500).send(buildResponse(false, SERVER_ERROR_MESSAGE));
  }
};

module.exports = {
  getIssueDetails,
  changeLifeCycle,
  update,
};
