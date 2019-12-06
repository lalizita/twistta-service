import jwt from 'jsonwebtoken';

export function generateToken(user) {
  return `JWT ${jwt.sign({ id: user._id }, 'secret_key')}`;
}