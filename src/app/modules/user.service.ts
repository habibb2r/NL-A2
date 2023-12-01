import { User } from './user.interface';
import { UserModel } from './user.model';

const createUserInDB = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};

const allUsersFromDB = async () => {
  const result = await UserModel.find();
  return result;
};

const singleUserFromDB = async (userId: number) => {
  const result = await UserModel.findOne({ userId })
  return result
}
export const UserService = {
  createUserInDB,
  allUsersFromDB,
  singleUserFromDB
};
