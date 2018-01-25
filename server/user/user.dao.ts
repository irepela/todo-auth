import mongoose from 'mongoose';
import * as crypto from 'crypto';

const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: {
      type: String,
      unique: 'This email already exists'
    },
    passwordHash: String,
    salt: String,
    username: {
      type: String,
      unique: 'This username already exists'
    }
  },
  {
    timestamps: true
  }
);

userSchema.virtual('password')
  .set((password) => {
    this._plainPassword = password;
    if (password) {
      this.salt = crypto.randomBytes(128).toString('base64');
      this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1');
    } else {
      this.salt = undefined;
      this.passwordHash = undefined;
    }
  })
  .get(() => this._plainPassword);

userSchema.methods.checkPassword = (password) => {
  if (!password) {
    return false;
  }
  if (!this.passwordHash) {
    return false;
  }
  return (crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1') === this.passwordHash);
};

export const User = mongoose.model('User', userSchema);
