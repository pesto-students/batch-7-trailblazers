import Joi from '@hapi/joi';
import Board from '../models/boardModel';
import Dashboard from '../models/dashboardModel';
import { buildResponse } from '../utils/helpers';
import { ROLES_ENUM } from '../utils/constants';

function validateBoard(request) {
  const validationSchema = Joi.object().keys({
    name: Joi.string().required(),
    lifecycles: Joi.array()
      .items(Joi.string().required())
      .unique()
      .required(),
  });
  const { error } = Joi.validate(request, validationSchema);
  return error;
}

async function addBoardToDashboard(userId, boardId) {
  try {
    const dashboard = await Dashboard.findOneAndUpdate({ userId }, { $push: { boards: boardId } });
    if (dashboard) {
      return true;
    }
  } catch (exception) {
    return false;
  }
  return false;
}
const addBoard = async (req, res) => {
  try {
    const error = validateBoard(req.body);

    if (error) {
      const [{ message }] = error.details;
      const response = buildResponse(false, message);
      return res.status(400).send(response);
    }
    const userId = req.user.id;
    const owner = userId;
    const newBoard = {
      ...req.body,
      owner,
      members: [{ user: userId, role: ROLES_ENUM.SUPER_ADMIN }],
    };
    const boardModel = new Board(newBoard);
    const resBoard = await boardModel.save();
    await addBoardToDashboard(userId, resBoard._id);
    return res.status(200).send(buildResponse(true, 'successfully added Board'));
  } catch (exception) {
    console.log(exception);
    return res.status(500).send(buildResponse(false, `Error occured, ${exception}`));
  }
};

const getBoardList = async (req, res) => {
  try {
    const userId = req.user.id;
    const dashboard = await Dashboard.findOne({ userId }).populate({
      path: 'boards',
      select: { id: 1, name: 1, owner: 1 },
      populate: {
        path: 'owner',
        select: { name: 1 },
      },
    });
    const otherBoards = [];
    const ownBoards = dashboard.boards.filter((board) => {
      if (!board.owner._id.equals(userId)) {
        otherBoards.push(board);
      }
      return board.owner._id.equals(userId);
    });
    res.send(buildResponse(true, '', { ownBoards, otherBoards }));
  } catch (exception) {
    console.log(exception);
    res.status(500).send(buildResponse(false, `${exception}`));
  }
};
module.exports = { addBoard, getBoardList };
