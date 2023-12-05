import { Request, Response } from 'express';
import { UserService } from './user.service';
import { orderValidation, userValidation } from './user.validation';
import { getUserInfo, FullName } from './user.interface';

const userCreate = async (req: Request, res: Response) => {
  try {
    const  UserData  = req.body;
    // const user = req.body;
    // console.log(UserData);
    const validData = userValidation.parse(UserData);
    const user = await UserService.createUserInDB(validData);
    const data = {
      userId: user?.userId,
      username: user?.username,
      fullName: user?.fullName,
      age: user?.age,
      email: user?.email,
      isActive: user?.isActive,
      hobbies: user?.hobbies,
      address: user?.address
    }
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err,
    });
  }
};

const allUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserService.allUsersFromDB();
    const filteredUsers = users.map((user) => ({
      username: user.username,
      fullName: user.fullName,
      age: user.age,
      email: user.email,
      address: user.address,
    }));

    res.status(200).json({
      success: true,
      message: 'Students are retrived successfully',
      data: filteredUsers,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err,
    });
  }
};

const singleUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await UserService.singleUserFromDB(userId);
    const data = {
      userId: user?.userId,
      username: user?.username,
      fullName: user?.fullName,
      age: user?.age,
      email: user?.email,
      isActive: user?.isActive,
      hobbies: user?.hobbies,
      address: user?.address
    }
    if (!user)
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found',
        },
      });

    res.status(200).json({
      success: true,
      message: 'User found successfully',
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};

const updateOneUser = async (req: Request, res: Response) => {
  try {
    const  update = req.body;
    // console.log(update)
    const updateData = userValidation.parse(update);

    const userId = parseInt(req.params.userId);
    const user = await UserService.singleUserFromDB(userId);

    if (!user)
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found',
        },
      });

    const updatedUser = await UserService.updateOneUser(userId, updateData);
    const data = {
      userId: updatedUser?.userId,
      username: updatedUser?.username,
      fullName: updatedUser?.fullName,
      age: updatedUser?.age,
      email: updatedUser?.email,
      isActive: updatedUser?.isActive,
      hobbies: updatedUser?.hobbies,
      address: updatedUser?.address
    }
    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await UserService.singleUserFromDB(userId);

    if (!user)
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });

    await UserService.deleteUser(userId);
    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};

const doOrder = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const orderInfo = req.body;
    const validUserData = orderValidation.parse(orderInfo);
    const user = await UserService.singleUserFromDB(userId);

    if (!user)
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found',
        },
      });

    await UserService.doOrder(userId, validUserData);
    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: error,
    });
  }
};

const getOrders = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await UserService.singleUserFromDB(userId);

    if (!user)
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found',
        },
      });

    const result = await UserService.getOrders(userId);
    const data = {
      orders : result?.orders
    }
    res.status(200).json({
      success: true,
      message: 'Order retrived successfully',
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: error,
    });
  }
};

const getTotalPrice = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId)
    const user = await UserService.singleUserFromDB(userId)

    if (!user)
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      })

    const result = await UserService.getTotalPrice(userId)
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: error,
    })
  }
};

export const UserController = {
  userCreate,
  allUsers,
  singleUser,
  updateOneUser,
  deleteUser,
  doOrder,
  getOrders,
  getTotalPrice
};
