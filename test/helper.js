import UserModel from '../src/models/User';
import TweetModel from '../src/models/Tweet';
import mongoose from 'mongoose';
import connectDatabase from '../src/database';

export async function connectMongoose(URI = 'mongodb://localhost/twistta-service'){
  await connectDatabase(URI, { useNewUrlParser: true })
}

export async function clearDatabase() {
  await mongoose.connection.db.dropDatabase();
}

export async function createUser(username = 'Jon Snow', email='john_snow@mail.com', password='123456'){
  const user  = await new UserModel({
    email,
    username,
    password
  }).save();
  return user
}

export async function createTweet(text= 'I know nothing', author){
  await new TweetModel({
    author: author,
    text,
  }).save();
}