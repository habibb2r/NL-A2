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
};

const updateOneUser = async (userId: number, updateData: Partial<User>) => {
  const result = await UserModel.findOneAndUpdate({ userId }, updateData, {
    new: true,
    runValidators: true,
  })
  return result
}
export const UserService = {
  createUserInDB,
  allUsersFromDB,
  singleUserFromDB,
  updateOneUser
};
