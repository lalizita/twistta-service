import UserModel from './models/User';

export async function findUsers(){
  const usersList = await UserModel.find();
  return usersList;
}