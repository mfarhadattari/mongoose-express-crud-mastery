/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { SafeParseReturnType } from 'zod';
import { IUser } from './user.interface';
import { UserService } from './user.service';
import { userValidationSchema } from './user.validation';

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

export const UserController = {
  createUser,
};
