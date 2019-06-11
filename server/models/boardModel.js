import mongoose from 'mongoose';
import autoIncrementId from './autoIncrementModel';
import constants from '../config/constants';

const { Schema } = mongoose;

const BoardSchema = new Schema({
  id: { type: Number },
  name: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  lifecycles: [{ type: String }],
  issues: { type: Array, default: [] },
  members: [
    {
      user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      role: { type: String, enum: Object.values(constants.ROLES_ENUM) },
      addedOn: { type: Date, default: Date.now },
    },
  ],
});

async function preProcess(next) {
  const increment = autoIncrementId.bind(this, 'boardId', 'id');
  await increment();
  next();
}
BoardSchema.pre('save', preProcess);
export default mongoose.model('Board', BoardSchema);
