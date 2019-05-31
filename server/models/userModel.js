import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre('save', function (next) {
  const { password } = this;
  const salt = bcrypt.genSaltSync();
  this.password = bcrypt.hashSync(password, salt);
  next();
});

UserSchema.methods.validatePassword = password => bcrypt.compareSync(password, this.password);

export default mongoose.model('User', UserSchema);
