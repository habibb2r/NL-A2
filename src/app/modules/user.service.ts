import { Orders, User } from './user.interface';
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
};

const deleteUser = async (userId: number) => {
  const result = await UserModel.deleteOne({ userId })
  return result
};

const doOrder = async (userId: number, info: Orders) => {
  const result = await UserModel.findOneAndUpdate({ userId }, { $push: { orders: info } },)
  return result
};

export const UserService = {
  createUserInDB,
  allUsersFromDB,
  singleUserFromDB,
  updateOneUser,
  deleteUser,
  doOrder
};
