import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

const Schema = mongoose.Schema({
  author: {
    type: ObjectId,
    required: true,
    index: true,
    ref: 'User',
  },
  parent: {
    type: ObjectId,
    index: true,
    ref: 'Tweet'
  },
  text: {
    type: String,
    required: true,
  },
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
  collection: 'Tweet',
});

export default mongoose.model('Tweet', Schema);
