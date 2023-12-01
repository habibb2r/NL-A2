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

export const UserController = {
  userCreate,
  allUsers,
};
