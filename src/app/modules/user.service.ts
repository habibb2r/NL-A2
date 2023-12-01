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
  const result = await UserModel.findOne({ userId });
  return result;
};

const updateOneUser = async (userId: number, updateData: Partial<User>) => {
  const result = await UserModel.findOneAndUpdate({ userId }, updateData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteUser = async (userId: number) => {
  const result = await UserModel.deleteOne({ userId });
  return result;
};

const doOrder = async (userId: number, info: Orders) => {
  const result = await UserModel.findOneAndUpdate(
    { userId },
    { $push: { orders: info } },
  );
  return result;
};

const getOrders = async (userId: number) => {
  const result = await UserModel.findOne({ userId }).select({ orders: 1 });
  return result;
};

const getTotalPrice = async (userId: number) => {
  const result = await UserModel.aggregate([
    { $match: { userId } },
    { $unwind: '$orders' },
    {
      $group: {
        _id: null,
        totalPrice: {
          $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
        },
      },
    },

    {
      $project: {
        _id: 0,
        totalPrice: { $round: ['$totalPrice', 2] },
      },
    },
  ]);

  if (result.length > 0) return result[0];
  else return (result[0] = { totalPrice: 0 });
};

export const UserService = {
  createUserInDB,
  allUsersFromDB,
  singleUserFromDB,
  updateOneUser,
  deleteUser,
  doOrder,
  getOrders,
  getTotalPrice,
};
