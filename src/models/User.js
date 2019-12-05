import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  username: {
    type: String,
    description: 'username',
    required: true,
    index: true,
  },
  password: {
    type: String,
    hidden: true,
    required: true,
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
  collection: 'User',
});

Schema
  .pre('save', function (next) {
    // Hash the password
    if (this.isModified('password')) {
      this.password = this.encryptPassword(this.password);
    }

    return next();
  });

  Schema.methods = {
    authenticate(plainTextPassword) {
      return bcrypt.compareSync(plainTextPassword, this.password);
    },
    encryptPassword(password) {
      return bcrypt.hashSync(password, 8);
    },
  };
  

export default mongoose.model('User', Schema);