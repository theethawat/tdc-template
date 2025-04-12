import Mongoose from 'mongoose';
import hash from 'object-hash';

import config from '../configs/app';

const { Schema } = Mongoose;

const UserSchema = new Schema({
  id: String,
  name: String,
  username: {
    type: String,
    index: true,
    unique: true,
  },
  allowLogin: { type: Boolean, default: true },
  password: String,
  tel: String,
  departments: [String],
  role: { type: String, default: 'USER' },
});

UserSchema.methods.passwordHash = (password) =>
  hash.sha1({
    secret: config.secret,
    password,
  });

UserSchema.methods.validPassword = (password, userObj) =>
  hash.sha1({
    secret: config.secret,
    password,
  }) === userObj.password;

UserSchema.pre('save', function (next) {
  this.password = this.passwordHash(this.password);
  next();
});

const UserModel = Mongoose.model('User', UserSchema);

export default UserModel;
