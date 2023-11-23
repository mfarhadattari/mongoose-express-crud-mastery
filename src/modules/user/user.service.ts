import { IUser } from './user.interface';
import { UserModel } from './user.model';

// ------------------------>> Create User Service <<------------------------- //
const createUserIntoDB = async (userData: IUser): Promise<IUser> => {
  const result = await UserModel.create(userData);
  return result;
};

// ------------------------>> GET All Users Service <<----------------------- //
const getAllUsersFromDB = async (): Promise<IUser[] | null> => {
  const result = await UserModel.find();
  return result;
};

export const UserService = {
  createUserIntoDB,
  getAllUsersFromDB,
};
