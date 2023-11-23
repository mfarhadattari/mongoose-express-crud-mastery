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

// -------------------------->> Get User by userId <<-------------------- //
const getUserByUserIdFromDB = async (userId: number) => {
  const result = await UserModel.findOne({ userId: userId });
  return result;
};

// --------------------------->> Update User Service <<-------------------------- //
const updateUserByIntoDB = async (
  userId: number,
  userData: IUser,
): Promise<IUser | null> => {
  const result = await UserModel.findOneAndUpdate(
    { userId: userId },
    userData,
    { new: true },
  );
  return result;
};

export const UserService = {
  createUserIntoDB,
  getAllUsersFromDB,
  getUserByUserIdFromDB,
  updateUserByIntoDB,
};
