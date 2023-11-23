import { IUser } from './user.interface';
import { UserModel } from './user.model';

// ------------------------>> Create User Service <<------------------------- //
const createUserIntoDB = async (userData: IUser): Promise<IUser> => {
  const result = await UserModel.create(userData);
  return result;
};

// ------------------------>> GET All Users Service <<----------------------- //
const getAllUsersFromDB = async () => {
  const result = await await UserModel.find().select({
    _id: 0,
    username: 1,
    fullName: 1,
    email: 1,
    age: 1,
    address: 1,
  });
  return result;
};

export const UserService = {
  createUserIntoDB,
  getAllUsersFromDB,
};
