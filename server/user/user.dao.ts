import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: {
      type: String,
      unique: 'This email already exists'
    },
    passwordHash: String,
    username: {
      type: String,
      unique: 'This username already exists'
    },
    todos: Array
  },
  {
    timestamps: true
  }
);

export const User = mongoose.model('User', userSchema);
