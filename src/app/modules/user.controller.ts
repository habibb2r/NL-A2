import { Request, Response } from 'express';
import { UserService } from './user.service';
import { userValidation } from './user.validation';

const userCreate = async (req: Request, res: Response) => {
  try {
    const { user: UserData } = req.body;
    // const user = req.body;
    // console.log(UserData);
    const validData = userValidation.parse(UserData)
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
    console.log(err);
  }
};

const singleUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId)
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

    res.status(200).json({
      success: true,
      message: 'User found successfully',
      data: user,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    })
  }
}

export const UserController = {
  userCreate,
  allUsers,
  singleUser
};
