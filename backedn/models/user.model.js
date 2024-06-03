import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // validate: {
      //   validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      //   message: 'Invalid email format',
      // },
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: 'no-image',
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
