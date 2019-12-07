import jwt from 'jsonwebtoken';
import UserModel from './models/User';

export async function getUser(token) {
  if (!token) return { user: null };

  try {
    const decodedToken = jwt.verify(token.substring(4), 'secret_key');

    const user = await UserModel.findOne({ _id: (decodedToken).id });
    return {
      user,
    };
  } catch (err) {
    return { user: null };
  }
}


export function generateToken(user) {
  return `JWT ${jwt.sign({ id: user._id }, 'secret_key')}`;
}