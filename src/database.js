import mongoose from 'mongoose';

export default function connectDatabase(URI = 'mongodb://localhost/twistta-service', options) {
  return new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise;
    mongoose.connection
      .on('error', error => reject(error))
      .on('close', () => console.log('Database connection closed.'))
      .once('open', () => resolve(mongoose.connections[0]));

    mongoose.connect(URI, { useNewUrlParser: true, ...options });
  });
}