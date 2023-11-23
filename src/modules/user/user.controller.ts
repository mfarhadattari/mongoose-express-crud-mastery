/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { SafeParseReturnType } from 'zod';
import { IOrder, IUser } from './user.interface';
import { UserModel } from './user.model';
import { UserService } from './user.service';
import { orderValidationScheme, userValidationSchema } from './user.validation';

// ------------------------>> Create User Controller <<------------------------- //
const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userData = req.body;

    // zod validation
    const validationRes: SafeParseReturnType<IUser, IUser> =
      userValidationSchema.safeParse(userData);

    // response for validation error
    if (!validationRes.success) {
      res.status(500).json({
        success: false,
        message:
          validationRes.error.issues[0].message || 'Something went wrong',
        error: validationRes.error,
      });
      return;
    }

    // response for validation success
    const result = await UserService.createUserIntoDB(validationRes.data);
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};

// ------------------------>> Ger All Users Controller <<------------------------- //
const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await UserService.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};

// ------------------------>> Get a user Controller <<------------------------- //
const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.userId);
    const userExist = await UserModel.isUserExist(userId);

    if (userExist) {
      const result = await UserService.getUserByUserIdFromDB(userId);
      res.status(200).json({
        success: true,
        message: 'User fetched successfully',
        data: result,
      });
      return;
    }

    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};

// ------------------------>> Update User Controller <<------------------------- //
const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.userId);

    // check use exist or not
    const userExist = await UserModel.isUserExist(userId);

    // if user exists
    if (userExist) {
      const userData = req.body;
      // update user data
      const result = await UserService.updateUserByIntoDB(userId, userData);
      res.status(200).json({
        success: true,
        message: 'User updated successfully!',
        data: result,
      });
      return;
    }

    // if not user exist
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};

// ------------------------>> Delete User Controller <<------------------------- //
const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.userId);

    // check use exist or not
    const userExist = await UserModel.isUserExist(userId);

    // if user exists
    if (userExist) {
      await UserService.deleteUserFromDB(userId);
      res.status(200).json({
        success: true,
        message: 'User deleted successfully!',
        data: null,
      });
      return;
    }

    // if not user exist
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};

// ------------------------>> Add Order Controller <<------------------------ //
const addOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.userId);

    // check user exist or not
    const userExist = await UserModel.isUserExist(userId);

    // if user not exist
    if (!userExist) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
      return;
    }

    const orderData = req.body;
    // zod validation
    const validationRes: SafeParseReturnType<IOrder, IOrder> =
      orderValidationScheme.safeParse(orderData);

    // if validation failed
    if (!validationRes.success) {
      res.status(500).json({
        success: false,
        message:
          validationRes.error.issues[0].message || 'Something went wrong',
        error: validationRes.error,
      });
      return;
    }

    // add to database and send response
    await UserService.addOrderIntoDB(userId, validationRes.data);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  addOrder,
};
