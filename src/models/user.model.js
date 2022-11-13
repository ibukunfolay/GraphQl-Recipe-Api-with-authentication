import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, default: null },
    email: { type: String, unique: true },
    password: String,
    token: String,
  },
  { timestamps: true },
);

const User = model('user', userSchema);

export default User;
