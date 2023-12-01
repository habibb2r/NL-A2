import { Request, Response } from 'express';
import { UserService } from './user.service';
import { orderValidation, userValidation } from './user.validation';

const userCreate = async (req: Request, res: Response) => {
  try {
    const { user: UserData } = req.body;
    // const user = req.body;
    // console.log(UserData);
    const validData = userValidation.parse(UserData);
    const result = await UserService.createUserInDB(validData);
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
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
      data: user,
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
    const { user: update } = req.body;
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

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser,
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
    const userId = parseInt(req.params.userId)
    const orderInfo = req.body
    const validUserData = orderValidation.parse(orderInfo)
    const user = await UserService.singleUserFromDB(userId)

    if (!user)
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found',
        },
      })

    await UserService.doOrder(userId, validUserData)
    res.status(201).json({
      success: true,
      message: 'Order added successfully',
      data: null,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: error,
    })
  }
}

export const UserController = {
  userCreate,
  allUsers,
  singleUser,
  updateOneUser,
  deleteUser,
  doOrder
};
